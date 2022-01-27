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
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import QueueIcon from "@mui/icons-material/Queue";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";


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
export const style = createStyles({
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
  label: (props: IPropertyEntryPaymentRendererProps) => ({
    color: shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
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
});

const cheapCamelCase = {
  "subscription-monthly": "subscriptionMonthly",
  "subscription-daily": "subscriptionDaily",
  "subscription-yearly": "subscriptionYearly",
}

/**
 * The renderer props, based on the properties it will take
 */
interface IPropertyEntryPaymentRendererWithStylesProps extends IPropertyEntryPaymentRendererProps, WithStyles<typeof style> {
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
const PropertyEntryPaymentRenderer = withStyles(style)((props: IPropertyEntryPaymentRendererWithStylesProps) => {
  const descriptionAsAlert = props.args["descriptionAsAlert"];
  const onlyStatus = props.args["onlyStatus"];

  let icon: React.ReactNode = null;
  if (props.canRestore) {
    if (props.currentAppliedValue !== null) {
      icon = <RestoreIcon />
    }
  } else if (props.icon) {
    icon = props.icon;
  }

  const iconComponent = icon ? (
    <IconButton
      tabIndex={-1}
      className={props.classes.icon}
      onClick={props.canRestore ? props.onRestore : null}
      size="large">
      {icon}
    </IconButton>
  ) : null;

  let shouldShowToggleNull = props.isAllowedToToggleNullStatus;
  if (props.currentValue !== null && props.args.denyNull) {
    shouldShowToggleNull = false;
  }

  const secondIconComponent = shouldShowToggleNull ? (
    <IconButton
      onClick={props.onToggleNullStatus}
      className={props.classes.icon}
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

  let internalContent: React.ReactNode = null;
  if (props.currentValue !== null) {
    const typePaymentSelector = props.allowedTypes.length !== 1 ? (
      <PropertyEntrySelectRenderer
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
        args={{}}
        label={props.i18nPayment.type}
        icon={null}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        onChange={props.onTypeChange}
        enableUserSetErrors={props.enableUserSetErrors}
        onRestore={props.onRestore}
        nullValue={null}
        isNullable={false}
        isNumeric={false}
        isList={false}
      />
    ) : null;

    const statusPaymentSelector = props.allowedStatuses.length ? (
      <PropertyEntrySelectRenderer
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
        args={{}}
        label={props.i18nPayment.status}
        icon={null}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        onChange={props.onStatusChange}
        enableUserSetErrors={props.enableUserSetErrors}
        onRestore={props.onRestore}
        nullValue={null}
        isNullable={false}
        isNumeric={false}
        isList={false}
      />
    ) : null;

    const amountEntry = (
      <PropertyEntryFieldRenderer
        label={props.i18nPayment.amount}
        placeholder={props.i18nPayment.amount}
        args={{}}
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
      />
    );

    internalContent = (
      <>
        {typePaymentSelector}
        {statusPaymentSelector}
        {amountEntry}
      </>
    );
  }

  return (
    <div className={props.classes.container}>
      {
        props.description && descriptionAsAlert ?
          <Alert severity="info" className={props.classes.description}>
            {props.description}
          </Alert> :
          null
      }
      {
        props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={props.classes.description}>
            {props.description}
          </Typography> :
          null
      }
      <div>
        {props.label ? <div
          className={props.classes.label}
        >
          {secondIconComponent}
          {capitalize(props.label)}
          {iconComponent}
        </div> : null}
        {internalContent}
      </div>
      <div className={props.classes.errorMessage}>
        {props.currentInvalidReason}
      </div>
    </div>
  );
});

export default PropertyEntryPaymentRenderer;
