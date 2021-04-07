/**
 * Contains the boolean handler
 * @module
 */

import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { IPropertyDefinitionSupportedPaymentType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import equals from "deep-equal";

/**
 * Props that every boolean renderer is going to get
 */
export interface IPropertyEntryPaymentRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedPaymentType> {
  i18nPayment: {
    open: string;
    paid: string;
    disputed: string;
    refunded: string;
    inactive: string;
    active: string;
    invoice: string;
    refund: string;
    subscriptionMonthly: string;
    subscriptionDaily: string;
    subscriptionYearly: string;
  }
}

interface IPropertyEntryPaymentState {
  showUserSetErrors: boolean;
}

/**
 * The property entry boolean handler
 */
export default class PropertyEntryPayment extends React.Component<
  IPropertyEntryHandlerProps<IPropertyDefinitionSupportedPaymentType, IPropertyEntryPaymentRendererProps>,
  IPropertyEntryPaymentState
> {
  constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedPaymentType, IPropertyEntryPaymentRendererProps>) {
    super(props);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedPaymentType, IPropertyEntryPaymentRendererProps>,
    nextState: IPropertyEntryPaymentState,
  ) {
    return nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    const i18nInLanguage = this.props.i18n[this.props.language];

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

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryPaymentRendererProps = {
      propertyId: this.props.property.getId(),
  
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      i18nPayment: {
        open: i18nInLanguage.payment.open,
        paid: i18nInLanguage.payment.paid,
        disputed: i18nInLanguage.payment.disputed,
        refunded: i18nInLanguage.payment.refunded,
        active: i18nInLanguage.payment.active,
        inactive: i18nInLanguage.payment.inactive,
        refund: i18nInLanguage.payment.refund,
        invoice: i18nInLanguage.payment.invoice,
        subscriptionMonthly: i18nInLanguage.payment.monthly,
        subscriptionDaily: i18nInLanguage.payment.subscription_daily,
        subscriptionYearly: i18nInLanguage.payment.subscription_yearly,
      },

      currentAppliedValue: this.props.state.stateAppliedValue as IPropertyDefinitionSupportedPaymentType,
      currentValue: this.props.state.value as IPropertyDefinitionSupportedPaymentType,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: (this.props.state.value || false) !== (this.props.state.stateAppliedValue || false),

      disabled: this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
