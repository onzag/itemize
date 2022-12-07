/**
 * Contains the boolean handler
 * @module
 */

import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryHandlerProps } from ".";
import { IPropertyDefinitionSupportedPaymentType, paymentAllowedStatuses, PaymentStatusType, paymentTypesArr } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import equals from "deep-equal";
import { escapeStringRegexp } from "../../../../util";
import { ICurrencyType, currencies, arrCurrencies } from "../../../../imported-resources";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * Contains the currency i18n data, usually to build
 * a dialog or menu of sorts
 */
interface ICurrencyI18nType {
  /**
   * The title of such structure
   */
  title: string;
}

interface IPaymentAllowedStatus {
  value: PaymentStatusType;
  i18nValue: string;
}

interface IPaymentAllowedType {
  value: string;
  i18nValue: string;
}

/**
 * Props that every boolean renderer is going to get
 */
export interface IPropertyEntryPaymentRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedPaymentType> {
  i18nPayment: {
    type: string;
    status: string;
    metadata: string;
    amount: string;
    currency: string;
    create: string;
    destroy: string;
    pending: string;
    paid: string;
    disputed: string;
    reversed: string;
    inactive: string;
    active: string;
    invoice: string;
    refund: string;
    subscriptionMonthly: string;
    subscriptionDaily: string;
    subscriptionYearly: string;
  };
  currentTextualValueOfAmount: string;
  currency: ICurrencyType;
  currencyFormat: "$N" | "N$";
  currencyAvailable: ICurrencyType[];
  currencyI18n: ICurrencyI18nType;
  onAmountChangeByTextualValue: (newAmount: string) => void;
  onToggleNullStatus: () => void;
  onStatusChange: (newStatus: string) => void;
  onAmountChange: (newAmount: number) => void;
  onCurrencyChange: (newCurrency: string) => void;
  onMetadataChange: (newMetadata: string) => void;
  onTypeChange: (newType: string) => void;
  allowedStatuses: IPaymentAllowedStatus[];
  allowedTypes: IPaymentAllowedType[];
  isAllowedToToggleNullStatus: boolean;
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
  private previouslyStoredValueBeforeTogglingNull: IPropertyDefinitionSupportedPaymentType = null;

  constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedPaymentType, IPropertyEntryPaymentRendererProps>) {
    super(props);

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
    this.onToggleNullStatus = this.onToggleNullStatus.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onMetadataChange = this.onMetadataChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onAmountChangeByTextualValue = this.onAmountChangeByTextualValue.bind(this);

    this.state = {
      showUserSetErrors: false,
    }
  }

  public onToggleNullStatus() {
    if (this.props.state.value === null) {
      const valueToRestoreAgainst: IPropertyDefinitionSupportedPaymentType =
        this.previouslyStoredValueBeforeTogglingNull ||
        this.props.state.stateAppliedValue as any ||
        {
          amount: 0,
          currency: this.props.currency.code,
          status: PaymentStatusType.PENDING,
          type: (this.props.property.getSubtype() as any) || "invoice",
          metadata: null,
          rometadata: null,
        };

      if ((valueToRestoreAgainst as any).type === "subscription") {
        valueToRestoreAgainst.type = "subscription-monthly";
      }

      this.props.onChange(valueToRestoreAgainst, this.props.state.internalValue);
    } else {
      this.previouslyStoredValueBeforeTogglingNull = this.props.state.value as any;

      this.props.onChange(null, this.props.state.internalValue);
    }
  }

  public onAmountChange(newAmount: number) {
    if (this.props.state.value === null) {
      return;
    }

    this.props.onChange({
      ...(this.props.state.value as any),
      amount: newAmount,
    } as any, this.props.state.internalValue);
  }

  public onAmountChangeByTextualValue(newAmount: string) {
    if (this.props.state.value === null) {
      return;
    }

    const escapedNumberSeparator = escapeStringRegexp(
      this.props.i18n[this.props.language].number_decimal_separator,
    );
    const normalizedTextualValueAsString = newAmount.replace(
      new RegExp(escapedNumberSeparator, "g"), ".");

    const numericValue = parseFloat(normalizedTextualValueAsString);

    this.props.onChange({
      ...(this.props.state.value as any),
      amount: (isNaN(numericValue) || isNaN(normalizedTextualValueAsString as any)) ? NaN : numericValue,
    } as any, newAmount);
  }

  public onCurrencyChange(newCurrency: string) {
    if (this.props.state.value === null) {
      return;
    }

    this.props.onChange({
      ...(this.props.state.value as any),
      currency: newCurrency,
    } as any, this.props.state.internalValue);
  }

  public onTypeChange(newType: string) {
    if (this.props.state.value === null) {
      return;
    }

    const typeRef = newType.split("-")[0];
    const validStatuses = paymentAllowedStatuses[typeRef];
    const currentValue: IPropertyDefinitionSupportedPaymentType = this.props.state.value as any;

    let newStatus: any = currentValue.status;
    if (!validStatuses.includes(newStatus)) {
      newStatus = validStatuses[0];
    }

    this.props.onChange({
      ...currentValue,
      type: newType,
      status: newStatus,
    } as any, this.props.state.internalValue);
  }

  public onMetadataChange(newMetadata: string) {
    if (this.props.state.value === null) {
      return;
    }

    this.props.onChange({
      ...(this.props.state.value as any),
      metadata: newMetadata,
    } as any, this.props.state.internalValue);
  }

  public onStatusChange(newStatus: string) {
    if (this.props.state.value === null) {
      return;
    }

    this.props.onChange({
      ...(this.props.state.value as any),
      status: newStatus,
    } as any, this.props.state.internalValue);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedPaymentType, IPropertyEntryPaymentRendererProps>,
    nextState: IPropertyEntryPaymentState,
  ) {
    if (nextProps.property !== this.props.property) {
      this.previouslyStoredValueBeforeTogglingNull = null;
    }

    return nextState.showUserSetErrors !== this.state.showUserSetErrors ||
      nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state, {strict: true}) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
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

    const currentTextualValueOfAmount = this.props.state.value ?
      (
        typeof this.props.state.internalValue === "string" ?
        this.props.state.internalValue :
        (this.props.state.value as IPropertyDefinitionSupportedPaymentType)
          .amount.toString().replace(/\./g, this.props.i18n[this.props.language].number_decimal_separator)
      ) :
      null;

    const currencyAvailable = arrCurrencies;

    const countrySelectedCurrency = this.props.currency.code;
    const currentCurrency = (
      this.props.state.value ?
      (this.props.state.value as IPropertyDefinitionSupportedPaymentType).currency :
      countrySelectedCurrency
    );
    const currencyFormat = this.props.i18n[this.props.language].currency_format;
    const currencyI18n = {
      title: this.props.i18n[this.props.language].currency_dialog_title,
    };
    const currency = currencies[currentCurrency];

    const subtype = this.props.property.getSubtype();

    const allowedTypes = paymentTypesArr.filter((type) => {
      return !subtype || type.startsWith(subtype);
    }).map((type) => {
      return {
        i18nValue: i18nInLanguage.payment[type.replace("-", "_")],
        value: type,
      }
    });

    const validStatuses = this.props.state.value ? paymentAllowedStatuses[(this.props.state.value as any).type] : [];
    const allowedStatuses = validStatuses.map((status: string) => {
      return {
        i18nValue: i18nInLanguage.payment[status],
        value: status,
      }
    });

    // if the current value is null then it's always allowed to prevent non nullable fields
    // from sticking to null and being in an invalid state with no hope to change
    const isAllowedToToggleNullStatus = !this.props.state.value ? true : this.props.property.isNullable();

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryPaymentRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      i18nPayment: {
        type: i18nInLanguage.payment.type,
        status: i18nInLanguage.payment.status,
        amount: i18nInLanguage.payment.amount,
        currency: i18nInLanguage.payment.currency,
        metadata: i18nInLanguage.payment.metadata,
        create: i18nInLanguage.payment.create,
        destroy: i18nInLanguage.payment.destroy,
        pending: i18nInLanguage.payment.pending,
        paid: i18nInLanguage.payment.paid,
        disputed: i18nInLanguage.payment.disputed,
        reversed: i18nInLanguage.payment.reversed,
        active: i18nInLanguage.payment.active,
        inactive: i18nInLanguage.payment.inactive,
        refund: i18nInLanguage.payment.refund,
        invoice: i18nInLanguage.payment.invoice,
        subscriptionMonthly: i18nInLanguage.payment.subscription_monthly,
        subscriptionDaily: i18nInLanguage.payment.subscription_daily,
        subscriptionYearly: i18nInLanguage.payment.subscription_yearly,
      },

      currency,
      currencyFormat,
      currencyI18n,
      currencyAvailable,

      currentAppliedValue: this.props.state.stateAppliedValue as IPropertyDefinitionSupportedPaymentType,
      currentValue: this.props.state.value as IPropertyDefinitionSupportedPaymentType,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentTextualValueOfAmount,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: (this.props.state.value || false) !== (this.props.state.stateAppliedValue || false),

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
        this.props.disabled :
        this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.props.onRestore,
      enableUserSetErrors: this.enableUserSetErrors,
      onAmountChange: this.onAmountChange,
      onAmountChangeByTextualValue: this.onAmountChangeByTextualValue,
      onCurrencyChange: this.onCurrencyChange,
      onMetadataChange: this.onMetadataChange,
      onStatusChange: this.onStatusChange,
      onTypeChange: this.onTypeChange,
      onToggleNullStatus: this.onToggleNullStatus,

      allowedTypes,
      allowedStatuses,
      isAllowedToToggleNullStatus,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
