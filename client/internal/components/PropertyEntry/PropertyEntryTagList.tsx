/**
 * Contains the TagList handler
 * @module
 */

import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { PropertyDefinitionSupportedTagListType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/taglist";
import equals from "deep-equal";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * Props that every TagList renderer is going to get
 */
export interface IPropertyEntryTagListRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedTagListType> {

}

interface IPropertyEntryTagListState {
  showUserSetErrors: boolean;
}

/**
 * The property entry TagList handler
 */
export default class PropertyEntryTagList extends React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedTagListType, IPropertyEntryTagListRendererProps>,
  IPropertyEntryTagListState
> {
  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedTagListType, IPropertyEntryTagListRendererProps>) {
    super(props);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedTagListType, IPropertyEntryTagListRendererProps>,
    nextState: IPropertyEntryTagListState,
  ) {
    return nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      this.props.forceInvalid !== nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      this.props.hidePlaceholder !== nextProps.hidePlaceholder ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      this.props.useAppliedValue !== nextProps.useAppliedValue ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.hidePlaceholder ? null : (this.props.altPlaceholder || (i18nData && i18nData.placeholder));

    const invalidReason = typeof this.props.forceInvalid === "string" ? this.props.forceInvalid : this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      (isCurrentlyShownAsInvalid || this.props.forceInvalid) && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryTagListRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      currentAppliedValue: this.props.state.stateAppliedValue as PropertyDefinitionSupportedTagListType,
      currentValue: this.props.useAppliedValue ?
        this.props.state.stateAppliedValue as PropertyDefinitionSupportedTagListType :
        this.props.state.value as PropertyDefinitionSupportedTagListType,
      currentValid: this.props.useAppliedValue && !this.props.forceInvalid ? false : !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: this.props.useAppliedValue ? null : i18nInvalidReason,
      currentInternalValue: this.props.useAppliedValue ? null : this.props.state.internalValue,
      canRestore: this.props.useAppliedValue ? false : ((this.props.state.value || false) !== (this.props.state.stateAppliedValue || false)),

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
          this.props.disabled :
          this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
