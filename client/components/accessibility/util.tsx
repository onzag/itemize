import React, { useCallback } from "react";
import AltText from "./AltText";
import { useI18nRead } from "../localization/I18nRead";
import { ReactifiedElementWithHoverAndActive } from "@onzag/itemize-text-engine/serializer/dynamic-component";
import { IImage } from "@onzag/itemize-text-engine/serializer/types/image";
import { IFile } from "@onzag/itemize-text-engine/serializer/types/file";
import { ISentence } from "@onzag/itemize-text-engine/serializer/types/segmenter-types/sentence";
import { IWord } from "@onzag/itemize-text-engine/serializer/types/segmenter-types/word";
import { IText } from "@onzag/itemize-text-engine/serializer/types/text";
import { RichElement, IRootLevelDocument } from "@onzag/itemize-text-engine/serializer";
import { hasWords } from "@onzag/itemize-text-engine/util";

export function onKeyDown(e: React.KeyboardEvent) {
  if (e.code === "Enter" || e.code === "Space") {
    (e.target as HTMLElement).click && (e.target as HTMLElement).click();
  }
}

export interface IAltReactionerComponentProps {
  component: string;
  selector: string;
  reactionKey: string;
  action: "click";
  useInFlow: boolean;
  children: React.ReactNode;
  priority: number;
  uncontrolled?: boolean;
}

export type AltReactionerComponentType = React.ComponentType<IAltReactionerComponentProps>;

interface IAccessibleLinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  onOpenExternalLink: (url: string) => void;
  onOpenInternalLink: (url: string) => void;
  styleActive: any;
  styleHover: any;
  reactionKey: string;
  altReactionerExtraProps: any;
  AltReactionerComponent: AltReactionerComponentType;
  priority?: number;
}

function AccessibleLink(props: IAccessibleLinkProps) {
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick && props.onClick(e);
    if (!e.isDefaultPrevented()) {
      e.preventDefault();
    }

    if (props.href) {
      if (props.href.indexOf("http") !== -1 || props.href.indexOf("://") !== -1) {
        if (props.onOpenExternalLink) {
          props.onOpenExternalLink(props.href);
        } else {
          window.open(props.href);
        }
      } else {
        if (props.onOpenInternalLink) {
          props.onOpenInternalLink(props.href);
        } else {
          window.open(props.href);
        }
      }
    }
  }, [props.onClick, props.onOpenExternalLink, props.onOpenInternalLink]);

  const newProps = { ...props };
  delete newProps.styleActive;
  delete newProps.styleHover;
  delete newProps.onOpenExternalLink;
  delete newProps.onOpenInternalLink;
  delete newProps.reactionKey;
  delete newProps.altReactionerExtraProps;
  delete newProps.AltReactionerComponent;
  delete newProps.priority;

  if (props.styleActive || props.styleHover) {
    return (
      <props.AltReactionerComponent
        component="span"
        selector="a"
        reactionKey={props.reactionKey}
        action="click"
        useInFlow={true}
        priority={props.priority}
        {...props.altReactionerExtraProps}
      >
        <ReactifiedElementWithHoverAndActive
          {...(newProps as any)}
          tabIndex={0}
          Component="a"
          onClick={onClick}
          styleActive={props.styleActive}
          styleHover={props.styleHover}
        />
      </props.AltReactionerComponent>
    )
  }

  return (
    <props.AltReactionerComponent
      component="span"
      selector="a"
      reactionKey={props.reactionKey}
      action="click"
      useInFlow={true}
      priority={props.priority}
      {...props.altReactionerExtraProps}
    >
      <a {...newProps} onClick={onClick} tabIndex={0} role="link" />
    </props.AltReactionerComponent>
  )
}

interface IAccessibleImageProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<any>, any> {
  Tag: string;
  image: IImage;
  onImageClick: (image: IImage) => void;
  styleActive: any;
  styleHover: any;
  reactionKey: string;
  altReactionerExtraProps: any;
  AltReactionerComponent: AltReactionerComponentType;
  priority?: number;
  i18nLabelId: string;
  i18nLabelContext: string;
}

function AccessibleImage(props: IAccessibleImageProps) {
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick && props.onClick(e);
    props.onImageClick && props.onImageClick(props.image);
  }, [props.onClick, props.image, props.onImageClick]);

  const i18nLabel = useI18nRead({
    id: props.i18nLabelId,
    context: props.i18nLabelContext,
  }) as string;

  const newProps = { ...props };
  delete newProps.styleActive;
  delete newProps.styleHover;
  delete newProps.image;
  delete newProps.onImageClick;
  delete newProps.Tag;
  delete newProps.reactionKey;
  delete newProps.altReactionerExtraProps;
  delete newProps.AltReactionerComponent;
  delete newProps.priority;
  delete newProps.i18nLabelContext;
  delete newProps.i18nLabelId;

  const Tag = props.Tag as any;

  if (props.styleActive || props.styleHover) {
    if (!props.onImageClick) {
      return (
        <AltText
          component={ReactifiedElementWithHoverAndActive}
          componentGetElementFn="getElement"
          componentProps={{
            ...newProps,
            Component: props.Tag,
            styleActive: props.styleActive,
            styleHover: props.styleHover,
            ["aria-label"]: i18nLabel + (props.image.alt ? (" - " + props.image.alt) : ""),
          }}
          priority={props.priority}
        />
      );
    } else {
      return (
        <props.AltReactionerComponent
          component="span"
          selector={props.image.standalone ? "img" : ".image"}
          reactionKey={props.reactionKey}
          action="click"
          useInFlow={true}
          priority={props.priority}
          {...props.altReactionerExtraProps}
        >
          <ReactifiedElementWithHoverAndActive
            {...(newProps as any)}
            Component={props.Tag}
            onClick={onClick}
            styleActive={props.styleActive}
            styleHover={props.styleHover}
            tabIndex={0}
          />
        </props.AltReactionerComponent>
      );
    }
  }

  if (!props.onImageClick) {
    return (
      <AltText
        component={Tag}
        componentProps={{
          ...newProps,
          ["aria-label"]: i18nLabel + (props.image.alt ? (" - " + props.image.alt) : ""),
        }}
        priority={props.priority}
      />
    );
  }

  return (
    <props.AltReactionerComponent
      component="span"
      selector={props.image.standalone ? "img" : ".image"}
      reactionKey={props.reactionKey}
      action="click"
      useInFlow={true}
      priority={props.priority}
      {...props.altReactionerExtraProps}
    >
      <Tag {...newProps} onClick={onClick} tabIndex={0} />
    </props.AltReactionerComponent>
  )
}

interface IAccessibleFileProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<any>, any> {
  Tag: string;
  file: IFile;
  onFileClick: (file: IFile) => void;
  styleActive: any;
  styleHover: any;
  reactionKey: string;
  altReactionerExtraProps: any;
  AltReactionerComponent: AltReactionerComponentType;
  priority?: number;
}

function AccessibleFile(props: IAccessibleFileProps) {
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick && props.onClick(e);

    if (!e.isDefaultPrevented()) {
      e.preventDefault();
    }

    if (props.onFileClick) {
      props.onFileClick && props.onFileClick(props.file);
    } else {
      window.open(props.file.src);
    }
  }, [props.onClick, props.onFileClick, props.file]);

  const newProps = { ...props };
  delete newProps.styleActive;
  delete newProps.styleHover;
  delete newProps.file;
  delete newProps.onFileClick;
  delete newProps.Tag;
  delete newProps.reactionKey;
  delete newProps.altReactionerExtraProps;
  delete newProps.AltReactionerComponent;
  delete newProps.priority;

  if (props.styleActive || props.styleHover) {
    return (
      <props.AltReactionerComponent
        component="span"
        selector="a"
        reactionKey={props.reactionKey}
        action="click"
        useInFlow={true}
        priority={props.priority}
      >
        <ReactifiedElementWithHoverAndActive
          {...(newProps as any)}
          Component={props.Tag}
          onClick={onClick}
          styleActive={props.styleActive}
          styleHover={props.styleHover}
          tabIndex={0}
        />
      </props.AltReactionerComponent>
    );
  }

  const Tag = props.Tag as any;

  return (
    <props.AltReactionerComponent
      component="span"
      selector="a"
      reactionKey={props.reactionKey}
      action="click"
      useInFlow={true}
      priority={props.priority}
    >
      <Tag {...newProps} onClick={onClick} tabIndex={0} />
    </props.AltReactionerComponent>
  )
}

export interface ISentenceComponentProps {
  index: number;
  element: ISentence;
  children: React.ReactNode;
}

export interface IWordComponentProps {
  index: number;
  element: IWord;
  children: React.ReactNode;
}

interface IAccessibleFns {
  /**
   * When a link is clicked and it's external, what to do?
   * use this opportunity to for example show a dialog
   * "this is going to take you out of the app" kind of
   * and you may have the user to accept or reject it
   */
  onOpenExternalLink?: (url: string) => void;

  /**
   * When a link is clicked and it's internal what to do
   * you may for example use redirectTo or localizedRedirectTo
   */
  onOpenInternalLink?: (url: string) => void;

  /**
   * When an image is clicked what to do
   * you may for example have a popup where
   * the image shows extra large
   * 
   * grab the url at image.src
   */
  onImageClick?: (image: IImage) => void;

  /**
   * When a file is clicked what to do?
   * by default it downloads, grab the url
   * at file.src
   */
  onFileClick?: (file: IFile) => void;

  /**
   * The reaction key to use for images, all images
   * get a shared reaction key and are enumerated
   */
  imageReactionKey?: string;

  /**
   * The id to read the label to say it's an image
   */
  imageI18nId?: string;

  /**
   * The context in question for the label
   */
  imageI18nContext?: string;

  /**
   * The reaction key to use for links, all links
   * get a shared reaction key and are enumerated
   */
  linkReactionKey?: string;

  /**
   * The reaction key to use for videos, all videos
   * get a shared reaction key and are enumerated
   */
  videoReactionKey?: string;

  /**
   * The priority to use with the groups and elements, everything
   * will be set to this priority
   */
  priority?: number;

  /**
   * custom props to be used against the AltReactioner you decide
   * to use, use this to populate custom required props
   */
  altReactionerCustomProps?: (element: RichElement) => any;

  /**
   * Because this is not part of fast prototyping you are expected
   * to pass your own reactioner component to decide how things
   * are to be visually represented, you may use the fast prototyping one
   * here as it is compatible
   */
  AltReactionerComponent: AltReactionerComponentType;
  /**
   * Used with segmented trees, allows to wrap the sentence in this
   * instead of the default
   */
  SentenceComponent?: React.ComponentType<ISentenceComponentProps>;
  /**
   * Used with segmented trees, allows to wrap the word in this
   * instead of the default
   */
  WordComponent?: React.ComponentType<IWordComponentProps>;
}

function accessibilityEnabledCustomTextProcesser(
  fns: IAccessibleFns,
  element: RichElement | IText,
  props: any,
  info: {
    Tag: string,
    styleActive?: any,
    styleHover?: any,
    defaultReturn: (extraProps?: any) => React.ReactNode,
    parent: RichElement | IRootLevelDocument,
    trueParent: RichElement | IRootLevelDocument,
    tree: IRootLevelDocument,
    wordNumber: number,
    sentenceNumber: number,
  },
) {
  // invlid list item that has orphaned children
  const listItemOrphanedChildren = (
    (element as RichElement).type === "list-item" &&
    (element as RichElement).children.some((e) =>
      (e as IText).text ||
      (e as RichElement).type === "inline" ||
      (e as RichElement).type === "link" ||
      (e as RichElement).type === "sentence" ||
      (e as RichElement).type === "word"
    )
  );

  if (
    listItemOrphanedChildren || (
      (
        (element as RichElement).type === "paragraph" ||
        (element as RichElement).type === "title" ||
        (element as RichElement).type === "quote" ||

        // CORRUPTED ELEEMNTS
        // orphaned inline
        (
          ((element as RichElement).type === "inline" || (element as RichElement).type === "link") &&
          info.trueParent.type !== "paragraph" &&
          // this is special as we check list items
          // in case to see if they are containing direct children
          // that are not selectable
          info.trueParent.type !== "list-item"
        ) ||

        // orphaned text that does not follow other criteria
        (
          (element as IText).text &&
          // we expect text here
          info.trueParent.type !== "paragraph" &&
          info.trueParent.type !== "inline" &&
          info.trueParent.type !== "link" &&
          info.trueParent.type !== "quote" &&
          info.trueParent.type !== "title" &&

          // this is special as we check list items
          // in case to see if they are containing direct children
          // that are not selectable
          info.trueParent.type !== "list-item" &&

          // what? but okay
          info.trueParent.type !== "image" &&
          info.trueParent.type !== "file" &&
          info.trueParent.type !== "void-block" &&
          info.trueParent.type !== "void-superblock" &&
          info.trueParent.type !== "void-inline"
        )
      ) &&
      hasWords(element)
    )
  ) {
    if (info.styleActive || info.styleHover) {
      return (
        <AltText
          component={ReactifiedElementWithHoverAndActive}
          componentGetElementFn="getElement"
          componentProps={{
            Component: info.Tag,
            styleActive: info.styleActive,
            styleHover: info.styleHover,
            ...props,
          }}
          priority={fns.priority}
        >
          {props.children}
        </AltText>
      );
    }
    return (
      <AltText
        component={info.Tag}
        componentProps={props}
        priority={fns.priority}
      >
        {props.children}
      </AltText>
    );
  }

  if ((element as RichElement).type === "word") {
    if (fns.WordComponent) {
      const WordComponent = fns.WordComponent;
      return (
        <WordComponent
          element={element as any}
          index={info.sentenceNumber}
        >
          {props.children}
        </WordComponent>
      );
    }
    return (
      <span data-word-index={info.wordNumber} className="word">
        {props.children}
      </span>
    );
  }

  if ((element as RichElement).type === "sentence") {
    if (fns.SentenceComponent) {
      const SentenceComponent = fns.SentenceComponent;
      return (
        <SentenceComponent
          element={element as any}
          index={info.sentenceNumber}
        >
          {props.children}
        </SentenceComponent>
      );
    }
    return (
      <span data-sentence-index={info.sentenceNumber} className="sentence">
        {props.children}
      </span>
    );
  }

  if (
    (element as RichElement).type === "link"
  ) {
    // an empty link
    if (
      (element as any).children[0].type === "word" ?
        (
          (element as any).children[0].children[0].text === "" &&
          (element as any).children[0].children.length === 1 &&
          (element as any).children.length === 1
        ) :
        (
          (element as any).children[0].text === "" &&
          (element as any).children.length === 1
        )
    ) {
      return info.defaultReturn();
    }

    return (
      <AccessibleLink
        {...props}
        styleActive={info.styleActive}
        styleHover={info.styleHover}
        onOpenExternalLink={fns.onOpenExternalLink || null}
        onOpenInternalLink={fns.onOpenInternalLink || null}
        reactionKey={fns.linkReactionKey || "l"}
        AltReactionerComponent={fns.AltReactionerComponent}
        altReactionerExtraProps={fns.altReactionerCustomProps && fns.altReactionerCustomProps(element as RichElement)}
        priority={fns.priority}
      />
    );
  }

  // container types need to be wrapped
  if (
    (element as RichElement).type === "container" ||
    (element as RichElement).type === "custom" ||
    (
      (element as RichElement).type === "unmanaged" &&
      (element as RichElement).children.length
    )
  ) {
    return info.defaultReturn({
      ["data-alt-group"]: "DEFAULT",
    });
  }

  // clickable types
  if (
    (element as RichElement).type === "image"
  ) {
    return (
      <AccessibleImage
        {...props}
        styleActive={info.styleActive}
        styleHover={info.styleHover}
        image={element}
        onImageClick={fns.onImageClick || null}
        reactionKey={fns.linkReactionKey || "l"}
        AltReactionerComponent={fns.AltReactionerComponent}
        altReactionerExtraProps={fns.altReactionerCustomProps && fns.altReactionerCustomProps((element as RichElement))}
        priority={fns.priority}
        i18nLabelId={fns.imageI18nId || "rich_image"}
        i18nLabelContext={fns.imageI18nContext}
        Tag={info.Tag}
      />
    );
  }

  if ((element as RichElement).type === "file") {
    return (
      <AccessibleFile
        {...props}
        styleActive={info.styleActive}
        styleHover={info.styleHover}
        file={element}
        Tag={info.Tag}
        onFileClick={fns.onFileClick || null}
        reactionKey={fns.linkReactionKey || "f"}
        AltReactionerComponent={fns.AltReactionerComponent}
        altReactionerExtraProps={fns.altReactionerCustomProps && fns.altReactionerCustomProps((element as RichElement))}
        priority={fns.priority}
      />
    );
  }

  if ((element as RichElement).type === "video") {
    return (
      <AltText
        component="div"
        priority={fns.priority}
        uncontrolled={true}
      >
        {info.defaultReturn()}
      </AltText>
    )
  }

  return info.defaultReturn();
}

/**
 * This function is used to enable accessibility in general text values created
 * by the document, in the case of the fast prototyping mechanism it shall be passed to
 * onCustom function and makeTemplate should be set to true
 * 
 * The output of this function is passed as an argument to the onCustom function
 * during the reactification of text
 * 
 * 1. Raw Text is sanitized by the sanitize function (raw HTML)
 * 2. Raw text is deserialized (and maybe normalized)
 * 3. Processed text tree is then reactified - and this is where the onCustom function should be used
 * 4. Resulting react tree is displayed
 * 
 * This adds the following sugar to the reactification
 * - All paragraphs are alt text
 * - All containers are setup as a group so the text follows, this includes, container, custom, and tables
 * - All images are set as alt text (if they are alt text) or as an alt reactioner element
 * - All links are set as alt reactioner
 * - All files are set as alt reactioner
 * 
 * Please pass your own alt reactioner element, the fast prototyping AltBadgeReactioner can be used here
 * but you can also make your own, it must be compatible with the AltReactioner as that's what it expects
 * 
 * This does not affect UI Handled elements as the customization is powerless to touch such ui
 * handled elements, it also will not affect templated html content
 * 
 * example usage with fast prototyping badge reactioner
 * 
 * const textProcesser = getAccessibilityEnabledCustomTextProcesser({
 *   AltReactionerComponent: AltBadgeReactioner,
 *   altReactionerCustomProps: (element) => {
 *     if (element.type === "link") {
 *       return {
 *         sx: {verticalAlign: "baseline"}
 *       }
 *     }
 *     return null;
 *   }
 * });
 * 
 * which then it can be used in a text view node, this is only true for fast prototyping
 * text renderer
 * 
 * <View id="content" rendererArgs={{makeTemplate: true, onCustom: textProcesser}}/>
 * 
 * It's possible to manually raw text, but it's difficult.
 * 
 * If you write your own view renderer you will likely get it straight away sanitized and you
 * won't have to worry about sanitizing the content and processing the urls, etc... just grab
 * the current value
 * 
 * Then use the deserialize function to get a tree, and feed that output to reactifiy.
 * 
 * @param fns 
 * @returns 
 */
export function getAccessibilityEnabledCustomTextProcesser(fns: IAccessibleFns) {
  return accessibilityEnabledCustomTextProcesser.bind(null, fns);
}