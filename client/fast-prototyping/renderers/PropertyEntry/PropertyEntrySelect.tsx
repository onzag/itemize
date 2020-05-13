import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  ThemeProvider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  FilledInput,
  Divider,
} from "@material-ui/core";
import {
  WithStyles,
  withStyles,
  createStyles,
} from "@material-ui/styles";
import { IPropertyEntrySelectRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntrySelect";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import uuid from "uuid";
import { Alert } from "@material-ui/lab";
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';

function shouldShowInvalid(props: IPropertyEntrySelectRendererProps) {
  return !props.currentValid;
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: theme.containerWidth,
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntrySelectRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
  }),
  label: (props: IPropertyEntrySelectRendererProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  fieldInput: (props: IPropertyEntrySelectRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: theme.fieldBorderInvalidColor,
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: theme.fieldBorderInvalidColorFocused,
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? theme.fieldBorderColor : theme.fieldBorderInvalidColorFocused,
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: theme.fieldBorderColor,
      },
      "&::after": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
      "&:hover::before": {
        borderBottomColor: theme.fieldBorderColorFocused,
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
    // build the icon
    let icon: React.ReactNode;
    if (this.props.canRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
    } else if (this.props.icon) {
      icon = this.props.icon;
    }

    const addornment = icon ? (
      <InputAdornment position="end">
        <IconButton
          tabIndex={-1}
          className={this.props.classes.icon}
          onClick={this.props.canRestore ? this.props.onRestore : null}
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

const ActualPropertyEntrySelectRendererWithStyles = withStyles(style)(ActualPropertyEntrySelectRenderer);

export default function PropertyEntrySelectRenderer(props: IPropertyEntrySelectRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntrySelectRendererWithStyles {...props}/>
    </ThemeProvider>
  )
}