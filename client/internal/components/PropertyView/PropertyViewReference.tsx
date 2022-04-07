/**
 * Contains the view handler for the reference
 * subtype, aka integer/reference
 * @module
 */

import React from "react";
import equals from "deep-equal";
import { IPropertyViewHandlerProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import { runGetQueryFor } from "../../../../client/internal/gql-client-util";
import { IGQLRequestFields } from "../../../../gql-querier";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * The property view reference state
 */
interface IPropertyViewReferenceState {
  /**
   * A current find error, currently not really being
   * used anywhere as it's not passed
   */
  currentFindError: EndpointErrorType;
  /**
   * Current string value of the current value
   * that is given as the value of the integer
   * or null
   */
  currentStrValue: string;

  ssrServerOnlyValue: string;
}

const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();

/**
 * The property view reference handler, note how unlike most
 * other handlers this handler uses the property view simple renderer
 * in order to render its value
 */
export default class PropertyViewReference
  extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, IPropertyViewReferenceState> {

  private currentlyFindingValueFor: [string, string];

  constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>) {
    super(props);

    /**
     * First we start with this state, note how the current str value is null
     * but despite of that we will be able to retrieve the ssr value if found
     */
    this.state = {
      currentStrValue: "",
      currentFindError: null,
      ssrServerOnlyValue: null,
    };

    // find the current string value
    this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
  }

  public componentDidMount() {
    // first we ge the current value
    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as number;
    // also the internal value, which is assigned by an entry,
    // but the internal value is only relevant if we are not
    // using the applied value 
    const internalValue =
      // so if not applied value or we are using an applied value and that is equal to the current value
      // then we can use our internal value
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;

    // so if we got a value and not an internal value
    // as the internal value will be used otherwise
    if (
      value &&
      !internalValue
    ) {
      // we can call the find function that will set the current str value
      const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
      this.findCurrentStrValue(
        this.props.state.value as string,
        filterByLanguage ? this.props.language : null,
      );
    }
  }

  /**
   * Provides the special data for the reference
   * @returns an array where 0 is the item definition that is target, 1 is the property definition
   * we are using for display
   */
  public static getSpecialData(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>): [ItemDefinition, PropertyDefinition] {
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

    return [idef, dProp];
  }

  /**
   * Provides the SSR found value if any found and if SSR active
   * @param forId for the given id
   * @param forVersion for the given version
   * @returns a string value or null if nothing found
   */
  public getSSRFoundValue(forId: string, forVersion: string): string {
    if (!forId || !this.props.ssr) {
      return null;
    }

    // Only accept ssr based results when we have loaded this fast
    const currentTime = (new Date()).getTime();
    if (currentTime - LOAD_TIME > SSR_GRACE_TIME) {
      return null;
    }

    // we get our special data
    const [idef, dProp] = PropertyViewReference.getSpecialData(this.props);

    // and try to find a match in the queries that do fit our id and version
    const match =
      this.props.ssr.queries.find((v) => v.idef === idef.getQualifiedPathName() && v.id === forId && v.version === forVersion);

    // if no match we return null
    if (!match) {
      return null;
    }

    // we try to find the property value of the display property in the data
    const pMatch = match.value && match.value.DATA && match.value.DATA[dProp.getId()];

    // otherwise null
    if (!pMatch) {
      return null;
    }

    return pMatch.toString();
  }

  public static async getDerivedServerSideStateFromProps(
    props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
    state: IPropertyViewReferenceState,
  ): Promise<Partial<IPropertyViewReferenceState>> {
    const id = props.useAppliedValue ? props.state.stateAppliedValue as string : props.state.value as string;
    if (
      !id
    ) {
      return null;
    }

    const filterByLanguage = props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    const version = filterByLanguage ? props.language : null;

    // we get our special data
    try {
      const [idef, dProp] = PropertyViewReference.getSpecialData(props);
      const root = idef.getParentModule().getParentRoot();
      await root.callRequestManager(idef, id, version);

      const value = dProp.getCurrentValue(id, version);
      return {
        ssrServerOnlyValue: !value ? null : value.toString(),
      }
    } catch {
      // ignore the error and move on
    }
  }

  /**
   * Finds the current string value for the given id and version
   * @param forId 
   * @param forVersion 
   */
  public async findCurrentStrValue(forId: string, forVersion: string) {
    // avoid if currently searching for the same thing
    if (
      this.currentlyFindingValueFor &&
      this.currentlyFindingValueFor[0] === forId &&
      this.currentlyFindingValueFor[1] === forVersion
    ) {
      return;
    }
    
    // try to find it from the SSR
    const ssrValue = this.getSSRFoundValue(forId, forVersion);

    // if there set the state to that
    if (ssrValue) {
      this.setState({
        currentStrValue: ssrValue,
      });
      return;
    }

    // now we are currently finding the value for this
    this.currentlyFindingValueFor = [forId, forVersion];

    // get these
    const [idef, dProp] = PropertyViewReference.getSpecialData(this.props);

    // and let's build the fields we are needing for it
    const fields: IGQLRequestFields = {
      DATA: {
        [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {} as any,
      }
    } as IGQLRequestFields;

    // and now we can run a get query for it
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
      waitAndMerge: true,
    });

    if (
      this.currentlyFindingValueFor &&
      this.currentlyFindingValueFor[0] === forId &&
      this.currentlyFindingValueFor[1] === forVersion
    ) {
      // if there's an error
      if (result.error) {
        this.setState({
          currentFindError: result.error,
        });
        return;
      }

      // otherwise remove an older error
      this.setState({
        currentFindError: null,
      });

      // get the specific property
      const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
      if (!pMatch) {
        return;
      }

      // and set the state to that
      this.setState({
        currentStrValue: pMatch.toString(),
      });

      this.currentlyFindingValueFor = null;
    }
  }

  public componentDidUpdate(
    prevProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
  ) {
    // we need to know if we are filtering by language
    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    // the current value we have
    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as string;
    const oldValue = (prevProps.useAppliedValue ? prevProps.state.stateAppliedValue : prevProps.state.value) as string;
    // and equally there might be an internal value already set by an entry which represents the value
    // for this thing, if there's one, let's use that value rather than anything else
    const internalValue =
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;

    // if there's a value and there's no internal value
    if (
      value &&
      !internalValue &&
      oldValue !== value
    ) {
      // then we attempt to find
      this.findCurrentStrValue(
        value,
        filterByLanguage ? this.props.language : null,
      );

    // we will also do the same thing, if the language
    // changes
    } else if (
      filterByLanguage &&
      value &&
      prevProps.language !== this.props.language
    ) {
      this.findCurrentStrValue(
        value,
        this.props.language,
      );
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
    nextState: IPropertyViewReferenceState
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState, { strict: true }) ||
      this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      !!this.props.rtl !== !!nextProps.rtl ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.capitalize !== this.props.capitalize ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    let i18nData: any = null;
    let nullValueLabel: any = null;
    if (this.props.property && this.props.property.hasSpecificValidValues()) {
      i18nData = this.props.property.getI18nDataFor(this.props.language);
      nullValueLabel = this.props.property.isNullable() ?
        i18nData && i18nData.null_value : null;
    }

    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as string;
    const internalValue =
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;

    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    const currentValue = (value === null || value === "") ?
      nullValueLabel :
      (
        internalValue ||
        this.state.currentStrValue ||
        this.getSSRFoundValue(
          this.props.useAppliedValue ? this.props.state.stateAppliedValue as string : this.props.state.value as string,
          filterByLanguage ? this.props.language : null,
        ) || this.state.ssrServerOnlyValue || ""
      );

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewSimpleRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      language: this.props.language,
      currentValue,
      capitalize: !!this.props.capitalize,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
