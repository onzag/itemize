/**
 * The property entry TagList fast prototyping renderer uses material ui to render
 * an entry for a TagList value
 * 
 * @module
 */

import { IPropertyEntryTagListRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryTagList";
import React, { useCallback, useRef, useState } from "react";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RestoreIcon from "@mui/icons-material/Restore";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import Input from "@mui/material/Input";

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
  fieldInput: {
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
  },
  fieldInputOutlined: {
    "display": "flex",
    "alignItems": "center",
    "flexWrap": "wrap",
    paddingTop: '10px',
    paddingBottom: '12px',
    paddingLeft: '14px',
    paddingRight: '14px',
    "& > input": {
      flex: "1 0 auto",
      width: "200px",
      padding: "7px 0 13px 0",
      marginBottom: "-10px",
    },
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
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
};

export interface ITagListSuggestion {
  label: string;
  value: string;
  metadata: any;
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
  const [suggestions, setSuggestions] = useState<ITagListSuggestion[]>([]);

  const focus = useCallback(() => {
    actualInputRef.current.focus();
  }, []);
  const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // must check the type due to a bug in autosuggest
    // sometimes passing nonsense in here for no reason
    if (typeof e.target.value === "string") {
      setInputValue(e.target.value);
    }
  }, []);
  // const handleBlur = useCallback(async () => {
  //   const inputValueTrimmed = inputValue.trim();

  //   if (inputValueTrimmed === "") {
  //     return;
  //   }

  //   setInputValue("");

  //   if (props.args.onValueInputted) {
  //     const newInputValue = await props.args.onValueInputted(inputValueTrimmed);
  //     const newValue = props.currentValue ? [...props.currentValue] : [];
  //     newValue.push(newInputValue);
  //     props.onChange(newValue, null);
  //   } else {
  //     const newValue = props.currentValue ? [...props.currentValue] : [];
  //     newValue.push(inputValueTrimmed);
  //     props.onChange(newValue, null);
  //   }
  // }, [inputValue, props.currentValue, props.args]);
  const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueTrimmed = inputValue.trim();
    if ((e.key === "Enter" || (props.args.enterWithSpace && e.key === " ") || (e.key === "," && props.args.enterWithComma)) && inputValueTrimmed) {
      setInputValue("");

      if (e.key === ",") {
        e.preventDefault();
      }

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
  }, [inputValue, props.currentValue, props.args.onValueInputted, props.args.enterWithSpace, props.args.enterWithComma]);
  const insertChip = useCallback((value: string) => {
    const newValue = props.currentValue ? [...props.currentValue] : [];
    newValue.push(value);
    props.onChange(newValue, null);
    setInputValue("");
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
      setSuggestions((await props.args.fetchSuggestions(arg.value)) || []);
    }, 600);
  }, []);

  const descriptionAsAlert = props.args["descriptionAsAlert"];

  const renderContainer = useCallback((options: Autosuggest.RenderSuggestionsContainerParams) => {
    return (
      <Paper
        {...options.containerProps}
        square={true}
        sx={{marginTop: "21px"}}
      >
        {options.children}
      </Paper>
    );
  }, []);

  const renderSuggestion = useCallback((suggestion: ITagListSuggestion, params: Autosuggest.RenderSuggestionParams) => {
    const label = props.args.labelRetriever ? props.args.labelRetriever(suggestion) : suggestion.label;

    // we use this to highlight
    const matches = match(label, params.query);
    const parts = parse(label, matches);

    const matchParts = (
      parts.map((part, index) =>
        part.highlight ? (
          <strong key={index}>
            {part.text}
          </strong>
        ) : (
          <span key={index}>
            {part.text}
          </span>
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
        {props.args.suggestionRenderer ? props.args.suggestionRenderer(suggestion, matchParts) : matchParts}
      </MenuItem>
    );
  }, [insertChip]);

  const renderBody = useCallback((inputProps?: any) => {
    let icon: React.ReactNode = null;
    if (props.canRestore && !props.args.disableRestore) {
      if (props.currentAppliedValue !== null) {
        icon = <RestoreIcon />
      }
    } else if (props.args.icon) {
      icon = props.args.icon;
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

    const restoreAction = icon && props.canRestore && !props.args.disableRestore && props.currentAppliedValue ? props.onRestore : null;
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

    let idToUse = (props.args.InputProps && props.args.InputProps.id) || props.uniqueId;

    const inputPropsToSet: any = {
      id: idToUse,
      "aria-describedby": props.description ? idToUse + "_desc" : null,
      ...inputProps,
    };

    if (!props.currentValid) {
      inputPropsToSet["aria-invalid"] = true;

      if (!props.args.hideError) {
        inputPropsToSet["aria-errormessage"] = idToUse + "_error";
      }
    }

    let InputToUse = FilledInput;

    if (props.args.fieldVariant === "standard") {
      InputToUse = Input;
    } else if (props.args.fieldVariant === "outlined") {
      InputToUse = OutlinedInput;
    }

    if (inputPropsToSet.onKeyDown) {
      const originalEv = inputPropsToSet.onKeyDown;
      inputPropsToSet.onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        originalEv(e);
        handleKeyDown(e);
      }
    }

    return (
      <FormControl
        fullWidth={true}
        onClick={focus}
        disabled={props.disabled}
        variant={props.args.fieldVariant || "filled"}
      >
        <InputLabel
          htmlFor={idToUse}
          sx={style.label(!props.currentValid)}
          classes={{
            focused: "focused",
          }}
        >
          {props.label}
        </InputLabel>

        <InputToUse
          // typescript on it again, refuses to take this object
          sx={props.args.fieldVariant === "outlined" ? style.fieldInputOutlined : style.fieldInput}
          error={!props.currentValid}
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
          // onBlur={handleBlur}
          inputProps={inputPropsToSet}
          label={props.label}
          {...props.args.InputProps}
        />
      </FormControl>
    )
  }, [
    focus,
    props.propertyId,
    inputValue,
    updateValue,
    handleKeyDown,
    //handleBlur,
    props.disabled,
    props.placeholder,
    props.canRestore && !props.args.disableRestore,
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

    object = (
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

  const idToUse = (props.args.InputProps && props.args.InputProps.id) || props.uniqueId;

  let descriptionObject: React.ReactNode = null;
  if (props.description) {
    descriptionObject = descriptionAsAlert ? (
      <Alert severity="info" sx={style.description} role="note" id={idToUse + "_desc"}>
        {props.description}
      </Alert>
    ) : (
      <Typography variant="caption" sx={style.description} id={idToUse + "_desc"}>
        {props.description}
      </Typography>
    );
  }

  const error = (
    props.args.hideError ? null : <Box sx={style.errorMessage} id={idToUse + "_error"}>
      {props.currentInvalidReason}
    </Box>
  );

  let inner: React.ReactNode;
  if (props.args.useCustomFieldRender) {
    inner = props.args.useCustomFieldRender(descriptionObject, null, object, error, props.disabled);
  } else {
    inner = (
      <>
        {descriptionObject}
        {object}
        {error}
      </>
    )
  }

  return (
    <Box sx={style.container}>
      {inner}
    </Box>
  );
};

export default PropertyEntryTagListRenderer;
