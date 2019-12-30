import React from "react";
import {
  DatePicker,
  KeyboardDatePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
  TimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { IPropertyEntryProps } from "../PropertyEntry";
import Moment from "moment";
import { Icon } from "@material-ui/core";
import equals from "deep-equal";
import {
  PropertyDefinitionSupportedDateType,
} from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import { DATETIME_FORMAT, DATE_FORMAT, TIME_FORMAT } from "../../../../constants";
import { getLocalizedDateFormat, getLocalizedTimeFormat, getLocalizedDateTimeFormat } from "../../../../util";

/**
 * Provides the current value of the date given the
 * internal value and the actual json value
 * @param internalValue the internal value, a moment object
 * @param actualValue the actual value, a json string
 */
function getValue(internalValue: any, actualValue: string, type: string) {
  // internal value has priority, that's why it's there
  if (internalValue) {
    return internalValue;
  } else if (actualValue) {
    let dbFormat = DATETIME_FORMAT;
    if (type === "date") {
      dbFormat = DATE_FORMAT;
    } else if (type === "time") {
      dbFormat = TIME_FORMAT;
    }
    return Moment(actualValue, dbFormat);
  }
  return null;
}

interface IPropertyEntryDateTimeState {
  value: any;
}

export default class PropertyEntryDateTime extends
 React.Component<IPropertyEntryProps, IPropertyEntryDateTimeState> {
  constructor(props: IPropertyEntryProps) {
    super(props);

    // The reason we need to keep a date synced in the state is because
    // the datepickers work with objects and they don't play nice each time
    // a new object is created during a change event, we need to create it
    // this way then
    this.state = {
      value: getValue(
        props.state.internalValue,
        props.state.value as PropertyDefinitionSupportedDateType,
        props.property.getType(),
      ),
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryDateTimeState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState) ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n;
  }
  public componentDidUpdate(prevProps: IPropertyEntryProps) {
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
    // get the basic data for datetime
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // invalid reason getting it up
    const invalidReason = this.props.state.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.state.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    // setting up the component
    let component = null;
    const type = this.props.property.getType();
    if (type === "date") {
      // let's extract the locale format from moment for a long date
      const L = getLocalizedDateFormat(true);
      const basicProps = {
        autoOk: true,
        cancelLabel: this.props.i18n[this.props.language].cancel,
        okLabel: this.props.i18n[this.props.language].ok,
        label: i18nLabel,
        placeholder: i18nPlaceholder,
        inputVariant: "filled" as "filled",
        format: L,
        className: this.props.classes.entry,
        fullWidth: true,
        value: this.state.value,
        onChange: this.handleOnChange,
        error: false,
        helperText: null,
        disabled: this.props.state.enforced,
        InputProps: {
          classes: {
            root: this.props.classes.fieldInput,
            focused: "focused",
          },
        },
        InputLabelProps: {
          classes: {
            root: this.props.classes.label,
            focused: "focused",
          },
        },
      };

      if (!(window as any).PHONE_OR_PAD) {
        component = (
          <KeyboardDatePicker
            KeyboardButtonProps={{
              classes: {
                root: this.props.classes.iconButton,
              },
            }}
            {...basicProps}
          />
        );
      } else {
        component = (
          <DatePicker {...basicProps}/>
        );
      }
    } else if (type === "datetime") {
      // let's use the long format with the time format
      const LLT = getLocalizedDateTimeFormat(true);
      const basicProps = {
        autoOk: true,
        ampm: LLT.includes("A"),
        cancelLabel: this.props.i18n[this.props.language].cancel,
        okLabel: this.props.i18n[this.props.language].ok,
        label: i18nLabel,
        placeholder: i18nPlaceholder,
        inputVariant: "filled" as "filled",
        format: LLT,
        className: this.props.classes.entry,
        fullWidth: true,
        value: this.state.value,
        onChange: this.handleOnChange,
        error: false,
        helperText: null,
        disabled: this.props.state.enforced,
        InputProps: {
          classes: {
            root: this.props.classes.fieldInput,
            focused: "focused",
          },
        },
        InputLabelProps: {
          classes: {
            root: this.props.classes.label,
            focused: "focused",
          },
        },
      };

      if (!(window as any).PHONE_OR_PAD) {
        component = (
          <KeyboardDateTimePicker
            KeyboardButtonProps={{
              classes: {
                root: this.props.classes.iconButton,
              },
            }}
            {...basicProps}
          />
        );
      } else {
        component = (
          <DateTimePicker {...basicProps}/>
        );
      }
    } else if (type === "time") {
      // and the time only
      const LT = getLocalizedTimeFormat(true);
      const basicProps = {
        autoOk: true,
        ampm: LT.includes("A"),
        cancelLabel: this.props.i18n[this.props.language].cancel,
        okLabel: this.props.i18n[this.props.language].ok,
        label: i18nLabel,
        placeholder: i18nPlaceholder,
        inputVariant: "filled" as "filled",
        format: LT,
        className: this.props.classes.entry,
        fullWidth: true,
        value: this.state.value,
        onChange: this.handleOnChange,
        error: false,
        helperText: null,
        disabled: this.props.state.enforced,
        InputProps: {
          classes: {
            root: this.props.classes.fieldInput,
            focused: "focused",
          },
        },
        InputLabelProps: {
          classes: {
            root: this.props.classes.label,
            focused: "focused",
          },
        },
      };

      if (!(window as any).PHONE_OR_PAD) {
        component = (
          <KeyboardTimePicker
            KeyboardButtonProps={{
              classes: {
                root: this.props.classes.iconButton,
              },
            }}
            {...basicProps}
          />
        );
      } else {
        component = (
          <TimePicker {...basicProps}/>
        );
      }
    }

    // return it
    return (
      <div className={this.props.classes.container}>
        {i18nDescription ? <div className={this.props.classes.description}>
          <Icon>keyboard_arrow_down</Icon>{i18nDescription}</div> : null}
        {component}
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>
    );
  }
}
