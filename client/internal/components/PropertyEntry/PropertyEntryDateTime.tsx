import React from "react";
import Moment from "moment";
import equals from "deep-equal";
import {
  PropertyDefinitionSupportedDateType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "../../../../constants";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import { getLocalizedDateFormat, getLocalizedTimeFormat, getLocalizedDateTimeFormat } from "../../../../util";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * Provides the current value of the date given the
 * internal value and the actual json value
 * @param internalValue the internal value, a moment object
 * @param actualValue the actual value, a json string
 */
function getValue(isReady: boolean, internalValue: any, actualValue: string, type: string) {
  // internal value has priority, that's why it's there
  if (internalValue) {
    return internalValue;
  } else if (actualValue) {
    if (type === "date") {
      return Moment(actualValue, DATE_FORMAT);
    } else if (type === "time") {
      return Moment(actualValue, TIME_FORMAT);
    } else {
      // must use utc because this runs on first go
      return isReady ? Moment(actualValue, DATETIME_FORMAT) : Moment.utc(actualValue, DATETIME_FORMAT);
    }
  }
  return null;
}

interface IPropertyEntryDateTimeState {
  /**
   * TODO this is done along with onChangeByMoment in order to avoid
   * having invalid dates as they are being set by the renderer here, that's a problem
   * of the renderer not of the handler, this logic should be moved to the renderer
   * and not be here, DO THIS only when necessary
   */
  value: any;
  showUserSetErrors: boolean;
}

export interface IPropertyEntryDateTimeRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedDateType> {
  type: "datetime" | "date" | "time",
  momentValue: any;
  i18nCancel: string;
  i18nOk: string;
  onChangeByMoment: (value: any) => void;
  dateTimeFormat: string;
}

export default class PropertyEntryDateTime extends
 React.Component<
  IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>,
  IPropertyEntryDateTimeState
> {
  constructor(props: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>) {
    super(props);

    // The reason we need to keep a date synced in the state is because
    // the datepickers work with objects and they don't play nice each time
    // a new object is created during a change event, we need to create it
    // this way then
    this.state = {
      value: getValue(
        false,
        props.state.internalValue,
        props.state.value as PropertyDefinitionSupportedDateType,
        props.property.getType(),
      ),
      showUserSetErrors: false,
    };

    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>,
    nextState: IPropertyEntryDateTimeState,
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
  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }
  public componentDidMount() {
    this.setState({
      value: getValue(
        false,
        this.props.state.internalValue,
        this.props.state.value as PropertyDefinitionSupportedDateType,
        this.props.property.getType(),
      ),
    });
  }
  public componentDidUpdate(prevProps: IPropertyEntryHandlerProps<PropertyDefinitionSupportedDateType, IPropertyEntryDateTimeRendererProps>) {
    // if the value is null we update accordingly
    if (this.props.state.value === null) {
      if (this.state.value !== null) {
        this.setState({
          value: null,
        });
      }
      return;
    }

    // otherwise we only update on a valid date and if it's not the same
    // as the one we currently have, this is why it's nice to have a state
    // imagine recieving an invalid date and setting it as the current value
    // it would override everything, certainly there might be other solutions
    // but this one is the simplest by far
    const type = this.props.property.getType();
    let dbFormat = DATETIME_FORMAT;
    if (type === "date") {
      dbFormat = DATE_FORMAT;
    } else if (type === "time") {
      dbFormat = TIME_FORMAT;
    }
    const valueParsed = Moment(this.props.state.value as string, dbFormat);
    if (valueParsed.isValid() && !valueParsed.isSame(this.state.value)) {
      this.setState({
        value: valueParsed,
      });
    }
  }
  public handleOnChange(date: any) {
    // just set the state
    this.setState({
      value: date,
    });

    // do the onchange calls
    if (date === null) {
      return this.props.onChange(null, null);
    }

    if (!date.isValid()) {
      return this.props.onChange("Invalid Date", date);
    }

    const type = this.props.property.getType();
    let format = DATETIME_FORMAT;
    if (type === "date") {
      format = DATE_FORMAT;
    } else if (type === "time") {
      format = TIME_FORMAT;
    }
    this.props.onChange(date.format(format), date);
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
    
    const type = this.props.property.getType() as any;

    let dateTimeFormat: string;
    if (type === "date") {
      dateTimeFormat = getLocalizedDateFormat(this.props.language);
    } else if (type === "time") {
      dateTimeFormat = getLocalizedTimeFormat(this.props.language);
    } else {
      dateTimeFormat = getLocalizedDateTimeFormat(this.props.language);
    }

    const RendererElement = this.props.renderer;
    const rendererArgs = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.itemDefinition.getQualifiedPathName() + "_" + this.props.property.getId() + "_" + this.props.forId + "_" + this.props.forVersion,

      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentAppliedValue: this.props.state.stateAppliedValue as string,
      currentValue: this.props.state.value as string,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,
      canRestore: this.props.state.value !== this.props.state.stateAppliedValue,

      momentValue: this.state.value,
      type,
      dateTimeFormat,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
        this.props.disabled :
        this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      i18nCancel: this.props.i18n[this.props.language].cancel as string,
      i18nOk: this.props.i18n[this.props.language].ok as string,

      onChange: this.props.onChange,
      onChangeByMoment: this.handleOnChange,
      onRestore: this.props.onRestore,
      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs}/>
  }
}
