import React from "react";
import { EndpointErrorType } from "../../base/errors";
import {
  ItemDefinitionContext,
  IBasicActionResponse,
  IActionResponseWithId,
  IActionResponseWithSearchResults,
  IItemDefinitionContextType,
  IActionSubmitOptions,
  IActionCleanOptions,
  IActionSearchOptions,
} from "../providers/item-definition";
import equals from "deep-equal";
import { IGQLSearchResult } from "../../gql-querier";
import { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";

export interface IItemDefinitionLoaderInfoArgType {
  loading: boolean;
  notFound: boolean;
  blocked: boolean;
  hasBlockedAccess: boolean;
  error: EndpointErrorType;
  reload: () => Promise<IBasicActionResponse>;
}

interface IItemDefinitionLoader {
  children: (arg: IItemDefinitionLoaderInfoArgType) => any;
}

interface IActualItemDefinitionLoader extends IItemDefinitionLoader {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualItemDefinitionLoader extends React.Component<IActualItemDefinitionLoader, {}> {
  public shouldComponentUpdate(nextProps: IActualItemDefinitionLoader) {
    return nextProps.itemDefinitionContext.loadError !== this.props.itemDefinitionContext.loadError ||
      nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.blocked !== this.props.itemDefinitionContext.blocked ||
      nextProps.itemDefinitionContext.blockedButDataAccessible !==
        this.props.itemDefinitionContext.blockedButDataAccessible ||
      nextProps.itemDefinitionContext.notFound !== this.props.itemDefinitionContext.notFound ||
      nextProps.itemDefinitionContext.loading !== this.props.itemDefinitionContext.loading;
  }
  public render() {
    return this.props.children(
      {
        loading: this.props.itemDefinitionContext.loading,
        notFound: this.props.itemDefinitionContext.notFound,
        blocked: this.props.itemDefinitionContext.blocked,
        hasBlockedAccess: this.props.itemDefinitionContext.blockedButDataAccessible,
        error: this.props.itemDefinitionContext.loadError,
        reload: this.props.itemDefinitionContext.reload,
      },
    );
  }
}
/**
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
export function ItemDefinitionLoader(props: IItemDefinitionLoader) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualItemDefinitionLoader {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}

export interface ISubmitActionerInfoArgType {
  submitError: EndpointErrorType;
  dismissError: () => void;
  dismissSubmitted: () => void;
  submitting: boolean;
  submitted: boolean;
  submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

interface ISubmitActionerProps {
  children: (arg: ISubmitActionerInfoArgType) => any;
}

interface IActualSubmitActionerProps extends ISubmitActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualSubmitActioner extends React.Component<IActualSubmitActionerProps, {}> {
  public shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.submitError !== this.props.itemDefinitionContext.submitError ||
      nextProps.itemDefinitionContext.submitting !== this.props.itemDefinitionContext.submitting ||
      nextProps.itemDefinitionContext.submitted !== this.props.itemDefinitionContext.submitted;
  }
  public render() {
    return this.props.children({
      submitError: this.props.itemDefinitionContext.submitError,
      submitting: this.props.itemDefinitionContext.submitting,
      submitted: this.props.itemDefinitionContext.submitted,
      submit: this.props.itemDefinitionContext.submit,
      dismissError: this.props.itemDefinitionContext.dismissSubmitError,
      dismissSubmitted: this.props.itemDefinitionContext.dismissSubmitted,
      clean: this.props.itemDefinitionContext.clean,
    });
  }
}

export function SubmitActioner(props: ISubmitActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSubmitActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}

export interface ISearchActionerInfoArgType {
  searchError: EndpointErrorType;
  dismissSearchResults: () => void;
  dismissSearchError: () => void;
  searching: boolean;
  searchResults: IGQLSearchResult[];
  search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

interface ISearchActionerProps {
  children: (arg: ISearchActionerInfoArgType) => any;
}

interface IActualSearchActionerProps extends ISearchActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualSearchActioner extends React.Component<IActualSearchActionerProps, {}> {
  public shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.searchError !== this.props.itemDefinitionContext.searchError ||
      nextProps.itemDefinitionContext.searching !== this.props.itemDefinitionContext.searching ||
      !equals(nextProps.itemDefinitionContext.searchResults, this.props.itemDefinitionContext.searchResults);
  }
  public render() {
    return this.props.children({
      searchError: this.props.itemDefinitionContext.searchError,
      searching: this.props.itemDefinitionContext.searching,
      searchResults: this.props.itemDefinitionContext.searchResults,
      search: this.props.itemDefinitionContext.search,
      clean: this.props.itemDefinitionContext.clean,
      dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
      dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
    });
  }
}

export function SearchActioner(props: ISearchActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSearchActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}

interface IDifferingPropertiesRetrieverProps {
  mainProperties: string[];
  children: (differingProperties: string[]) => React.ReactNode;
}

export function DifferingPropertiesRetriever(props: IDifferingPropertiesRetrieverProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty: string) => {
          const propertyData = itemDefinitionContext.state.properties.find(p => p.propertyId === mainProperty);
          if (!propertyData) {
            return false;
          }
          return !itemDefinitionContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual(
            propertyData.stateAppliedValue,
            propertyData.value,
          );
        });
        return props.children(finalProperties);
      }
    }</ItemDefinitionContext.Consumer>
  )
}

interface IDifferingIncludeInfo {
  id: string;
  exclusionStateDiffers: boolean;
  differingProperties: string[];
}

interface IDifferingIncludesRetrieverProps {
  mainIncludes: string[];
  children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}

export function DifferingIncludesRetriever(props: IDifferingIncludesRetrieverProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        const finalProperties = props.mainIncludes.map((mainInclude: string) => {
          const includeData = itemDefinitionContext.state.includes.find(i => i.includeId === mainInclude);
          if (!includeData) {
            return null;
          }
          const exclusionStateDiffers = includeData.stateExclusion !== includeData.stateExclusionApplied;
          const include = itemDefinitionContext.idef.getIncludeFor(mainInclude);
          const allSinkingProperties = include.getSinkingPropertiesIds();
          if (
            exclusionStateDiffers &&
            (
              includeData.stateExclusion === IncludeExclusionState.EXCLUDED ||
              includeData.stateExclusionApplied === IncludeExclusionState.EXCLUDED
            )
          ) {
            return {
              id: mainInclude,
              exclusionStateDiffers: true,
              differingProperties: allSinkingProperties,
            }
          } else if (
            includeData.stateExclusion === IncludeExclusionState.EXCLUDED &&
            !exclusionStateDiffers
          ) {
            return null;
          }

          const itemDefinition = include.getItemDefinition();
          const differingProperties = allSinkingProperties.filter((mainProperty: string) => {
            const propertyData = includeData.itemDefinitionState.properties.find(p => p.propertyId === mainProperty);
            if (!propertyData) {
              return false;
            }
            return !itemDefinition.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual(
              propertyData.stateAppliedValue,
              propertyData.value,
            );
          });

          if (!exclusionStateDiffers && differingProperties.length === 0) {
            return null;
          }

          return {
            id: mainInclude,
            exclusionStateDiffers,
            differingProperties,
          }
        }).filter(v => !!v);
        return props.children(finalProperties);
      }
    }</ItemDefinitionContext.Consumer>
  )
}