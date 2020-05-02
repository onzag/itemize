import React from "react";
import {
  Link as RouterLink,
  LinkProps,
  Route as RouterRoute,
  RouteProps,
  Prompt as RouterPrompt,
  Redirect as RouterRedirect,
  RedirectProps,
} from "react-router-dom";
import { LocationStateContext } from "../internal/app/internal-providers";
import { Location } from "history";
import { history } from "..";
import { ItemDefinitionContext, IActionSubmitOptions } from "../providers/item-definition";
import { DifferingPropertiesRetriever, DifferingIncludesRetriever, SubmitActioner, ISubmitActionerInfoArgType } from "./item-definition";
import { EndpointErrorType } from "../../base/errors";

export function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  const newState = {...location.state};
  if (state) {
    Object.keys(state).forEach((key) => {
      newState[key] = state[key];
    });
  }
  if (Object.is(newState, location.state)) {
    return;
  }
  if (!replace) {
    history.push(location.pathname + location.search + location.hash, newState);
  } else {
    history.replace(location.pathname + location.search + location.hash, newState);
  }
}

export function setHistoryQSState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  const searchParams = new URLSearchParams(location.search);
  let differs: boolean = false;
  if (state) {
    Object.keys(state).forEach((key) => {
      if (
        !differs &&
        state[key] !== searchParams.get(key) 
      ) {
        differs = true;
      }
      if (state[key] === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, state[key]);
      }
    });
  }
  if (!differs) {
    return;
  }
  if (!replace) {
    history.push(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
  } else {
    history.replace(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
  }
}

export function redirectTo(newLocation: string, state?: any, replace?: boolean) {
  if (replace) {
    history.replace(newLocation, state);
  } else {
    history.push(newLocation, state);
  }
}

export function localizedRedirectTo(newLocation: string, state?: any, replace?: boolean) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = newLocation;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
  return redirectTo(urlTo, state);
}

export function goBack() {
  history.goBack();
}

interface ICustomLinkProps extends LinkProps {
  to: string;
}

// TODO add analytics
function linkOnClick(props: ICustomLinkProps, e: React.MouseEvent<HTMLAnchorElement>) {
  if (props.to === location.pathname + location.search) {
    e.preventDefault();
  }

  if (props.onClick) {
    props.onClick(e);
  }
}

/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export function Link(props: ICustomLinkProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  const newProps: LinkProps = {
    ...props,
    to: urlTo,
  };

  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, newProps)}/>;
}

export type PromptDialogComponent = React.ComponentType<{
  open: boolean,
  confirming: boolean,
  confirmationCallbackError: EndpointErrorType,
  confirmationCallbackErrorClean: () => void;
  onCancel: () => void,
  onConfirm: () => void,
  onDiscard: () => void,
  args?: any,
}>;

interface PromptProps {
  when: boolean;
  beforeUnloadMessage: string;
  confirmationCallback?: () => Promise<EndpointErrorType> | EndpointErrorType;
  confirmationCallbackCleanup?: () => void;
  dialogArgs?: any;
  Dialog: PromptDialogComponent;
}

interface PromptState {
  dialogOpened: boolean;
  dialogOpenedFor: Location;
  confirming: boolean;
  confirmationError: EndpointErrorType;
}

export class Prompt extends React.PureComponent<PromptProps, PromptState> {
  private originalLocation: Location;
  constructor(props: PromptProps) {
    super(props);

    this.state = {
      dialogOpened: false,
      dialogOpenedFor: null,
      confirming: false,
      confirmationError: null,
    }

    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
    this.discardDialog = this.discardDialog.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.handleRouterPromptNavigationStep = this.handleRouterPromptNavigationStep.bind(this);
    this.confirmationCallbackErrorClean = this.confirmationCallbackErrorClean.bind(this);
  }
  public handleRouterPromptNavigationStep(location: Location) {
    if (!this.state.dialogOpened) {
      this.setState({
        dialogOpened: true,
        dialogOpenedFor: location,
      });
      return false;
    }
    return true;
  }
  public confirmationCallbackErrorClean() {
    this.props.confirmationCallbackCleanup();
    this.setState({
      confirmationError: null,
    });
  }
  public cancelDialog() {
    if (location.pathname !== this.originalLocation.pathname) {
      redirectTo(this.originalLocation.pathname);
    }
    this.setState({
      dialogOpened: false,
      dialogOpenedFor: null,
    });
  }
  public discardDialog() {
    if (location.pathname !== this.state.dialogOpenedFor.pathname) {
      redirectTo(this.state.dialogOpenedFor.pathname);
    } else {
      redirectTo(this.state.dialogOpenedFor.pathname, null, true);
    }
  }
  public async confirmDialog() {
    this.confirmationCallbackErrorClean();
    if (this.props.confirmationCallback) {      
      this.setState({
        confirming: true,
      });
      const error = await this.props.confirmationCallback();
      if (error) {
        this.setState({
          confirming: false,
          confirmationError: error,
        });
        return;
      }
    }

    this.discardDialog();
  }
  public onBeforeUnload(e: BeforeUnloadEvent) {
    if (this.props.when) {
      e.returnValue = this.props.beforeUnloadMessage;
    }
  }
  public componentDidMount() {
    this.originalLocation = history.location;
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }
  public componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }
  public render() {
    const Dialog = this.props.Dialog;
    return <React.Fragment>
      <RouterPrompt
        when={this.props.when}
        message={this.handleRouterPromptNavigationStep}
      />
      <Dialog
        open={this.state.dialogOpened}
        onCancel={this.cancelDialog}
        onConfirm={this.confirmDialog}
        onDiscard={this.discardDialog}
        args={this.props.dialogArgs}
        confirming={this.state.confirming}
        confirmationCallbackError={this.state.confirmationError}
        confirmationCallbackErrorClean={this.confirmationCallbackErrorClean}
      />
    </React.Fragment>
  }
}

interface NeedsSubmitPromptProps {
  properties?: string[];
  includes?: string[];
  confirmationSubmitOptions: IActionSubmitOptions;
  beforeUnloadMessage: string;
  dialogArgs?: any;
  Dialog: PromptDialogComponent;
}

export class NeedsSubmitPrompt extends React.PureComponent<NeedsSubmitPromptProps> {
  public async confirmationCallback(actioner: ISubmitActionerInfoArgType, ) {
    const response = await actioner.submit(this.props.confirmationSubmitOptions);
    if (response.error) {
      return response.error;
    }
    return null;
  }
  public buildPrompt(when: boolean) {
    return (
      <SubmitActioner>
        {(actioner) => (
          <Prompt
            when={when}
            beforeUnloadMessage={this.props.beforeUnloadMessage}
            Dialog={this.props.Dialog}
            dialogArgs={this.props.dialogArgs}
            confirmationCallback={this.confirmationCallback.bind(this, actioner)}
            confirmationCallbackCleanup={actioner.dismissError}
          />
         )
        }
      </SubmitActioner>
    )
  }
  public render() {
    const noProperties = (!this.props.properties || !this.props.properties.length);
    const noIncludes = (!this.props.includes || !this.props.includes.length);
    if (
      noProperties &&
      noIncludes
    ) {
      return null;
    }

    if (noIncludes) {
      return (
        <DifferingPropertiesRetriever mainProperties={this.props.properties}>
          {(differingProperties) => (
            this.buildPrompt(!!(differingProperties && differingProperties.length))
          )}
        </DifferingPropertiesRetriever>
      );
    } else if (noProperties) {
      return (
        <DifferingIncludesRetriever mainIncludes={this.props.includes}>
          {(differingIncludes) => (
            this.buildPrompt(!!(differingIncludes && differingIncludes.length))
          )}
        </DifferingIncludesRetriever>
      );
    } else {
      <DifferingPropertiesRetriever mainProperties={this.props.properties}>
        {(differingProperties) => (
          <DifferingIncludesRetriever mainIncludes={this.props.includes}>
            {(differingIncludes) => (
              this.buildPrompt(
                !!(differingIncludes && differingIncludes.length) ||
                !!(differingProperties && differingProperties.length)
              )
            )}
          </DifferingIncludesRetriever>
        )}
      </DifferingPropertiesRetriever>
    }
  }
}

/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
export function Route(props: RouteProps) {
  let urlDefined = props.path;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterRoute {...props} path={`/:__lang${urlDefined}`}/>;
}

export function Redirect(props: RedirectProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  const newProps: RedirectProps = {
    ...props,
    to: urlTo,
  };

  return <RouterRedirect {...newProps}/>;
}

interface ILocationStateReaderProps<S> {
  defaultState: S;
  stateIsInQueryString?: boolean;
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
  ) => React.ReactNode;
}

export function LocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  return (
    <LocationStateContext.Consumer>
      {
        (location: Location<S>) => {
          if (props.stateIsInQueryString) {
            const searchParams = new URLSearchParams(location.search);
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryQSState.bind(null, location))
          } else {
            if (!location.state) {
              return props.children(props.defaultState, setHistoryState.bind(null, location));
            }
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = typeof location.state[key] !== "undefined" ? location.state[key] : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryState.bind(null, location));
          }
        }
      }
    </LocationStateContext.Consumer>
  );
}
