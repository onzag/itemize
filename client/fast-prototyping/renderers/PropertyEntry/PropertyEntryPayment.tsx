/**
 * The property entry boolean fast prototyping renderer uses material ui to render
 * an entry for a boolean value
 * 
 * @module
 */

import { IPropertyEntryPaymentRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryPayment";
import React from "react";
import { capitalize } from "../../../components/localization";
import PropertyEntrySelectRenderer from "./PropertyEntrySelect";
import PropertyEntryFieldRenderer from "./PropertyEntryField";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import QueueIcon from "@mui/icons-material/Queue";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryPaymentRendererProps) {
  return !props.currentValid;
}

/**
 * The styles of the renderer
 */
export const style = {
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
    paddingBottom: "1.3rem",
  },
  description: {
    width: "100%",
  },
  icon: {
    color: "#424242",
  },
  label: (isInvalid: boolean) => ({
    color: isInvalid ? "#f44336" : "rgb(66, 66, 66)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
};

const cheapCamelCase = {
  "subscription-monthly": "subscriptionMonthly",
  "subscription-daily": "subscriptionDaily",
  "subscription-yearly": "subscriptionYearly",
}


/**
 * This is the fast prototyping boolean renderer and uses material ui in order to render a slick
 * boolean entry for it, supports the following args
 * 
 * - descriptionAsAlert: displays the description as an alert rather than its normal form
 * 
 * @param props the entry boolean props
 * @returns a react element
 */
function PropertyEntryPaymentRenderer(props: IPropertyEntryPaymentRendererProps) {
  const descriptionAsAlert = props.args["descriptionAsAlert"];
  const onlyStatus = props.args["onlyStatus"];

  let icon: React.ReactNode = null;
  if (props.canRestore && props.args.disableRestore) {
    if (props.currentAppliedValue !== null) {
      icon = <RestoreIcon />
    }
  } else if (props.args.icon) {
    icon = props.args.icon;
  }

  const iconComponent = icon ? (
    <RestoreIconButton
      sx={style.icon}
      onClick={props.canRestore && props.args.disableRestore ? props.onRestore : null}
    >
      {icon}
    </RestoreIconButton>
  ) : null;

  let shouldShowToggleNull = props.isAllowedToToggleNullStatus;
  if (props.currentValue !== null && props.args.denyNull) {
    shouldShowToggleNull = false;
  }

  const isInvalid = shouldShowInvalid(props);

  const secondIconComponent = shouldShowToggleNull ? (
    <IconButton
      onClick={props.onToggleNullStatus}
      sx={style.icon}
      tabIndex={-1}
      aria-label={
        props.currentValue === null ?
          props.i18nPayment.create :
          props.i18nPayment.destroy
      }
      title={
        props.currentValue === null ?
          props.i18nPayment.create :
          props.i18nPayment.destroy
      }
      size="large">
      {
        props.currentValue === null ?
          (
            <QueueIcon />
          ) :
          (
            <HighlightOffIcon />
          )
      }
    </IconButton>
  ) : null;

  let fieldComponent: React.ReactNode = null;

  if (props.currentValue !== null) {
    const typePaymentSelector = props.allowedTypes.length !== 1 && !props.args.noType ? (
      <PropertyEntrySelectRenderer
        uniqueId={props.uniqueId + "_type"}
        values={props.allowedTypes}
        canRestore={false}
        currentAppliedValue={props.currentAppliedValue && props.currentAppliedValue.type}
        currentI18nValue={props.currentValue && props.i18nPayment[cheapCamelCase[props.currentValue.type] || props.currentValue.type]}
        currentValid={props.currentValid}
        currentValue={props.currentValue && props.currentValue.type}
        currentInternalValue={props.currentValue && props.currentValue.type}
        currentInvalidReason={null}
        rtl={props.rtl}
        propertyId={props.propertyId + "-type"}
        placeholder={props.i18nPayment.type}
        args={{
          InputProps: props.args.InputPropsType,
          fieldVariant: props.args.fieldVariantType,
        }}
        label={props.i18nPayment.type}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        onChange={props.onTypeChange}
        enableUserSetErrors={props.enableUserSetErrors}
        onRestore={props.onRestore}
        nullValue={null}
        isNullable={false}
        isNumeric={false}
        isList={false}
        language={props.language}
        languageOverride={props.languageOverride}
      />
    ) : null;

    const statusPaymentSelector = props.allowedStatuses.length && !props.args.noStatus ? (
      <PropertyEntrySelectRenderer
        uniqueId={props.uniqueId + "_status"}
        values={props.allowedStatuses}
        canRestore={false}
        currentAppliedValue={props.currentAppliedValue && props.currentAppliedValue.status}
        currentI18nValue={props.currentValue && props.i18nPayment[cheapCamelCase[props.currentValue.status] || props.currentValue.status]}
        currentValid={props.currentValid}
        currentValue={props.currentValue && props.currentValue.status}
        currentInternalValue={props.currentValue && props.currentValue.status}
        currentInvalidReason={null}
        rtl={props.rtl}
        propertyId={props.propertyId + "-status"}
        placeholder={props.i18nPayment.status}
        args={{
          InputProps: props.args.InputPropsStatus,
          fieldVariant: props.args.fieldVariantStatus,
        }}
        label={props.i18nPayment.status}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        onChange={props.onStatusChange}
        enableUserSetErrors={props.enableUserSetErrors}
        onRestore={props.onRestore}
        nullValue={null}
        isNullable={false}
        isNumeric={false}
        isList={false}
        language={props.language}
        languageOverride={props.languageOverride}
      />
    ) : null;

    const amountEntry = !props.args.noAmount ? (
      <PropertyEntryFieldRenderer
        currentValueLang={null}
        onChangeTextLanguage={() => null as any}
        uniqueId={props.uniqueId + "_amount"}
        label={props.i18nPayment.amount}
        placeholder={props.i18nPayment.amount}
        args={{
          InputProps: props.args.InputPropsAmount,
          fieldVariant: props.args.fieldVariantAmount,
        }}
        autoFocus={props.autoFocus}
        canRestore={false}
        currentAppliedValue={props.currentAppliedValue && {
          value: props.currentAppliedValue.amount,
          currency: props.currentAppliedValue.currency,
        }}
        currentTextualValue={props.currentTextualValueOfAmount}
        currentValid={props.currentValid}
        currentValue={props.currentValue && {
          value: props.currentValue.amount,
          currency: props.currentValue.currency,
        }}
        disabled={props.disabled}
        enableUserSetErrors={props.enableUserSetErrors}
        isNumericType={true}
        onChange={props.onAmountChange}
        onChangeByTextualValue={props.onAmountChangeByTextualValue}
        onRestore={null}
        propertyId={props.propertyId + "-amount"}
        rtl={props.rtl}
        type="currency"
        currency={props.currency}
        currencyAvailable={props.currencyAvailable}
        currencyFormat={props.currencyFormat}
        currencyI18n={props.currencyI18n}
        onChangeCurrency={props.onCurrencyChange}
        language={props.language}
        languageOverride={props.languageOverride}
      />
    ) : null;

    fieldComponent = props.args.useCustomInternalFieldRender ?
      props.args.useCustomInternalFieldRender(typePaymentSelector, statusPaymentSelector, amountEntry) :
      (
        <>
          {typePaymentSelector}
          {statusPaymentSelector}
          {amountEntry}
        </>
      );
  }

  const labelComponent = (
    props.label ? <Box
      sx={style.label(isInvalid)}
    >
      {secondIconComponent}
      {capitalize(props.label)}
      {iconComponent}
    </Box> : null
  );

  let descriptionObject: React.ReactNode = null;
  if (props.description) {
    descriptionObject = descriptionAsAlert ? (
      <Alert severity="info" sx={style.description} role="note" id={props.uniqueId + "_desc"}>
        {props.description}
      </Alert>
    ) : (
      <Typography variant="caption" sx={style.description} id={props.uniqueId + "_desc"}>
        {props.description}
      </Typography>
    );
  }

  const error = props.args.hideError ? null : <Box sx={style.errorMessage} id={props.uniqueId + "_error"} role="alert">
    {props.currentInvalidReason}
  </Box>;

  let inner: React.ReactNode;
  if (props.args.useCustomFieldRender) {
    inner = props.args.useCustomFieldRender(descriptionObject, labelComponent, fieldComponent, error, props.disabled);
  } else {
    inner = (
      <>
        {descriptionObject}
        <div>
          {labelComponent}
          {fieldComponent}
        </div>
        {error}
      </>
    )
  }

  return (
    <Box sx={style.container}>
      {inner}
    </Box>
  );
};

export default PropertyEntryPaymentRenderer;
