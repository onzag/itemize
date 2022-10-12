import React, { useCallback, useEffect, useRef, useState } from "react";
import { ItemProvider, NoStateItemProvider } from "../../../providers/item";
import { ModuleProvider } from "../../../providers/module";
import ReaderMany from "../../../components/property/ReaderMany";
import Tabs from "@mui/material/Tabs";
import { IPropertySetterProps } from "../../../components/property/base";
import Tab from "@mui/material/Tab";
import { SearchLoaderWithPagination } from "../search-loader-with-pagination";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import View from "../../../components/property/View";
import Box from "@mui/material/Box";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Reader from "../../../components/property/Reader";

import Link from "../../../components/navigation/Link";
import SubmitActioner from "../../../components/item/SubmitActioner";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Entry from "../../../components/property/Entry";
import I18nRead from "../../../components/localization/I18nRead";

import ReplyIcon from "@mui/icons-material/Reply";
import ReportIcon from "@mui/icons-material/Report";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import Snackbar from "../snackbar";
import Fab from "@mui/material/Fab";
import Create from "@mui/icons-material/Create";
import RootRetriever from "../../../components/root/RootRetriever";
import type ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import { SubmitButton } from "../buttons";
import Chip from "@mui/material/Chip";
import ItemLoader from "../../../components/item/ItemLoader";
import { ConfigContext } from "../../../internal/providers/config-provider";
import { runSearchQueryFor } from "../../../internal/gql-client-util";
import { TokenContext } from "../../../internal/providers/token-provider";
import { UNSPECIFIED_OWNER } from "../../../../constants";
import type { ITagListSuggestion } from "../../renderers/PropertyEntry/PropertyEntryTagList";
import Setter from "../../../components/property/Setter";

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
  },
  avatarBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

type LocationType = "INBOX" | "INBOX_UNREAD" | "INBOX_SPAM" | "OUTBOX";

export interface ISwitcherComponentProps {
  location: LocationType;
  onLocationChange: (e: React.SyntheticEvent, value: LocationType) => void;
}

interface IBasicEmailClientProps {
  userAvatarElement: React.ReactNode;
  userUsernameElement: React.ReactNode;
  userLoadProperties: string[];
}

interface IEmailClientProps extends IBasicEmailClientProps {
  location: LocationType;
  onLocationChange: (e: React.SyntheticEvent, location: LocationType) => void;
  switcherComponentPosition?: "top" | "bottom";
  SwitcherComponent?: React.ComponentType<ISwitcherComponentProps>;
  emailUrlResolver: (id: string) => string;
  emailNewUrl: string;
}

interface IEmailReaderProps extends IBasicEmailClientProps {
  id: string;
  contentWrapper?: (content: React.ReactNode) => React.ReactNode;
  replyUrlResolver: (replyOf: string) => string;
}

export function DefaultSwitcherComponent(props: ISwitcherComponentProps) {
  return (
    <Tabs
      onChange={props.onLocationChange}
      value={props.location}
      sx={style.tabs}
    >
      <Tab value="INBOX_UNREAD" label="unread" />
      <Tab value="INBOX" label="inbox" />
      <Tab value="OUTBOX" label="sent" />
      <Tab value="INBOX_SPAM" label="spam" />
    </Tabs>
  )
}

interface IEmailSenderPropsBase {
  userNameProperties: string[];
  userInvalidLabel: React.ReactNode;
  objectsNameResolver?: {
    [key: string]: string[];
  };
  objectsInvalidLabel?: {
    [key: string]: React.ReactNode;
  };
}

interface IEmailSenderProps extends IEmailSenderPropsBase {
  targetPrefill?: string[];
  replyOf?: string;
  emailUrlResolver: (id: string) => string;
}

interface IActualMailSenderProps extends IEmailSenderProps {
  userId: string;
  supportsExternal: boolean;
  mailDomain: string;
  mailIdef: ItemDefinition;
  userIdef: ItemDefinition;
  token: string;
  onFetchSuggestions?: (v: string) => Promise<ITagListSuggestion[]>;
}

function ActualMailSender(props: IActualMailSenderProps) {
  const onValueInputted = useCallback(async (v: string) => {
    const splitted = v.split("@");
    const username = splitted[0];
    const domain = splitted[1] || props.mailDomain;

    if (domain === props.mailDomain) {
      const results = await runSearchQueryFor({
        args: {
          "IN_username": [username],
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
        token: props.token,
        itemDefinition: props.userIdef.getSearchModeCounterpart(),
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

      if (!results || results.count === 0 || !results.records[0]) {
        return UNSPECIFIED_OWNER;
      } else {
        return results.records[0].id;
      }
    } else {
      return v;
    }
  }, [props.mailDomain, props.userNameProperties, props.userIdef, props.token]);
  const chipRenderer = useCallback((v: string) => {
    if (v.includes("@")) {
      return (
        <Chip
          label={v}
          sx={style.chip}
          color="primary"
        />
      );
    } else {
      const splitted = v.split("$");
      const type = splitted[1] || "MOD_users__IDEF_user";
      const isUser = type === "MOD_users__IDEF_user";
      const id = splitted[0];

      if (!isUser && !props.objectsNameResolver[type]) {
        return (
          <Chip
            label={v}
            sx={style.chip}
            color="info"
          />
        );
      }

      if (isUser && id === props.userId) {
        return (
          <Chip
            label={
              <strong><I18nRead id="me" capitalize={true} /></strong>
            }
            sx={style.chip}
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
          disableExternalChecks={true}
        >
          <ItemLoader>
            {(arg) => {
              if (arg.notFound) {
                const invalidLabel = (isUser ? props.userInvalidLabel : props.objectsInvalidLabel[type]) || "ERR???";
                if (typeof invalidLabel === "string") {
                  return (
                    <Chip
                      label={invalidLabel}
                      sx={style.chip}
                      color="error"
                    />
                  );
                } else {
                  return (
                    <ModuleProvider module="mail">
                      <NoStateItemProvider
                        itemDefinition="mail"
                      >
                        <Chip
                          label={invalidLabel}
                          sx={style.chip}
                          color="error"
                        />
                      </NoStateItemProvider>
                    </ModuleProvider>
                  )
                }
              }

              return (
                <ReaderMany data={isUser ? props.userNameProperties : props.objectsNameResolver[type]}>
                  {(...args: string[]) => (
                    <Chip
                      label={args.find((v) => !!v)}
                      sx={style.chip}
                      color={isUser ? "primary" : "secondary"}
                    />
                  )}
                </ReaderMany>
              )
            }}
          </ItemLoader>
        </ItemProvider>
      );
    }
  }, [props.objectsNameResolver, props.objectsInvalidLabel, props.userNameProperties, props.userInvalidLabel])

  return (
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
        prefills={props.targetPrefill ? [
          {
            id: "target",
            value: props.targetPrefill,
          }
        ] : null}
      >
        <Entry
          id="target"
          rendererArgs={{
            chipRenderer,
            onValueInputted,
            fetchSuggestions: props.onFetchSuggestions,
          }}
        />
        <Entry id="subject" />
        <Entry id="content" />
        <Entry id="attachments" />

        <Reader id="target">
          {(target: string[]) => {
            const isReceiver = target ? target.includes(props.userId) : false;
            return (
              <Setter id="is_receiver" value={isReceiver} />
            );
          }}
        </Reader>

        <SubmitButton
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
              return props.emailUrlResolver(status.id)
            }
          }
          redirectReplace={true}
        />

        <SubmitActioner>
          {(actioner) => {
            return (
              <Snackbar
                id={"email-send-error"}
                severity="error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
            )
          }}
        </SubmitActioner>
      </ItemProvider>
    </ModuleProvider>
  );
}

export function EmailSender(props: IEmailSenderProps) {
  return (
    <ConfigContext.Consumer>
      {(config) => (
        <TokenContext.Consumer>
          {(tokenData) => (
            <UserDataRetriever>
              {(userData) => (
                <RootRetriever>
                  {(root) => {

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
                            disableExternalChecks={true}
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
                  }}
                </RootRetriever>

              )}
            </UserDataRetriever>
          )}
        </TokenContext.Consumer>
      )}
    </ConfigContext.Consumer>
  )
}

export function EmailReader(props: IEmailReaderProps) {
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
          "source_username",
          "target",
          "content",
          "attachments",
          "cid_attachments",
          "subject",
        ]}
        cleanOnDismount={true}
      >
        <ReaderMany data={["parent_id", "source", "source_username", "read", "spam"]}>
          {(parentId: string, source: string, sourceUsername: string, read: boolean, spam: boolean) => {
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
              const letterToUse = (sourceUsername ? sourceUsername[0] : source[0]).toUpperCase();
              avatar = <Avatar>{letterToUse}</Avatar>;
              username = sourceUsername || source;
              if (username !== source) {
                relevantEmail = source;
              }
            } else {
              useUser = true;
              avatar = props.userAvatarElement;
              username = props.userUsernameElement;
            }

            let userContent = (
              <Box sx={style.flex}>
                <Box sx={style.avatarbox}>
                  {avatar}
                </Box>
                <Box sx={style.userInfoBox}>
                  <Box sx={style.username}>
                    {username}
                  </Box>
                  <Box sx={style.email}>
                    {relevantEmail}
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
                    disableExternalChecks={true}
                    properties={props.userLoadProperties}
                    waitAndMerge={true}
                  >
                    {userContent}
                  </ItemProvider>
                </ModuleProvider>
              )
            }

            let content: React.ReactNode = (
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
                    <Link to={props.replyUrlResolver(props.id)}>
                      <I18nRead id="reply">
                        {(i18nReply: string) => (
                          <IconButton
                            title={i18nReply}
                          >
                            <ReplyIcon />
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

            if (props.contentWrapper) {
              content = props.contentWrapper(content);
            }

            return (
              <>
                {parentId ? (
                  <EmailReader
                    {...props}
                    id={parentId}
                  />
                ) : null}

                {submitRead}
                {userContent}

                {
                  spam ?
                    (
                      <Alert severity="warning" sx={style.spamWarning} role="note">
                        <I18nRead id="spam_warning" />
                      </Alert>
                    ) : null
                }

                {content}
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
  "INBOX_UNREAD": inboxUnread,
  "INBOX_SPAM": inboxSpam,
  "INBOX": inbox,
  "OUTBOX": outbox,
}

interface IEmailMenuItemProps {
  id: string;
  sourceOrTargetToConsume: number;
  sourceOrTargets: string[];
  sourceOrTargetsUsernames: string[];
  userAvatarElement: React.ReactNode;
  userUsernameElement: React.ReactNode;
  isUnread: boolean;
  subject: string;
  userLoadProperties: string[];
  emailUrlResolver: (id: string) => string;

  avatarAccum: React.ReactNode[];
  usernameAccum: React.ReactNode[];
}

function EmailMenuItem(props: IEmailMenuItemProps) {
  const sourceOrTarget = props.sourceOrTargets && props.sourceOrTargets[props.sourceOrTargetToConsume];
  const sourceOrTargetUsername = props.sourceOrTargetsUsernames && props.sourceOrTargetsUsernames[props.sourceOrTargetToConsume];

  let avatar: React.ReactNode = null;
  let username: React.ReactNode = null;
  if (!sourceOrTarget) {
    avatar = <Box sx={style.avatarOverlayer} key={props.sourceOrTargetToConsume}><Avatar>?</Avatar></Box>;
  } else if (sourceOrTarget.includes("@")) {
    const letterToUse = (sourceOrTargetUsername ? sourceOrTargetUsername[0] : sourceOrTarget[0]).toUpperCase();
    avatar = <Box sx={style.avatarOverlayer} key={props.sourceOrTargetToConsume}><Avatar>{letterToUse}</Avatar></Box>;
    username = <React.Fragment key={props.sourceOrTargetToConsume}>{sourceOrTargetUsername || sourceOrTarget}</React.Fragment>;
  } else {
    avatar = (
      <ModuleProvider module="users" key={props.sourceOrTargetToConsume}>
        <ItemProvider
          itemDefinition="user"
          forId={sourceOrTarget}
          static="TOTAL"
          disableExternalChecks={true}
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
          disableExternalChecks={true}
          properties={props.userLoadProperties}
          waitAndMerge={true}
        >
          {props.userUsernameElement}
        </ItemProvider>
      </ModuleProvider>
    );
  }

  if (props.sourceOrTargets && props.sourceOrTargets[props.sourceOrTargetToConsume + 1]) {
    return (
      <EmailMenuItem
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
        <I18nRead id="and_two" args={usernames} />
      );
    } else if (usernames.length === 3) {
      finalUsernameText = (
        <I18nRead id="and_three" args={usernames} />
      );
    } else {
      finalUsernameText = (
        <I18nRead id="and_more" args={usernames.concat([usernames.length])} />
      );
    } 
    return (
      <Link to={props.emailUrlResolver(props.id)}>
        <ListItemButton sx={props.isUnread ? style.unread : style.read}>
          <ListItemAvatar sx={style.avatarBox}>
            {props.avatarAccum.concat([avatar])}
          </ListItemAvatar>

          <ListItemText
            primary={props.subject}
            secondary={finalUsernameText}
          />
        </ListItemButton>
      </Link>
    );
  }
}

export function EmailClient(props: IEmailClientProps) {
  const [limitoffset, setLimitOffset] = useState([20, 0]);
  const onOutOfBounds = useCallback((newLimit: number, newOffset: number) => {
    setLimitOffset([newLimit, newOffset]);
  }, []);

  const SwitcherComponent = typeof props.SwitcherComponent === "undefined" ? DefaultSwitcherComponent : props.SwitcherComponent;

  const switcher = SwitcherComponent && (
    <SwitcherComponent
      location={props.location}
      onLocationChange={props.onLocationChange}
    />
  );

  return (
    <UserDataRetriever>
      {(userData) => (
        !userData.id ? "MUST_BE_LOGGED_IN" : <ModuleProvider module="mail">
          <ItemProvider
            itemDefinition="mail"
            properties={[
              "is_sender",
              "is_receiver",
              "spam",
              "read",
            ]}
            searchCounterpart={true}
            setters={settersCriteria[props.location]}
            automaticSearch={{
              limit: limitoffset[0],
              offset: limitoffset[1],
              requestedProperties: [
                "source",
                "read",
                "subject",
                "source",
                "target",
                "source_username",
              ],
              searchByProperties: [
                "is_sender",
                "is_receiver",
                "spam",
                "read",
                "tip",
              ],
              listenPolicy: "by-owner",
              createdBy: userData.id,
              useSearchEngine: true,
              traditional: true,
            }}
            cleanOnDismount={true}
          >
            {!props.switcherComponentPosition || props.switcherComponentPosition === "top" ? switcher : null}

            <SearchLoaderWithPagination
              id="messages-search"
              pageSize={10}
              static="TOTAL"
              cleanOnDismount={true}
              total={true}
              onTotalOutOfBounds={onOutOfBounds}
            >
              {(arg, pagination, noResults) => (
                <>
                  <List>
                    {arg.searchRecords.map((v) => (
                      <ItemProvider {...v.providerProps}>
                        <ReaderMany data={["id", "source", "source_username", "subject", "read", "target"]}>
                          {(id: string, source: string, sourceUsername: string, subject: string, read: boolean, target: string[]) => {
                            const isUnread = (props.location === "INBOX" || props.location === "INBOX_SPAM" || props.location === "INBOX_UNREAD") && !read;

                            return (
                              <EmailMenuItem
                                isUnread={isUnread}
                                avatarAccum={[]}
                                emailUrlResolver={props.emailUrlResolver}
                                id={id}
                                sourceOrTargetToConsume={0}
                                sourceOrTargets={props.location === "OUTBOX" ? target : (source ? [source] : null)}
                                sourceOrTargetsUsernames={props.location === "OUTBOX" ? null : (sourceUsername ? [sourceUsername] : null)}
                                subject={subject}
                                userAvatarElement={props.userAvatarElement}
                                userLoadProperties={props.userLoadProperties}
                                userUsernameElement={props.userUsernameElement}
                                usernameAccum={[]}
                              />
                            );
                          }}
                        </ReaderMany>
                      </ItemProvider>
                    ))}
                  </List>
                  <Box sx={style.paginationBox}>
                    {pagination}
                  </Box>
                </>
              )}
            </SearchLoaderWithPagination>

            {props.switcherComponentPosition === "bottom" ? switcher : null}

            <Link to={props.emailNewUrl}>
              <I18nRead id="new">
                {(i18nNew: string) => (
                  <Fab title={i18nNew} color="primary" sx={style.fab}>
                    <Create />
                  </Fab>
                )}
              </I18nRead>
            </Link>

          </ItemProvider>
        </ModuleProvider>
      )}
    </UserDataRetriever>
  )
}