/**
 * Contains the select entry field renderer for fast prototyping
 * 
 * The select entry field renderer is used for types, number, integer and string when
 * they have defined values
 * 
 * @module
 */

import React from "react";
import {
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  FilledInput,
  Divider,
  WithStyles,
  withStyles,
  createStyles,
  Alert,
  RestoreIcon,
  Chip,
} from "../../mui-core";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntrySelectRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the select
 */
export const style = createStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
  icon: {
    color: "#424242",
  },
  label: (props: IPropertyEntrySelectRendererProps) => ({
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
    },
  }),
  fieldInput: (props: IPropertyEntrySelectRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: "#e57373",
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: "#f44336",
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? "rgba(0,0,0,0.42)" : "#f44336",
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: "rgba(0,0,0,0.42)",
      },
      "&::after": {
        borderBottomColor: "#3f51b5",
      },
      "&:hover::before": {
        borderBottomColor: "#3f51b5",
      },
    };
  },
  selectFieldIconWhenAddornmentIsActive: {
    right: "46px",
  },
});

/** 
 * The props for the select
 */
interface IPropertyEntrySelectRendererWithStylesProps extends IPropertyEntrySelectRendererProps, WithStyles<typeof style> {
}

/**
 * The actual renderer class
 */
class ActualPropertyEntrySelectRenderer
  extends React.Component<IPropertyEntrySelectRendererWithStylesProps> {

  constructor(props: IPropertyEntrySelectRendererWithStylesProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    if (this.props.isList) {
      const arrValue = e.target.value;
      if (!arrValue.length) {
        this.props.onChange(null, null);
      } else {
        this.props.onChange(arrValue, null);
      }
    } else {
      const textualValue = e.target.value;
      // because the value can't be null, we need to set it like this
      if (this.props.isNumeric) {
        if (!textualValue) {
          this.props.onChange(null, null);
        } else {
          this.props.onChange(parseFloat(textualValue) || null, null);
        }
      } else {
        this.props.onChange(textualValue || null, null);
      }
    }
  }

  public render() {
    // build the icon
    let icon: React.ReactNode = null;
    if (this.props.canRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      }
    } else if (this.props.icon) {
      icon = this.props.icon;
    }

    const addornment = icon ? (
      <InputAdornment position="end">
        <IconButton
          tabIndex={-1}
          className={this.props.classes.icon}
          onClick={this.props.canRestore && this.props.currentAppliedValue ? this.props.onRestore : null}
        >
          {icon}
        </IconButton>
      </InputAdornment>
    ) : null;

    let selectElement: React.ReactNode = null;
    if (this.props.isList) {
      selectElement = (
        <Select
          classes={{
            icon: addornment ? this.props.classes.selectFieldIconWhenAddornmentIsActive : null,
          }}
          multiple={true}
          value={this.props.currentValue || []}
          onChange={this.onChange}
          input={<FilledInput fullWidth={true}/>}
          renderValue={(selected: any[]) => {
            return (
              <div className={this.props.classes.chips}>
                {selected.map((selectedValue) => {
                  const gatheredResult = this.props.values.find((v) => v.value === selectedValue);
                  return (
                    <Chip
                      key={selectedValue}
                      label={(gatheredResult && gatheredResult.i18nValue) || selectedValue}
                      className={this.props.classes.chip} color="primary"
                    />
                  );
                })}
              </div>
            );
          }}
        >
          {
            // render the valid values that we display and choose
            this.props.values.map((vv) => {
              // the i18n value from the i18n data
              return <MenuItem key={vv.value} value={vv.value}>{
                vv.i18nValue
              }</MenuItem>;
            })
          }
        </Select>
      );
    } else {
      selectElement = (
        <Select
          value={this.props.currentValue || ""}
          onChange={this.onChange}
          onBlur={this.props.enableUserSetErrors}
          displayEmpty={true}
          disabled={this.props.disabled}
          variant="filled"
          classes={{
            icon: addornment ? this.props.classes.selectFieldIconWhenAddornmentIsActive : null,
          }}
          input={
            <FilledInput
              id={this.props.propertyId}
              placeholder={this.props.placeholder}
              endAdornment={addornment}
              fullWidth={true}
              classes={{
                root: this.props.classes.fieldInput,
                focused: "focused",
              }}
            />
          }
        >
          <MenuItem
            selected={false}
            role="none"
            disabled={true}
          >
            <em>{this.props.placeholder}</em>
          </MenuItem>
          <Divider />
          {this.props.isNullable ? <MenuItem value="">
            <em>{this.props.nullValue.i18nValue}</em>
          </MenuItem> : null}
          {
            // render the valid values that we display and choose
            this.props.values.map((vv) => {
              // the i18n value from the i18n data
              return <MenuItem key={vv.value} value={vv.value}>{
                vv.i18nValue
              }</MenuItem>;
            })
          }
        </Select>
      );
    }

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description && descriptionAsAlert ?
            <Alert severity="info" className={this.props.classes.description}>
              {this.props.description}
            </Alert> :
            null
        }
        {
          this.props.description && !descriptionAsAlert ?
            <Typography variant="caption" className={this.props.classes.description}>
              {this.props.description}
            </Typography> :
            null
        }
        <FormControl
          variant="filled"
          className={this.props.classes.entry}
        >
          <InputLabel
            htmlFor={this.props.propertyId}
            classes={{
              root: this.props.classes.label,
              focused: "focused",
            }}
            shrink={this.props.isNullable ? true : undefined}
          >
            {this.props.label}
          </InputLabel>
          {selectElement}
        </FormControl>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
      </div>
    );
  }
}

/**
 * The property entry select is the renderer used when the property has specific valid values
 * these valid values are only supported as either string or number, so only types string, text,
 * integer, year and number are truly supported for this
 * 
 * Supported renderer args:
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 */
const PropertyEntrySelectRenderer = withStyles(style)(ActualPropertyEntrySelectRenderer);
export default PropertyEntrySelectRenderer;