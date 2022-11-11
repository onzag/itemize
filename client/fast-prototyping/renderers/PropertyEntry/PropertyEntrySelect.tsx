/**
 * Contains the select entry field renderer for fast prototyping
 * 
 * The select entry field renderer is used for types, number, integer and string when
 * they have defined values
 * 
 * @module
 */

import React from "react";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import RestoreIcon from "@mui/icons-material/Restore";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilledInput from "@mui/material/FilledInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import Box from "@mui/system/Box";
import { RestoreIconButton } from "./general";

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
export const style = {
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
  label: (isInvalid: boolean) => ({
    "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: isInvalid ? "#f44336" : "#3f51b5",
    },
  }),
  fieldInput: (isInvalid: boolean, disabled: boolean) => {
    if (isInvalid) {
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
          borderBottomColor: disabled ? "rgba(0,0,0,0.42)" : "#f44336",
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
  selectRoot: {
    display: "flex",
    alignItems: "center",
  },
};

/**
 * The actual renderer class
 */
class PropertyEntrySelectRenderer
  extends React.Component<IPropertyEntrySelectRendererProps> {

  constructor(props: IPropertyEntrySelectRendererProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public onChange(
    e: SelectChangeEvent<any>,
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

    const allowedOptions = this.props.args.allowedOptions;
    const altLabels = this.props.args.altLabels;
    const altNullLabel = this.props.args.altNullLabel;
    const denyAny = this.props.args.denyAny;
    const anyAddornment = this.props.args.anyAddornment;
    const optionAddornment = this.props.args.optionAddornment;

    const isInvalid = shouldShowInvalid(this.props);

    const restoreAction = icon && this.props.canRestore && this.props.currentAppliedValue ? this.props.onRestore : null;
    const addornment = icon ? (
      <InputAdornment position="end">
        <RestoreIconButton
          onClick={restoreAction}
          sx={style.icon}
        >
          {icon}
        </RestoreIconButton>
      </InputAdornment>
    ) : null;

    let selectElement: React.ReactNode = null;
    if (this.props.isList) {
      selectElement = (
        <Select
          sx={style.selectRoot}
          multiple={true}
          value={(this.props.currentValue || []) as any[]}
          onChange={this.onChange}
          input={<FilledInput fullWidth={true} />}
          renderValue={(selected: any[]) => {
            return (
              <Box sx={style.chips}>
                {selected.map((selectedValue) => {
                  const gatheredResult = this.props.values.find((v) => v.value === selectedValue);
                  const gatheredResultAltLabel = altLabels && gatheredResult && altLabels[gatheredResult.value];
                  return (
                    <Chip
                      key={selectedValue}
                      label={gatheredResultAltLabel || (gatheredResult && gatheredResult.i18nValue) || selectedValue}
                      sx={style.chip} color="primary"
                    />
                  );
                })}
              </Box>
            );
          }}
        >
          {
            // render the valid values that we display and choose
            this.props.values.filter((vv) => {
              if (!allowedOptions) {
                return true;
              }

              return allowedOptions.includes(vv.value);
            }).map((vv) => {
              const addornment = optionAddornment && optionAddornment[vv.value];
              let content: React.ReactNode;
              let addr: React.ReactNode = null;
              const altLabel = altLabels && altLabels[vv.value];
              if (!optionAddornment) {
                content = altLabel || vv.i18nValue;
              } else {
                content = <ListItemText>{altLabel || vv.i18nValue}</ListItemText>
                addr = <ListItemIcon>{addornment}</ListItemIcon>
              }
              // the i18n value from the i18n data
              return <MenuItem key={vv.value} value={vv.value}>{addr}{content}</MenuItem>;
            })
          }
        </Select>
      );
    } else {
      let anyContent: React.ReactNode;
      let anyAddr: React.ReactNode = null;
      if (this.props.isNullable) {
        if (!anyAddornment) {
          anyContent = altNullLabel || this.props.nullValue.i18nValue
        } else {
          anyContent = <ListItemText><em>{altNullLabel || this.props.nullValue.i18nValue}</em></ListItemText>
          anyAddr = <ListItemIcon>{anyAddornment}</ListItemIcon>
        }
      }
      selectElement = (
        <Select
          value={this.props.currentValue || ""}
          onChange={this.onChange}
          onBlur={this.props.enableUserSetErrors}
          displayEmpty={true}
          disabled={this.props.disabled}
          variant={this.props.args.fieldVariant || "filled"}
          sx={style.selectRoot}
          input={
            <FilledInput
              id={this.props.propertyId}
              placeholder={this.props.placeholder}
              endAdornment={addornment}
              fullWidth={true}
              sx={style.fieldInput(isInvalid, this.props.disabled)}
              classes={{
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
          {this.props.isNullable && !denyAny ? <MenuItem value="">
            {anyAddr}
            {anyContent}
          </MenuItem> : null}
          {
            // render the valid values that we display and choose
            this.props.values.filter((vv) => {
              if (!allowedOptions) {
                return true;
              }

              return allowedOptions.includes(vv.value);
            }).map((vv) => {
              const addornment = optionAddornment && optionAddornment[vv.value];
              let content: React.ReactNode;
              let addr: React.ReactNode = null;
              const altLabel = altLabels && altLabels[vv.value];
              if (!optionAddornment) {
                content = altLabel || vv.i18nValue;
              } else {
                content = <ListItemText>{altLabel || vv.i18nValue}</ListItemText>
                addr = <ListItemIcon>{addornment}</ListItemIcon>
              }
              // the i18n value from the i18n data
              return <MenuItem key={vv.value} value={vv.value}>{addr}{content}</MenuItem>;
            })
          }
        </Select>
      );
    }

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    return (
      <Box sx={style.container}>
        {
          this.props.description && descriptionAsAlert ?
            <Alert severity="info" sx={style.description} role="note">
              {this.props.description}
            </Alert> :
            null
        }
        {
          this.props.description && !descriptionAsAlert ?
            <Typography variant="caption" sx={style.description}>
              {this.props.description}
            </Typography> :
            null
        }
        <FormControl
          variant={this.props.args.fieldVariant || "filled"}
          sx={style.entry}
        >
          {this.props.label ? <InputLabel
            htmlFor={this.props.propertyId}
            sx={style.label(isInvalid)}
            classes={{
              focused: "focused",
            }}
            shrink={this.props.isNullable ? true : undefined}
          >
            {this.props.label}
          </InputLabel> : null}
          {selectElement}
        </FormControl>
        {this.props.args.hideError ? null : <Box sx={style.errorMessage}>
          {this.props.currentInvalidReason}
        </Box>}
      </Box>
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
export default PropertyEntrySelectRenderer;