import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  PropertyDefinitionSupportedStringType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, FilledInput } from "@material-ui/core";
import uuid from "uuid";

interface IPropertyEntryStringState {
  internalStateValue: PropertyDefinitionSupportedStringType;
  uuid: string;
}

export default class PropertyEntryString
  extends React.Component<IPropertyEntryProps, IPropertyEntryStringState> {
  public static getDerivedStateFromProps(
    props: IPropertyEntryProps,
  ): Partial<IPropertyEntryStringState> {
    return {
      internalStateValue: props.value.value as
        PropertyDefinitionSupportedStringType || "",
    };
  }
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.state = {
      internalStateValue: "",
      uuid: "uuid-" + uuid.v4(),
    };

    this.onChange = this.onChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryStringState,
  ) {
    // We are checking every value by hand in the nextProps value
    // because the value is in the internal state value now
    // so a change in the props value shouldn't make of an update
    return nextProps.property !== this.props.property ||
      this.state.internalStateValue !== nextState.internalStateValue ||
      nextProps.value.default !== this.props.value.default ||
      nextProps.value.enforced !== this.props.value.enforced ||
      nextProps.value.hidden !== this.props.value.hidden ||
      nextProps.value.userSet !== this.props.value.userSet ||
      nextProps.value.valid !== this.props.value.valid ||
      nextProps.locale !== this.props.locale;
  }
  public onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    // TODO do something about nullable default, either here or
    // in the base
    // apparently nullable default is implemented
    this.props.onChange(e.target.value);
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const className = getClassName(this.props, "string");

    if (this.props.property.hasSpecificValidValues()) {
      this.renderSelectTextField(className, i18nData);
    }

    return this.renderBasicTextField(className, i18nData);
  }

  public renderSelectTextField(className: string, i18nData: any) {
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;
    const nullValueLabel = i18nData && i18nData.nullValue;

    return (
      <FormControl variant="filled" className={className}>
        <InputLabel
          htmlFor={this.state.uuid}
          classes={{
            root: "property-field--label",
            focused: "focused",
          }}
        >
          {i18nLabel}
        </InputLabel>
        <Select
          value={this.state.internalStateValue}
          onChange={this.onChange}
          input={
            <FilledInput
              id={this.state.uuid}
              placeholder={i18nPlaceholder}
              classes={{
                root: "property-field--input",
                focused: "focused",
              }}
            />
          }
        >
          <MenuItem value="">
            <em>{nullValueLabel}</em>
          </MenuItem>
          {
            this.props.property.getSpecificValidValues().map((vv) => {
              const valueName = i18nData && i18nData.values[vv.toString()];
              return <MenuItem key={vv.toString()} value={vv.toString()}>{
                valueName
              }</MenuItem>;
            })
          }
        </Select>
      </FormControl>
    );
  }

  public renderBasicTextField(className: string, i18nData: any) {
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    return (
      <TextField
        className={className}
        label={i18nLabel}
        placeholder={i18nPlaceholder}
        type="text"
        value={this.state.internalStateValue}
        onChange={this.onChange}
        InputProps={{
          classes: {
            root: "property-field--input",
            focused: "focused",
          },
          id: this.state.uuid,
        }}
        InputLabelProps={{
          classes: {
            root: "property-field--label",
            focused: "focused",
          },
        }}
        disabled={this.props.value.enforced}
        variant="filled"
      />
    );
  }
}
