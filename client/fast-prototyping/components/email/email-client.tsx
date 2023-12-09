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
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ReportIcon from "@mui/icons-material/Report";
import ForwardIcon from '@mui/icons-material/ForwardToInbox';
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
import { runSearchQueryFor } from "../../../internal/rq-client-util";
import { TokenContext } from "../../../internal/providers/token-provider";
import { UNSPECIFIED_OWNER } from "../../../../constants";
import type { ITagListSuggestion } from "../../renderers/PropertyEntry/PropertyEntryTagList";
import Setter from "../../../components/property/Setter";
import { PropertyDefinitionSupportedType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

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

type LocationType = "INBOX" | "INBOX_UNREAD" | "INBOX_SPAM" | "OUTBOX";

export interface ISwitcherComponentProps {
  location: LocationType;
  onLocationChange: (e: React.SyntheticEvent, value: LocationType) => void;
}

interface IBasicEmailClientProps {
  userAvatarElement: React.ReactNode;
  userUsernameElement: (sender: boolean) => React.ReactNode;
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

interface IEmailReaderProps extends IBasicEmailClientProps, IEmailSenderPropsBase {
  id: string;
  contentWrapper?: (content: React.ReactNode) => React.ReactNode;
  replyUrlResolver: (replyOf: string) => string;
  replyAllUrlResolver: (replyOf: string) => string;
  forwardUrlResolver: (replyOf: string) => string;
  emailUrlResolver: (id: string) => string;
  replying?: "reply-all" | "reply" | "forward";
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
  subjectPrefill?: string;
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
    const trimmed = v.trim();
    const splitted = trimmed.split("@");
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
      return trimmed;
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
              <strong><I18nRead id="me" capitalize={true} context="mail/mail" /></strong>
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
          static="TOTAL"
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
        prefills={prefills}
      >
        <Entry
          id="target"
          rendererArgs={{
            chipRenderer,
            onValueInputted,
            fetchSuggestions: props.onFetchSuggestions,
            enterWithSpace: true,
          }}
        />
        <Entry id="subject" autoFocus={!props.subjectPrefill}/>
        <Entry id="content" autoFocus={!!props.subjectPrefill}/>
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
              const letterToUse = splitted[0].toUpperCase();
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
                    <Link to={props.replyAllUrlResolver(props.id)}>
                      <I18nRead id="reply_all">
                        {(i18nReplyAll: string) => (
                          <IconButton
                            title={i18nReplyAll}
                          >
                            <ReplyAllIcon />
                          </IconButton>
                        )}
                      </I18nRead>
                    </Link>
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
                emailUrlResolver: props.emailUrlResolver,
                userInvalidLabel: props.userInvalidLabel,
                userNameProperties: props.userNameProperties,
                objectsInvalidLabel: props.objectsInvalidLabel,
                objectsNameResolver: props.objectsNameResolver,
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
                                    subjectPrefill={i18nReF}
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
                              <Reader id="subject">
                                {(subject: string) => (
                                  <I18nRead id="re" context="mail/mail" args={[subject || i18nNoSubject]}>
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
                                                subjectPrefill={i18nRe}
                                              />
                                            );
                                          }

                                          // remove repeating and self
                                          const allTargets = target.concat([source]).filter((t, index, arr) => arr.indexOf(t) === index && t !== userData.id);

                                          // we got nothing as a result, we must be sending a message to ourselves
                                          // this is the fallback so that even with a simple reply it still works
                                          if (allTargets.length === 0) {
                                            allTargets.push(userData.id);
                                          }

                                          return (
                                            <EmailSender
                                              {...senderArgs}
                                              targetPrefill={allTargets}
                                              subjectPrefill={i18nRe}
                                            />
                                          )
                                        }}
                                      </ReaderMany>
                                    )}
                                  </I18nRead>
                                )}
                              </Reader>
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

            if (props.contentWrapper) {
              content = props.contentWrapper(content);
            }

            return (
              <>
                {parentId ? (
                  <EmailReader
                    {...props}
                    replying={null}
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

interface IEmailAccumProps {
  isSources: boolean;
  sourceOrTargetToConsume: number;
  sourceOrTargets: string[];
  userAvatarElement: React.ReactNode;
  userUsernameElement: (sender: boolean) => React.ReactNode;
  userLoadProperties: string[];

  avatarAccum: React.ReactNode[];
  usernameAccum: React.ReactNode[];

  children: (avatars: React.ReactNode[], usernames: React.ReactNode) => React.ReactNode;
}

function EmailAccum(props: IEmailAccumProps) {
  const sourceOrTarget = props.sourceOrTargets && props.sourceOrTargets[props.sourceOrTargetToConsume];
  const sourceOrTargetUsername = sourceOrTarget && sourceOrTarget.split("<")[0].trim();

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

interface IEmailMenuItemProps {
  isSources: boolean;
  sourceOrTargets: string[];
  userAvatarElement: React.ReactNode;
  userUsernameElement: (sender: boolean) => React.ReactNode;
  userLoadProperties: string[];
  id: string;
  emailUrlResolver: (id: string) => string;
  isUnread: boolean;
  subject: string;
}

function EmailMenuItem(props: IEmailMenuItemProps) {
  return (
    <Link to={props.emailUrlResolver(props.id)}>
      <ListItemButton sx={props.isUnread ? style.unread : style.read}>
        <EmailAccum
          sourceOrTargetToConsume={0}
          sourceOrTargets={props.sourceOrTargets}
          isSources={props.isSources}
          avatarAccum={[]}
          userAvatarElement={props.userAvatarElement}
          userUsernameElement={props.userUsernameElement}
          userLoadProperties={props.userLoadProperties}
          usernameAccum={[]}
        >
          {(avatars, usernames) => (
            <>
              <ListItemAvatar sx={style.avatarBox}>
                {avatars}
              </ListItemAvatar>
              <ListItemText
                primary={props.subject}
                secondary={usernames}
              />
            </>
          )}
        </EmailAccum>
      </ListItemButton>
    </Link>
  );
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
                        <ReaderMany data={["id", "source", "subject", "read", "target"]}>
                          {(id: string, source: string, subject: string, read: boolean, target: string[]) => {
                            const isUnread = (props.location === "INBOX" || props.location === "INBOX_SPAM" || props.location === "INBOX_UNREAD") && !read;

                            return (
                              <EmailMenuItem
                                isUnread={isUnread}
                                emailUrlResolver={props.emailUrlResolver}
                                id={id}
                                isSources={props.location !== "OUTBOX"}
                                sourceOrTargets={props.location === "OUTBOX" ? target : (source ? [source] : null)}
                                subject={subject}
                                userAvatarElement={props.userAvatarElement}
                                userLoadProperties={props.userLoadProperties}
                                userUsernameElement={props.userUsernameElement}
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