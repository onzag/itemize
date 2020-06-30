import React from "react";
import {
  MenuItem,
  InputAdornment,
  IconButton,
  ThemeProvider,
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
} from "../../mui-core";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
import uuid from "uuid";

function shouldShowInvalid(props: IPropertyEntrySelectRendererProps) {
  return !props.currentValid;
}
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


interface IPropertyEntrySelectRendererWithStylesProps extends IPropertyEntrySelectRendererProps, WithStyles<typeof style> {
}

class ActualPropertyEntrySelectRenderer
  extends React.Component<IPropertyEntrySelectRendererWithStylesProps> {

  private uuid: string;

  constructor(props: IPropertyEntrySelectRendererWithStylesProps) {
    super(props);

    this.uuid = uuid.v4();
    this.onChange = this.onChange.bind(this);
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const textualValue = e.target.value;
    this.props.onChange(textualValue || null, null);
  }

  public render() {

    // let's avoid restoration to null values in these
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
            htmlFor={this.uuid}
            classes={{
              root: this.props.classes.label,
              focused: "focused",
            }}
            shrink={this.props.isNullable ? true : undefined}
          >
            {this.props.label}
          </InputLabel>
          <Select
            value={this.props.currentValue || ""}
            onChange={this.onChange}
            displayEmpty={true}
            disabled={this.props.disabled}
            variant="filled"
            classes={{
              icon: addornment ? this.props.classes.selectFieldIconWhenAddornmentIsActive : null,
            }}
            input={
              <FilledInput
                id={this.uuid}
                placeholder={this.props.placeholder}
                endAdornment={addornment}
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
            <Divider/>
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
        </FormControl>
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>
      </div>
    );
  }
}

const PropertyEntrySelectRenderer = withStyles(style)(ActualPropertyEntrySelectRenderer);
export default PropertyEntrySelectRenderer;