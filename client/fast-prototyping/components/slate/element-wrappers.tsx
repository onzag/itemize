import { ISlateEditorInternalStateType, ISlateEditorWrapperElementProps } from ".";
import ReactDOM from "react-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, SxProps, Theme } from "@mui/material";
import { ILink } from "../../../internal/text/serializer/types/link";
import { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import type { IVideo } from "../../../internal/text/serializer/types/video";
import { IImage } from "../../../internal/text/serializer/types/image";
import { IContainer } from "../../../internal/text/serializer/types/container";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const styles = {
  fakeContainer: {
    display: "contents"
  },
  dropdown: {
    padding: "0.5rem 1rem",
    backgroundColor: "#eee",
    border: "solid 1px #ccc",
    width: "300px",
  },
  dropdownSizable: {
    padding: "0.5rem 1rem",
    backgroundColor: "#eee",
    border: "solid 1px #ccc",
  },
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
  hidden: {
    display: "none",
  },
  upsideDown: {
    transform: "scaleY(-1)",
  },
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

interface IMaterialUIWrapperElement extends ISlateEditorWrapperElementProps {
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

interface IHardDropDownProps {
  isOpen: boolean;
  children: React.ReactNode;
  component: string;
  componentSx: SxProps<Theme>;
  dropdownSx: SxProps<Theme>;
  componentProps?: any;
  element: React.ReactNode;
  goIntoTreeDepth?: number;

  anchorElement?: HTMLElement;
  portalElement?: HTMLElement;
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

  const inline = state.currentSelectedInlineElement;
  if (inline && ((inline.type === "inline" && inline.textContent) || inline.type === "link") && !inline.uiHandler) {
    return true;
  }

  return false;
}

function HardDropdown(props: IHardDropDownProps) {
  const boxRef = useRef<HTMLElement>();
  const [pos, setPos] = useState<[number, number, number]>(null);

  const updatePos = useCallback(() => {
    const anchorElement = props.anchorElement || document.body.parentElement;

    // if it's using the sibling strategy where the element is in the sibling side rather than down in there
    // we gotta use the parent as the source of our children
    const children = Array.from(boxRef.current.childNodes);
    // now we grab the first node
    let firstNode = children[0] as HTMLElement;
    // same because our element would be last if we used previous children we gotta move two sides
    let lastNode = children[children.length - 1] as HTMLElement;

    if (props.goIntoTreeDepth) {
      const goTowardsParent = props.goIntoTreeDepth < 0;
      for (let i = 0; i < Math.abs(props.goIntoTreeDepth); i++) {
        if (!goTowardsParent) {
          firstNode = firstNode.childNodes[0] as HTMLElement;
          lastNode = lastNode.childNodes[0] as HTMLElement;
        } else {
          firstNode = firstNode.parentElement as HTMLElement;
          lastNode = lastNode.parentElement as HTMLElement;
        }
      }
    }

    const firstNodeBoundingRect = firstNode.getBoundingClientRect();
    const lastNodeBoundingRect = lastNode.getBoundingClientRect();

    const lowermostNodeClientRect = firstNodeBoundingRect.bottom > lastNodeBoundingRect.bottom ? firstNodeBoundingRect : lastNodeBoundingRect;

    const leftMostPosition = lowermostNodeClientRect.left;
    const rightMostPosition = lowermostNodeClientRect.right;

    let left: number = null;
    let right: number = null;
    if (leftMostPosition > (window.innerWidth / 2)) {
      right = anchorElement.offsetWidth - rightMostPosition;
    } else {
      left = leftMostPosition;
    }

    const top = anchorElement.scrollTop + lowermostNodeClientRect.top + lowermostNodeClientRect.height;

    setPos([top, left, right]);
  }, []);

  const posMassTrigger = useCallback(() => {
    const posInternal = setInterval(updatePos, 10);
    setTimeout(() => {
      clearInterval(posInternal);
    }, 600);
  }, []);

  useEffect(() => {
    if (props.isOpen) {
      updatePos();

      window.addEventListener("SLATE_DRAWER_OPEN", posMassTrigger);
      window.addEventListener("keyup", updatePos);
      window.addEventListener("resize", updatePos);

      return () => {
        window.removeEventListener("SLATE_DRAWER_OPEN", posMassTrigger);
        window.removeEventListener("keyup", updatePos)
        window.removeEventListener("resize", updatePos);
      }
    }
  }, [props.isOpen]);

  const portal = pos && props.isOpen ? ReactDOM.createPortal(
    <Box sx={props.dropdownSx} style={{ position: "absolute", top: pos[0], left: pos[1], right: pos[2] }} data-unblur="true">
      {props.children}
    </Box>,
    props.portalElement || document.body,
  ) : null;

  return (
    <>
      <Box component={props.component as any} sx={props.componentSx} ref={boxRef} {...props.componentProps}>
        {props.element}
      </Box>
      {portal}
    </>
  );
}

function TextWrapper(props: IMaterialUIWrapperElement) {
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
    <HardDropdown element={props.children} component="span" componentSx={styles.fakeContainer} dropdownSx={styles.dropdown} isOpen={props.isSelected}>
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
    </HardDropdown>
  );
}

function TdAndTh(props: IMaterialUIWrapperElement) {
  const path = props.helpers.ReactEditor.findPath(props.helpers.editor, props.element);
  const parentPath = [...path];
  // tr
  parentPath.pop();
  // thead or tbody or tfoot
  parentPath.pop();

  const parentTheadOrTbodyOrTfoot = props.helpers.Node.get(props.helpers.editor, parentPath) as any;

  // because of dom nesting we will just put a fake component to the side
  // and a fake element so we don't nest a td in the table
  return (
    <>
      {props.children}
      <HardDropdown
        element={<p />}
        component="td"
        componentSx={styles.hidden}
        componentProps={{ contentEditable: false }}
        dropdownSx={styles.dropdownSizable}
        isOpen={props.isSelected}
        goIntoTreeDepth={-4}
      >
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
          <CreditCardIcon sx={styles.upsideDown}/>
        </IconButton>
      </HardDropdown>
    </>
  );
}

export const materialUIElementWrappers = {
  link: (props: IMaterialUIWrapperElement) => {
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
      <HardDropdown element={props.children} component="span" componentSx={styles.fakeContainer} dropdownSx={styles.dropdown} isOpen={props.isSelected}>
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
      </HardDropdown>
    );
  },
  video: (props: IMaterialUIWrapperElement) => {
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
      <HardDropdown
        element={props.children}
        component="div"
        componentSx={styles.fakeContainer}
        dropdownSx={styles.dropdown}
        goIntoTreeDepth={1}
        isOpen={props.isSelected}
      >
        <TextField
          value={value}
          onChange={updateVideoURL}
          label={props.i18nRichInfo.loadVideo.label}
          placeholder={props.i18nRichInfo.loadVideo.placeholder}
          fullWidth={true}
          sx={styles.whiteBackgroundInput}
        />
      </HardDropdown>
    );
  },
  td: TdAndTh,
  th: TdAndTh,
  inline: (props: IMaterialUIWrapperElement) => {
    if (typeof props.element.textContent !== "string") {
      return props.children;
    }

    return (<TextWrapper {...props} />);
  },
  container: (props: IMaterialUIWrapperElement) => {
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
      <HardDropdown element={props.children} component="span" componentSx={styles.fakeContainer} dropdownSx={styles.dropdown} isOpen={isOpen}>
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
      </HardDropdown>
    );
  }
}