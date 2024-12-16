import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ItemProvider, NoStateItemProvider } from "../../../providers/item";
import { ModuleProvider } from "../../../providers/module";
import ReaderMany from "../../../components/property/ReaderMany";
import Tabs from "@mui/material/Tabs";
import { IPropertySetterProps } from "../../../components/property/base";
import Tab from "@mui/material/Tab";
import { ISearchLoaderWithPaginationProps, SearchLoaderWithPagination } from "../search-loader-with-pagination";
import UserDataRetriever, { useUserDataRetriever } from "../../../components/user/UserDataRetriever";
import View from "../../../components/property/View";
import Box from "@mui/material/Box";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Reader, { TextReader } from "../../../components/property/Reader";

import Link from "../../../components/navigation/Link";
import SubmitActioner, { ISubmitActionerInfoArgType } from "../../../components/item/SubmitActioner";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Entry from "../../../components/property/Entry";
import I18nRead, { useI18nRead } from "../../../components/localization/I18nRead";

import ReplyIcon from "@mui/icons-material/Reply";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ReportIcon from "@mui/icons-material/Report";
import ForwardIcon from '@mui/icons-material/ForwardToInbox';
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Snackbar from "../snackbar";
import Fab from "@mui/material/Fab";
import Create from "@mui/icons-material/Create";
import RootRetriever, { useRootRetriever } from "../../../components/root/RootRetriever";
import type ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import { SubmitButton } from "../buttons";
import Chip from "@mui/material/Chip";
import ItemLoader from "../../../components/item/ItemLoader";
import { ConfigContext } from "../../../internal/providers/config-provider";
import { runSearchQueryFor } from "../../../internal/rq-client-util";
import { TokenContext } from "../../../internal/providers/token-provider";
import { UNSPECIFIED_OWNER } from "../../../../constants";
import type { ITagListSuggestion } from "../../renderers/PropertyEntry/PropertyEntryTagList";
import Setter from "../../../components/property/Setter";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { IPropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { SxProps, Theme, styled } from "@mui/material";
import { useAppLanguageRetriever } from "../../../components/localization/AppLanguageRetriever";
import { IPropertyEntryRendererProps } from "../../../internal/components/PropertyEntry";
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { PropertyDefinitionSupportedStringType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/string";
import type { EndpointErrorType } from "../../../../base/errors";
import { localizedRedirectTo } from "../../../components/navigation";
import TitleSetter from "../../../components/util/TitleSetter";
import { useQSPaginator } from "../../../components/search/Pagination";

const style = {
  flex: {
    display: "flex",
  },
  tabs: {
    "& .MuiTabs-scroller": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  },
  paginationBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  read: {
    backgroundColor: "#cfd8dc",
  },
  unread: {
  },
  avatarbox: {
    padding: "1rem 0",
  },
  userInfoBox: {
    padding: "1rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  username: {
    fontWeight: 600,
  },
  email: {
    fontSize: "0.75rem",
    fontWeight: 300,
    display: "inline",
  },
  subject: {
    fontSize: "2rem",
    fontWeight: 300,
    borderBottom: "solid 1px #ccc",
    paddingBottom: "1rem",
    marginBottom: "1rem",
    position: "relative",
    paddingTop: "1rem",
  },
  attachmentBox: {
    padding: "1rem",
    margin: "1rem",
    border: "solid 1px #ccc",
    borderRadius: "5px",
  },
  attachments: {
    fontSize: "1.5rem",
    fontWeight: 300,
    borderBottom: "solid 1px #ccc",
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
  spamWarning: {
    width: "100%",
  },
  messageOptions: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
  },
  chip: {
    margin: "10px 10px 0 10px",
    fontWeight: 800,
  },
  chipOulined: {
    margin: "5px 10px 5px 10px",
    fontWeight: 800,
  },
  chipBasic: {
    "& .MuiChip-label": {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '10px',
      fontSize: "14px",
    },
  },
  avatarBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userReceiverBox: {

  },
  avatarOverlayer: {
    "&:not(:first-of-type)": {
      marginLeft: "-30px",
    },
    "&:last-child": {
      marginRight: "10px",
    },
  }
}

type LocationType = "inbox" | "unread" | "spam" | "outbox";

export interface ISwitcherComponentProps {
  location: LocationType;
  onLocationChange: (e: React.SyntheticEvent, value: LocationType) => void;
}

export interface IListComponentProps { }
export interface IWrapperComponentProps { };
export interface IPaginatorComponentProps { };
export interface INoResultsComponentProps {
  err?: EndpointErrorType;
}
export interface ISubmitButtonProps {
  onClick: () => void;
  arg?: ISubmitActionerInfoArgType;
}

export interface IBasicEmailClientProps {
  /**
   * The avatar element that is used to render avatars within a given
   * user context
   */
  userAvatarElement: React.ReactNode;
  /**
   * the username function to render the username
   * @param sender whether you are currently the sender, if not you are the receiver
   * @returns 
   */
  userUsernameElement: (sender: boolean) => React.ReactNode;
  /**
   * Properties to load for the user
   */
  userLoadProperties: string[];
}

export interface IEmailClientProps extends IBasicEmailClientProps {
  /**
   * sx props for the fab element
   */
  fabComponent: React.ReactNode;
  /**
   * The current location for the email client
   */
  location: LocationType;
  /**
   * An event that triggers when the location changes
   * @param e 
   * @param location 
   * @returns 
   */
  onLocationChange: (e: React.SyntheticEvent, location: LocationType) => void;
  /**
   * The position of the switcher component
   */
  switcherComponentPosition?: "top" | "bottom";
  /**
   * Switcher component to use instead of the default
   */
  SwitcherComponent?: React.ComponentType<ISwitcherComponentProps>;
  /**
   * List component to use instead of the default this wraps every message
   */
  ListComponent?: React.ComponentType<IListComponentProps>;
  /**
   * List component element
   */
  ListElementComponent?: React.ComponentType<IListElementComponentProps>;
  /**
   * Wrapper component to use instead of the default this wraps the whole
   * box area
   */
  WrapperComponent?: React.ComponentType<IWrapperComponentProps>;
  /**
   * Internal wrapper to use instead of the default this wraps the list and the paginator
   */
  InternalWrapperComponent?: React.ComponentType<IWrapperComponentProps>;
  /**
   * Wrapper to use instead of the default for the paginator object
   */
  PaginatorWrapperComponent?: React.ComponentType<IPaginatorComponentProps>;
  /**
   * No search results found for a given search
   */
  NoResultsComponent?: React.ComponentType<INoResultsComponentProps>;
  /**
   * Extra props to give the search loader
   */
  searchLoaderProps?: Partial<ISearchLoaderWithPaginationProps>;
  /**
   * When a new email is sent and given an id this represents where
   * the url of such a message is located
   * @param id the id of the email
   * @returns the url where it can be visualized
   */
  emailUrlResolver: (id: string) => string;
  /**
   * The url to create new emails
   */
  emailNewUrl: string;
  /**
   * The email client cannot be used if you are not logged in
   * use this to specify that error
   */
  mustBeLoggedInNode?: React.ReactNode;
  /**
   * Fallback avatar to render avatars
   */
  FallbackAvatarComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /**
   * Search filter
   */
  searchFilter?: string;
  /**
   * Whethet to use search engine for the searching
   */
  useSearchEngine?: boolean;
  /**
   * Whether to use full highlights during the search
   */
  useSearchEngineFullHighlights?: number;
}

/**
 * The props for the email reader where a single email is to be visualized
 */
export interface IEmailReaderProps extends IBasicEmailClientProps, IEmailSenderPropsBase {
  /**
   * the id of the email in question that is to be visualized
   */
  id: string;
  /**
   * Wrapper component to used inside of the content
   */
  WrapperContent?: React.ComponentType<IWrapperComponentProps>;
  /**
   * Wrapper component to used inside of the content
   */
  WrapperSpamWarning?: React.ComponentType<IWrapperComponentProps>;
  /**
   * Spam warning to use inside the warning object
   * defaults to <I18nRead id="spam_warning" />
   */
  spamWarning?: React.ReactNode;
  /**
   * Wrapper component to used inside of the content
   */
  WrapperUser?: React.ComponentType<IWrapperComponentProps>;
  /**
   * Resolve the url used to reply to a message
   * @param replyOf the id of the email we are trying to reply
   * @returns 
   */
  replyUrlResolver: (replyOf: string) => string;
  /**
   * Resolve the url used to reply to a message (all involved targets)
   * @param replyOf the id of the email we are trying to reply
   * @returns 
   */
  replyAllUrlResolver: (replyOf: string) => string;
  /**
   * Resolve the url used to forward a message
   * @param replyOf the id of the email we are trying to forward
   * @returns 
   */
  forwardUrlResolver: (replyOf: string) => string;
  /**
   * If we are currently replying
   */
  replying?: "reply-all" | "reply" | "forward";
  /**
   * Fallback avatar to render avatars
   */
  FallbackAvatarComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /**
   * Use the given property to be set as the title
   * for example the subjct
   */
  setAsTitle?: string;
  /**
   * An alternative for the entire content
   * you should use <View content and <View attachments for displaying
   * the content itself and <View subject
   */
  ContentViewer?: React.ComponentType<IContentViewerProps>;
}

/**
 * Props for the custom content viewer
 */
export interface IContentViewerProps {
  isSpam: boolean;
  canReply: boolean;
  replyURL: string;
  canReplyAll: boolean;
  replyAllURL: string;
  canForward: boolean;
  forwardURL: string;
  i18nReply: string;
  i18nReplyAll: string;
  i18nForward: string;
  i18nToggleSpam: string;
  isTogglingSpam: boolean;
  toggleSpam: () => void;
  children: React.ReactNode;
}

/**
 * The default switcher component to switch between inbox/outbox/etc...
 * 
 * @param props 
 * @returns 
 */
export function DefaultSwitcherComponent(props: ISwitcherComponentProps) {
  return (
    <Tabs
      onChange={props.onLocationChange}
      value={props.location}
      sx={style.tabs}
    >
      <Tab value="unread" label={<I18nRead id="unread" context="mail/mail" capitalize={true} />} />
      <Tab value="inbox" label={<I18nRead id="inbox" context="mail/mail" capitalize={true} />} />
      <Tab value="outbox" label={<I18nRead id="outbox" context="mail/mail" capitalize={true} />} />
      <Tab value="spam" label={<I18nRead id="spam" context="mail/mail" capitalize={true} />} />
    </Tabs>
  )
}


interface IEmailSenderPropsBase {
  /**
   * In order the properties to use for the user, username field
   * normally it'd be ["username"] but it could be ["real_name", "username"]
   * use if you have more than one field for the username
   */
  userNameProperties: string[];
  /**
   * A label to use when the value is invalid for example, a bad unknown user
   * or something else entirely
   */
  userInvalidLabel: React.ReactNode;
  /**
   * Determines the label as how it is to be displayed by default it will take the first value
   * according to the order given
   */
  userNameDisplayer?: (...args: Array<string | IPropertyDefinitionSupportedTextType>) => React.ReactNode;
  /**
   * Used to display email addresses
   * @param rfcEmail 
   * @returns 
   */
  emailDisplayer?: (rfcEmail: string) => React.ReactNode;
  /**
   * Same as the userNameProperties but used with other objects of other types
   * the key is the qualified name and represents the properties in order
   */
  objectsNameResolver?: {
    [qualifiedName: string]: string[];
  };
  /**
   * Determines the label as how it is to be displayed by default it will take the first value
   * according to the order given
   */
  objectsNameDisplayer?: {
    [qualifiedName: string]: (...args: Array<string | IPropertyDefinitionSupportedTextType>) => React.ReactNode;
  },
  /**
   * A list of qualified path name that can be replied all
   */
  objectsAllowedReplyAll?: string[];
  /**
   * A blacklist for replying all
   */
  replyAllBlacklist?: string[];
  /**
   * Same as the userInvalidLabel but used with other objects of other types
   * the key is the qualified name and represents the properties in order
   */
  objectsInvalidLabel?: {
    [qualifiedName: string]: React.ReactNode;
  };
  /**
   * This should resolve for a given input what the value should resolve
   * for, normally this only applies to internal usernames
   * @param v the information regarding this user
   * @returns a string, should be either a 
   */
  valueResolver?: (v: IInternalValueResolverOptions) => Promise<string>;
  /**
   * When a new email is sent and given an id this represents where
   * the url of such a message is located
   * @param id the id of the email
   * @returns the url where it can be visualized
   */
  emailUrlResolver: (id: string) => string;
  /**
   * Specify a query string or just arbitrary string
   * to append to newly resolved urls
   */
  emailUrlResolverAddQSToNew?: string;
  /**
   * Use to resolve suggestions for the user
   * @param v the string being inputted
   * @returns 
   */
  onFetchSuggestions?: (v: string) => Promise<ITagListSuggestion[]>;
  /**
   * Wrapper component to use instead of the default this wraps the whole
   * box area
   */
  WrapperComponent?: React.ComponentType<IWrapperComponentProps>;
  SubmitButton?: React.ComponentType<ISubmitButtonProps>;
  targetEntryRenderer?: React.ComponentType<IPropertyEntryRendererProps<PropertyDefinitionSupportedStringType>>;
  targetEntryRendererArgs?: any;
  subjectEntryRenderer?: React.ComponentType<IPropertyEntryRendererProps<IPropertyDefinitionSupportedTextType>>;
  subjectEntryRendererArgs?: any;
  contentEntryRenderer?: React.ComponentType<IPropertyEntryRendererProps<IPropertyDefinitionSupportedTextType>>;
  contentEntryRendererArgs?: any;
  attachmentsEntryRenderer?: React.ComponentType<IPropertyEntryRendererProps<PropertyDefinitionSupportedFilesType>>;
  attachmentsEntryRendererArgs?: any;
  hideLabels?: boolean;
  hideLabelTarget?: boolean;
  hideLabelSubject?: boolean;
  hideLabelContent?: boolean;
  hideLabelAttachments?: boolean;
  hideDescriptions?: boolean,
  hideDescriptionTarget?: boolean;
  hideDescriptionSubject?: boolean;
  hideDescriptionContent?: boolean;
  hideDescriptionAttachments?: boolean;
  /**
   * Determine how the entries are to be rendered
   * @returns 
   */
  customEntriesRenderer?: (
    target: React.ReactNode,
    subject: React.ReactNode,
    content: React.ReactNode,
    attachments: React.ReactNode,
    button: React.ReactNode,
  ) => React.ReactNode;
}

/**
 * The props for the email sender where we are sending a first time email
 */
export interface IEmailSenderProps extends IEmailSenderPropsBase {
  /**
   * prefill for the subject field
   */
  subjectPrefill?: IPropertyDefinitionSupportedTextType;
  /**
   * prefill for the target field
   * eg. ["admin@gmail.com", "admin", "USER_ID", "ID$MOD_something__IDEF_else"]
   */
  targetPrefill?: string[];
  /**
   * reply of something? if so give the id of the email that is being replied
   */
  replyOf?: string;
}

interface IActualMailSenderPropsBase {
  /**
   * The user id trying to send
   */
  userId: string;
  /**
   * Current mail domain
   */
  mailDomain: string;
  /**
   * Mail item definition
   */
  mailIdef: ItemDefinition;
  /**
   * user item definition
   */
  userIdef: ItemDefinition;
  /**
   * Current user token
   */
  token: string;
}

/**
 * Actual props for the mail sender
 */
interface IActualMailSenderProps extends IEmailSenderProps, IActualMailSenderPropsBase {
  /**
   * Whether this user supports sending external emails
   */
  supportsExternal: boolean;
}

interface IInternalValueResolverOptions extends IActualMailSenderPropsBase {
  /**
   * The target username being attempted to be resolved
   */
  username: string;
  /**
   * Whether the full domain syntax was used with a given ending
   * for a local email, and was clearly specified the target domain as local
   * this implies that this must be completed for an user
   */
  usedFullDomainSyntax: boolean;
}

/**
 * Generates a function for custom resolving at a given endpoint
 * the endpoint will be provided the username as a GET query parameter
 * and expects to receive a status 200 with the given textual id
 * @param endpoint 
 * @returns 
 */
export function getValueResolverAtEndpoint(endpoint: string): (v: IInternalValueResolverOptions) => Promise<string> {
  return async (v: IInternalValueResolverOptions) => {
    const result = await fetch(endpoint + "?username=" + encodeURIComponent(v.username));
    if (result.status === 200) {
      return await result.text();
    } else {
      return UNSPECIFIED_OWNER;
    }
  }
}

/**
 * This is the default resolver that will look over all the users and find one with the given
 * username in order to retrieve it and its id, however if you have restricted search policies
 * you may want to change the default behaviour
 * 
 * @param v 
 * @returns 
 */
export async function defaultValueResolver(v: IInternalValueResolverOptions) {
  const results = await runSearchQueryFor({
    args: {
      "IN_username": [v.username],
    },
    fields: {
      count: {},
      records: {
        id: {},
      },
    },
    createdBy: null,
    orderBy: {},
    parentedBy: null,
    cachePolicy: "none",
    token: v.token,
    itemDefinition: v.userIdef.getSearchModeCounterpart(),
    traditional: false,
    offset: 0,
    limit: 1,
    until: null,
    language: "en",
    versionFilter: null,
    waitAndMerge: true,
    since: null,
    enableNulls: false,
  }, null);

  if (!results || results.error) {
    console.warn("Could not determine an user for " + v.username + " because the request failed, you may want to use your own valueResolver");
  }

  if (!results || results.error || results.count === 0 || !results.records[0]) {
    return UNSPECIFIED_OWNER;
  } else {
    return results.records[0].id;
  }
}

function defaultEntriesRenderer(
  target: React.ReactNode,
  subject: React.ReactNode,
  content: React.ReactNode,
  attachments: React.ReactNode,
  button: React.ReactNode,
) {
  return (
    <>
      {target}
      {subject}
      {content}
      {attachments}
      {button}
    </>
  );
}

/**
 * Actual email sender
 * @param props
 * @returns 
 */
function ActualMailSender(props: IActualMailSenderProps) {
  const onValueInputted = useCallback(async (v: string) => {
    const trimmed = v.trim();
    const splitted = trimmed.split("@");
    const username = splitted[0];
    const domain = splitted[1] || props.mailDomain;

    if (domain === props.mailDomain) {
      const resolver = props.valueResolver || defaultValueResolver;
      return resolver({
        mailDomain: props.mailDomain,
        mailIdef: props.mailIdef,
        token: props.token,
        userId: props.userId,
        userIdef: props.userIdef,
        username,
        usedFullDomainSyntax: splitted[1] === props.mailDomain,
      });
    } else {
      return trimmed;
    }
  }, [props.mailDomain, props.userNameProperties, props.userIdef, props.token]);
  const chipRenderer = useCallback((v: string) => {
    const chipstyle = [style.chipBasic, props.targetEntryRendererArgs?.fieldVariant === "outlined" ? style.chipOulined : style.chip];
    if (v.includes("@")) {
      return (
        <Chip
          label={props.emailDisplayer ? props.emailDisplayer(v) : v}
          sx={chipstyle}
          color="primary"
        />
      );
    } else {
      const splitted = v.split("$");
      const type = splitted[1] || "MOD_users__IDEF_user";
      const isUser = type === "MOD_users__IDEF_user";
      const id = splitted[0];

      if (!isUser && (!props.objectsNameResolver || !props.objectsNameResolver[type])) {
        return (
          <Chip
            label={v}
            sx={chipstyle}
            color="info"
          />
        );
      }

      if (isUser && id === props.userId) {
        return (
          <Chip
            label={
              <strong><I18nRead id="me" capitalize={true} context="mail/mail" /></strong>
            }
            sx={chipstyle}
            color="default"
          />
        );
      }

      // this is the qualified name we should
      // be able to skip the module provider
      // this however means the module is in the wrong context
      return (
        <ItemProvider
          itemDefinition={type}
          forId={id}
          properties={isUser ? props.userNameProperties : props.objectsNameResolver[type]}
          static="TOTAL"
        >
          <ItemLoader>
            {(arg) => {
              if (arg.notFound) {
                const invalidLabel = (isUser ? props.userInvalidLabel : props.objectsInvalidLabel[type]) || "ERR???";
                return (
                  <Chip
                    label={invalidLabel}
                    sx={chipstyle}
                    color="error"
                  />
                );
              }

              return (
                <ReaderMany data={isUser ? props.userNameProperties : props.objectsNameResolver[type]}>
                  {(...args: Array<string | IPropertyDefinitionSupportedTextType>) => {
                    let valueToDisplay: React.ReactNode = null;

                    const displayerFn = isUser ? props.userNameDisplayer : (props.objectsNameDisplayer && props.objectsNameDisplayer[type]);
                    if (displayerFn) {
                      valueToDisplay = displayerFn(...args);
                    } else {
                      valueToDisplay = args.find((v) => !!v);
                      if (valueToDisplay && typeof valueToDisplay !== "string") {
                        valueToDisplay = (valueToDisplay as any).value;
                      }

                      if (!valueToDisplay) {
                        valueToDisplay = "???";
                      }
                    }

                    return (
                      <Chip
                        label={valueToDisplay}
                        sx={chipstyle}
                        color={isUser ? "primary" : "secondary"}
                      />
                    );
                  }}
                </ReaderMany>
              )
            }}
          </ItemLoader>
        </ItemProvider>
      );
    }
  }, [
    props.objectsNameResolver,
    props.objectsNameDisplayer,
    props.userNameDisplayer,
    props.objectsInvalidLabel,
    props.userNameProperties,
    props.userInvalidLabel,
    props.targetEntryRendererArgs && props.targetEntryRendererArgs.fieldVariant,
  ])

  const prefills: IPropertySetterProps<PropertyDefinitionSupportedType>[] = [];
  if (props.targetPrefill) {
    prefills.push({
      id: "target",
      value: props.targetPrefill,
    });
  }
  if (props.subjectPrefill) {
    prefills.push({
      id: "subject",
      value: props.subjectPrefill,
    });
  }

  const Wrapper = props.WrapperComponent || "div";
  const SubmitButtonToUse = props.SubmitButton;

  // const onFetchSuggestionsWrapped = useCallback(async (v: string) => {
  //   const suggs = await props.onFetchSuggestions(v);
  //   if (suggs) {
  //     return suggs.map((v) => ({
  //       ...v,
  //       value: v.value + "@__RAW__",
  //     }));
  //   }
  //   return [];
  // }, [props.onFetchSuggestions]);

  const entriesRenderer = props.customEntriesRenderer || defaultEntriesRenderer;

  return (
    <Wrapper>
      <ModuleProvider module="mail">
        <ItemProvider
          itemDefinition="mail"
          properties={[
            "source",
            "target",
            "content",
            "attachments",
            "cid_attachments",
            "subject",
            "is_sender",
            "is_receiver",
            "read",
            "spam",
          ]}
          setters={[
            {
              id: "source",
              value: props.userId,
            },
            {
              id: "is_sender",
              value: true,
            },
            {
              id: "read",
              value: true,
            },
            {
              id: "spam",
              value: false,
            },
          ]}
          prefills={prefills}
        >
          {
            entriesRenderer(
              (
                <Entry
                  id="target"
                  rendererArgs={{
                    chipRenderer,
                    onValueInputted,
                    fetchSuggestions: props.onFetchSuggestions,
                    // enterWithSpace: true,
                    enterWithComma: true,
                    ...props.targetEntryRendererArgs,
                  }}
                  renderer={props.targetEntryRenderer}
                  hideLabel={props.hideLabels || props.hideLabelTarget}
                  hideDescription={props.hideDescriptions || props.hideDescriptionTarget}
                  autoFocus={!props.targetPrefill}
                />
              ),
              (
                <Entry
                  id="subject"
                  autoFocus={!props.subjectPrefill && !!props.targetPrefill}
                  renderer={props.subjectEntryRenderer}
                  rendererArgs={props.subjectEntryRendererArgs}
                  hideLabel={props.hideLabels || props.hideLabelSubject}
                  hideDescription={props.hideDescriptions || props.hideDescriptionSubject}
                />
              ),
              (
                <Entry
                  id="content"
                  autoFocus={!!props.subjectPrefill && !!props.targetPrefill}
                  renderer={props.contentEntryRenderer}
                  rendererArgs={props.contentEntryRendererArgs}
                  hideLabel={props.hideLabels || props.hideLabelContent}
                  hideDescription={props.hideDescriptions || props.hideDescriptionContent}
                />
              ),
              (
                <Entry
                  id="attachments"
                  renderer={props.attachmentsEntryRenderer}
                  rendererArgs={props.attachmentsEntryRendererArgs}
                  hideLabel={props.hideLabels || props.hideLabelAttachments}
                  hideDescription={props.hideDescriptions || props.hideDescriptionAttachments}
                />
              ),
              (
                <>
                  {!props.SubmitButton ? <SubmitButton
                    i18nId="send"
                    options={{
                      properties: [
                        "source",
                        "target",
                        "content",
                        "attachments",
                        "cid_attachments",
                        "subject",
                        "is_sender",
                        "is_receiver",
                        "read",
                        "spam",
                      ],
                      cleanStateOnSuccess: true,
                      parentedBy: props.replyOf ? {
                        id: props.replyOf,
                        item: props.mailIdef.getQualifiedPathName(),
                      } : null
                    }}
                    redirectOnSuccess={
                      (status) => {
                        return props.emailUrlResolver(status.id) +
                          (props.emailUrlResolverAddQSToNew ? props.emailUrlResolverAddQSToNew : "");
                      }
                    }
                    redirectReplace={true}
                  /> : null}

                  <SubmitActioner>
                    {(actioner) => {
                      let button: React.ReactNode;
                      if (props.SubmitButton) {
                        const onClick = async () => {
                          const status = await actioner.submit({
                            properties: [
                              "source",
                              "target",
                              "content",
                              "attachments",
                              "cid_attachments",
                              "subject",
                              "is_sender",
                              "is_receiver",
                              "read",
                              "spam",
                            ],
                            cleanStateOnSuccess: true,
                            parentedBy: props.replyOf ? {
                              id: props.replyOf,
                              item: props.mailIdef.getQualifiedPathName(),
                            } : null,
                          });

                          if (status.id) {
                            localizedRedirectTo(props.emailUrlResolver(status.id) +
                              (props.emailUrlResolverAddQSToNew ? props.emailUrlResolverAddQSToNew : ""), {
                              replace: true,
                            });
                          }
                        }

                        button = (
                          <SubmitButtonToUse onClick={onClick} arg={actioner} />
                        );
                      }

                      return (
                        <>
                          {button}
                          <Snackbar
                            id={"email-send-error"}
                            severity="error"
                            i18nDisplay={actioner.submitError}
                            open={!!actioner.submitError}
                            onClose={actioner.dismissError}
                          />
                        </>
                      )
                    }}
                  </SubmitActioner>
                </>
              ),
            )
          }

          <Reader id="target">
            {(target: string[]) => {
              const isReceiver = target ? target.includes(props.userId) : false;
              return (
                <Setter id="is_receiver" value={isReceiver} />
              );
            }}
          </Reader>
        </ItemProvider>
      </ModuleProvider>
    </Wrapper>
  );
}

export function EmailSender(props: IEmailSenderProps) {
  const config = useContext(ConfigContext);
  const tokenData = useContext(TokenContext);
  const userData = useUserDataRetriever();
  const root = useRootRetriever();

  const hasEExternal = (root.root.registry["users/user"] as ItemDefinition).hasPropertyDefinitionFor("e_external", true);
  if (hasEExternal) {
    return (
      <ModuleProvider
        module="users"
      >
        <ItemProvider
          itemDefinition="user"
          forId={userData.id}
          properties={["e_external"]}
        >
          <Reader id="e_external">
            {(hasEExternal: boolean) => (
              <ActualMailSender
                {...props}
                supportsExternal={hasEExternal}
                userId={userData.id}
                mailDomain={config.mailDomain}
                mailIdef={root.root.registry[config.mailStorage] as ItemDefinition}
                userIdef={root.root.registry["users/user"] as ItemDefinition}
                token={tokenData.token}
              />
            )}
          </Reader>
        </ItemProvider>
      </ModuleProvider>
    )
  }

  return (
    <ActualMailSender
      {...props}
      supportsExternal={false}
      userId={userData.id}
      mailDomain={config.mailDomain}
      mailIdef={root.root.registry[config.mailStorage] as ItemDefinition}
      userIdef={root.root.registry["users/user"] as ItemDefinition}
      token={tokenData.token}
    />
  );
}

export function EmailReader(props: IEmailReaderProps) {
  const appLanguage = useAppLanguageRetriever();
  const userData = useUserDataRetriever();

  const i18nMarkAsSpam = useI18nRead({ id: "mark_as_spam", context: "mail/mail" }) as string;
  const i18nMarkAsSafe = useI18nRead({ id: "mark_as_safe", context: "mail/mail" }) as string;
  const i18nForward = useI18nRead({ id: "forward", context: "mail/mail" }) as string;
  const i18nReply = useI18nRead({ id: "reply", context: "mail/mail" }) as string;
  const i18nReplyAll = useI18nRead({ id: "reply_all", context: "mail/mail" }) as string;

  return (
    <ModuleProvider module="mail">
      <ItemProvider
        itemDefinition="mail"
        forId={props.id}
        properties={[
          "is_sender",
          "is_receiver",
          "spam",
          "read",
          "source",
          "target",
          "content",
          "attachments",
          "cid_attachments",
          "subject",
        ]}
        cleanOnDismount={true}
        static="TOTAL"
      >
        <ReaderMany data={["parent_id", "source", "read", "spam", "target"]}>
          {(parentId: string, source: string, read: boolean, spam: boolean, target: string[]) => {
            // read is false, this means it should be executed since it's not null
            // it will ensure that it is null
            const submitRead = (
              <SubmitActioner execute={(actioner) => {
                actioner.submit({
                  properties: ["read"],
                  action: "edit",
                  propertyOverrides: [
                    {
                      id: "read",
                      value: true,
                    }
                  ],
                  waitAndMerge: true,
                });
              }} executeIf={read === false} />
            );

            let avatar: React.ReactNode = null;
            let username: React.ReactNode = null;
            let useUser: boolean = false;
            let relevantEmail: string = null;
            if (!source) {
              avatar = <Avatar>?</Avatar>;
            } else if (source.includes("@")) {
              const splitted = source.split("<");
              const sourceUsername = splitted.length === 2 ? splitted[0].trim() : null;
              const letterToUse = splitted[0][0].toUpperCase() || "?";
              avatar = <Avatar>{letterToUse}</Avatar>;
              username = sourceUsername || source;
              if (username !== source) {
                relevantEmail = source;
              }
            } else {
              useUser = true;
              avatar = props.userAvatarElement;
              username = props.userUsernameElement(true);
            }

            let userContent = (
              <Box sx={style.flex}>
                <Box sx={style.avatarbox}>
                  {avatar}
                </Box>
                <Box sx={style.userInfoBox}>
                  <Box sx={style.username}>
                    {username}

                    {relevantEmail ? <Box sx={style.email}>
                      {" " + relevantEmail}
                    </Box> : null}
                  </Box>

                  <Box sx={style.userReceiverBox}>
                    <EmailAccum
                      avatarAccum={[]}
                      usernameAccum={[]}
                      isSources={false}
                      sourceOrTargetToConsume={0}
                      sourceOrTargets={target}
                      userAvatarElement={null}
                      userLoadProperties={props.userLoadProperties}
                      userUsernameElement={props.userUsernameElement}
                      FallbackAvatarComponent={props.FallbackAvatarComponent}
                    >
                      {(avatars, usernames) => (
                        <I18nRead id="wrote_to" args={[usernames]} context="mail/mail" />
                      )}
                    </EmailAccum>
                  </Box>
                </Box>
              </Box>
            );

            if (useUser) {
              userContent = (
                <ModuleProvider module="users">
                  <ItemProvider
                    itemDefinition="user"
                    forId={source}
                    static="TOTAL"
                    properties={props.userLoadProperties}
                    waitAndMerge={true}
                  >
                    {userContent}
                  </ItemProvider>
                </ModuleProvider>
              )
            }

            const targetsToReplyAll = (source ? [source] : []).concat(target || []).filter((t, index, arr) => arr.indexOf(t) === index && t !== userData.id)
              // remove objects from reply all
              .filter((t) => {
                // chck the type to see if it's allowed
                if (!t.includes("@") && t.includes("$")) {
                  const type = t.split("$")[1];
                  const isAllowedByType = ((props.objectsAllowedReplyAll || []).includes(type));
                  if (!isAllowedByType) {
                    return false;
                  }
                }

                // check the blacklist
                if (!props.replyAllBlacklist) {
                  return true;
                }

                return !props.replyAllBlacklist.includes(t);
              });

            const targetsToReply = source === userData.id ? targetsToReplyAll : ((props.replyAllBlacklist || []).includes(source) ? [] : [source]);

            // can reply if it can reply to source
            const canReply = targetsToReply.length >= 1;
            // can reply all if the targets to reply all are different from the reply otherwise it's the same
            const canReplyAll = targetsToReply === targetsToReplyAll ? false : !targetsToReplyAll.every((t) => targetsToReply.includes(t));

            const ContentViewer = props.ContentViewer;

            let content: React.ReactNode = ContentViewer ? (
              <SubmitActioner>
                {(actioner) => {
                  const toggleSpam = actioner.submit.bind(null, {
                    properties: ["spam"],
                    action: "edit",
                    propertyOverrides: [
                      {
                        id: "spam",
                        value: !spam,
                      }
                    ]
                  });

                  return (
                    <ContentViewer
                      canForward={true}
                      forwardURL={props.forwardUrlResolver(props.id)}
                      canReply={canReply}
                      replyURL={props.replyUrlResolver(props.id)}
                      canReplyAll={canReplyAll}
                      replyAllURL={props.replyAllUrlResolver(props.id)}
                      i18nReply={i18nReply}
                      i18nForward={i18nForward}
                      i18nReplyAll={i18nReplyAll}
                      i18nToggleSpam={spam ? i18nMarkAsSafe : i18nMarkAsSpam}
                      isSpam={spam}
                      isTogglingSpam={actioner.submitting}
                      toggleSpam={toggleSpam}
                    >
                      <Snackbar
                        id={"email-mark-error-" + props.id}
                        severity="error"
                        i18nDisplay={actioner.submitError}
                        open={!!actioner.submitError}
                        onClose={actioner.dismissError}
                      />
                    </ContentViewer>
                  )
                }}
              </SubmitActioner>
            ) : (
              <>
                <Typography variant="h3" sx={style.subject}>
                  <View id="subject" />

                  <Box sx={style.messageOptions}>
                    <SubmitActioner>
                      {(actioner) => {
                        const toggleSpam = actioner.submit.bind(null, {
                          properties: ["spam"],
                          action: "edit",
                          propertyOverrides: [
                            {
                              id: "spam",
                              value: !spam,
                            }
                          ]
                        });

                        return (
                          <>
                            <I18nRead id={spam ? "mark_as_safe" : "mark_as_spam"}>
                              {(i18nMark: string) => (
                                <IconButton
                                  onClick={toggleSpam}
                                  title={i18nMark}
                                  disabled={actioner.submitting}
                                >
                                  {spam ? <HealthAndSafetyIcon /> : <ReportIcon />}
                                </IconButton>
                              )}
                            </I18nRead>
                            <Snackbar
                              id={"email-mark-error-" + props.id}
                              severity="error"
                              i18nDisplay={actioner.submitError}
                              open={!!actioner.submitError}
                              onClose={actioner.dismissError}
                            />
                          </>
                        )
                      }}
                    </SubmitActioner>
                    {canReply ? <Link to={props.replyUrlResolver(props.id)}>
                      <I18nRead id="reply">
                        {(i18nReply: string) => (
                          <IconButton
                            title={i18nReply}
                          >
                            <ReplyIcon />
                          </IconButton>
                        )}
                      </I18nRead>
                    </Link> : null}
                    {canReplyAll ? <Link to={props.replyAllUrlResolver(props.id)}>
                      <I18nRead id="reply_all">
                        {(i18nReplyAll: string) => (
                          <IconButton
                            title={i18nReplyAll}
                          >
                            <ReplyAllIcon />
                          </IconButton>
                        )}
                      </I18nRead>
                    </Link> : null}
                    <Link to={props.forwardUrlResolver(props.id)}>
                      <I18nRead id="forward">
                        {(i18nForward: string) => (
                          <IconButton
                            title={i18nForward}
                          >
                            <ForwardIcon />
                          </IconButton>
                        )}
                      </I18nRead>
                    </Link>
                  </Box>
                </Typography>

                <Box>
                  <View id="content" />
                </Box>

                <Reader id="attachments">
                  {(attachments) => {
                    if (!attachments) {
                      return null;
                    }

                    return (
                      <Box sx={style.attachmentBox}>
                        <Typography variant="h6" sx={style.attachments}>
                          <I18nRead id="label" propertyId="attachments" capitalize={true} />
                        </Typography>
                        <View id="attachments" />
                      </Box>
                    )
                  }}
                </Reader>
              </>
            );

            if (props.replying) {
              const senderArgs = {
                ...props,
                replyOf: props.id,
              }
              const replyObject = props.replying === "forward" ? (
                <ItemLoader>
                  {(state) => {
                    return (state.loaded ? (
                      <I18nRead id="no_subject" context="mail/mail">
                        {(i18nNoSubject: string) => (
                          <Reader id="subject">
                            {(subject: string) => (
                              <I18nRead id="re_f" context="mail/mail" args={[subject || i18nNoSubject]}>
                                {(i18nReF: string) => (
                                  <EmailSender
                                    {...senderArgs}
                                    subjectPrefill={{
                                      value: i18nReF,
                                      language: appLanguage.currentLanguage.code,
                                    }}
                                  />
                                )}
                              </I18nRead>
                            )}
                          </Reader>
                        )}
                      </I18nRead>
                    ) : null);
                  }}
                </ItemLoader>
              ) : (
                <UserDataRetriever>
                  {(userData) => (
                    <ItemLoader>
                      {(state) => {
                        return (state.loaded ? (
                          <I18nRead id="no_subject" context="mail/mail">
                            {(i18nNoSubject: string) => (
                              <TextReader id="subject">
                                {(subject) => (
                                  <I18nRead id="re" context="mail/mail" args={[subject?.value || i18nNoSubject]}>
                                    {(i18nRe: string) => (
                                      <ReaderMany data={["source", "target"]}>
                                        {(source: string, target: string[]) => {
                                          // we only treat as a basic reply when the sender
                                          // is not ourselves, the reason is that imagine we press reply
                                          // in a message thread and we are simply sending a message to ourselves
                                          // instead of extending the previous message, as done in other clients
                                          if (source !== userData.id && props.replying === "reply") {
                                            return (
                                              <EmailSender
                                                {...senderArgs}
                                                targetPrefill={[source]}
                                                subjectPrefill={{
                                                  language: appLanguage.currentLanguage.code,
                                                  value: i18nRe,
                                                }}
                                              />
                                            );
                                          }

                                          // remove repeating and self
                                          const allTargets = target.concat(source ? [source] : [])
                                            // remove repeats and own user
                                            .filter((t, index, arr) => arr.indexOf(t) === index && t !== userData.id)
                                            // remove objects from reply all
                                            .filter((t) => {
                                              // chck the type to see if it's allowed
                                              if (!t.includes("@") && t.includes("$")) {
                                                const type = t.split("$")[1];
                                                const isAllowedByType = ((props.objectsAllowedReplyAll || []).includes(type));
                                                if (!isAllowedByType) {
                                                  return false;
                                                }
                                              }

                                              // check the blacklist
                                              if (!props.replyAllBlacklist) {
                                                return true;
                                              }

                                              return !props.replyAllBlacklist.includes(t);
                                            });

                                          // we got nothing as a result, we must be sending a message to ourselves
                                          // this is the fallback so that even with a simple reply it still works
                                          if (allTargets.length === 0) {
                                            allTargets.push(userData.id);
                                          }

                                          return (
                                            <EmailSender
                                              {...senderArgs}
                                              targetPrefill={allTargets}
                                              subjectPrefill={{
                                                language: appLanguage.currentLanguage.code,
                                                value: i18nRe,
                                              }}
                                            />
                                          )
                                        }}
                                      </ReaderMany>
                                    )}
                                  </I18nRead>
                                )}
                              </TextReader>
                            )}
                          </I18nRead>
                        ) : null);
                      }}
                    </ItemLoader>
                  )}
                </UserDataRetriever>
              )
              content = (
                <>
                  {content}
                  {replyObject}
                </>
              );
            }

            if (props.WrapperContent) {
              const Wrapper = props.WrapperContent;
              let oldContent = content;
              content = (
                <Wrapper>
                  {oldContent}
                </Wrapper>
              );
            }

            if (props.WrapperUser) {
              const WrapperUser = props.WrapperUser;
              let oldUser = userContent;
              userContent = (
                <WrapperUser>
                  {oldUser}
                </WrapperUser>
              );
            }

            let spamWarning = (
              spam ?
                (
                  <Alert severity="warning" sx={style.spamWarning} role="note">
                    {props.spamWarning || <I18nRead id="spam_warning" />}
                  </Alert>
                ) : null
            );

            if (spamWarning && props.WrapperSpamWarning) {
              const WrapperSpam = props.WrapperSpamWarning;
              let oldSpam = spamWarning;
              spamWarning = (
                <WrapperSpam>
                  {oldSpam}
                </WrapperSpam>
              );
            }

            return (
              <>
                {
                  props.setAsTitle ? (
                    <Reader id={props.setAsTitle} useAppliedValue={true}>
                      {(v: string | IPropertyDefinitionSupportedTextType) => {
                        if (typeof v === "string") {
                          return <TitleSetter>{v}</TitleSetter>;
                        } else if (v && v.value) {
                          return <TitleSetter>{v.value}</TitleSetter>;
                        } else {
                          return <TitleSetter>{""}</TitleSetter>;
                        }
                      }}
                    </Reader>
                  ) : null
                }
                {submitRead}
                {userContent}
                {spamWarning}
                {content}
                {parentId ? (
                  <EmailReader
                    {...props}
                    replying={null}
                    id={parentId}
                    setAsTitle={null}
                  />
                ) : null}
              </>
            );
          }}
        </ReaderMany>
      </ItemProvider>
    </ModuleProvider>
  );
}

const inboxUnread = [
  {
    id: "is_sender",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "is_receiver",
    value: true,
    searchVariant: "exact" as "exact",
  },
  {
    id: "spam",
    value: false,
    searchVariant: "exact" as "exact",
  },
  {
    id: "read",
    value: false,
    searchVariant: "exact" as "exact",
  },
  {
    id: "tip",
    value: true,
    searchVariant: "exact" as "exact",
  },
];

const inboxSpam = [
  {
    id: "is_sender",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "is_receiver",
    value: true,
    searchVariant: "exact" as "exact",
  },
  {
    id: "spam",
    value: true,
    searchVariant: "exact" as "exact",
  },
  {
    id: "read",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "tip",
    value: true,
    searchVariant: "exact" as "exact",
  },
];

const inbox = [
  {
    id: "is_sender",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "is_receiver",
    value: true,
    searchVariant: "exact" as "exact",
  },
  {
    id: "spam",
    value: false,
    searchVariant: "exact" as "exact",
  },
  {
    id: "read",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "tip",
    value: true,
    searchVariant: "exact" as "exact",
  },
];

const outbox = [
  {
    id: "is_sender",
    value: true,
    searchVariant: "exact" as "exact",
  },
  {
    id: "is_receiver",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "spam",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "read",
    value: null,
    searchVariant: "exact" as "exact",
  },
  {
    id: "tip",
    value: true,
    searchVariant: "exact" as "exact",
  },
];

const settersCriteria = {
  "unread": inboxUnread,
  "spam": inboxSpam,
  "inbox": inbox,
  "outbox": outbox,
}

interface IEmailAccumProps {
  isSources: boolean;
  sourceOrTargetToConsume: number;
  sourceOrTargets: string[];
  userAvatarElement: React.ReactNode;
  userUsernameElement: (sender: boolean) => React.ReactNode;
  userLoadProperties: string[];

  avatarAccum: React.ReactNode[];
  usernameAccum: React.ReactNode[];

  FallbackAvatarComponent: React.ComponentType<{ children: React.ReactNode }>;

  children: (avatars: React.ReactNode[], usernames: React.ReactNode) => React.ReactNode;
}

function EmailAccum(props: IEmailAccumProps) {
  const sourceOrTarget = props.sourceOrTargets && props.sourceOrTargets[props.sourceOrTargetToConsume];
  const sourceOrTargetUsername = sourceOrTarget && sourceOrTarget.split("<")[0].trim();
  const AvatarToUse = props.FallbackAvatarComponent || Avatar;

  let avatar: React.ReactNode = null;
  let username: React.ReactNode = null;
  if (!sourceOrTarget) {
    avatar = <Box sx={style.avatarOverlayer} key={props.sourceOrTargetToConsume}><AvatarToUse>?</AvatarToUse></Box>;
  } else if (sourceOrTarget.includes("@")) {
    const letterToUse = (sourceOrTargetUsername ? sourceOrTargetUsername[0] : sourceOrTarget[0]).toUpperCase();
    avatar = <Box sx={style.avatarOverlayer} key={props.sourceOrTargetToConsume}><AvatarToUse>{letterToUse}</AvatarToUse></Box>;
    username = <React.Fragment key={props.sourceOrTargetToConsume}>{sourceOrTargetUsername || sourceOrTarget}</React.Fragment>;
  } else {
    avatar = (
      <ModuleProvider module="users" key={props.sourceOrTargetToConsume}>
        <ItemProvider
          itemDefinition="user"
          forId={sourceOrTarget}
          static="TOTAL"
          properties={props.userLoadProperties}
          waitAndMerge={true}
        >
          <Box sx={style.avatarOverlayer}>{props.userAvatarElement}</Box>
        </ItemProvider>
      </ModuleProvider>
    );
    username = props.sourceOrTargetToConsume > 3 ? null : (
      <ModuleProvider module="users" key={props.sourceOrTargetToConsume + "_username"}>
        <ItemProvider
          itemDefinition="user"
          forId={sourceOrTarget}
          static="TOTAL"
          properties={props.userLoadProperties}
          waitAndMerge={true}
        >
          {props.userUsernameElement(props.isSources)}
        </ItemProvider>
      </ModuleProvider>
    );
  }

  if (props.sourceOrTargets && props.sourceOrTargets[props.sourceOrTargetToConsume + 1]) {
    return (
      <EmailAccum
        {...props}
        sourceOrTargetToConsume={props.sourceOrTargetToConsume + 1}

        avatarAccum={props.avatarAccum.concat([avatar])}
        usernameAccum={props.usernameAccum.concat(username)}
      />
    );
  } else {
    const usernames = props.usernameAccum.concat([username]).filter((v) => !!v);
    let finalUsernameText: React.ReactNode = null;
    if (usernames.length === 1 || !usernames.length) {
      finalUsernameText = usernames;
    } else if (usernames.length === 2) {
      finalUsernameText = (
        <I18nRead id="and_two" args={usernames} context="mail/mail" />
      );
    } else if (usernames.length === 3) {
      finalUsernameText = (
        <I18nRead id="and_three" args={usernames} context="mail/mail" />
      );
    } else {
      finalUsernameText = (
        <I18nRead id="and_more" args={usernames.concat([usernames.length])} context="mail/mail" />
      );
    }
    return (
      props.children(
        props.avatarAccum.concat([avatar]),
        finalUsernameText,
      ) as any
    );
  }
}

export interface IListElementComponentProps {
  isUnread: boolean;
  avatars: React.ReactNode;
  subject: IPropertyDefinitionSupportedTextType,
  usernames: React.ReactNode;
  id: string;
}

interface IEmailMenuItemProps {
  isSources: boolean;
  sourceOrTargets: string[];
  userAvatarElement: React.ReactNode;
  userUsernameElement: (sender: boolean) => React.ReactNode;
  userLoadProperties: string[];
  id: string;
  emailUrlResolver: (id: string) => string;
  isUnread: boolean;
  subject: IPropertyDefinitionSupportedTextType;
  /**
   * List component element
   */
  ListElementComponent?: React.ComponentType<IListElementComponentProps>;
  FallbackAvatarComponent: React.ComponentType<{ children: React.ReactNode }>;
}

export function DefaultListElementComponent(props: IListElementComponentProps) {
  return (
    <ListItemButton sx={props.isUnread ? style.unread : style.read}>
      <ListItemAvatar sx={style.avatarBox}>
        {props.avatars}
      </ListItemAvatar>
      <ListItemText
        primary={
          <span lang={props.subject.language}>
            {props.subject.value}
          </span>
        }
        secondary={props.usernames}
      />
    </ListItemButton>
  );
}

function EmailMenuItem(props: IEmailMenuItemProps) {
  const ListElementComponent = props.ListElementComponent || DefaultListElementComponent;
  return (
    <Link to={props.emailUrlResolver(props.id)}>
      <EmailAccum
        sourceOrTargetToConsume={0}
        sourceOrTargets={props.sourceOrTargets}
        isSources={props.isSources}
        avatarAccum={[]}
        userAvatarElement={props.userAvatarElement}
        userUsernameElement={props.userUsernameElement}
        userLoadProperties={props.userLoadProperties}
        usernameAccum={[]}
        FallbackAvatarComponent={props.FallbackAvatarComponent}
      >
        {(avatars, usernames) => (
          <ListElementComponent
            avatars={avatars}
            usernames={usernames}
            isUnread={props.isUnread}
            subject={props.subject}
            id={props.id}
          />
        )}
      </EmailAccum>
    </Link>
  );
}

const StyledPaginatorWrapper = styled("div")(style.paginationBox);

function FakeNoResultsComponent(props: INoResultsComponentProps) {
  return null as any;
}

export function EmailClient(props: IEmailClientProps) {
  const paginator = useQSPaginator({
    pageSize: 20,
    windowSize: 20,
  });

  const SwitcherComponent = typeof props.SwitcherComponent === "undefined" ? DefaultSwitcherComponent : props.SwitcherComponent;
  const ListComponent = typeof props.ListComponent === "undefined" ? List : props.ListComponent;
  const WrapperComponent = typeof props.WrapperComponent === "undefined" ? React.Fragment : props.WrapperComponent;
  const InternalWrapperComponent = typeof props.InternalWrapperComponent === "undefined" ? React.Fragment : props.InternalWrapperComponent;
  const PaginatorWrapperComponent = typeof props.PaginatorWrapperComponent === "undefined" ? StyledPaginatorWrapper : props.InternalWrapperComponent;

  const switcher = SwitcherComponent && (
    <SwitcherComponent
      location={props.location}
      onLocationChange={props.onLocationChange}
    />
  );

  const NoResultsComponent = typeof props.NoResultsComponent !== "undefined" ? props.NoResultsComponent : FakeNoResultsComponent;

  return (
    <UserDataRetriever>
      {(userData) => (
        !userData.id ? props.mustBeLoggedInNode : <ModuleProvider module="mail">
          <ItemProvider
            itemDefinition="mail"
            properties={[
              "is_sender",
              "is_receiver",
              "spam",
              "read",
            ]}
            searchCounterpart={true}
            setters={
              props.searchFilter ?
                [
                  ...settersCriteria[props.location],
                  {
                    id: "search",
                    value: props.searchFilter,
                  },
                ] :
                settersCriteria[props.location]
            }
            automaticSearch={{
              limit: paginator.limit,
              offset: paginator.offset,
              requestedProperties: [
                "source",
                "read",
                "subject",
                "source",
                "target",
              ],
              searchByProperties: props.searchFilter ? [
                "is_sender",
                "is_receiver",
                "spam",
                "read",
                "tip",
                "search",
              ] : [
                "is_sender",
                "is_receiver",
                "spam",
                "read",
                "tip",
              ],
              listenPolicy: "by-owner",
              createdBy: userData.id,
              useSearchEngine: props.useSearchEngine,
              useSearchEngineFullHighlights: props.useSearchEngineFullHighlights,
              traditional: true,
            }}
            cleanOnDismount={true}
          >
            <WrapperComponent>
              {!props.switcherComponentPosition || props.switcherComponentPosition === "top" ? switcher : null}

              <SearchLoaderWithPagination
                {...props.searchLoaderProps}
                id="messages-search"
                paginator={paginator}
                static="TOTAL"
                cleanOnDismount={true}
                total={true}
              >
                {(arg, pagination, noResults) => (
                  <InternalWrapperComponent>
                    {noResults || arg.error ? <NoResultsComponent err={arg.error} /> : <ListComponent>
                      {arg.searchRecords.map((v) => (
                        <ItemProvider {...v.providerArgs}>
                          <ReaderMany data={["id", "source", "subject", "read", "target"]}>
                            {(id: string, source: string, subject: IPropertyDefinitionSupportedTextType, read: boolean, target: string[]) => {
                              const isUnread = (props.location === "inbox" || props.location === "spam" || props.location === "unread") && !read;

                              return (
                                <EmailMenuItem
                                  isUnread={isUnread}
                                  emailUrlResolver={props.emailUrlResolver}
                                  id={id}
                                  isSources={props.location !== "outbox"}
                                  sourceOrTargets={props.location === "outbox" ? target : (source ? [source] : null)}
                                  subject={subject}
                                  userAvatarElement={props.userAvatarElement}
                                  userLoadProperties={props.userLoadProperties}
                                  userUsernameElement={props.userUsernameElement}
                                  ListElementComponent={props.ListElementComponent}
                                  FallbackAvatarComponent={props.FallbackAvatarComponent}
                                />
                              );
                            }}
                          </ReaderMany>
                        </ItemProvider>
                      ))}
                    </ListComponent>}
                    {noResults || arg.error ? null : <PaginatorWrapperComponent>
                      {pagination}
                    </PaginatorWrapperComponent>}
                  </InternalWrapperComponent>
                )}
              </SearchLoaderWithPagination>

              {props.switcherComponentPosition === "bottom" ? switcher : null}
            </WrapperComponent>

            <Link to={props.emailNewUrl}>
              {props.fabComponent ? props.fabComponent : <I18nRead id="new">
                {(i18nNew: string) => (
                  <Fab title={i18nNew} color="primary" sx={style.fab}>
                    <Create />
                  </Fab>
                )}
              </I18nRead>}
            </Link>

          </ItemProvider>
        </ModuleProvider>
      )}
    </UserDataRetriever>
  )
}