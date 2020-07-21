import React from "react";
import equals from "deep-equal";
import { IPropertyViewHandlerProps } from ".";
import { EndpointErrorType } from "../../../../base/errors";
import { runGetQueryFor } from "../../../../client/internal/gql-client-util";
import { IGQLRequestFields } from "../../../../gql-querier";
import ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition, { PropertyDefinitionValueType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyViewSimpleRendererProps } from "./PropertyViewSimple";

export interface IPropertyViewReferenceOption {
  id: number;
  text: string;
};

export interface IReferrencedPropertySet {
  [propertyId: string]: PropertyDefinitionValueType;
}

interface IPropertyViewReferenceState {
  currentFindError: EndpointErrorType;
  currentStrValue: string;
}

export default class PropertyViewReference
  extends React.Component<IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>, IPropertyViewReferenceState> {

  private currentlyFindingValueFor: [number, string];

  constructor(props: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>) {
    super(props);

    this.state = {
      currentStrValue: "",
      currentFindError: null,
    };

    this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
  }

  public componentDidMount() {
    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as number;
    const internalValue =
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;

    if (
      value &&
      !internalValue
    ) {
      const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
      this.findCurrentStrValue(
        this.props.state.value as number,
        filterByLanguage ? this.props.language : null,
      );
    }
  }

  public getSpecialData(): [ItemDefinition, PropertyDefinition, PropertyDefinition] {
    const modPath = this.props.property.getSpecialProperty("referencedModule") as string;
    if (!modPath) {
      throw new Error(
        "For usage with references you must specify a referencedModule special property for " + this.props.property.getId()
      );
    }
    const idefPath = this.props.property.getSpecialProperty("referencedItemDefinition") as string;
    if (!idefPath) {
      throw new Error(
        "For usage with references you must specify a referencedItemDefinition special property for " + this.props.property.getId()
      );
    }
    const searchProp = this.props.property.getSpecialProperty("referencedSearchProperty") as string;
    if (!searchProp) {
      throw new Error(
        "For usage with references you must specify a referencedSearchProperty special property for " + this.props.property.getId()
      );
    }
    const displayProp = this.props.property.getSpecialProperty("referencedDisplayProperty") as string;
    if (!displayProp) {
      throw new Error(
        "For usage with references you must specify a referencedDisplayProperty special property for " + this.props.property.getId()
      );
    }


    const root = this.props.property.getParentModule().getParentRoot();
    const mod = root.getModuleFor(modPath.split("/"));
    const idef = mod.getItemDefinitionFor(idefPath.split("/"));
    const dProp = idef.getPropertyDefinitionFor(displayProp, true);
    const sProp = idef.getPropertyDefinitionFor(searchProp, true);

    return [idef, dProp, sProp];
  }

  public getSSRFoundValue(forId: number, forVersion: string): string {
    if (!forId || !this.props.ssr) {
      return null;
    }
    const [idef, dProp] = this.getSpecialData();
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

  public async findCurrentStrValue(forId: number, forVersion: string) {
    if (
      this.currentlyFindingValueFor &&
      this.currentlyFindingValueFor[0] === forId &&
      this.currentlyFindingValueFor[1] === forVersion
    ) {
      return;
    }
    
    const ssrValue = this.getSSRFoundValue(forId, forVersion);
    if (ssrValue) {
      this.setState({
        currentStrValue: ssrValue,
      });
      return;
    }

    this.currentlyFindingValueFor = [forId, forVersion];

    const [idef, dProp] = this.getSpecialData();

    const fields: IGQLRequestFields = {
      DATA: {
        [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {} as any,
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
      token: this.props.token,
      itemDefinition: idef,
    });

    if (result.error) {
      this.setState({
        currentFindError: result.error,
      });
      return;
    }

    this.setState({
      currentFindError: null,
    });

    const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
    if (!pMatch) {
      return;
    }

    this.setState({
      currentStrValue: pMatch.toString(),
    });
  }

  public componentDidUpdate(
    prevProps: IPropertyViewHandlerProps<IPropertyViewSimpleRendererProps>,
  ) {
    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as number;
    const internalValue =
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;
    if (
      value &&
      !internalValue
    ) {
      this.findCurrentStrValue(
        value,
        filterByLanguage ? this.props.language : null,
      );
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
      !equals(this.state, nextState) ||
      this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
      (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
      !!this.props.rtl !== !!nextProps.rtl ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.capitalize !== this.props.capitalize ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    let i18nData: any = null;
    let nullValueLabel: any = null;
    if (this.props.property && this.props.property.hasSpecificValidValues()) {
      i18nData = this.props.property.getI18nDataFor(this.props.language);
      nullValueLabel = this.props.property.isNullable() ?
        i18nData && i18nData.null_value : null;
    }

    const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value) as number;
    const internalValue =
      !this.props.useAppliedValue || (
        this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value
      ) ? this.props.state.internalValue : null;

    const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage") as boolean;
    const currentValue = (value === null || isNaN(value)) ?
      nullValueLabel :
      (
        internalValue ||
        this.state.currentStrValue ||
        this.getSSRFoundValue(
          this.props.state.value as number,
          filterByLanguage ? this.props.language : null,
        ) || ""
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
