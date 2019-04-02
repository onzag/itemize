import React from "react";
import { DatePicker, DateTimePicker, TimePicker } from "material-ui-pickers";
import { IPropertyEntryProps, getClassName } from ".";
import { PropertyDefinitionSupportedDateType } from "../../../../../base/ItemDefinition/PropertyDefinition";
import Moment from "moment";
import { Icon } from "@material-ui/core";

function getCurrentValue(internalValue: Date, actualValue: string) {
  if (internalValue) {
    return internalValue;
  } else if (actualValue) {
    return Moment(actualValue);
  }
  return null;
}

function getActualFormat(value: string) {
  if (value === "H:mm") {
    // return "hh:mm A";
    return "HH:mm";
  } else if (value === "h:mm A") {
    return "hh:mm A";
  }
  return value;
}

function getMaskFromFormat(value: string) {
  const result = [];
  value.split("").forEach((char) => {
    switch (char) {
      case "M":
      case "D":
      case "Y":
      case "H":
      case "h":
      case "m":
        result.push(/\d/);
        break;
      case "A":
        result.push(/a|p/i);
        result.push(/m/i);
        break;
      default:
        result.push(char);
        break;
    }
  });
  return result;
}

interface IPropertyEntryDateTimeState {
  value: any;
  _materialUIBugRefresh: boolean;
}

export default class PropertyEntryDateTime extends React.Component<IPropertyEntryProps, IPropertyEntryDateTimeState> {
  constructor(props: IPropertyEntryProps) {
    super(props);

    // I have to do this because the input for the date pickers
    // are the weirdest things ever and sometimes trigger on change
    // sometimes not
    this.state = {
      value: getCurrentValue(
        props.value.internalValue,
        props.value.value as PropertyDefinitionSupportedDateType,
      ),

      _materialUIBugRefresh: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.getMaskFrom = this.getMaskFrom.bind(this);
  }
  public componentDidUpdate(prevProps: IPropertyEntryProps) {
    if (this.props.value.value === null) {
      if (this.state.value !== null) {
        this.setState({
          value: null,
        });
      }
      return;
    }

    const valueParsed = Moment(new Date(this.props.value.value as string));
    if (valueParsed.isValid() && !valueParsed.isSame(this.state.value)) {
      this.setState({
        value: valueParsed,
      });
    }

    if (
      prevProps.language !== this.props.language
    ) {
      this.setState({
        _materialUIBugRefresh: true,
      });

      setTimeout(() => {
        this.setState({
          _materialUIBugRefresh: false,
        });
      }, 30);
    }
  }
  public handleOnChange(date: any) {
    this.setState({
      value: date,
    });
    if (date === null) {
      return this.props.onChange(null, null);
    }
    this.props.onChange(date.toDate().toJSON(), date);
  }
  public handleOnInput(format: string, e: React.ChangeEvent<HTMLInputElement>) {
    const stringValue = e.target.value.toUpperCase();
    if (!stringValue) {
      this.props.onChange(null, null);
      return;
    }

    const value = Moment(stringValue, format);
    const formatted = value.format(format);
    if (stringValue !== formatted) {
      this.props.onChange("Invalid Date", value);
      return;
    }

    this.props.onChange(value.toDate().toJSON(), value);
  }
  public getMaskFrom(format: string, value: any) {
    return value ? getMaskFromFormat(format) : [];
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "date-time", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    let component = null;
    const type = this.props.property.getType();
    if (this.state._materialUIBugRefresh) {
      component = null;
    } else if (type === "date") {
      const L = getActualFormat((Moment.localeData() as any)._longDateFormat.L);
      component = (
        <DatePicker
          keyboard={!(window as any).PHONE_OR_PAD}
          autoOk={true}
          cancelLabel={this.props.i18n.cancel}
          okLabel={this.props.i18n.ok}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          variant="filled"
          format={L}
          className={className}
          fullWidth={true}
          value={this.state.value}
          mask={this.getMaskFrom.bind(this, L)}
          onChange={this.handleOnChange}
          onInputChange={this.handleOnInput.bind(this, L)}
          error={false}
          helperText={null}
          InputProps={{
            classes: {
              root: "property-entry--input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry--label",
              focused: "focused",
            },
          }}
        />
      );
    } else if (type === "datetime") {
      const LLT = getActualFormat((Moment.localeData() as any)._longDateFormat.L) + " " +
        getActualFormat((Moment.localeData() as any)._longDateFormat.LT);
      component = (
        <DateTimePicker
          keyboard={!(window as any).PHONE_OR_PAD}
          autoOk={true}
          ampm={LLT.includes("A")}
          cancelLabel={this.props.i18n.cancel}
          okLabel={this.props.i18n.ok}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          variant="filled"
          format={LLT}
          className={className}
          fullWidth={true}
          value={this.state.value}
          mask={this.getMaskFrom.bind(this, LLT)}
          onChange={this.handleOnChange}
          onInputChange={this.handleOnInput.bind(this, LLT)}
          error={false}
          helperText={null}
          InputProps={{
            classes: {
              root: "property-entry--input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry--label",
              focused: "focused",
            },
          }}
        />
      );
    } else if (type === "time") {
      const LT = getActualFormat((Moment.localeData() as any)._longDateFormat.LT);
      component = (
        <TimePicker
          keyboard={!(window as any).PHONE_OR_PAD}
          autoOk={true}
          ampm={LT.includes("A")}
          cancelLabel={this.props.i18n.cancel}
          okLabel={this.props.i18n.ok}
          label={i18nLabel}
          placeholder={i18nPlaceholder}
          variant="filled"
          format={LT}
          className={className}
          fullWidth={true}
          value={this.state.value}
          mask={this.getMaskFrom.bind(this, LT)}
          onChange={this.handleOnChange}
          onInputChange={this.handleOnInput.bind(this, LT)}
          error={false}
          helperText={null}
          InputProps={{
            classes: {
              root: "property-entry--input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry--label",
              focused: "focused",
            },
          }}
          keyboardIcon={<Icon>access_time</Icon>}
        />
      );
    }
    return (
      <div className="property-entry--container">
        {component}
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}
