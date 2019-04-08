import React from "react";
import { DatePicker, DateTimePicker, TimePicker } from "material-ui-pickers";
import { IPropertyEntryProps, getClassName } from ".";
import { PropertyDefinitionSupportedDateType } from "../../../../../base/ItemDefinition/PropertyDefinition";
import Moment from "moment";
import { Icon } from "@material-ui/core";

/**
 * Provides the current value of the date given the
 * internal value and the actual json value
 * @param internalValue the internal value, a moment object
 * @param actualValue the actual value, a json string
 */
function getCurrentValue(internalValue: any, actualValue: string) {
  // internal value has priority, that's why it's there
  if (internalValue) {
    return internalValue;
  } else if (actualValue) {
    return Moment(actualValue);
  }
  return null;
}

/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 */
function getActualFormat(value: string) {
  // Since we cannot have a mask that uses only one H
  // we need to return it with two, same for the second
  // we canot have a one or two digits situation
  if (value === "H:mm") {
    return "HH:mm";
  } else if (value === "h:mm A") {
    return "hh:mm A";
  }

  // any other value is tipically allowed
  return value;
}

/**
 * Given a value provides a mask
 * @param value the value string
 */
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

    // The reason we need to keep a date synced in the state is because
    // the datepickers work with objects and they don't play nice each time
    // a new object is created during a change event, we need to create it
    // this way then
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
    // active the bugfix for the material refresh
    // locale doesn't update properly unless you unmount
    // and remount the child components
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

    // if the value is null we update accordingly
    if (this.props.value.value === null) {
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
    const valueParsed = Moment(new Date(this.props.value.value as string));
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
    this.props.onChange(date.toDate().toJSON(), date);
  }
  public handleOnInput(format: string, e: React.ChangeEvent<HTMLInputElement>) {
    // this is for typing, we get the string value
    const stringValue = e.target.value.toUpperCase();

    // if there is none
    if (!stringValue) {
      // call it as null
      this.props.onChange(null, null);
      return;
    }

    // parse the value and format it, moment tries to be smart
    // and parse invalid dates but we don't wanna do that
    const value = Moment(stringValue, format);
    const formatted = value.format(format);
    if (stringValue !== formatted) {
      // we send invalid date if we see a mismatch
      this.props.onChange("Invalid Date", value);
      return;
    }

    // we set up the change event
    this.props.onChange(value.toDate().toJSON(), value);
  }
  public getMaskFrom(format: string, value: any) {
    // basically provides the mask
    return value ? getMaskFromFormat(format) : [];
  }
  public render() {
    // get the basic data for datetime
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "date-time", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // invalid reason getting it up
    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    // setting up the component
    let component = null;
    const type = this.props.property.getType();
    if (this.state._materialUIBugRefresh) {
      // the buggy refresh
      component = null;
    } else if (type === "date") {
      // let's extract the locale format from moment for a long date
      const L = getActualFormat((Moment.localeData() as any)._longDateFormat.L);
      // create the component
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
              root: "property-entry-input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry-label",
              focused: "focused",
            },
          }}
        />
      );
    } else if (type === "datetime") {
      // let's use the long format with the time format
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
              root: "property-entry-input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry-label",
              focused: "focused",
            },
          }}
        />
      );
    } else if (type === "time") {
      // and the time only
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
              root: "property-entry-input",
              focused: "focused",
            },
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry-label",
              focused: "focused",
            },
          }}
          keyboardIcon={<Icon>access_time</Icon>}
        />
      );
    }

    // return it
    return (
      <div className="property-entry-container">
        {component}
        <div className="property-entry-error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}
