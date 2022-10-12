/**
 * The property entry TagList fast prototyping renderer uses material ui to render
 * an entry for a TagList value
 * 
 * @module
 */

import { IPropertyEntryTagListRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryTagList";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { capitalize } from "../../../components/localization";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RestoreIcon from "@mui/icons-material/Restore";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";
import FilledInput from "@mui/material/FilledInput";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { css as emotionCss } from "@emotion/css";
import { css } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";

/**
 * The styles of the renderer
 */
export const style = {
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
  chip: {
    margin: "10px 10px 0 10px",
  },
  label: (isInvalid: boolean) => {
    return {
      "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
      "&.focused": {
        color: isInvalid ? "#f44336" : "#3f51b5",
      },
    }
  },
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
        "display": "flex",
        "alignItems": "center",
        "flexWrap": "wrap",
        "paddingBottom": "10px",
        "paddingTop": "20px",
        "paddingLeft": "12px",
        "& > input": {
          flex: "1 0 auto",
          width: "200px",
          padding: "10px 0",
          marginBottom: "-10px",
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
      "display": "flex",
      "alignItems": "center",
      "flexWrap": "wrap",
      "paddingBottom": "10px",
      "paddingTop": "20px",
      "paddingLeft": "12px",
      "& > input": {
        flex: "1 0 auto",
        width: "200px",
        padding: "10px 0",
        marginBottom: "-10px",
      },
    };
  },
  autosuggestContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autosuggestContainerOpen: {

  },
  autosuggestInput: {

  },
  autosuggestInputOpen: {

  },
  autosuggestSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: `calc(100% - 1.3rem)`,
    zIndex: 1000,
  },
  autosuggestSuggestionsContainerOpen: {

  },
  autosuggestSuggestionsList: {

  },
  autosuggestSuggestion: {

  },
  autosuggestFirstSuggestion: {

  },
  autosuggestSuggestionHighlighted: {

  },
  autosuggestSectionContainer: {

  },
  autosuggestFirstSectionContainer: {

  },
  autosuggestSectionTitle: {

  },
  autosuggestMenuItem: {
    height: "auto",
    // material ui v5 messy engine decides to override my styles
    paddingTop: "4px !important",
    paddingBottom: "8px !important",
  },
  autosuggestMenuItemMainText: {
    fontSize: "1rem",
    lineHeight: "1rem",
  },
  autosuggestMenuItemSubText: {
    fontSize: "0.75rem",
    lineHeight: "0.75rem",
  },
};

export interface ITagListSuggestion {
  label: string;
  value: string;
}

function getSuggestionValue(s: ITagListSuggestion) {
  return s.value;
}

/**
 * This is the fast prototyping TagList renderer and uses material ui in order to render a slick
 * TagList entry for it, supports the following args
 * 
 * - descriptionAsAlert: displays the description as an alert rather than its normal form
 * 
 * @param props the entry TagList props
 * @returns a react element
 */
function PropertyEntryTagListRenderer(props: IPropertyEntryTagListRendererProps) {
  const actualInputRef = useRef<HTMLInputElement>();
  const delayRef = useRef<NodeJS.Timer>();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<ITagListSuggestion[]>();

  const focus = useCallback(() => {
    actualInputRef.current.focus();
  }, []);
  const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);
  const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueTrimmed = inputValue.trim();
    if (e.key === "Enter" && inputValueTrimmed) {
      setInputValue("");

      if (props.args.onValueInputted) {
        const newInputValue = await props.args.onValueInputted(inputValueTrimmed);
        const newValue = props.currentValue ? [...props.currentValue] : [];
        newValue.push(newInputValue);
        props.onChange(newValue, null);
      } else {
        const newValue = props.currentValue ? [...props.currentValue] : [];
        newValue.push(inputValueTrimmed);
        props.onChange(newValue, null);
      }
    } else if (e.key === "Backspace" && actualInputRef.current.selectionStart === 0 && actualInputRef.current.selectionEnd === 0) {
      const newValue = props.currentValue ? [...props.currentValue] : [];
      newValue.pop();
      props.onChange(newValue, null);
    }
  }, [inputValue, props.currentValue, props.args]);
  const insertChip = useCallback((value: string) => {
    const newValue = props.currentValue ? [...props.currentValue] : [];
    newValue.push(value);
    props.onChange(newValue, null);
  }, [props.currentValue]);
  const onDeleteChip = useCallback((index: number) => {
    if (!props.currentValue) {
      return;
    }

    const newValue = [...props.currentValue];
    newValue.splice(index, 1);

    props.onChange(newValue, null);
  }, [props.currentValue]);
  const onSuggestionsFetchRequested = useCallback((arg: { value: string }) => {
    clearTimeout(delayRef.current);
    delayRef.current = setTimeout(async () => {
      setSuggestions(await props.args.fetchSuggestions(arg.value));
    }, 600);
  }, []);

  const descriptionAsAlert = props.args["descriptionAsAlert"];

  const renderContainer = useCallback((options: Autosuggest.RenderSuggestionsContainerParams) => {
    return (
      <Paper
        {...options.containerProps}
        square={true}
      >
        {options.children}
      </Paper>
    );
  }, []);

  const renderSuggestion = useCallback((suggestion: ITagListSuggestion, params: Autosuggest.RenderSuggestionParams) => {
    // we use this to highlight
    const matches = match(suggestion.value, params.query);
    const parts = parse(suggestion.value, matches);

    const matchParts = (
      parts.map((part, index) =>
        part.highlight ? (
          <span key={index} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={index} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        ),
      )
    );

    return (
      <MenuItem
        sx={style.autosuggestMenuItem}
        selected={params.isHighlighted}
        component="div"
        onClick={insertChip.bind(null, suggestion.value)}
      >
        {props.args.suggestionRenderer(suggestion, matchParts)}
      </MenuItem>
    );
  }, [insertChip])

  const renderBody = useCallback((inputProps?: any) => {
    let icon: React.ReactNode = null;
    if (props.canRestore) {
      if (props.currentAppliedValue !== null) {
        icon = <RestoreIcon />
      }
    } else if (props.icon) {
      icon = props.icon;
    }

    const chips = (
      props.currentValue && props.currentValue.map((selectedValue, index) => {
        if (props.args.chipRenderer) {
          return (
            <React.Fragment key={index}>
              {props.args.chipRenderer(selectedValue, onDeleteChip.bind(null, index))}
            </React.Fragment>
          );
        }
        return (
          <Chip
            key={index}
            label={props.args.labelRenderer ? props.args.labelRenderer(selectedValue) : selectedValue}
            sx={style.chip}
            color="primary"
          />
        );
      })
    )

    const restoreAction = icon && props.canRestore && props.currentAppliedValue ? props.onRestore : null;
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

    return (
      <FormControl
        fullWidth={true}
        onClick={focus}
        disabled={props.disabled}
        variant="filled"
      >
        <InputLabel
          htmlFor={props.propertyId}
          sx={style.label(!props.currentValid)}
          classes={{
            focused: "focused",
          }}
        >
          {props.label}
        </InputLabel>

        <FilledInput
          // typescript on it again, refuses to take this object
          sx={style.fieldInput(!props.currentValid, props.disabled) as any}
          id={props.propertyId}
          value={inputValue}
          onChange={updateValue}
          onKeyDown={handleKeyDown}
          inputRef={actualInputRef}
          disabled={props.disabled}
          fullWidth={true}
          placeholder={props.placeholder}
          endAdornment={addornment}
          startAdornment={chips}
          {...inputProps}
        />
      </FormControl>
    )
  }, [
    focus,
    props.propertyId,
    inputValue,
    updateValue,
    handleKeyDown,
    props.disabled,
    props.placeholder,
    props.canRestore,
    props.currentAppliedValue,
    props.currentValue,
    props.onRestore,
    props.disabled,
    props.currentValid,
    props.label,
    props.args.chipRenderer,
    props.args.labelRenderer,
  ]);

  let object: React.ReactNode = null;

  if (props.args.fetchSuggestions) {
    const baseTheme = {
      container: css(style.autosuggestContainer as any),
      containerOpen: css(style.autosuggestContainerOpen),
      input: css(style.autosuggestInput),
      inputOpen: css(style.autosuggestInputOpen),
      inputFocused: "focused",
      suggestionsContainer: css(style.autosuggestSuggestionsContainer),
      suggestionsContainerOpen: css(style.autosuggestSuggestionsContainerOpen),
      suggestionsList: css(style.autosuggestSuggestionsList),
      suggestion: css(style.autosuggestSuggestion),
      suggestionFirst: css(style.autosuggestFirstSuggestion),
      suggestionHighlighted: css(style.autosuggestSuggestionHighlighted),
      sectionContainer: css(style.autosuggestSectionContainer),
      sectionContainerFirst: css(style.autosuggestFirstSectionContainer),
      sectionTitle: css(style.autosuggestSectionTitle),
    };

    const rsTheme: any = {};
    Object.keys(baseTheme).forEach((k) => {
      rsTheme[k] = emotionCss(baseTheme[k].styles)
    });

    return (
      <Autosuggest
        renderInputComponent={renderBody}
        renderSuggestionsContainer={renderContainer}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={setSuggestions.bind(null, [])}
        suggestions={suggestions}
        theme={rsTheme}
        inputProps={{
          value: inputValue,
          onChange: updateValue,
          type: "text",
        }}
      />
    );
  } else {
    object = renderBody();
  }

  return (
    <Box sx={style.container}>
      {props.description && descriptionAsAlert ? <Alert severity="info" sx={style.description} role="note">
        {props.description}
      </Alert> : null}
      {props.description && !descriptionAsAlert ? <Typography variant="caption" sx={style.description}>
        {props.description}
      </Typography> : null}
      {object}
    </Box>
  );
};

export default PropertyEntryTagListRenderer;
