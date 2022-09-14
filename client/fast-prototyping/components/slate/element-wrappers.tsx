import type { ISlateEditorElementWrappers, ISlateEditorInternalStateType, ISlateEditorWrapperElementProps } from ".";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { ILink } from "../../../internal/text/serializer/types/link";
import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import type { IVideo } from "../../../internal/text/serializer/types/video";
import { IContainer } from "../../../internal/text/serializer/types/container";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { EditorDropdown } from "../editor-dropdown";
import { ITable } from "../../../internal/text/serializer/types/table";
import { ITitle } from "../../../internal/text/serializer/types/title";
import { IImage } from "../../../internal/text/serializer/types/image";

const styles = {
  linkTemplateOptionsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0 0 0",
  },
  linkTemplateOptionsText: {
    textAlign: "center",
    color: "#aaa",
    paddingBottom: "1rem",
  },
  optionPrimary: {
    fontWeight: 700,
    color: "#1b5e20",
  },
  whiteBackgroundInput: {
    backgroundColor: "white",
  },
  upsideDown: {
    transform: "scaleY(-1)",
  },
  fixedWidthInput: {
    width: 200,
  }
}

/**
 * Represents an option for the templated values
 * that the link can take
 */
interface ITemplateOption {
  value: string;
  label: string | (() => string);
  primary: boolean;
};

export interface IMaterialUIWrapperElementProps extends ISlateEditorWrapperElementProps {
  /**
 * A generic error message
 */
  i18nGenericError: string;
  /**
   * A generic ok
   */
  i18nOk: string;
  /**
   * The whole of the i18n rich information that is given by default
   */
  i18nRichInfo: IPropertyEntryI18nRichTextInfo;
}

function getVideoURL(v: IVideo) {
  if (v.origin === "youtube") {
    return "https://youtube.com/watch?v=" + v.src;
  } else if (v.origin === "vimeo") {
    return "https://vimeo.com/" + v.src;
  } else {
    return "";
  }
}

function hasASelectedInlineOrBlock(state: ISlateEditorInternalStateType) {
  const block = state.currentSelectedBlockElement;
  if (block && (block.type === "video" || (block.type === "void-block" && typeof block.html === "string")) && !block.uiHandler) {
    return true;
  }

  return hasASelectedInline(state);
}

function hasASelectedInline(state: ISlateEditorInternalStateType) {
  const inline = state.currentSelectedInlineElement;
  if (inline && ((inline.type === "inline" && inline.textContent) || inline.type === "link") && !inline.uiHandler) {
    return true;
  }

  return false;
}

function TextWrapper(props: IMaterialUIWrapperElementProps) {
  const [textOptions, setTextOptions] = useState<ITemplateOption[]>([]);

  const updateTextContent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const label = textOptions.find((o) => o.value === e.target.value);
    props.helpers.updateTemplateText(typeof label.label === "string" ? label.label : label.label(), e.target.value);
  }, [textOptions]);

  useEffect(() => {
    if (!props.isSelected) {
      return;
    }

    const context = props.helpers.getContextFor(props.element);
    const rootContext = props.helpers.getRootContext();

    // need to find the templated options that are available
    // given the current context
    const textPropertiesToUse: ITemplateOption[] = [];

    // now we need to grab the current context, if we have any
    context && Object.keys(context.properties).forEach((key) => {
      // grab each property and check the type of it
      const property = context.properties[key];
      // if it's not a link
      if (property.type !== "text") {
        // continue
        return;
      }

      // otherwise we have a property we can use
      textPropertiesToUse.push({
        value: key,
        label: property.label || key,
        primary: context !== rootContext,
      });
    });

    if (rootContext && rootContext !== context) {
      Object.keys(rootContext.properties).forEach((key) => {
        // grab each property and check the type of it
        const property = rootContext.properties[key];

        if (property.nonRootInheritable) {
          return;
        }

        // if it's not a link
        if (property.type !== "text") {
          // continue
          return;
        }

        // otherwise we have a property we can use
        textPropertiesToUse.push({
          value: key,
          label: property.label || key,
          primary: false,
        });
      });
    }

    // and the value of such is not in the list
    if (props.element.textContent && !textPropertiesToUse.some((p) => p.value === props.element.textContent)) {
      // we add it
      textPropertiesToUse.push({
        value: props.element.textContent,
        label: (props.element.children[0] as any).text,
        primary: false,
      });
    }

    setTextOptions(textPropertiesToUse);
  }, [props.element, props.isSelected]);

  return (
    <EditorDropdown
      componentWrapper="span"
      isOpen={props.isSelected}
      dropdown={
        <FormControl fullWidth={true}>
          <InputLabel
            htmlFor="slate-wrapper-template-entry-id"
            shrink={true}
          >
            {props.i18nRichInfo.addTemplateText.label}
          </InputLabel>
          <Select
            value={props.element.textContent}
            onChange={updateTextContent}
            sx={styles.whiteBackgroundInput}
            input={
              <FilledInput
                id="slate-wrapper-template-entry-id"
                placeholder={props.i18nRichInfo.addTemplateText.placeholder}
                fullWidth={true}
              />
            }
          >
            {
              // render the valid values that we display and choose
              textOptions.map((vv) => {
                // the i18n value from the i18n data
                return <MenuItem
                  data-unblur="true"
                  key={vv.value}
                  value={vv.value}
                  sx={vv.primary ? styles.optionPrimary : null}
                >{
                    typeof vv.label == "string" ? vv.label : vv.label()
                  }</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      }
    >
      {props.children}
    </EditorDropdown>
  );
}

function TdAndTh(props: IMaterialUIWrapperElementProps) {
  const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
  const parentPath = [...path];
  // tr
  parentPath.pop();
  // thead or tbody or tfoot
  parentPath.pop();

  const parentTheadOrTbodyOrTfoot = props.helpers.Node.get(props.helpers.editor, parentPath) as any;

  parentPath.pop();
  const tableElement = props.helpers.Node.get(props.helpers.editor, parentPath) as any;

  const [tableType, setTableType] = useState((tableElement as ITable).tableType || "");

  const updateTableType = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
    const tablePath = [...path];
    // tr
    tablePath.pop();
    // thead or tbody or tfoot
    tablePath.pop();
    // table
    tablePath.pop();

    props.helpers.set({
      tableType: e.target.value || null,
    } as any, tablePath);
    setTableType(e.target.value || "");
  }, []);

  if (!props.featureSupport.availableContainers.length) {
    return props.children;
  }

  // because of dom nesting we will just put a fake component to the side
  // and a fake element so we don't nest a td in the table
  return (
    <>
      {props.children}
      <EditorDropdown
        componentWrapper="td"
        componentWrapperHidden={true}
        componentWrapperProps={{ contentEditable: false }}
        dropdownSizable={true}
        dropdown={
          <>
            {props.featureSupport.availableTables.length ? (
              <FormControl>
                <InputLabel
                  htmlFor="slate-wrapper-table-entry-id"
                  shrink={true}
                >
                  {props.i18nRichInfo.type}
                </InputLabel>
                <Select
                  value={tableType}
                  onChange={updateTableType}
                  displayEmpty={true}
                  sx={[styles.whiteBackgroundInput, styles.fixedWidthInput]}
                  input={
                    <FilledInput
                      id="slate-wrapper-table-entry-id"
                      placeholder={props.i18nRichInfo.type}
                    />
                  }
                >
                  <MenuItem value="" data-unblur="true">
                    <em>{" - "}</em>
                  </MenuItem>
                  {
                    // render the valid values that we display and choose
                    props.featureSupport.availableTables.map((vv) => {
                      // the i18n value from the i18n data
                      return <MenuItem
                        data-unblur="true"
                        key={vv.value}
                        value={vv.value}
                      >{
                          vv.label
                        }</MenuItem>;
                    })
                  }
                </Select>
              </FormControl>
            ) : null}
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddTdLabel}
              onClick={props.helpers.insertTableColumn}
              size="large">
              <ViewWeekIcon />
            </IconButton>
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddTrLabel}
              onClick={props.helpers.insertTableRow}
              size="large">
              <TableRowsIcon />
            </IconButton>
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddThLabel}
              onClick={props.helpers.toggleTable.bind(null, "thead")}
              disabled={!props.helpers.canToggleTable("thead")}
              size="large"
              color={props.element.type === "th" ? "primary" : "default"}
            >
              <CreditCardIcon />
            </IconButton>
            <IconButton
              tabIndex={-1}
              title={props.i18nRichInfo.formatAddTfootLabel}
              onClick={props.helpers.toggleTable.bind(null, "tfoot")}
              disabled={!props.helpers.canToggleTable("tfoot")}
              size="large"
              color={parentTheadOrTbodyOrTfoot.type === "tfoot" ? "primary" : "default"}
            >
              <CreditCardIcon sx={styles.upsideDown} />
            </IconButton>
          </>
        }
        isOpen={props.isSelected}
        goIntoTreeDepth={-4}
      >
        <p />
      </EditorDropdown>
    </>
  );
}

export const materialUIElementWrappers: ISlateEditorElementWrappers = {
  components: {
    link: (props: IMaterialUIWrapperElementProps) => {
      const [valid, setValid] = useState(true);
      const [linkOptions, setLinkOptions] = useState<ITemplateOption[]>([]);

      const updateElementHref = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const valid = props.helpers.updateLink(e.target.value, (props.element as ILink).thref || null);
        setValid(valid);
      }, []);

      const updateElementTHref = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const valid = props.helpers.updateLink((props.element as ILink).href || null, e.target.value);
        setValid(valid);
      }, []);

      useEffect(() => {
        if (!props.isSelected) {
          return;
        }
        const context = props.helpers.getContextFor(props.element);
        const rootContext = props.helpers.getRootContext();

        // need to find the templated options that are available
        // given the current context
        const linkPropertiesToUse: ITemplateOption[] = [];

        // now we need to grab the current context, if we have any
        context && Object.keys(context.properties).forEach((key) => {
          // grab each property and check the type of it
          const property = context.properties[key];
          // if it's not a link
          if (property.type !== "link") {
            // continue
            return;
          }

          // otherwise we have a property we can use
          linkPropertiesToUse.push({
            value: key,
            label: property.label || key,
            primary: context !== rootContext,
          });
        });

        if (rootContext && rootContext !== context) {
          Object.keys(rootContext.properties).forEach((key) => {
            // grab each property and check the type of it
            const property = rootContext.properties[key];

            if (property.nonRootInheritable) {
              return;
            }

            // if it's not a link
            if (property.type !== "link") {
              // continue
              return;
            }

            // otherwise we have a property we can use
            linkPropertiesToUse.push({
              value: key,
              label: property.label || key,
              primary: false,
            });
          });
        }

        // and the value of such is not in the list
        if ((props.element as ILink).thref && !linkPropertiesToUse.some((p) => p.value === (props.element as ILink).thref)) {
          // we add it
          linkPropertiesToUse.push({
            value: (props.element as ILink).thref,
            label: (props.element as ILink).thref,
            primary: false,
          });
        }

        setLinkOptions(linkPropertiesToUse);
      }, [props.element, props.isSelected]);

      return (
        <EditorDropdown
          componentWrapper="span"
          isOpen={props.isSelected}
          dropdown={
            <>
              <TextField
                value={(props.element as ILink).href || ""}
                onChange={updateElementHref}
                label={props.i18nRichInfo.setLink.label}
                disabled={!!(props.element as ILink).thref}
                placeholder={
                  props.featureSupport.supportsExternalLinks ?
                    props.i18nRichInfo.setLink.placeholder :
                    props.i18nRichInfo.setLink.placeholderLocalOnly
                }
                fullWidth={true}
                sx={!(props.element as ILink).thref ? styles.whiteBackgroundInput : null}
              />
              {
                linkOptions.length ?
                  <Box sx={styles.linkTemplateOptionsBox}>
                    <Box sx={styles.linkTemplateOptionsText}>{props.i18nRichInfo.setLink.templated}</Box>
                    <FormControl>
                      <InputLabel
                        htmlFor="slate-wrapper-template-entry-id"
                        shrink={true}
                      >
                        {props.i18nRichInfo.setLink.templatedLabel}
                      </InputLabel>
                      <Select
                        value={(props.element as ILink).thref || ""}
                        onChange={updateElementTHref}
                        displayEmpty={true}
                        sx={styles.whiteBackgroundInput}
                        input={
                          <FilledInput
                            id="slate-wrapper-template-entry-id"
                            placeholder={props.i18nRichInfo.setLink.templatedPlaceholder}
                          />
                        }
                      >
                        <MenuItem value="" data-unblur="true">
                          <em>{props.i18nRichInfo.setLink.templatedUnspecified}</em>
                        </MenuItem>
                        {
                          // render the valid values that we display and choose
                          linkOptions.map((vv) => {
                            // the i18n value from the i18n data
                            return <MenuItem
                              data-unblur="true"
                              key={vv.value}
                              value={vv.value}
                              sx={vv.primary ? styles.optionPrimary : null}
                            >{
                                typeof vv.label == "string" ? vv.label : vv.label()
                              }</MenuItem>;
                          })
                        }
                      </Select>
                    </FormControl>
                  </Box> :
                  null
              }
            </>
          }
        >
          {props.children}
        </EditorDropdown>
      );
    },
    video: (props: IMaterialUIWrapperElementProps) => {
      const [value, setValue] = useState(getVideoURL(props.element as IVideo));
      const [valid, setValid] = useState(true);

      const updateVideoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setValid(props.helpers.updateVideo(e.target.value));
      }, []);

      useEffect(() => {
        setValue(getVideoURL(props.element as IVideo));
      }, [props.element]);

      return (
        <EditorDropdown
          dropdown={
            <TextField
              value={value}
              onChange={updateVideoURL}
              label={props.i18nRichInfo.loadVideo.label}
              placeholder={props.i18nRichInfo.loadVideo.placeholder}
              fullWidth={true}
              sx={styles.whiteBackgroundInput}
            />
          }
          componentWrapper="div"
          goIntoTreeDepth={1}
          isOpen={props.isSelected}
        >
          {props.children}
        </EditorDropdown>
      );
    },
    image: (props: IMaterialUIWrapperElementProps) => {
      const [alt, setAlt] = useState((props.element as IImage).alt || "");

      useEffect(() => {
        setAlt((props.element as IImage).alt || "");
      }, [props.element]);

      const updateAlt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
        props.helpers.set({
          alt: e.target.value || null,
        } as any, path);
        setAlt(e.target.value);
      }, []);

      return (
        <EditorDropdown
          dropdown={
            <TextField
              value={alt}
              onChange={updateAlt}
              label={props.i18nRichInfo.alt}
              placeholder={props.i18nRichInfo.alt}
              fullWidth={true}
              sx={styles.whiteBackgroundInput}
            />
          }
          componentWrapper="div"
          goIntoTreeDepth={(props.element as IImage).standalone ? null : 1}
          isOpen={props.isSelected}
        >
          {props.children}
        </EditorDropdown>
      );
    },
    td: TdAndTh as any,
    th: TdAndTh as any,
    title: (props: IMaterialUIWrapperElementProps) => {
      const isOpen = props.isSelected && !hasASelectedInline(props.helpers.getState());

      const updateTitleType = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
        props.helpers.set({
          titleType: e.target.value || null,
        } as any, path);
      }, []);

      return (
        <EditorDropdown
          componentWrapper="div"
          isOpen={isOpen}
          dropdown={
            <FormControl fullWidth={true}>
              <InputLabel
                htmlFor="slate-wrapper-title-entry-id"
                shrink={true}
              >
                {props.i18nRichInfo.type}
              </InputLabel>
              <Select
                value={(props.element as ITitle).titleType || ""}
                onChange={updateTitleType}
                displayEmpty={true}
                sx={styles.whiteBackgroundInput}
                input={
                  <FilledInput
                    id="slate-wrapper-title-entry-id"
                    placeholder={props.i18nRichInfo.type}
                    fullWidth={true}
                  />
                }
              >
                {
                  // render the valid values that we display and choose
                  ["h1", "h2", "h3", "h4", "h5", "h6"].map((Element: any) => {
                    return <MenuItem
                      data-unblur="true"
                      key={Element}
                      value={Element}
                    >
                      <Element>
                        {props.i18nRichInfo.title}
                      </Element>
                    </MenuItem>;
                  })
                }
              </Select>
            </FormControl>
          }
        >
          {props.children}
        </EditorDropdown>
      ) as any;
    },
    inline: (props: IMaterialUIWrapperElementProps) => {
      if (typeof props.element.textContent !== "string") {
        return props.children;
      }

      return (<TextWrapper {...props} />) as any;
    },
    container: (props: IMaterialUIWrapperElementProps) => {
      const updateContainerType = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
        props.helpers.set({
          containerType: e.target.value || null,
        } as any, path);
      }, []);

      if (!props.featureSupport.availableContainers.length) {
        return props.children;
      }

      const isOpen = props.isSelected && !hasASelectedInlineOrBlock(props.helpers.getState());

      return (
        <EditorDropdown
          componentWrapper="span"
          isOpen={isOpen}
          dropdown={
            <FormControl fullWidth={true}>
              <InputLabel
                htmlFor="slate-wrapper-container-entry-id"
                shrink={true}
              >
                {props.i18nRichInfo.type}
              </InputLabel>
              <Select
                value={(props.element as IContainer).containerType || ""}
                onChange={updateContainerType}
                displayEmpty={true}
                sx={styles.whiteBackgroundInput}
                input={
                  <FilledInput
                    id="slate-wrapper-container-entry-id"
                    placeholder={props.i18nRichInfo.type}
                    fullWidth={true}
                  />
                }
              >
                <MenuItem value="" data-unblur="true">
                  <em>{" - "}</em>
                </MenuItem>
                {
                  // render the valid values that we display and choose
                  props.featureSupport.availableContainers.map((vv) => {
                    // the i18n value from the i18n data
                    return <MenuItem
                      data-unblur="true"
                      key={vv.value}
                      value={vv.value}
                    >{
                        vv.label
                      }</MenuItem>;
                  })
                }
              </Select>
            </FormControl>
          }
        >
          {props.children}
        </EditorDropdown>
      ) as any;
    }
  }
}