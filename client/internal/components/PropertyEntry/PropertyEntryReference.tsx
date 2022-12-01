import React from "react";
import equals from "deep-equal";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import { getFieldsAndArgs, runGetQueryFor, runSearchQueryFor } from "../../../../client/internal/gql-client-util";
import { IGQLRequestFields, IGQLArgs } from "../../../../gql-querier";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { PropertyDefinitionValueType, IPropertyDefinitionExactPropertyValue, IPropertyDefinitionReferredPropertyValue } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { getConversionIds } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import { deepRendererArgsComparer } from "../general-fn";

export interface IPropertyEntryReferenceOption {
  id: string;
  text: string;
};

export interface IReferrencedPropertySet {
  [propertyId: string]: PropertyDefinitionValueType;
}

export interface IPropertyEntryReferenceRendererProps extends IPropertyEntryRendererProps<string> {
  isNullable: boolean;
  i18nUnspecified: string;

  currentTextualValue: string;
  currentValueIsFullfilled: boolean;
  currentOptions: IPropertyEntryReferenceOption[];
  currentFindError: EndpointErrorType;
  currentSearchError: EndpointErrorType;

  onChangeSearch: (str: string, preventIds?: string[], preventEqualityWithProperties?: string[]) => void;
  loadAllPossibleValues: (limit: number, preventIds?: string[], preventEqualityWithProperties?: string[]) => void;
  refilterPossibleValues: (preventIds?: string[], preventEqualityWithProperties?: string[]) => void;
  onSelect: (option: IPropertyEntryReferenceOption) => void;
  onCancel: () => void;
  dismissSearchError: () => void;
  dismissFindError: () => void;
}

const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();

interface IPropertyEntryReferenceState {
  currentOptions: IPropertyEntryReferenceOption[];
  currentOptionsVersion: string;
  currentSearchError: EndpointErrorType;
  currentFindError: EndpointErrorType;
  showUserSetErrors: boolean;

  ssrServerOnlyValue: string;
}

export default class PropertyEntryReference
  extends React.Component<IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>, IPropertyEntryReferenceState> {

  private searchTimeout: NodeJS.Timeout;
  private currentlyFindingValueFor: [string, string];
  private lastSearchId: number;

  private lastSearchArgumentLoadAll: boolean;
  private lastSearchArgumentLimit: number;
  private lastSearchArgumentPreventIds: string[];
  private lastSearchArgumentPreventEqualityWithProperties: string[];

  private lastCachedSearch: IPropertyEntryReferenceOption[];
  private lastCachedSearchPreventedProperties: PropertyDefinition[];
  private lastCachedSearchPreventedPropertiesIds: string[];
  private lastCachedSearchPreventedIds: string[];

  private isUnmounted = false;

  public static getSpecialData(props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>): [ItemDefinition, PropertyDefinition, PropertyDefinition] {
    const modPath = props.property.getSpecialProperty("referencedModule") as string;
    if (!modPath) {
      throw new Error(
        "For usage with references you must specify a referencedModule special property for " + props.property.getId()
      );
    }
    const idefPath = props.property.getSpecialProperty("referencedItemDefinition") as string;
    if (!idefPath) {
      throw new Error(
        "For usage with references you must specify a referencedItemDefinition special property for " + props.property.getId()
      );
    }
    const searchProp = props.property.getSpecialProperty("referencedSearchProperty") as string;
    if (!searchProp) {
      throw new Error(
        "For usage with references you must specify a referencedSearchProperty special property for " + props.property.getId()
      );
    }
    const displayProp = props.property.getSpecialProperty("referencedDisplayProperty") as string;
    if (!displayProp) {
      throw new Error(
        "For usage with references you must specify a referencedDisplayProperty special property for " + props.property.getId()
      );
    }


    const root = props.property.getParentModule().getParentRoot();
    const mod = root.getModuleFor(modPath.split("/"));
    const idef = mod.getItemDefinitionFor(idefPath.split("/"));
    const dProp = idef.getPropertyDefinitionFor(displayProp, true);
    const sProp = idef.getPropertyDefinitionFor(searchProp, true);

    return [idef, dProp, sProp];
  }

  constructor(props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>) {
    super(props);

    this.state = {
      currentOptions: [],
      currentOptionsVersion: null,
      currentSearchError: null,
      currentFindError: null,
      showUserSetErrors: false,

      ssrServerOnlyValue: null,
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.loadAllPossibleValues = this.loadAllPossibleValues.bind(this);
    this.refilterPossibleValues = this.refilterPossibleValues.bind(this);
    this.refilter = this.refilter.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.search = this.search.bind(this);
    this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
    this.dismissSearchError = this.dismissSearchError.bind(this);
    this.dismissFindError = this.dismissFindError.bind(this);

    this.changeListener = this.changeListener.bind(this);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
  }

  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }

  public changeListener(id: string, version: string) {
    // we check that the change occured in our own version
    if (
      this.lastSearchId &&
      (id || null) === (this.props.forId || null) &&
      (version || null) === (this.props.forVersion || null)
    ) {
      this.search(
        this.lastSearchArgumentLoadAll,
        this.lastSearchArgumentLimit,
        this.lastSearchArgumentPreventIds,
        this.lastSearchArgumentPreventEqualityWithProperties,
      );
    }
  }

  public componentDidMount() {
    this.addListeners();

    if (
      this.props.state.value &&
      !this.props.state.internalValue &&
      !this.props.state.enforced
    ) {
      const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
      this.findCurrentStrValue(
        this.props.state.value as string,
        filterByLanguage ? this.props.language : null,
      );
    }
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
    this.removeListeners();
    if (this.lastCachedSearchPreventedProperties) {
      this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
    }
  }

  public toggleListener(props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps> = this.props, fn: string) {
    const propertySet = props.property.getSpecialProperty("referencedFilteringPropertySet") as IReferrencedPropertySet || {};
    // first we need the standard form not of our target item definition
    // but rather the one we are currently working within, hence the difference
    let stdSelfIdef = this.props.itemDefinition;
    // if we are in search mode
    if (this.props.itemDefinition.isInSearchMode()) {
      // the standard counterpart needs to be fetched
      stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
    }

    // now we loop into our property set
    Object.keys(propertySet).forEach((pId) => {
      // now the value we will use will depend on the type of condition we have here
      const valueToUse = propertySet[pId];
      // if it's an exact value we just paste it in the arg
      if (typeof (valueToUse as IPropertyDefinitionExactPropertyValue).exactValue === "undefined") {
        const referredProperty = (valueToUse as IPropertyDefinitionReferredPropertyValue).property;

        let actualReferredProperty = stdSelfIdef.getPropertyDefinitionFor(referredProperty, true);
        if (this.props.itemDefinition.isInSearchMode()) {
          actualReferredProperty = this.props.itemDefinition.getPropertyDefinitionFor(
            getConversionIds(actualReferredProperty.rawData)[0], true,
          );
        }

        actualReferredProperty[fn](this.changeListener);
      }
    });
  }

  public addPreventEqualityWithPropertiesListener(properties: PropertyDefinition[]) {
    properties.forEach((p) => {
      p.addChangeListener(this.refilter);
    });
  }

  public removePreventEqualityWithPropertiesListener(properties: PropertyDefinition[]) {
    properties.forEach((p) => {
      p.removeChangeListener(this.refilter);
    });
  }

  public addListeners(props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps> = this.props) {
    this.toggleListener(props, "addChangeListener");
  }

  public removeListeners(props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps> = this.props) {
    this.toggleListener(props, "removeChangeListener");
  }

  public async search(loadAll?: boolean, limit?: number, preventIds?: string[], preventEqualityWithProperties?: string[]) {
    const searchId = (new Date()).getTime();
    this.lastSearchId = searchId;
    this.lastSearchArgumentLoadAll = loadAll;
    this.lastSearchArgumentLimit = limit;
    this.lastSearchArgumentPreventIds = preventIds;
    this.lastSearchArgumentPreventEqualityWithProperties = preventEqualityWithProperties;

    const strToSearchForValue = this.props.state.internalValue || "";
    const [idef, dProp, sProp] = PropertyEntryReference.getSpecialData(this.props);
    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;

    const fields: IGQLRequestFields = {
      id: {},
      DATA: {
        [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {} as any,
      }
    } as IGQLRequestFields;

    const propertySet = this.props.property.getSpecialProperty("referencedFilteringPropertySet") as IReferrencedPropertySet || {};
    if (this.props.referenceFilteringSet) {
      Object.keys(this.props.referenceFilteringSet).forEach((key) => {
        propertySet[key] = {
          exactValue: this.props.referenceFilteringSet[key],
        }
      });
    }

    const args: IGQLArgs = {};

    // first we need the standard form not of our target item definition
    // but rather the one we are currently working within, hence the difference
    let stdSelfIdef = this.props.itemDefinition;
    // if we are in search mode
    if (this.props.itemDefinition.isInSearchMode()) {
      // the standard counterpart needs to be fetched
      stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
    }
    // now we loop into our property set
    Object.keys(propertySet).forEach((pId) => {
      // we try to get the property for the given id from the target
      // item definition as that is what we are setting in the search
      const property = idef.hasPropertyDefinitionFor(pId, true) && idef.getPropertyDefinitionFor(pId, true);
      // now we need the applicable id we will be using for search
      let applicableId: string;
      if (property) {
        // we need then the conversion id for that specific target
        const conversionIds = getConversionIds(property.rawData);
        // now the applicatble id that we will use to search, this is in the target
        // eg. EXACT_username or SEARCH_username
        applicableId = conversionIds[0];
      } else {
        applicableId = pId;
      }

      // now the value we will use will depend on the type of condition we have here
      const valueToUse = propertySet[pId];
      // if it's an exact value we just paste it in the arg
      if (typeof (valueToUse as IPropertyDefinitionExactPropertyValue).exactValue !== "undefined") {
        args[applicableId] = (valueToUse as IPropertyDefinitionExactPropertyValue).exactValue as any;
      } else {
        // otherwise it's a property in our source were we are working in, and our same slot
        // works similarly to media property in those regards
        const referredProperty = (valueToUse as IPropertyDefinitionReferredPropertyValue).property;

        // however we don't know if we are in search mode in our source here were this property belongs
        // so now we need to find what are we setting, while for the target it is always in the standard
        // mode for us we don't know
        let actualPropertyId = referredProperty;
        let actualReferredProperty = stdSelfIdef.getPropertyDefinitionFor(actualPropertyId, true);

        // so we check if we are in search mode
        if (this.props.itemDefinition.isInSearchMode()) {
          // and use a conversion id in such case to exact the current value in the state
          actualPropertyId = getConversionIds(actualReferredProperty.rawData)[0];
          actualReferredProperty = this.props.itemDefinition.getPropertyDefinitionFor(actualPropertyId, true);
        }

        // notice how we use the same slot we are currently in
        args[applicableId] = actualReferredProperty.getCurrentValue(this.props.forId, this.props.forVersion || null) as any;
      }
    });

    if (!loadAll) {
      // now we do this and use the search prop we are searching for and get the conversion
      // id for the search mode and just paste the string there
      args[getConversionIds(sProp.rawData)[0]] = strToSearchForValue;
    }

    const onlyCreatedBySelf = this.props.property.getSpecialProperty("referencedFilterByCreatedBySelf") as boolean;

    // now we can run the search using the traditional mode
    const result = await runSearchQueryFor({
      args,
      fields,
      orderBy: {},
      createdBy: onlyCreatedBySelf ? this.props.tokenData.id : null,
      parentedBy: null,
      cachePolicy: "none",
      token: this.props.tokenData.token,
      itemDefinition: idef.getSearchModeCounterpart(),
      traditional: true,
      offset: 0,
      limit: !loadAll ? 6 : (limit || 50),
      until: null,
      language: this.props.language,
      versionFilter: filterByLanguage ? this.props.language : null,
      waitAndMerge: true,
      since: null,
      enableNulls: false,
    }, null);
    // these nulls which represent the listener are only truly used for the
    // cached searches, we don't use that here

    if (result.error) {
      if (!this.isUnmounted && this.lastSearchId === searchId) {
        this.setState({
          currentSearchError: result.error,
        });
      }
      return;
    }

    // the reason we use the last rather than from the argument is that
    // we might have gotten a refilter we were doing the search
    const actualPreventIds: string[] = (this.lastSearchArgumentPreventIds || []).filter((id) => id !== null);
    if (this.lastSearchArgumentPreventEqualityWithProperties) {
      this.lastSearchArgumentPreventEqualityWithProperties.forEach((p) => {
        const prop = stdSelfIdef.getPropertyDefinitionFor(p, true);
        const value = prop.getCurrentValue(this.props.forId, this.props.forVersion || null);
        if (typeof value === "string") {
          actualPreventIds.push(value);
        } else if (value !== null) {
          console.warn(
            "Attempted to perform a reference property equality with a property of type " +
            typeof value +
            " whose id is " +
            p
          );
        }
      });
    }

    // we get the options and sort alphabetically
    const options: IPropertyEntryReferenceOption[] = result.results.map((r) => (
      {
        text: (r && r.DATA && r.DATA[dProp.getId()]).toString(),
        id: (r && r.id) as string,
      }
    )).sort((a: IPropertyEntryReferenceOption, b: IPropertyEntryReferenceOption) => {
      if (a.text < b.text) { return -1; }
      if (a.text > b.text) { return 1; }
      return 0;
    });

    if (this.lastSearchId === searchId) {
      this.lastCachedSearch = options;
      this.lastCachedSearchPreventedIds = this.lastSearchArgumentPreventIds;
      if (!equals(this.lastCachedSearchPreventedPropertiesIds, this.lastSearchArgumentPreventEqualityWithProperties, { strict: true })) {
        this.lastCachedSearchPreventedProperties &&
          this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
        this.lastCachedSearchPreventedProperties = (this.lastSearchArgumentPreventEqualityWithProperties || []).map((p) => stdSelfIdef.getPropertyDefinitionFor(p, true));
        this.lastCachedSearchPreventedPropertiesIds = this.lastSearchArgumentPreventEqualityWithProperties;
        this.addPreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
      }
    }

    // this can happen if the search is cancelled before the user has finished typing
    // resulting in an unset value that might be in the searchbox at the end
    if (this.props.state.value === null || this.props.state.value === "") {
      const foundInList = options.find((o) => o.text === (this.props.state.internalValue || ""));
      if (foundInList) {
        this.props.onChange(foundInList.id, (this.props.state.internalValue || ""));
      }
    }

    if (!this.isUnmounted && this.lastSearchId === searchId) {
      this.setState({
        currentSearchError: null,
        currentOptions: !actualPreventIds.length ? options : options.filter((v) => !actualPreventIds.includes(v.id)),
        currentOptionsVersion: filterByLanguage ? this.props.language : null,
      });
    }
  }

  public static async getDerivedServerSideStateFromProps(
    props: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>,
    state: IPropertyEntryReferenceState,
  ): Promise<Partial<IPropertyEntryReferenceState>> {
    const id = props.state.value as string;
    if (
      !id
    ) {
      return null;
    }

    const filterByLanguage = props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    const version = filterByLanguage ? props.language : null;

    // we get our special data
    try {
      const [idef, dProp] = PropertyEntryReference.getSpecialData(props);
      const root = idef.getParentModule().getParentRoot();

      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        includes: {},
        properties: [dProp.getId()],
        itemDefinitionInstance: idef,
        forId: id,
        forVersion: version,
      });

      await root.callRequestManager(
        idef,
        id,
        version,
        requestFields,
      );

      const value = dProp.getCurrentValue(id, version);
      return {
        ssrServerOnlyValue: !value ? null : value.toString(),
      }
    } catch {
      // ignore the error and move on
    }
  }

  public getSSRFoundValue(forId: string, forVersion: string): string {
    if (!forId || !this.props.ssr) {
      return null;
    }

    // Only accept ssr based results when we have loaded this fast
    const currentTime = (new Date()).getTime();
    if (currentTime - LOAD_TIME > SSR_GRACE_TIME) {
      return null;
    }

    const [idef, dProp] = PropertyEntryReference.getSpecialData(this.props);
    const match =
      this.props.ssr.queries.find((v) => v.idef === idef.getQualifiedPathName() && v.id === forId && v.version === forVersion);
    if (!match) {
      return null;
    }

    const pMatch = match.value && match.value.DATA && match.value.DATA[dProp.getId()];
    if (!pMatch) {
      return null;
    }

    return pMatch.toString();
  }

  public async findCurrentStrValue(forId: string, forVersion: string) {
    if (
      this.currentlyFindingValueFor &&
      this.currentlyFindingValueFor[0] === forId &&
      this.currentlyFindingValueFor[1] === forVersion
    ) {
      return;
    }

    const ssrValue = this.getSSRFoundValue(forId, forVersion);
    if (ssrValue) {
      this.props.onChange(
        forId,
        ssrValue,
      );
      return;
    }

    const valueInSearchResults = this.state.currentOptionsVersion === forVersion &&
      this.state.currentOptions.find((r) => r.id === forId);

    if (valueInSearchResults) {
      this.props.onChange(
        forId,
        valueInSearchResults.text,
      );
      return;
    }

    this.currentlyFindingValueFor = [forId, forVersion];

    const [idef, dProp] = PropertyEntryReference.getSpecialData(this.props);

    const fields: IGQLRequestFields = {
      DATA: {
        [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {} as any,
      }
    } as IGQLRequestFields;

    const result = await runGetQueryFor({
      args: {},
      fields,
      returnMemoryCachedValues: false,
      returnWorkerCachedValues: false,
      returnWorkerCachedValuesIfNoInternet: true,
      language: this.props.language,
      id: forId,
      version: null,
      cacheStore: false,
      token: this.props.tokenData.token,
      itemDefinition: idef,
    });

    if (result.error) {
      if (!this.isUnmounted) {
        this.setState({
          currentFindError: result.error,
        });
      }
      return;
    }

    this.setState({
      currentFindError: null,
    });

    const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
    if (!pMatch) {
      return;
    }

    this.props.onChange(
      forId,
      pMatch.toString(),
    );
  }

  public loadAllPossibleValues(limit: number, preventIds?: string[], preventEqualityWithProperties?: string[]) {
    this.search(true, limit, preventIds, preventEqualityWithProperties);
  }

  public refilter(id: string, version: string) {
    // we check that the change occured in our own version
    if ((id || null) === (this.props.forId || null) && (version || null) === (this.props.forVersion || null)) {
      this.refilterPossibleValues(this.lastCachedSearchPreventedIds, this.lastCachedSearchPreventedPropertiesIds)
    }
  }

  public refilterPossibleValues(preventIds?: string[], preventEqualityWithProperties?: string[]) {
    this.lastSearchArgumentPreventIds = preventIds;
    this.lastSearchArgumentPreventEqualityWithProperties = preventEqualityWithProperties;

    if (!this.lastCachedSearch) {
      return;
    }

    // first we need the standard form not of our target item definition
    // but rather the one we are currently working within, hence the difference
    let stdSelfIdef = this.props.itemDefinition;
    // if we are in search mode
    if (this.props.itemDefinition.isInSearchMode()) {
      // the standard counterpart needs to be fetched
      stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
    }

    const actualPreventIds: string[] = (preventIds || []).filter((id) => id !== null);
    if (preventEqualityWithProperties) {
      preventEqualityWithProperties.forEach((p) => {
        const prop = stdSelfIdef.getPropertyDefinitionFor(p, true);
        const value = prop.getCurrentValue(this.props.forId, this.props.forVersion || null);
        if (typeof value === "string") {
          actualPreventIds.push(value);
        } else if (value !== null) {
          console.warn(
            "Attempted to perform a reference property equality with a property of type " +
            typeof value +
            " whose id is " +
            p
          );
        }
      });
    }

    this.lastCachedSearchPreventedIds = preventIds;
    if (!equals(this.lastCachedSearchPreventedPropertiesIds, preventEqualityWithProperties, { strict: true })) {
      this.lastCachedSearchPreventedProperties &&
        this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
      this.lastCachedSearchPreventedProperties = (preventEqualityWithProperties || []).map((p) => stdSelfIdef.getPropertyDefinitionFor(p, true));
      this.addPreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
      this.lastCachedSearchPreventedPropertiesIds = preventEqualityWithProperties;
    }

    if (actualPreventIds.length) {
      const newCurrentOptions = this.lastCachedSearch.filter((v) => {
        return !actualPreventIds.includes(v.id);
      });

      if (!equals(this.state.currentOptions, newCurrentOptions, { strict: true })) {
        this.setState({
          currentOptions: newCurrentOptions,
        });
      }
    }
  }

  public onChangeSearch(str: string, preventIds?: string[], preventEqualityWithProperties?: string[]) {
    let value: string = str.trim().length ? "" : null;
    let foundInList = this.state.currentOptions.find((o) => o.text === str);
    if (!foundInList && this.lastCachedSearch) {
      foundInList = this.lastCachedSearch.find((o) => o.text === str);
    }
    if (foundInList) {
      value = foundInList.id;
    }

    this.props.onChange(value, str);
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(
      () => {
        this.search(false, null, preventIds, preventEqualityWithProperties);
      },
      600,
    );
  }

  public onSelect(option: IPropertyEntryReferenceOption) {
    this.props.onChange(option.id, option.text);
  }

  public onCancel() {
    this.setState({
      currentOptions: [],
      currentOptionsVersion: null,
      currentSearchError: null,
    });
    this.lastCachedSearchPreventedIds = null;

    if (this.lastCachedSearchPreventedProperties) {
      this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
    }
    this.lastCachedSearchPreventedProperties = null;
    this.lastCachedSearchPreventedPropertiesIds = null;
  }

  public dismissSearchError() {
    this.setState({
      currentSearchError: null,
    });
  }

  public dismissFindError() {
    this.setState({
      currentFindError: null,
    });
  }

  public componentDidUpdate(
    prevProps: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>,
  ) {
    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    if (
      this.props.state.value &&
      !this.props.state.internalValue &&
      !this.props.state.enforced
    ) {
      this.findCurrentStrValue(
        this.props.state.value as string,
        filterByLanguage ? this.props.language : null,
      );
    } else if (
      filterByLanguage &&
      this.props.state.value &&
      prevProps.language !== this.props.language
    ) {
      this.findCurrentStrValue(
        this.props.state.value as string,
        this.props.language,
      );
    }

    if (this.props.property.getId() !== prevProps.property.getId()) {
      this.removeListeners(prevProps);
      this.addListeners();
    }

    if (prevProps.language !== this.props.language) {
      this.onCancel();
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<string, IPropertyEntryReferenceRendererProps>,
    nextState: IPropertyEntryReferenceState
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState, { strict: true }) ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const i18nUnspecified = this.props.i18n[this.props.language].unspecified;

    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryReferenceRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      isNullable: this.props.property.isNullable(),
      i18nUnspecified,

      currentAppliedValue: this.props.state.stateAppliedValue as any,
      currentValue: this.props.state.value as any,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      currentTextualValue: this.props.state.internalValue || this.getSSRFoundValue(
        this.props.state.value as string,
        filterByLanguage ? this.props.language : null,
      ) || this.state.ssrServerOnlyValue || "",
      currentValueIsFullfilled: !!this.props.state.value,
      currentOptions: this.state.currentOptions,
      currentSearchError: this.state.currentSearchError,
      currentFindError: this.state.currentFindError,
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      onChangeSearch: this.onChangeSearch,
      loadAllPossibleValues: this.loadAllPossibleValues,
      refilterPossibleValues: this.refilterPossibleValues,
      onSelect: this.onSelect,
      onCancel: this.onCancel,
      dismissSearchError: this.dismissSearchError,
      dismissFindError: this.dismissFindError,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
        this.props.disabled :
        this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onRestore: this.props.onRestore,

      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />
  }
}
