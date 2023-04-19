/**
 * This is one of the hearts of itemize and represents the item definition
 * for items as it defines how they are meant to be conformed, by includes and properties
 *
 * @module
 */

import Include, { IIncludeRawJSONDataType, IIncludeState, IncludeExclusionState } from "./Include";
import PropertyDefinition,
{ IPropertyDefinitionRawJSONDataType, IPropertyDefinitionState } from "./PropertyDefinition";
import Module, { IModuleRawJSONDataType, ListenerType, IRawJSONI18NDataType, IRawJsonI18NSpecificLocaleDataType } from "..";
import {
  PREFIXED_CONCAT,
  ITEM_DEFINITION_PREFIX,
  INCLUDE_PREFIX,
  ANYONE_METAROLE,
  OWNER_METAROLE,
  ANYONE_LOGGED_METAROLE,
  GUEST_METAROLE,
  UNSPECIFIED_OWNER,
  EXCLUSION_STATE_SUFFIX,
  ENDPOINT_ERRORS,
  PREFIX_BUILD,
  POLICY_PREFIXES,
  RESERVED_BASE_PROPERTIES,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
} from "../../../../constants";
import { GraphQLOutputType, GraphQLObjectType } from "graphql";
import { EndpointError, EndpointErrorType } from "../../../errors";
import uuid from "uuid";
import { flattenRawGQLValueOrFields, requestFieldsAreContained } from "../../../../gql-util";
import { IGQLValue, IGQLRequestFields, IGQLFile, IGQLSearchRecord } from "../../../../gql-querier";
import { countries } from "../../../../imported-resources";
import Root, { ICustomRoleManager, IRequestLimitersType } from "../../../Root";
import { transferrableToBlob, blobToTransferrable, fileURLAbsoluter } from "../../../../util";
import type { IConfigRawJSONDataType } from "../../../../config";
import type { IElasticHighlightRecordInfo, PropertyDefinitionSupportedType } from "./PropertyDefinition/types";
import type { IActionSearchOptions } from "../../../../client/providers/item";

export interface IItemSearchStateHighlightType {
  [pId: string]: string[];
}

export interface IItemSearchStateHighlightArgsType {
  [argId: string]: string;
}


export interface IItemSearchStateType {
  searchError: EndpointErrorType;
  searching: boolean;
  searchRecords: IGQLSearchRecord[];
  searchResults: IGQLValue[];
  searchLimit: number;
  searchOffset: number;
  searchCount: number;
  searchId: string;
  searchOwner: string;
  searchLastModified: string;
  searchParent: [string, string, string];
  searchListenPolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property" | "none";
  searchCachePolicy: "by-owner" | "by-parent" | "by-owner-and-parent" | "by-property" | "none";
  searchShouldCache: boolean;
  searchCacheUsesProperty: [string, string];
  searchRequestedProperties: string[];
  searchRequestedIncludes: { [include: string]: string[] };
  searchFields: any;
  searchEngineEnabled: boolean;
  searchEngineEnabledLang: string;
  // these are used when standard search is done
  searchEngineHighlightArgs: IItemSearchStateHighlightArgsType;
  // similar to results, obtained from traditional search
  searchHighlights: IElasticHighlightRecordInfo;
  searchOriginalOptions: IActionSearchOptions;
};

export interface ICompoundSearchStateType {
  searchState: IItemSearchStateType;
  state: IItemStateType;
}

/**
 * Policies eg, readRoleAccess, editRoleAccess, createRoleAccess
 * this is the form they have deep in after the name
 */
export interface IPolicyValueRawJSONDataType {
  roles: string[];
  properties: string[];

  // unavailable for delete
  applyingProperties?: string[];
  applyingPropertyOnlyAppliesWhenCurrentIsNonNull?: boolean;
  applyingIncludes?: string[];

  // always available for parenting rules at least module is required
  // reason is simple when using the policy eg. say you have a parent
  // thread that only people with a specific key can post to, you want
  // the properties to come from that module of the parent; so while the policy
  // exists in the "post" item definition the module and item definition must
  // be for the "thread" and the properties list is the "thread" code

  // we do not filter these here, the schema.ts file takes care of ensuring
  // they have the right form
  module?: string;
  itemDefinition?: string;
}

/**
 * Because a policy type can have many sub policies this
 * defines it all
 */
export interface IPolicyRawJSONDataType {
  [policyName: string]: IPolicyValueRawJSONDataType;
}

/**
 * This is basically the types themselves
 */
export interface IPoliciesRawJSONDataType {
  edit?: IPolicyRawJSONDataType;
  delete?: IPolicyRawJSONDataType;
  read?: IPolicyRawJSONDataType;
  parent?: IPolicyRawJSONDataType;
}

/**
 * When parenting is specified to the item definition by
 * canBeParentedBy this is the shape it comes as
 */
export interface IItemDefinitionParentingRawJSONDataType {
  module: string;
  item?: string;
}

/**
 * The raw form of the item definition from the processed schema
 */
export interface IItemDefinitionRawJSONDataType {
  /**
   * Basic type
   */
  type: "item";

  /**
   * Location only exists during the building process and it's stripped
   * and represents the file location the file is
   */
  location?: string;
  /**
   * Also stripped after processed, represents the file location for the
   * i18n properties file
   */
  i18nDataLocation?: string;
  /**
   * The pointers come during the parsing method and are stripped as well
   * after built and it's used to create tracebacks from the raw data
   */
  pointers?: any;
  /**
   * This is the raw content of the file the pointers came from and it's also
   * stripped after built is done
   */
  raw?: string;

  /**
   * The name doesn't exist within the raw unprocessed data but it's added and
   * it's equal to the file name or the folder name in case of index.json
   */
  name: string;
  /**
   * The i18n data that is attached to that item definition it also doesn't exist
   * in the unprocessed data but comes from the properties file
   */
  i18nData: IRawJSONI18NDataType;

  /**
   * The includes exist within the item definition
   */
  includes?: IIncludeRawJSONDataType[];
  /**
   * The properties represent the list of properties it has
   */
  properties?: IPropertyDefinitionRawJSONDataType[];

  /**
   * Whether versioning is enabled
   */
  enableVersioning?: boolean;

  /**
   * Whether the version can be a country language concat pair such as en-US or fi-FI
   */
  versionIsLanguageAndCountry?: boolean;

  /**
   * Whether the version can be a country
   */
  versionIsCountry?: boolean;

  /**
   * Whether the version can be a language
   */
  versionIsLanguage?: boolean;

  /**
   * The roles that are allowed to do versioning
   */
  versioningRoleAccess?: string[];

  /**
   * Permissions for search purposes
   */
  searchRoleAccess?: string[]
  /**
   * Read role permissions
   */
  readRoleAccess?: string[];
  /**
   * Create role permissions
   */
  createRoleAccess?: string[];
  /**
   * Edit role permissions
   */
  editRoleAccess?: string[];
  /**
   * Delete role permissions
   */
  deleteRoleAccess?: string[];

  /**
   * This gets added during the building process
   * and represents the list of imported definitions
   * that exist within the module and are used for includes
   * these are paths
   */
  importedChildDefinitions?: string[][];
  /**
   * The actual child definitions that this item definition contains
   * this is appended during process as an array of this same object
   * aka it recurses as a tree
   */
  childDefinitions?: IItemDefinitionRawJSONDataType[];

  /**
   * the policies in the raw json form as they are specified
   * in the unprocessed file
   */
  policies?: IPoliciesRawJSONDataType;

  /**
   * This only really makes sense in the user case and it basically
   * shifts the ownership of the object to be its id rather than its created_by
   * attribute
   */
  ownerIsObjectId?: boolean;

  /**
   * If a role doesn't fit the criteria specified in the list the owner of
   * a given item cannot truly be read and the created_by field becomes
   * the unspecified owner
   */
  ownerReadRoleAccess?: string[];

  /**
   * Whether the item definition is searchable, when a module is searchable
   * and the item definition is not, the module precedes
   */
  searchable?: boolean;

  /**
   * Used to specify if the elastic search engine is enabled for this element
   */
  searchEngineEnabled?: boolean;

  /**
   * A specific language used
   */
  searchEngineFallbackLang?: string;

  /**
   * Wether to use the version as a fallback for language
   * setting, it can be used in conjuction with the standard fallback
   * and the property, this takes a second spot
   * 
   * 1. Property is checked, if nothing is found
   * 2. version will be checked if unversioned
   * 3. Fallback will be used
   */
  searchEngineLangUseVersion?: boolean;

  /**
   * Represents the property that is used in order to setup the elasticsearch
   * index language, because itemize can be set in many languages
   * 
   * If nothing is found then there's no property for language and it will be stored as a languageless
   * document in a common index that uses a standard tokenizer
   */
  searchEngineMainLangProperty?: string;

  /**
   * Unlike searchEngineMainLangProperty this will use the value of a string or text property itself
   * as the language, the property should be type language in order to be valid
   */
  searchEngineMainLangBasedOnProperty?: string;

  /**
   * Whether an user role can create in behalf
   */
  canCreateInBehalf?: boolean;

  /**
   * A list of roles of which this item definition is allowed to be
   * used to create in behalf
   */
  createInBehalfRoleAccess?: string[];

  /**
   * A list of roles which this item definition is allowed to
   * be used to make custom ids
   */
  customIdRoleAccess?: string[];

  /**
   * A list of roles which the item definition is allowed to create
   * in behalf to
   */
  createInBehalfTargetRoles?: string[];

  /**
   * Whether it can be parented by other item definitions, these
   * represent a list of rules
   */
  canBeParentedBy?: IItemDefinitionParentingRawJSONDataType[];
  /**
   * Limits the number of children that can be parented
   * by the same type
   */
  parentMaxChildCountSameType?: number;
  /**
   * Limits the number of children that can be parented
   * by the any type
   */
  parentMaxChildCountAnyType?: number;
  /**
   * Allows to move children from one parent to another
   * by providing a new parent during edit
   */
  enableReparenting?: boolean;
  /**
   * Whether it actually must always be parented
   */
  mustBeParented?: boolean;
  /**
   * The parenting rule
   * ONCE means that this item can only be parented once for the given parent
   * so one parent can only have one children of this same type
   * ONCE_PER_OWNER means that the rule applies as of a per owner basis
   * MANY is the default there can be as many children of the same type as it wants
   */
  parentingRule?: "ONCE" | "ONCE_PER_OWNER" | "MANY";
  /**
   * A list of roles who have access to parenting
   */
  parentingRoleAccess?: string[];
  /**
   * the request limiters
   */
  requestLimiters?: IRequestLimitersType;
}

/**
 * Represents the state of policies for a given type
 */
export interface IPolicyStateType {
  [policyName: string]: IPropertyDefinitionState<PropertyDefinitionSupportedType>[];
}

/**
 * Represents all the state of policies
 */
export interface IPoliciesStateType {
  edit?: IPolicyStateType;
  delete?: IPolicyStateType;
  read?: IPolicyStateType;
  parent?: IPolicyStateType;
}

/**
 * Represents the whole item definition state
 */
export interface IItemStateType {
  /**
   * The module this item definition resides (name only)
   */
  moduleName: string;
  /**
   * The qualified name of the item definition
   */
  itemDefQualifiedName: string;
  /**
   * The name of the item definition
   */
  itemDefName: string;
  /**
   * All the state of the includes within itself
   */
  includes: IIncludeState[];
  /**
   * All the states of the properties included
   */
  properties: IPropertyDefinitionState<PropertyDefinitionSupportedType>[];
  /**
   * All the policies state
   */
  policies: IPoliciesStateType;
  /**
   * The original graphql flattened value that was applied (if any)
   */
  gqlOriginalFlattenedValue: IGQLValue;
  /**
   * The id that was used
   */
  forId: string;
  /**
   * The version that was used
   */
  forVersion: string;
  /**
   * An search state for this state in the given slot, in practise
   * this is used in the search mode in order to store search results as a way
   * to keep them linked to the state that is used in that way some data
   * might be assigned to this state
   */
  searchState?: any;
}

/**
 * Represents the possible io actions to be performed
 * within an item definition
 */
export enum ItemDefinitionIOActions {
  READ = "READ",
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE"
}

/**
 * This is how graphql applied values are stored within
 * the item definition, using this structure, for the
 * application state
 */
export interface IItemDefinitionGQLValueType {
  /**
   * The value as it came from graphql endpoint
   */
  rawValue: IGQLValue;
  /**
   * The flattened value without DATA fields
   */
  flattenedValue: IGQLValue;
  /**
   * The requested fields that were used
   */
  requestFields: IGQLRequestFields;
}

/**
 * This is the structure used for compiled policies
 * within the item definition, they are properties
 * so they are stored in such way, this is for
 * a single policy type
 */
export interface IPolicyType {
  [policyName: string]: PropertyDefinition[];
}

/**
 * This is the structure of all the policies
 * with all the possible types involved
 */
export interface IPoliciesType {
  edit?: IPolicyType;
  delete?: IPolicyType;
  read?: IPolicyType;
  parent?: IPolicyType;
}

function resolveFile(
  file: IGQLFile,
  propertyId: string,
  include: string,
  originalState: IItemStateType,
  root: Root,
  config: IConfigRawJSONDataType,
): IGQLFile {
  const domain = process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;

  const containerId: string = (originalState.gqlOriginalFlattenedValue &&
    originalState.gqlOriginalFlattenedValue.container_id as string) || null;

  const idef = root.registry[originalState.itemDefQualifiedName] as ItemDefinition;

  return fileURLAbsoluter(
    domain,
    config.containersHostnamePrefixes,
    file,
    idef,
    originalState.forId,
    originalState.forVersion,
    containerId,
    include ? idef.getIncludeFor(include) : null,
    idef.getPropertyDefinitionFor(propertyId, true),
    false,
  );
}

function recoverBlobFiles(
  value: any,
): any {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(recoverBlobFiles);
  }

  if (value.src instanceof Blob || value.src instanceof File) {
    return {
      ...value,
      url: URL.createObjectURL(value.src),
    }
  }

  return value;
}

async function resolveFiles(
  p: IPropertyDefinitionState<PropertyDefinitionSupportedType>,
  include: string,
  originalState: IItemStateType,
  root: Root,
  config: IConfigRawJSONDataType,
): Promise<void> {
  if (!p.stateValue || typeof p.stateValue !== "object") {
    return;
  }

  if (Array.isArray(p.stateValue)) {
    await Promise.all(p.stateValue.map(async (v, index) => {
      if (!v || typeof v !== "object" || !v.url || v.src) {
        return;
      }

      const resolvedFile = resolveFile(v, p.propertyId, include, originalState, root, config);

      const blob = await (await fetch(resolvedFile.url)).blob();
      p.stateValue[index].src = blob;
    }));

    return;
  } else if (p.stateValue.url && !p.stateValue.src) {
    const resolvedFile = resolveFile(p.stateValue, p.propertyId, include, originalState, root, config);
    const blob = await (await fetch(resolvedFile.url)).blob();
    p.stateValue.src = blob;
  }
}

/**
 * This is the max expression, the item definition class
 * which basically compounds all how this is defined
 */
export default class ItemDefinition {
  /**
   * A raw helper function that gets a child or imported
   * raw item definition for an item, it's static, so it works
   * with raw json data, it throws no error
   * @param itemDefinitionRaw the json for the item definition
   * @param parentModuleRaw the parent module that contains
   * this same item definition raw
   * @param name the name of the expected child item
   * @param avoidImports whether to avoid imported items from the module
   * @returns a raw item definition if found, or null
   */
  public static getItemDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    name: string,
    avoidImports?: boolean,
  ): IItemDefinitionRawJSONDataType {
    // Find the definition in the raw form
    let definition = itemDefinitionRaw.childDefinitions
      .find((d) => d.name === name);

    // if we don't get it let's check the imports if we are allowed
    if (!definition && !avoidImports) {
      // we take the location and we match it like this
      // /path/example/itemDefinition would be considered imported
      // as well as itemDefinition would be matched to
      // /path/example/itemDefinition
      const importedDefinitionLoc = itemDefinitionRaw.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);

      // if we got it
      if (importedDefinitionLoc) {
        // le'ts get the name and the imported path
        const importedDefinitionName = importedDefinitionLoc.join("/");
        const importedPath = itemDefinitionRaw.importedChildDefinitions
          .find((d) => d.join("/") === importedDefinitionName);

        // There is an equal static function in the parent module for
        // handling this too
        if (importedPath) {
          definition = Module.getItemDefinitionRawFor(
            parentModuleRaw,
            importedPath,
          );
        }
      }
    }

    return definition || null;
  }

  /**
   * A raw helper function that takes raw json data and returns
   * a property definition if it finds it based on its id
   * it also checks prop extensions
   * @param itemDefinitionRaw the raw item definition to be searched
   * @param parentModuleRaw the raw module
   * @param id the id of the property
   * @param includeExtensions whether to include the extensions
   * @returns a raw property definition if found, or null
   */
  public static getPropertyDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    id: string,
    includeExtensions: boolean,
  ): IPropertyDefinitionRawJSONDataType {
    // We try to find the item definition locally
    let definition = itemDefinitionRaw.properties &&
      itemDefinitionRaw.properties.find((p) => p.id === id);

    // Otherwise we might check the prop extensions in the parent module
    // To see if it's there
    if (!definition && includeExtensions && parentModuleRaw.propExtensions) {
      definition = parentModuleRaw.propExtensions.find((p) => p.id === id);
    }

    // We return the definition or null on its defect
    return definition || null;
  }

  /**
   * Rips the internal values from the state so it can be
   * serialized, the serialized state removes possible useless data
   * @param state 
   */
  public static getSerializableState(state: IItemStateType): IItemStateType {
    const newState: IItemStateType = {
      forId: state.forId,
      forVersion: state.forVersion,
      itemDefName: state.itemDefName,
      itemDefQualifiedName: state.itemDefQualifiedName,
      moduleName: state.moduleName,
      properties: [
        ...state.properties,
      ],
      includes: [
        ...state.includes
      ]
    } as any;

    newState.properties.forEach((p, index) => {
      newState.properties[index] = {
        stateValue: p.stateValue,
        stateValueModified: p.stateValueModified,
        propertyId: p.propertyId,
      } as any;
    });

    newState.includes.forEach((i, index) => {
      newState.includes[index] = {
        includeId: i.includeId,
        exclusionState: i.exclusionState,
        itemState: ItemDefinition.getSerializableState(i.itemState),
      } as any;
    });

    return newState;
  }

  /**
   * Rips the internal values from the state so it can be
   * serialized, the serialized state removes possible useless data
   * @param state 
   */
  public static async getSerializableStateWithFiles(state: IItemStateType, root: Root, config: IConfigRawJSONDataType): Promise<IItemStateType> {
    const newState: IItemStateType = ItemDefinition.getSerializableState(state);

    await Promise.all(newState.properties.map((p) => {
      return resolveFiles(p, null, state, root, config);
    }));

    await Promise.all(newState.includes.map((i) => {
      return Promise.all(i.itemState.properties.map((p) => {
        return resolveFiles(p, i.includeId, state, root, config);
      }));
    }));

    return newState;
  }

  /**
   * The raw data of the item definition as it was
   * compiled
   */
  public rawData: IItemDefinitionRawJSONDataType;
  /**
   * A cached graphql object
   */
  // tslint:disable-next-line: variable-name
  public _gqlObj: GraphQLOutputType;
  /**
   * A cached graphql query object
   */
  // tslint:disable-next-line: variable-name
  public _gqlQueryObj: GraphQLObjectType;

  /**
   * The include instances compiled from the raw data
   */
  private includeInstances: Include[];
  /**
   * The child definitions the item definition contains
   */
  private childDefinitions: ItemDefinition[];
  /**
   * Imported definitions that are included in the
   * raw data using the import mechanism, this is the
   * compiled form
   */
  private importedChildDefinitions: Array<{
    fullName: string,
    definition: ItemDefinition,
  }>;
  /**
   * All the properties within the item definition
   */
  private propertyDefinitions: PropertyDefinition[];
  /**
   * All the policies within the item definition
   */
  private policyPropertyDefinitions: IPoliciesType;
  /**
   * The parent module
   */
  private parentModule: Module;
  /**
   * A parent item definition or null
   */
  private parentItemDefinition: ItemDefinition;
  /**
   * The originating instance exists only if the current
   * item definition was instantiated from another and detached from
   * the tree, this is the tree instance it came from
   */
  private originatingInstance: ItemDefinition;
  /**
   * whether this instance is for prop extensions in the module
   * that is an emulated item definition that only contains
   * the prop extensions and is generated in the module
   */
  private extensionsInstance: boolean = false;

  /**
   * Listeners are simple callbacks that are added and operate within
   * the item definition, usually added for UI level functionality
   */
  private listeners: {
    [event: string]: {
      [mergedID: string]: ListenerType[],
    },
  };
  /**
   * Events are triggered accross the tree, so this ensures that the event
   * doesn't trigger twice and creates a forever loop
   */
  private lastListenerCallId: string = "";

  /**
   * Containst state information about applied values to slots
   */
  private stateHasAppliedValueTo: {
    [mergedID: string]: boolean,
  };
  /**
   * Contains the information about the specific applied value to an slot
   */
  private stateGQLAppliedValue: {
    [mergedID: string]: IItemDefinitionGQLValueType;
  };
  /**
   * The internal state
   */
  private stateSearch: {
    [mergedID: string]: any;
  }
  /**
   * The cleans being blocked and by whom
   */
  private cleansBlocked: {
    [mergedId: string]: string[];
  }

  /**
   * Build a new ItemDefinition instance
   * @param rawJSON the raw json form
   * @param parentModule the parent module instance
   * @param parentItemDefinition the parent item definition (or null)
   * @param originatingInstance an originating instance (for instantiated detached instances)
   */
  constructor(
    rawJSON: IItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    originatingInstance?: ItemDefinition,
  ) {
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;
    this.originatingInstance = originatingInstance || null;

    // assigning the item definitions that are child by
    // instantiating them
    this.childDefinitions = rawJSON.childDefinitions ? rawJSON.childDefinitions
      .map((d) => (new ItemDefinition(d, this.parentModule,
        this))) : [];

    // Assigning the imported child definitions by
    // instantiating a detached child definition from the
    // parent module
    this.importedChildDefinitions =
      rawJSON.importedChildDefinitions ?
        rawJSON.importedChildDefinitions.map(
          (d) => ({
            fullName: d.join("/"),
            definition: this.parentModule.getItemDefinitionFor(d),
          })) : [];

    const isInSearchMode = this.isInSearchMode();

    // assigning the property definition by using the
    // properties and instantiating those as well
    this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
      .filter((p) => isInSearchMode ? true : !p.searchOnlyProperty)
      .map((i) => (new PropertyDefinition(i, parentModule,
        this, false))) : [];

    // assigning the include instances by using the includes
    // and instantiating those
    this.includeInstances = rawJSON.includes ? rawJSON.includes
      .map((i) => (new Include(i, parentModule, this))) : [];

    this.cleanState(true);

    this.listeners = {};

    this.parentModule.getParentRoot().registry[this.getQualifiedPathName()] = this;
    this.parentModule.getParentRoot().registry[this.getAbsolutePath().join("/")] = this;
  }

  public cleanState(init?: boolean) {
    this.stateHasAppliedValueTo = {};
    this.stateGQLAppliedValue = {};
    this.stateSearch = {};
    this.cleansBlocked = {};

    if (!init) {
      this.propertyDefinitions && this.propertyDefinitions.forEach((p) => p.cleanState());
      this.childDefinitions && this.childDefinitions.forEach((cd) => cd.cleanState());
      this.includeInstances && this.includeInstances.forEach((ii) => ii.cleanState());
    }
  }

  /**
   * Runs the initialization of the item definition, for cross access, this executes
   * once the entire tree is ready so this item definition can access other parts of the tree
   * Root class executes this function recursively
   */
  public init() {
    // we need to set the policy property definition, the reason it's done in init
    // and not in constructor is because we might need to get access to properties in
    // other item definitions for the purposes of the parenting rules
    this.policyPropertyDefinitions = {};

    // if we have policies at all
    if (this.rawData.policies) {
      // we loop within the types
      Object.keys(this.rawData.policies).forEach((policyType) => {
        this.policyPropertyDefinitions[policyType] = {};

        // now looping per name
        Object.keys(this.rawData.policies[policyType]).forEach((policyName) => {

          // we get the policy value
          const policyValue: IPolicyValueRawJSONDataType = this.rawData.policies[policyType][policyName];
          // check if there's a module and item definition in question
          const moduleInQuestionPath = policyValue.module;
          const itemDefinitionInQuestionPath = policyValue.itemDefinition;

          // by default the item definition in question is this same item definiton
          // and properties referred are the same as this ones
          let itemDefinition: ItemDefinition = this;
          // but if we have a module specified
          if (moduleInQuestionPath) {
            // we need to get that referred module
            const referredModule = this.getParentModule().getParentRoot().getModuleFor(moduleInQuestionPath.split("/"));
            // and extract the item definition from it, notice how there might not be a path specified
            if (itemDefinitionInQuestionPath) {
              itemDefinition = referredModule.getItemDefinitionFor(itemDefinitionInQuestionPath.split("/"));
            } else {
              // and in such case we use the extensions instance as a way to hack it
              itemDefinition = referredModule.getPropExtensionItemDefinition();
            }
          }

          // now we setup the property definition value by reinstantiating
          this.policyPropertyDefinitions[policyType][policyName] =
            policyValue.properties.map(
              (propertyId: string) => {
                return itemDefinition.getPropertyDefinitionFor(propertyId, true).getNewInstance().markAsPolicy(policyType, policyName);
              },
            );
        });
      });
    }

    // now we get all the child definitions and instantiate them
    this.childDefinitions.forEach((cd) => {
      cd.init();
    });
  }

  /**
   * Provides the item definition and only the item definition request limiters
   * @returns the request limiters object or null
   */
  public getRequestLimiters() {
    return this.rawData.requestLimiters || null;
  }

  /**
   * Flags this item definition into an extensions instance
   */
  public setAsExtensionsInstance() {
    this.extensionsInstance = true;
  }

  /**
   * Checks the flag for this item definition as being
   * an extensions instance
   * @returns a boolean
   */
  public isExtensionsInstance() {
    return this.extensionsInstance;
  }

  /**
   * Tells whether this item definition is versioned
   */
  public isVersioned() {
    return !!this.rawData.enableVersioning;
  }

  /**
   * Tells whether a version is a valid value for this item definition
   * @param version the version id
   * @param supportedLanguages the array list of supported language this function
   * is unaware of supported languages so it needs to ask in order to check for a version
   * @returns a boolean on whether it's a valid version
   */
  public isValidVersion(version: string, supportedLanguages: string[]) {
    // if it's not a versioned item definition and the version is not null
    if (!this.isVersioned() && version !== null) {
      // then it's invalid
      return false;
    }

    // otherwise if the version is optional and we provide no version
    if (version === null) {
      // then it's fine
      return true;
    } else if (
      // if there is no complex condition for these localized versions
      !this.rawData.versionIsCountry &&
      !this.rawData.versionIsLanguage &&
      !this.rawData.versionIsLanguageAndCountry
    ) {
      // then the version must simply not be null
      return version !== null;
    }

    // otherwse let's calculate these booleans
    const isCountry = !!countries[version];
    const isLanguageOrEntireLocale = !!supportedLanguages.find((l) => l === version);

    const versionSplitted = version.split("-");
    if (!isCountry && !isLanguageOrEntireLocale && versionSplitted.length !== 2) {
      return false;
    }
    const possibleLanguage = versionSplitted[0];
    const possibleCountry = versionSplitted[1] || null;
    const isEntireLocale = versionSplitted.length === 2 && isLanguageOrEntireLocale;
    const isLanguageAndCountry = !!possibleCountry &&
      !!countries[possibleCountry] && supportedLanguages.find((l) => l === possibleLanguage);

    // and check each
    if (
      this.rawData.versionIsCountry &&
      isCountry
    ) {
      return true;
    } else if (
      this.rawData.versionIsLanguage &&
      isLanguageOrEntireLocale
    ) {
      return true;
    } else if (
      this.rawData.versionIsLanguageAndCountry &&
      (isLanguageAndCountry || isEntireLocale)
    ) {
      return true;
    }

    // if none passes, we return false
    return false;
  }

  /**
   * provides the raw name of the item definition
   * @returns the name as a string
   */
  public getName(): string {
    return this.rawData.name;
  }

  /**
   * Provides the module name that contains this item definition
   * @returns a string
   */
  public getModuleName(): string {
    return this.parentModule.getName();
  }

  /**
   * Tells whether an item definition has a child item definition for it
   * @param name the name of the item definition
   * @param avoidImports whether to avoid the imported detached definitions
   * @returns a boolean on whether it does or not
   */
  public hasItemDefinitionFor(
    name: string,
    avoidImports?: boolean,
  ): boolean {
    // For this we use the raw data, we check if one
    // matches the name
    let status = this.rawData.childDefinitions.some((d) => d.name === name);

    // if we don't find it let's try searching in imports
    if (!status && !avoidImports) {
      // we take the location and we match it like this
      // /path/example/itemDefinition would be considered imported
      // as well as itemDefinition would be matched to
      // /path/example/itemDefinition
      const importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);
      // if we find an imported location that matches
      if (importedDefinitionLoc) {
        // we ask the module the same thing
        status =
          this.parentModule.hasItemDefinitionFor(importedDefinitionLoc);
      }
    }
    // return that status
    return status;
  }

  /**
   * Gets a live item definition for the current item definition
   * either as a children or a detached instance that came from
   * another item definition as an import
   * @param name the name of the item definition
   * @param avoidImports whether to avoid imported items
   * @returns an item definition, will throw an error if not found
   */
  public getDirectlyAvailableItemDefinitionInContextFor(
    name: string,
    avoidImports?: boolean,
  ): ItemDefinition {
    // We basically do the same as hasItemDefinition but we use
    // the live instances
    let definition = this.childDefinitions
      .find((d) => d.getName() === name);

    // if we don't have that definition
    if (!definition && !avoidImports) {

      // Do the same as before and do the matching
      const importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);

      // now we check we got something
      if (importedDefinitionLoc) {
        // And now let's use the full names for what we had
        // already requested to the parent
        const importedDefinitionName = importedDefinitionLoc.join("/");
        const found = this.importedChildDefinitions
          .find((d) => d.fullName === importedDefinitionName);

        // if we find it, we assign it
        if (found) {
          definition = found.definition;
        }
      }
    }

    // We throw an error in requested a non existant definition
    if (!definition) {
      throw new Error("Requested invalid definition " + name);
    }

    // return it
    return definition;
  }

  /**
   * Checks whether an item included in this item definition
   * has an specific id
   * @param id the id of the include
   * @returns a boolean on whether it has such include
   */
  public hasIncludeFor(id: string) {
    return !!this.includeInstances.find((ii) => ii.getId() === id);
  }

  /**
   * provides an include within this item defintion that has that
   * specific id
   * @param id the id of the include
   * @returns the include if any, would throw an error if not found
   */
  public getIncludeFor(id: string) {
    const include = this.includeInstances.find((ii) => ii.getId() === id);
    if (!include) {
      throw new Error("Requested invalid include " + id);
    }
    return include;
  }

  /**
   * Provides a raw json item definition that it has a children
   * @param name the name of the item definition
   * @param avoidImports optional whether to avoid imported item definitions
   * @throws an error if the item definition does not exist
   * @returns a raw item definition
   */
  public getItemDefinitionRawFor(
    name: string,
    avoidImports?: boolean,
  ) {
    // We basically pipe the data to the static
    const definition = ItemDefinition.getItemDefinitionRawFor(
      this.rawData,
      this.parentModule.rawData,
      name,
      avoidImports,
    );
    //
    if (!definition) {
      throw new Error("Searching for item definition " +
        name + " failed");
    }
    return definition;
  }

  /**
   * Provides all the property definitions without
   * including the extensions
   * @returns a property definiton array
   */
  public getAllPropertyDefinitions() {
    return this.propertyDefinitions;
  }

  /**
   * Provides all that property defintiions
   * including the extensions
   * @returns a property definition array
   */
  public getAllPropertyDefinitionsAndExtensions() {
    if (this.isInSearchMode()) {
      // This is a case where a collision might exist and the local takes priority
      // it is rare that this would run anyway
      return this.parentModule.getAllPropExtensions()
        .filter((p) => p.getId() !== "search" && p.getId() !== "created_by" && p.getId() !== "since" && p.getId() !== "until")
        .concat(this.getAllPropertyDefinitions());
    }
    return this.parentModule.getAllPropExtensions().concat(this.getAllPropertyDefinitions());
  }

  /**
   * Provides all the item instances
   * @returns an include array
   */
  public getAllIncludes() {
    return this.includeInstances;
  }

  /**
   * Checks whether an item definition has a property definition
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   * @returns a boolean
   */
  public hasPropertyDefinitionFor(id: string, includeExtensions: boolean) {
    // we use the rawdata to quickly check
    let found = (this.rawData.properties || [])
      .some((p) => p.id === id);
    if (!found && includeExtensions) {
      found = this.parentModule.hasPropExtensionFor(id);
    }
    return found;
  }

  /**
   * Provides a live property definition for an item definition
   * this property definition can trigger state changes
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   * @returns a property definition or throws an error if not found
   */
  public getPropertyDefinitionFor(
    id: string,
    includeExtensions: boolean,
  ): PropertyDefinition {
    let definition = this.propertyDefinitions.find((p) => p.getId() === id);
    if (!definition && includeExtensions) {
      definition = this.parentModule.getPropExtensionFor(id);
    }
    if (!definition) {
      throw new Error("Requested invalid property " + id);
    }
    return definition;
  }

  /**
   * Given a string id it specifies whether it is considered
   * a search only property only available in the search mode
   * @param id the id of the property
   * @returns a boolean
   */
  public isPropertyInSearchModeOnly(
    id: string,
  ): boolean {
    const isInSearchModeLocal = !!(this.rawData.properties && this.rawData.properties.some((p) => p.id === id && p.searchOnlyProperty));
    return isInSearchModeLocal || this.parentModule.isPropExtensionInSearchModeOnly(id);
  }

  /**
   * Provides a property definition based on a policy
   * this is a unique instance that holds its own state
   * and it's reflected in the item definition state
   * @param policyType the policy type
   * @param policyName the policy name
   * @param id the property id
   * @returns a property definition or throws an error if not found
   */
  public getPropertyDefinitionForPolicy(
    policyType: string,
    policyName: string,
    id: string,
  ): PropertyDefinition {
    if (!this.policyPropertyDefinitions[policyType]) {
      throw new Error("There is no data regarding policy type " + policyType);
    } else if (!this.policyPropertyDefinitions[policyType][policyName]) {
      throw new Error("There is no data regarding policy type " + policyType + " in name " + policyName);
    }
    const definition = this.policyPropertyDefinitions[policyType][policyName]
      .find((p: PropertyDefinition) => p.getId() === id);
    if (!definition) {
      throw new Error("There is no property in policy type " + policyType + " in name " + policyName + " for " + id);
    }
    return definition;
  }

  /**
   * Provides the qualified identifier for a given policy as it is described
   * @param policyType the policy type
   * @param policyName the policy name
   * @param id the property id
   * @returns a property definition or throws an error if not found
   */
  public getQualifiedPolicyIdentifier(
    policyType: string,
    policyName: string,
    id: string,
  ) {
    return PREFIX_BUILD(POLICY_PREFIXES[policyType] + policyName) + id;
  }

  /**
   * Tells whether the current item definition has items itself
   * which are active and match the specific name
   * that means the item is not excluded and the item is
   * matches the name
   * @param id the slot id of the current state
   * @param version the slot version of the current state
   * @param name the name of the item
   * @returns a boolean
   */
  public hasAtLeastOneActiveInstanceOf(id: string, version: string, name: string): boolean {
    // we need a list of possible candidates
    // the might currently contain checks if an include
    // contains the include with the given name
    // otherwise it's not worth to check for activity
    const possibleCandidates = this.includeInstances
      .filter((i) => i.getItemDefinitionName() === name);

    // if there are no possible candidates return false
    if (!possibleCandidates.length) {
      return false;
    }

    return possibleCandidates.some((c) => c.getExclusionState(id, version) !== IncludeExclusionState.EXCLUDED);
  }

  /**
   * Checks whether it has an active instance of an item
   * given its include id (not its name)
   * @param id the slot id
   * @param version the slot version
   * @param includeId the id of the item
   * @returns a boolean on whether it does
   */
  public hasAnActiveIncludeInstanceOfId(id: string, version: string, includeId: string): boolean {
    const candidate = this.includeInstances
      .find((i) => i.getId() === includeId);

    if (!candidate) {
      return false;
    }

    return candidate.getExclusionState(id, version) !== IncludeExclusionState.EXCLUDED;
  }

  /**
   * Just gives the parent module
   * @returns a module instance
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Tells whether it has a parent item definition
   * @retuns a boolean
   */
  public hasParentItemDefinition() {
    return !!this.parentItemDefinition;
  }

  /**
   * Provides the parent item definition
   * @returns an item definition or throws an error if no such a thing
   */
  public getParentItemDefinition() {
    if (!this.parentItemDefinition) {
      throw new
        Error("Attempted to get parent definition while missing");
    }
    return this.parentItemDefinition;
  }

  /**
   * Provides the live child definitions
   * without imports
   * @returns an array of item definitions
   */
  public getChildDefinitions() {
    return this.childDefinitions;
  }

  /**
   * Provides the live child definitions
   * without imports, recursively
   * @returns an array of item definitions
   */
  public getChildDefinitionsRecursive() {
    let childDefinitions = this.getChildDefinitions();
    childDefinitions.forEach((idef) => {
      childDefinitions = childDefinitions.concat(idef.getChildDefinitionsRecursive());
    });
    return childDefinitions;
  }

  /**
   * Provides the live imported child definitions
   * @returns an array of item definitions
   */
  public getImportedChildDefinitions() {
    return this.importedChildDefinitions.map((icd) => icd.definition);
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   * @returns a new ItemDefiniton instance
   */
  public getNewInstance() {
    return new ItemDefinition(this.rawData, this.parentModule, this.parentItemDefinition, this);
  }

  /**
   * Provides the item definition item locale data
   * @param locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string): IRawJsonI18NSpecificLocaleDataType {
    if (this.originatingInstance) {
      return this.originatingInstance.getI18nDataFor(locale);
    }
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * Only works in the client side, provides a blob package of the current
   * state of the item definition
   * @param id 
   * @param version 
   * @param emulateExternalChecking 
   * @param onlyIncludeProperties 
   * @param onlyIncludeIncludes 
   * @param excludePolicies 
   * @returns 
   */
  public async getStatePackage(
    id: string,
    version: string,
    onlyIncludeProperties?: string[],
    onlyIncludeIncludes?: { [include: string]: string[] },
    excludePolicies?: boolean,
  ): Promise<Blob> {
    const state = await ItemDefinition.getSerializableStateWithFiles(
      this.getStateNoExternalChecking(
        id,
        version,
        false,
        onlyIncludeProperties,
        onlyIncludeIncludes,
        excludePolicies
      ),
      this.getParentModule().getParentRoot(),
      window.CONFIG,
    );
    return transferrableToBlob(state);
  }

  /**
   * same as getCurrentValue but ignores external checking
   * so it doesn't have to be async and no need to spend
   * network resources, checks most, but ignores unique checkings
   * in order to get cached previously checked results
   * @param id the stored value of the item definition, pass null if new
   * @param version the store value of the version, only applies if id specified
   * @param emulateExternalChecking emulates an externally checked
   * property as the get current value async leaves a cache behind
   * and this will use the cache rather than re-requesting
   * @param onlyIncludeProperties only includes these specific
   * properties, note property definitions are not fetched in
   * this case
   * @param onlyIncludeIncludes includes the includes in the list
   * @param excludePolicies excludes all the policies state
   * @retrns the item definition state without extenral checks
   */
  public getStateNoExternalChecking(
    id: string,
    version: string,
    emulateExternalChecking?: boolean,
    onlyIncludeProperties?: string[],
    onlyIncludeIncludes?: { [include: string]: string[] },
    excludePolicies?: boolean,
  ): IItemStateType {
    const properties = onlyIncludeProperties ?
      onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true)
        .getStateNoExternalChecking(id, version, emulateExternalChecking)) :
      this.getAllPropertyDefinitionsAndExtensions().map((pd) => {
        return pd.getStateNoExternalChecking(id, version, emulateExternalChecking);
      });

    let policies: IPoliciesStateType = null;
    if (!excludePolicies) {
      policies = {};
      ["edit", "delete", "read", "parent"].map((policyType) => {
        if (this.policyPropertyDefinitions[policyType]) {
          policies[policyType] = {};
          Object.keys(this.policyPropertyDefinitions[policyType]).map((policyName) => {
            policies[policyType][policyName] =
              this.getPropertiesForPolicy(policyType, policyName)
                .map((pd) => pd.getStateNoExternalChecking(id, version, emulateExternalChecking));
          });
        }
      });
    }

    let includes: IIncludeState[];
    if (onlyIncludeIncludes) {
      includes = Object.keys(onlyIncludeIncludes).map((ii) =>
        this.getIncludeFor(ii).getStateNoExternalChecking(id, version, onlyIncludeIncludes[ii], emulateExternalChecking));
    } else {
      includes = this.includeInstances.map((ii) =>
        ii.getStateNoExternalChecking(id, version, null, emulateExternalChecking));
    }

    const gqlOriginal = this.getGQLAppliedValue(id, version);
    const searchState = this.getSearchState(id, version);
    return {
      moduleName: this.getModuleName(),
      itemDefQualifiedName: this.getQualifiedPathName(),
      itemDefName: this.getName(),
      includes,
      properties,
      policies,
      gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
      forId: id,
      forVersion: version,
      searchState,
    };
  }

  /**
   * provides the structure of the current item
   * as it is currently, the reason this is more efficient
   * is because getting the value of each item definition
   * wastes resources, so using this function is more
   * efficient than calling the functions
   * @param id the stored value of the item definition, pass null if new
   * this also represens the slot
   * @param version the stored value given a version pass null for default
   * @param onlyIncludeProperties only includes these specific
   * properties, note property definitions are not fetched in
   * this case
   * @param onlyIncludeIncludes includes the includes in the list
   * @param excludePolicies excludes all the policies state bit
   * @returns a promise for the item definition state
   */
  public async getState(
    id: string,
    version: string,
    onlyIncludeProperties?: string[],
    onlyIncludeIncludes?: { [include: string]: string[] },
    excludePolicies?: boolean,
  ): Promise<IItemStateType> {
    const properties = await Promise.all(onlyIncludeProperties ?
      onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true).getState(id, version)) :
      this.getAllPropertyDefinitionsAndExtensions().map((pd) => {
        return pd.getState(id, version);
      }),
    );

    let policies: IPoliciesStateType = null;
    if (!excludePolicies) {
      policies = {};
      await Promise.all(["edit", "delete", "read", "parent"].map(async (policyType) => {
        if (this.policyPropertyDefinitions[policyType]) {
          policies[policyType] = {};
          await Promise.all(Object.keys(this.policyPropertyDefinitions[policyType]).map(async (policyName) => {
            policies[policyType][policyName] =
              await Promise.all(this.getPropertiesForPolicy(policyType, policyName)
                .map((pd) => pd.getState(id, version)));
          }));
        }
      }));
    }

    let includes: IIncludeState[];
    if (onlyIncludeIncludes) {
      includes = await Promise.all(Object.keys(onlyIncludeIncludes).map(
        (ii) => this.getIncludeFor(ii).getState(id, version, onlyIncludeIncludes[ii])),
      );
    } else {
      includes = await Promise.all(this.includeInstances.map((ii: Include) => ii.getState(id, version, null)));
    }

    const gqlOriginal = this.getGQLAppliedValue(id, version);
    const searchState = this.getSearchState(id, version);
    return {
      moduleName: this.getModuleName(),
      itemDefQualifiedName: this.getQualifiedPathName(),
      itemDefName: this.getName(),
      includes,
      properties,
      policies,
      gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
      forId: id,
      forVersion: version,
      searchState,
    };
  }

  public applyState(
    id: string,
    version: string,
    state: IItemStateType,
    specificProperties?: string[],
    specificIncludes?: {[includeId: string]: string[]},
  ) {
    state.properties.forEach((p) => {
      if (specificProperties && !specificProperties.includes(p.propertyId)) {
        return;
      }
      try {
        const pInIdef = this.getPropertyDefinitionFor(p.propertyId, true);
        pInIdef.applyValue(id, version, recoverBlobFiles(p.stateValue), p.stateValueModified, false, true);
      } catch (err) {
        console.warn("Could not apply to property " + p.propertyId + " due to state shape incompatibility");
      }
    });

    state.includes.forEach((i) => {
      if (specificIncludes && !specificIncludes[i.includeId]) {
        return;
      }
      try {
        const iInIdef = this.getIncludeFor(i.includeId);
        iInIdef.setExclusionState(id, version, i.exclusionState);
        i.itemState.properties.forEach((p) => {
          if (specificIncludes && !specificIncludes[i.includeId].includes(p.propertyId)) {
            return;
          }

          try {
            const pInInclude = iInIdef.getSinkingPropertyFor(p.propertyId);
            pInInclude.applyValue(id, version, recoverBlobFiles(p.stateValue), p.stateValueModified, false, true);
          } catch (err) {
            console.warn("Could not apply to property " + p.propertyId + " in include " + i.includeId + " due to state shape incompatibility");
          }
        });
      } catch (err) {
        console.warn("Could not apply to include " + i.includeId + " due to state shape incompatibility");
      }
    });
  }

  public async applyStateFromPackage(
    id: string,
    version: string,
    state: Blob | File,
    specificProperties?: string[],
    specificIncludes?: {[includeId: string]: string[]},
  ) {
    const stateObj = await blobToTransferrable(state);
    return this.applyState(id, version, stateObj, specificProperties, specificIncludes);
  }

  /**
   * Applies a value from graphql to the item definition state
   * @param id the id that this state is for (can be null)
   * @param version the version of this state is for (can be null)
   * @param value the value itself from graphql, DATA values and flattened values are valid.
   * @param excludeExtensions whether to exclude the extensions for applying the value
   * @param requestFields the fields that were used to request this data (can be null) but be careful
   * this might be used for catching
   * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySet to avoid hot updating
   * values when the user is modifying them and an apply value has been called because
   * it has been updated somewhere else, we use this to avoid overriding, note that the value must also
   * not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back
   * to false as it's been used applyValue on it, it's been set now by the computer
   * @param forceApply will always apply and not perform the signature check
   * @returns a boolean on whether the action was performed, sometimes the value will not be applied
   * because there already exists a better one already stored for the same last modified value which contains
   * more fields
   */
  public applyValue(
    id: string,
    version: string,
    value: IGQLValue,
    excludeExtensions: boolean,
    requestFields: IGQLRequestFields,
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySet: boolean,
    forceApply?: boolean,
  ): boolean {
    // first we flatten the value if necessary
    const flattenedValue = value === null ? value : (typeof value.DATA !== "undefined" ? flattenRawGQLValueOrFields(value) : value);
    const mergedID = id + "." + (version || "");

    // we already have a value for that
    if (!forceApply && this.stateHasAppliedValueTo[mergedID]) {
      if (this.stateGQLAppliedValue[mergedID].flattenedValue === null && value === null) {
        const currentRequestFields = this.stateGQLAppliedValue[mergedID].requestFields;
        if (!requestFieldsAreContained(requestFields, currentRequestFields)) {
          this.stateGQLAppliedValue[mergedID].requestFields = requestFields;
        }
        return false;
      }

      const fieldsAlreadyGot = this.stateGQLAppliedValue[mergedID].requestFields;
      if (
        requestFieldsAreContained(requestFields, fieldsAlreadyGot) &&
        (
          (
            this.stateGQLAppliedValue[mergedID].flattenedValue &&
            value &&
            this.stateGQLAppliedValue[mergedID].flattenedValue.last_modified === value.last_modified
          ) || (
            this.stateGQLAppliedValue[mergedID].rawValue === value
          )
        )
      ) {
        return false;
      }
    }

    // we make it we have an applied value
    this.stateHasAppliedValueTo[mergedID] = true;
    this.stateSearch[mergedID] = null;
    // and set all the data regarding that value
    this.stateGQLAppliedValue[mergedID] = {
      rawValue: value,
      flattenedValue,
      requestFields,
    };

    // now we get all the properties that we are supposed to apply that value to
    const properties =
      excludeExtensions ?
        this.getAllPropertyDefinitions() :
        this.getAllPropertyDefinitionsAndExtensions();

    // and loop loop
    properties.forEach((property) => {
      // we get the value we are supposed to apply
      let givenValue = flattenedValue === null ? undefined : flattenedValue[property.getId()];

      // and decide whether we will set it as modified, if the value
      // is undefined, it acts like a delete, wipe, unmodified default
      // value
      let setAsModified = true;
      if (typeof givenValue === "undefined") {
        setAsModified = false;
        givenValue = null;
      }
      // and we apply such value
      property.applyValue(id, version, givenValue,
        setAsModified, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet);
    });

    // now we get all the items
    this.getAllIncludes().forEach((include) => {
      // and we get the applied value for thae item
      let givenValue = flattenedValue === null ? undefined : flattenedValue[include.getQualifiedIdentifier()];
      if (typeof givenValue === "undefined") {
        givenValue = null;
      }
      // and the exclusion state, or excluded if not specified
      const givenExclusionState = flattenedValue !== null ?
        (flattenedValue[include.getQualifiedExclusionStateIdentifier()] || IncludeExclusionState.EXCLUDED) :
        IncludeExclusionState.EXCLUDED;

      // and we apply such value
      include.applyValue(id, version, givenValue,
        givenExclusionState, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet);
    });

    return true;
  }

  /**
   * Restores an applied value to the last applied value
   * @param id the id
   * @param version the version
   * @param excludeExtensions whether to exclude extensions of all this
   */
  public restoreValueFor(
    id: string,
    version: string,
    excludeExtensions?: boolean,
  ) {
    const mergedID = id + "." + (version || "");
    if (this.stateHasAppliedValueTo[mergedID]) {
      const entireValue = this.stateGQLAppliedValue[mergedID];
      this.applyValue(
        id,
        version,
        entireValue.rawValue,
        excludeExtensions,
        entireValue.requestFields,
        false,
        // must force apply because otherwise the last modified signature
        // check may not allow it to restore
        true,
      );
    } else {
      this.cleanValueFor(id, version, excludeExtensions, true);
    }
  }

  /**
   * Provides the owner that applied the value for the
   * applied value, basically the created_by value
   * (or id if owner is object id, which is only relevant for users honestly)
   * @param id the id of the state
   * @param version the version of the slot
   * @returns a string, will return UNSPECIFIED_OWNER if it cannot find anything
   */
  public getAppliedValueOwnerIfAny(id: string, version: string): string {
    const mergedID = id + "." + (version || "");
    if (
      !this.stateHasAppliedValueTo[mergedID] ||
      !this.stateGQLAppliedValue[mergedID] ||
      !this.stateGQLAppliedValue[mergedID].flattenedValue
    ) {
      return UNSPECIFIED_OWNER;
    }

    if (this.isOwnerObjectId()) {
      return (this.stateGQLAppliedValue[mergedID].flattenedValue.id || UNSPECIFIED_OWNER) as string;
    }
    return (this.stateGQLAppliedValue[mergedID].flattenedValue.created_by || UNSPECIFIED_OWNER) as string;
  }

  /**
   * Forces an item definition to be unable to clean its value
   * from memory, and rather perform a restoration to the original
   * value when requested to do so, use removeBlockCleanFor in order
   * to release this blockage, this blockage is used by the UI threads
   * in order to tell another UI component that it expects to use that
   * value so please avoid cleaning it
   *
   * @param id the id
   * @param version the version
   * @param blockId the block identifier
   */
  public addBlockCleanFor(id: string, version: string, blockId: string): void {
    const mergedID = id + "." + (version || "");

    if (this.cleansBlocked[mergedID]) {
      this.cleansBlocked[mergedID].push(blockId);
    } else {
      this.cleansBlocked[mergedID] = [blockId];
    }
  }

  /**
   * Specifies whether a block id exists with the given criteria
   * @param id 
   * @param version 
   * @param blockId 
   * @returns 
   */
  public hasBlockCleanFor(id: string, version: string, blockId: string): boolean {
    const mergedID = id + "." + (version || "");
    
    if (!this.cleansBlocked[mergedID]) {
      return false;
    }
    
    return this.cleansBlocked[mergedID].includes(blockId);
  }

  /**
   * Removes the blockage of the clean
   *
   * @param id the id
   * @param version the version
   * @param blockId the given blockage id
   */
  public removeBlockCleanFor(id: string, version: string, blockId: string) {
    const mergedID = id + "." + (version || "");

    if (this.cleansBlocked[mergedID]) {
      const newValue = this.cleansBlocked[mergedID].filter((v) => v !== blockId);
      if (newValue.length === 0) {
        delete this.cleansBlocked[mergedID];
      }
    }
  }

  /**
   * Wipes down a value and its state and everything out of memory
   * this might not be important in the client side but very important
   * in the server side, not cleaning the memory can become a memory leak
   * @param id the id of the state
   * @param version the version of the state
   * @param excludeExtensions whether to include the extensions of the parent
   * @param force ignores the blockage, will clean anyway
   * @returns a boolean where true refers to whether it was cleaned and false it was restored
   * because the cleaning was blocked from performing
   */
  public cleanValueFor(id: string, version: string, excludeExtensions?: boolean, force?: boolean): boolean {
    const mergedID = id + "." + (version || "");

    if (!force && this.cleansBlocked[mergedID]) {
      this.restoreValueFor(id, version, excludeExtensions);
      return false;
    }

    // delete all from memory
    delete this.stateHasAppliedValueTo[mergedID];
    delete this.stateGQLAppliedValue[mergedID];
    delete this.stateSearch[mergedID];

    // gather the properties
    const properties =
      excludeExtensions ?
        this.getAllPropertyDefinitions() :
        this.getAllPropertyDefinitionsAndExtensions();

    // and wipe them
    properties.forEach((property) => {
      property.cleanValueFor(id, version);
    });
    // also the includes
    this.getAllIncludes().forEach((include) => {
      include.cleanValueFor(id, version);
    });

    return true;
  }

  /**
   * Checks whether given the state id, there is an applied
   * value for it
   * @param id the id
   * @param version the version
   * @returns a boolean on whether it does or not
   */
  public hasAppliedValueTo(id: string, version: string): boolean {
    const mergedID = id + "." + (version || "");
    return this.stateHasAppliedValueTo[mergedID];
  }

  /**
   * Provides the internal state of the current state
   * @param id 
   * @param version 
   */
  public getSearchState(id: string, version: string): ICompoundSearchStateType {
    const mergedID = id + "." + (version || "");
    return this.stateSearch[mergedID] || null;
  }

  /**
   * Sets the internal state with a given value
   * @param id 
   * @param version 
   * @param value 
   */
  public setSearchState(id: string, version: string, value: ICompoundSearchStateType) {
    const mergedID = id + "." + (version || "");
    this.stateSearch[mergedID] = value;
  }

  /**
   * Clears the internal state
   * @param id 
   * @param version 
   */
  public cleanSearchState(id: string, version: string) {
    const mergedID = id + "." + (version || "");
    delete this.stateSearch[mergedID];
  }

  /**
   * Provides the applied value for the id
   * @param id the id
   * @param version the version
   * @returns the applied value structure
   */
  public getGQLAppliedValue(id: string, version: string): IItemDefinitionGQLValueType {
    const mergedID = id + "." + (version || "");
    const appliedGQLValue = this.stateGQLAppliedValue[mergedID] || null;
    return appliedGQLValue;
  }

  /**
   * Provides the item definition that represent the search mode of this
   * same item definition
   * @returns an ItemDefinition, this function will crash if you are already
   * in the search mode counterpart
   */
  public getSearchModeCounterpart(): ItemDefinition {
    if (this.isExtensionsInstance()) {
      return this.parentModule.getSearchModule().getPropExtensionItemDefinition();
    }
    return this.parentModule.getSearchModule().getItemDefinitionFor(
      this.getPath(),
    );
  }

  /**
   * Basically only works in search mode item definitions, and provides the standard
   * counterpart
   * @returns an ItemDefinition, this function will crash if you are already
   * in the standard mode counterpart
   */
  public getStandardCounterpart(): ItemDefinition {
    if (this.isExtensionsInstance()) {
      return this.parentModule.getStandardModule().getPropExtensionItemDefinition();
    }
    return this.parentModule.getStandardModule().getItemDefinitionFor(
      this.getPath(),
    );
  }

  /**
   * Tells whether this item is the search mode item of another
   * item
   * @returns a boolean on whether it is in search mode
   */
  public isInSearchMode(): boolean {
    return this.parentModule.isInSearchMode();
  }

  /**
   * Provides the roles that can search within the item
   * definition, will give the module search role
   * access if not overwritten by this
   */
  public getRolesWithSearchAccess() {
    return (
      this.rawData.searchRoleAccess ||
      this.parentModule.rawData.searchRoleAccess ||
      [ANYONE_METAROLE]
    );
  }

  /**
   * Provides the roles that can read the current
   * creator of the item itself
   */
  public getRolesWithReadOwnerAccess() {
    return (
      this.rawData.ownerReadRoleAccess ||
      [ANYONE_METAROLE]
    );
  }

  /**
   * Provides the roles that have access to a given
   * action based on the rules that were set
   * @param action the action from the ItemDefinitionIOActions
   * @retuns an array of string that represent the roles
   */
  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    if (action === ItemDefinitionIOActions.READ) {
      // Anyone can read by default
      return this.rawData.readRoleAccess || this.parentModule.rawData.readRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.CREATE) {
      // Anyone logged can create by default
      return this.rawData.createRoleAccess || [ANYONE_LOGGED_METAROLE];
    } else if (action === ItemDefinitionIOActions.EDIT) {
      // Only the owner of the item can edit by default
      return this.rawData.editRoleAccess || [OWNER_METAROLE];
    } else if (action === ItemDefinitionIOActions.DELETE) {
      // Only the owner of the item can delete it by default
      return this.rawData.deleteRoleAccess || [OWNER_METAROLE];
    }

    // ???? really this shouldn't happen
    return [];
  }

  /**
   * Provides the roles that have moderation access to
   * the moderation fileds for a given item definition
   * given its module rule
   */
  public getRolesWithModerationAccess(): string[] {
    return this.parentModule.getRolesWithModerationAccess() || [];
  }

  /**
   * Returns the FLATTENED fields for the graphql request
   * @param action 
   * @param role 
   * @param userId 
   * @param ownerUserId 
   */
  public async buildFieldsForRoleAccess(
    action: ItemDefinitionIOActions,
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
  ) {
    if (action === ItemDefinitionIOActions.DELETE) {
      return null;
    }

    if (ownerUserId === null) {
      throw new Error("ownerUserId cannot be null");
    }

    // now let's get the roles that have access to the action
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    const idefLevelAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
      (
        rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role) || (await rolesManager.checkRoleAccessFor(rolesWithAccess)).granted;

    if (!idefLevelAccess) {
      return null;
    }

    const requestFields: IGQLRequestFields = {};

    // now we add all the reserver properties
    Object.keys(RESERVED_BASE_PROPERTIES).forEach((pKey) => {
      requestFields[pKey] = {};
    });

    await Promise.all(this.getAllPropertyDefinitionsAndExtensions().map(async (pd) => {
      if (pd.isRetrievalDisabled()) {
        return;
      }
      const propertyFields = await pd.buildFieldsForRoleAccess(action, role, userId, ownerUserId, rolesManager);
      if (propertyFields) {
        requestFields[pd.getId()] = propertyFields;
      }
    }));

    await Promise.all(this.getAllIncludes().map(async (include) => {
      const includeFields = await include.buildFieldsForRoleAccess(action, role, userId, ownerUserId, rolesManager);
      if (includeFields) {
        requestFields[INCLUDE_PREFIX + include.getId()] = includeFields;
        requestFields[INCLUDE_PREFIX + include.getId() + EXCLUSION_STATE_SUFFIX] = {};
      }
    }));

    return requestFields;
  }

  /**
   * For a given requested graphql value it will
   * tell which fields need to be filtered for soft
   * read role access
   * @param role 
   * @param userId 
   * @param ownerUserId 
   * @param rolesManager 
   * @returns 
   */
  public async applySoftReadRoleAccessTo(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    value: IGQLValue,
  ): Promise<void> {

    if (!value) {
      return;
    }

    // otherwise we go in the requested fields, in each one of them
    for (const requestedField of Object.keys(value)) {
      // and we check if it's an item (or a exclusion state)
      if (requestedField.startsWith(INCLUDE_PREFIX)) {
        if (requestedField.endsWith(EXCLUSION_STATE_SUFFIX)) {
          continue;
        }

        // so now we extract the item name from that
        const requestedFieldItemName = requestedField.replace(INCLUDE_PREFIX, "");
        // request the include
        const include = this.getIncludeFor(requestedFieldItemName);
        // and check the role access for it
        await include.applySoftReadRoleAccessTo(
          role, userId, ownerUserId, rolesManager, value[requestedField] as any,
        );
      } else {
        if (!this.hasPropertyDefinitionFor(requestedField, true)) {
          continue;
        }
        // also for the property
        const propDef = this.getPropertyDefinitionFor(requestedField, true);
        const hasSoftAccess = await propDef.checkSoftReadRoleAccessFor(role, userId, ownerUserId, rolesManager);
        if (!hasSoftAccess) {
          value[requestedField] = null;
        }
      }
    }
  }

  public async checkRoleAccessForModeration(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    const rolesWithAccess = this.getRolesWithModerationAccess();
    let hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
      (
        rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role);

    let code: string = null;
    let message: string = null;

    if (!hasAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(rolesWithAccess);
      hasAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    if (!hasAccess && throwError) {
      throw new EndpointError({
        message: message || "Your role has no access to moderation",
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return hasAccess;
  }

  /**
   * Checks the role access for an action in an item
   * defintition
   * @param action the IO action
   * @param role the role of the user attempting the action
   * @param userId the user id of the user attempting the action
   * @param ownerUserId the owner of that item definition
   * @param requestedFields the requested fields (single properties will be checked as well)
   * @param throwError whether to throw an error if failed (otherwise returns a boolean)
   * @returns a boolean on whether the user is allowed
   */
  public async checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: string,
    ownerUserId: string,
    requestedFields: IGQLRequestFields,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    if (ownerUserId === null) {
      throw new Error("ownerUserId cannot be null");
    }
    // now let's get the roles that have access to the action
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    // if anyone is included, or anyone logged is included and you are not
    // a guest, or your role is included
    let idefLevelAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
      (
        rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role);

    let code: string = null;
    let message: string = null;

    if (!idefLevelAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(rolesWithAccess);
      idefLevelAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    // if you got not access
    if (!idefLevelAccess) {
      // let's check the throw error flag
      if (throwError) {
        // if you are in guest mode, it is considered, that if you
        // fail, it's because you missed to login
        const notLoggedInWhenShould = role === GUEST_METAROLE && rolesWithAccess.length;
        const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === UNSPECIFIED_OWNER &&
          rolesWithAccess.includes(OWNER_METAROLE);

        if (message === null) {
          message = `Forbidden, user ${userId} with role ${role} has no ${action} access to resource ${this.getName()}` +
            ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
          if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
            message += ", this error might have been avoided if an owner had" +
              " been specified which matched yourself as there's a self rule, if performing a search" +
              " you might have wanted to add the created_by filter in order to ensure this rule is followed";
          }
        }

        throw new EndpointError({
          message,
          // this is where the code comes in handy, it's forbidden by default, and must be logged in for guests
          code: notLoggedInWhenShould ? ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : (code || ENDPOINT_ERRORS.FORBIDDEN),
        });
      }
      return false;
    }

    // if the action is delete and we passsed, there are no properties to check
    // properties don't have a delete role filter, so we return true
    if (action === ItemDefinitionIOActions.DELETE) {
      return true;
    }

    // otherwise we go in the requested fields, in each one of them
    for (const requestedField of Object.keys(requestedFields)) {
      // and we check if it's an item (or a exclusion state)
      if (requestedField.startsWith(INCLUDE_PREFIX)) {
        // so now we extract the item name from that
        let requestedFieldItemName = requestedField.replace(INCLUDE_PREFIX, "");
        if (requestedFieldItemName.endsWith(EXCLUSION_STATE_SUFFIX)) {
          requestedFieldItemName = requestedFieldItemName.replace(EXCLUSION_STATE_SUFFIX, "");
        }
        // request the include
        const include = this.getIncludeFor(requestedFieldItemName);
        // and check the role access for it
        const hasAccess = await include.checkRoleAccessFor(
          action, role, userId, ownerUserId, requestedFields[requestedField], rolesManager, throwError,
        );

        if (!hasAccess) {
          return false;
        }
      } else {
        // also for the property
        const propDef = this.getPropertyDefinitionFor(requestedField, true);
        const hasAccess = await propDef.checkRoleAccessFor(action, role, userId, ownerUserId, rolesManager, throwError);
        if (!hasAccess) {
          return false;
        }
      }
    }

    // if all of them pass then we can return true
    return true;
  }

  /**
   * Tells whether the object can be created in behalf of another user
   * rather than the user itself, this is incompatible with
   * ownerIsObjectId
   * @param role
   * @param throwError whether to throw an error if failed (otherwise returns a boolean)
   * @return a boolean on whether the user is allowed
   */
  public async checkRoleCanCreateInBehalf(
    role: string,
    targetRole: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    let canCreateInBehalf = false;
    if (this.rawData.canCreateInBehalf) {
      canCreateInBehalf = !this.rawData.createInBehalfRoleAccess ||
        this.rawData.createInBehalfRoleAccess.includes(ANYONE_METAROLE) ||
        (
          this.rawData.createInBehalfRoleAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
        ) || this.rawData.createInBehalfRoleAccess.includes(role);


      let code: string = null;
      let message: string = null;

      if (!canCreateInBehalf) {
        const managerStatus = await rolesManager.checkRoleAccessFor(this.rawData.createInBehalfRoleAccess);
        canCreateInBehalf = managerStatus.granted;
        code = managerStatus.errorCode;
        message = managerStatus.errorMessage;
      }

      if (!canCreateInBehalf && throwError) {
        const notLoggedInWhenShould = role === GUEST_METAROLE;
        throw new EndpointError({
          message: message || `Forbidden, role ${role} cannot create in behalf in resource ${this.getName()}` +
            ` only roles ${this.rawData.createInBehalfRoleAccess.join(", ")} can do so`,
          code: notLoggedInWhenShould ? ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : (code || ENDPOINT_ERRORS.FORBIDDEN),
        });
      }

      if (
        canCreateInBehalf &&
        this.rawData.createInBehalfTargetRoles &&
        !this.rawData.createInBehalfTargetRoles.includes(targetRole)
      ) {
        canCreateInBehalf = false;

        if (throwError) {
          throw new EndpointError({
            message: `Forbidden, only roles that can be created in behalf for are ${this.rawData.createInBehalfTargetRoles.join(", ")}`,
            code: ENDPOINT_ERRORS.FORBIDDEN,
          });
        }
      }
    } else if (throwError) {
      throw new EndpointError({
        message: "can create in behalf is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    } else if (this.rawData.canCreateInBehalf) {
      canCreateInBehalf = true;
    }
    return canCreateInBehalf;
  }

  /**
   * Provides the roles that are allowed versioning
   */
  public getRolesForVersioning() {
    if (this.rawData.versioningRoleAccess) {
      return this.rawData.versioningRoleAccess;
    }
    return [OWNER_METAROLE];
  }

  /**
   * Checks whether a given role can version an item resources
   * @param role the role of the user
   * @param userId the user id of that user
   * @param ownerUserId the owner of the current unversioned value
   * @param throwError whether to throw an error in case of failure
   */
  public async checkRoleCanVersion(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    if (!this.isVersioned()) {
      if (throwError) {
        throw new EndpointError({
          message: "Versioning is disabled",
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }

      return false;
    }

    const roles = this.getRolesForVersioning();

    let versioningAccess = roles.includes(ANYONE_METAROLE) ||
      (
        roles.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        roles.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || roles.includes(role);

    let code: string = null;
    let message: string = null;

    if (!versioningAccess) {
      const rolesStatus = await rolesManager.checkRoleAccessFor(roles);
      versioningAccess = rolesStatus.granted;
      code = rolesStatus.errorCode;
      message = rolesStatus.errorMessage;
    }

    if (!versioningAccess && throwError) {
      throw new EndpointError({
        message: message || `Forbidden, role ${role} cannot version resource ${this.getName()}` +
          ` only roles ${roles.join(", ")} can do so`,
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return versioningAccess;
  }

  /**
   * Provides the roles that are allowed custom ids
   */
  public getRolesForCustomId() {
    if (this.rawData.customIdRoleAccess) {
      return this.rawData.customIdRoleAccess;
    }
    return [];
  }

  /**
   * Checks whether a given role can provide a custom id
   * @param role the role of the user
   * @param throwError whether to throw an error in case of failure
   */
  public async checkRoleCanCustomId(
    role: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    const roles = this.getRolesForCustomId();
    let customIdAccess = roles.includes(ANYONE_METAROLE) ||
      (
        roles.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || roles.includes(role);

    let code: string = null;
    let message: string = null;
    if (!customIdAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(roles);
      customIdAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    if (!customIdAccess && throwError) {
      throw new EndpointError({
        message: message || `Forbidden, role ${role} cannot custom id resource ${this.getName()}` +
          ` only roles ${roles.join(", ")} can do so`,
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return customIdAccess;
  }

  /**
   * Checks whether a given role can read the owner of a given item
   * @param role the role of the user
   * @param userId the user id of that user
   * @param ownerUserId the owner of the current unversioned value
   * @param throwError whether to throw an error in case of failure
   */
  public async checkRoleCanReadOwner(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    const roles = this.getRolesWithReadOwnerAccess();

    let onwerReadAccess = roles.includes(ANYONE_METAROLE) ||
      (
        roles.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        roles.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || roles.includes(role);

    let code: string = null;
    let message: string = null;
    if (!onwerReadAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(roles);
      onwerReadAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    if (!onwerReadAccess && throwError) {
      throw new EndpointError({
        message: message || `Forbidden, role ${role} cannot read the owner of resource ${this.getName()}` +
          ` only roles ${roles.join(", ")} can do so`,
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return onwerReadAccess;
  }

  /**
   * Tells whether this item definition has parenting enforced
   * @return a boolean on whether parenting is enforced
   */
  public mustBeParented() {
    return !!this.rawData.mustBeParented;
  }

  /**
   * Tells whether reparenting is enabled
   * @returns a boolean
   */
  public isReparentingEnabled() {
    return !!this.rawData.enableReparenting;
  }

  public getParentingRule() {
    return this.rawData.parentingRule || "MANY";
  }

  public getParentingMaxChildCountSameType() {
    return this.rawData.parentMaxChildCountSameType || null;
  }

  public getParentingMaxChildCountAnyType() {
    return this.rawData.parentMaxChildCountAnyType || null;
  }

  /**
   * Given an item definition checks if this item definition allows itself to be parented
   * by it, that means the current item definition will be the children
   * @param parentItemDefinition the expected parent
   * @param throwError whether to throw an error if failed
   * @returns a boolean on whether the item definition is an allowed parent
   */
  public checkCanBeParentedBy(parentItemDefinition: ItemDefinition, throwError: boolean) {
    // we need to get the module
    const parentModuleOfParent = parentItemDefinition.getParentModule();

    // and the paths of both in the slashed form, while the qualified is better
    // the raw info contains this
    const modulePath = parentModuleOfParent.getPath().join("/");
    const itemDefinitionPath = parentItemDefinition.getPath().join("/");

    // so now we check if it can be parented
    let canBeParentedBy = false;

    // now we check if we even have rules for parenting
    if (this.rawData.canBeParentedBy) {
      canBeParentedBy = this.rawData.canBeParentedBy.some((parentPossibility) => {
        if (!parentPossibility.item) {
          return parentPossibility.module === modulePath;
        }
        return parentPossibility.module === modulePath && parentPossibility.item === itemDefinitionPath;
      });
      if (!canBeParentedBy && throwError) {
        throw new EndpointError({
          message: "parenting with '" + modulePath + "' and '" + itemDefinitionPath + "' is not allowed",
          // here we pass always forbidden simply because it's not supported at all
          // and it was not a login mistake
          code: ENDPOINT_ERRORS.FORBIDDEN,
        });
      }
    } else if (throwError) {
      throw new EndpointError({
        message: "parenting is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }
    return canBeParentedBy;
  }

  /**
   * Checks whether the current user, has access to create an item and parent it
   * according to his role
   * @param role the role of the user
   * @param userId the user id
   * @param parentOwnerUserId the parent owner user id of the item this user is trying to parent
   * @param throwError whether to throw an error
   * @returns a boolean on whether parenting is allowed
   */
  public async checkRoleAccessForParenting(
    role: string,
    userId: string,
    parentOwnerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    let hasParentingRoleAccess = false;
    if (this.rawData.parentingRoleAccess) {
      hasParentingRoleAccess = this.rawData.parentingRoleAccess.includes(ANYONE_METAROLE) ||
        (
          this.rawData.parentingRoleAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
        ) || (
          this.rawData.parentingRoleAccess.includes(OWNER_METAROLE) && userId === parentOwnerUserId
        ) || this.rawData.parentingRoleAccess.includes(role);

      let code: string = null;
      let message: string = null;
      if (!hasParentingRoleAccess) {
        const managerStatus = await rolesManager.checkRoleAccessFor(this.rawData.parentingRoleAccess);
        hasParentingRoleAccess = managerStatus.granted;
        code = managerStatus.errorCode;
        message = managerStatus.errorMessage;
      }

      const notLoggedInWhenShould = role === GUEST_METAROLE;

      if (!hasParentingRoleAccess && throwError) {
        throw new EndpointError({
          message: message || `Forbidden, user ${userId} with role ${role} has no parenting role access to resource ${this.getName()}` +
            ` only roles ${this.rawData.parentingRoleAccess.join(", ")} can be granted access`,
          code: notLoggedInWhenShould ? ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : (code || ENDPOINT_ERRORS.FORBIDDEN),
        });
      }
    } else {
      throw new EndpointError({
        message: "parenting role access is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: ENDPOINT_ERRORS.FORBIDDEN,
      });
    }
    return hasParentingRoleAccess;
  }

  /**
   * Basically returns the raw data itself
   * doesn't do much
   * @returns the json form
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Provides the path from the module
   * base, that is not absolute but a relative
   * path from the parent module
   * @returns an array of string that represent
   * the path concatenated all the way to the module path to the root
   */
  public getPath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getPath()
        .concat([
          this.getName(),
        ]);
    }
    return [this.getName()];
  }

  /**
   * Provides the absolute path all the way
   * from the root
   * @returns an array of string that represents
   * the whole absolute path from the root
   */
  public getAbsolutePath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getAbsolutePath()
        .concat([
          this.getName(),
        ]);
    }
    return this.parentModule
      .getPath()
      .concat([
        this.getName(),
      ]);
  }

  /**
   * Returns true is one of the property has to be externally checked
   * either by database or rest endpoints, this is basically unique
   * values
   * @param onlyCheckProperties only to check the properties in this list
   * @param ignoreIncludes whether to ignore the sinked in properties in the includes
   * @returns a boolean
   */
  public containsAnExternallyCheckedProperty(
    onlyCheckProperties?: string[],
    ignoreIncludes?: boolean,
  ): boolean {
    const existInFirstLayer: boolean =
      this.getAllPropertyDefinitionsAndExtensions()
        .filter((pd) => !onlyCheckProperties ? true : onlyCheckProperties.includes(pd.getId()))
        .some((pd) => pd.isUnique());
    if (existInFirstLayer) {
      return true;
    } else if (ignoreIncludes) {
      return false;
    }
    return this.getAllIncludes().some((i) => i.containsAnExternallyCheckedProperty());
  }

  /**
   * Provides the qualified path name
   * of this item definition, which is unique for
   * this root instance
   * @returns the very useful qualified path name
   */
  public getQualifiedPathName(): string {
    if (this.parentItemDefinition) {
      return PREFIXED_CONCAT(this.parentItemDefinition.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
    }
    return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
  }

  /**
   * An utility function that returns the name
   * of the table that is used in the database
   */
  public getTableName(): string {
    return this.getQualifiedPathName();
  }

  /**
   * An utility function that returns the name of the
   * table that is used for the module
   */
  public getModuleTableName(): string {
    return this.parentModule.getQualifiedPathName();
  }

  /**
   * Provides all policy names included in the policy of type
   * @param policyType the policy type, "edit", "read", "delete" or "parent"
   * @returns an array with strings of policy names
   */
  public getPolicyNamesFor(policyType: string): string[] {
    if (!this.rawData.policies || !this.rawData.policies[policyType]) {
      return [];
    }
    return Object.keys(this.rawData.policies[policyType]);
  }

  /**
   * Provides all live properties for a policy, these properties
   * are detached properties, new instances of the old property and hold
   * their own states
   * @param type the type "edit", "delete", "read" or "parent"
   * @param name the policy name that was set
   * @returns an array of properties
   */
  public getPropertiesForPolicy(type: string, name: string): PropertyDefinition[] {
    return this.rawData.policies[type][name].properties.map(
      (propertyId: string) => this.getPropertyDefinitionForPolicy(type, name, propertyId),
    );
  }

  /**
   * Provides all the property ids that are affected by a given policy
   * @param type the policy type "edit", "delete", "read" or "parent"
   * @param name the policy name
   * @returns an array of string or null (if no applying properties)
   */
  public getApplyingPropertyIdsForPolicy(type: string, name: string): string[] {
    const applyingProperties = this.rawData.policies[type][name].applyingProperties;
    return applyingProperties || null;
  }

  /**
   * Tells whether the list of applying properties only applies when going from a non null
   * value to a new value
   * @param type the policy type
   * @param name the policy name
   * @return a boolean value
   */
  public doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull(type: string, name: string): boolean {
    const status = this.rawData.policies[type][name].applyingPropertyOnlyAppliesWhenCurrentIsNonNull;
    return !!status;
  }

  /**
   * Provides all the include ids that are affected by the given policy
   * @param type the policy type "edit", "delete", "read" or "parent"
   * @param name the policy name
   * @returns an array of string or null (if no applying includes)
   */
  public getApplyingIncludeIdsForPolicy(type: string, name: string): string[] {
    return this.rawData.policies[type][name].applyingIncludes || null;
  }

  /**
   * Provides all the roles that are affected by a policy
   * @param type the policy type "edit", "delete", "read" or "parent"
   * @param name the policy name
   * @returns an array of string
   */
  public getRolesForPolicy(type: string, name: string): string[] {
    return this.rawData.policies[type][name].roles;
  }

  /**
   * Adds a listener for an string event and id
   * @param event the event string
   * @param id the id
   * @param version the version
   * @param listener the listener
   */
  public addListener(event: string, id: string, version: string, listener: ListenerType) {
    const mergedID = id + "." + (version || "");
    if (!this.listeners[event]) {
      this.listeners[event] = {};
    }
    this.listeners[event][mergedID] = this.listeners[event][mergedID] || [];
    this.listeners[event][mergedID].push(listener);
  }

  /**
   * Removes a listener
   * @param event the event string
   * @param id the id
   * @param version the version
   * @param listener the listener
   */
  public removeListener(event: string, id: string, version: string, listener: ListenerType) {
    const mergedID = id + "." + (version || "");
    if (!this.listeners[event] || !this.listeners[event][mergedID]) {
      return;
    }
    const index = this.listeners[event][mergedID].indexOf(listener);
    if (index !== -1) {
      this.listeners[event][mergedID].splice(index, 1);
    }
  }

  /**
   * Triggers a listener for a given id
   * note this will affect the extensions as well because
   * their states are correlated
   * @param event the event
   * @param id the id
   * @param version the version
   * @param but a function not to trigger (one of the listeners)
   * @param callId a call id, it's an unique identifier for this event, it will be autogenerated if not provided
   * and it's the best to leave it be autogenerated
   */
  public triggerListeners(
    event: string,
    id: string,
    version: string,
    but?: ListenerType,
    callId?: string,
  ) {
    if (this.lastListenerCallId !== callId) {
      this.lastListenerCallId = callId || uuid.v4();
      if (this.extensionsInstance) {
        this.parentModule.getAllChildItemDefinitions().forEach((cd) => {
          cd.triggerListeners(event, id, version, but, this.lastListenerCallId);
        });
      } else {
        this.parentModule.getPropExtensionItemDefinition().triggerListeners(
          event, id, version, but, this.lastListenerCallId,
        );
      }

      const mergedID = id + "." + (version || "");
      if (!this.listeners[event] || !this.listeners[event][mergedID]) {
        return;
      }
      this.listeners[event][mergedID].filter((l) => l !== but).forEach((l) => l());
    }
  }

  /**
   * Merges two i18n data components, for example the i18n data for
   * the english build and the i18n data for the russian build, that way
   * the state is not lost
   * @param mod the raw module that is merging
   * @param idef the raw item definition that is merging
   */
  public mergeWithI18n(
    mod: IModuleRawJSONDataType,
    idef: IItemDefinitionRawJSONDataType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...idef.i18nData,
    };

    this.childDefinitions.forEach((cIdef) => {
      const mergeIdefRaw = ItemDefinition.getItemDefinitionRawFor(idef, mod, cIdef.getName());
      if (mergeIdefRaw) {
        cIdef.mergeWithI18n(mod, mergeIdefRaw);
      }
    });

    this.propertyDefinitions.forEach((pD) => {
      const mergePropertyRaw = ItemDefinition.getPropertyDefinitionRawFor(idef, mod, pD.getId(), false);
      if (mergePropertyRaw) {
        pD.mergeWithI18n(mergePropertyRaw);
      }
    });

    this.includeInstances.forEach((ii) => {
      const mergeIncludeRaw = this.rawData.includes &&
        this.rawData.includes.find((include) => include.id === ii.getId());
      if (mergeIncludeRaw) {
        ii.mergeWithI18n(mergeIncludeRaw);
      }
    });
  }

  /**
   * Tells whether the item definition supports the search
   * endpoint and all what it entails
   * @returns a boolean
   */
  public isSearchable() {
    if (typeof this.rawData.searchable !== "undefined") {
      return this.rawData.searchable;
    }
    return true;
  }

  /**
   * Wether the item is search engine enabled
   * @returns a boolean
   */
  public isSearchEngineEnabled() {
    return !!this.rawData.searchEngineEnabled;
  }

  /**
   * Solves the main language from the row
   * @param rowValue 
   * @returns 
   */
  public getSearchEngineMainLanguageFromRow(rowValue: any) {
    let value: string = null;
    if (this.rawData.searchEngineMainLangBasedOnProperty) {
      value = rowValue[this.rawData.searchEngineMainLangBasedOnProperty] || null;
    } else if (this.rawData.searchEngineMainLangProperty) {
      value = rowValue[this.rawData.searchEngineMainLangProperty + "_LANGUAGE"] || null;
    } else if (this.rawData.searchEngineLangUseVersion) {
      value = rowValue["version"] || rowValue[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] || null;
    }

    if (value) {
      return value.split("-")[0];
    }

    return this.getSearchEngineFallbackLanguage();
  }

  /**
   * If was provided gives the search engine main
   * language to use to define the search
   * @returns a 2 iso string
   */
  public getSearchEngineFallbackLanguage() {
    const value = this.rawData.searchEngineFallbackLang || null;
    if (!value) {
      return value;
    }
    return value.split("-")[0];
  }

  /**
   * Tells wether the search engine dynamic main language column
   * is from a property or a prop extension
   */
  public isSearchEngineDynamicMainLanguageColumnInModule() {
    const element = this.rawData.searchEngineMainLangBasedOnProperty || this.rawData.searchEngineMainLangProperty || null;
    // can't know
    if (!element) {
      return false;
    }

    return this.getParentModule().hasPropExtensionFor(element);
  }

  /**
   * If it was provided gives the search engine main
   * language to use as it was stored in the columns
   * @returns the sql text column name that contains the language to index the whole
   */
  public getSearchEngineDynamicMainLanguageColumn() {
    if (this.rawData.searchEngineMainLangBasedOnProperty) {
      return this.rawData.searchEngineMainLangBasedOnProperty;
    } else if (this.rawData.searchEngineMainLangProperty) {
      return this.rawData.searchEngineMainLangProperty + "_LANGUAGE";
    }

    return null;
  }

  /**
   * Checks whether the owner of this item definition is not supposed to be
   * the created_by field but rather the id field, this only makes sense
   * in users, an user owns itself
   * @returns a boolean
   */
  public isOwnerObjectId() {
    return this.rawData.ownerIsObjectId || false;
  }

  /**
   * Provides all the properties that hold a side effect into them
   */
  public getAllSideEffectedProperties(pre?: boolean): Array<{ property: PropertyDefinition, include: Include }> {
    let result: Array<{ property: PropertyDefinition, include: Include }> = this.getAllPropertyDefinitionsAndExtensions().filter((d) => {
      const descr = d.getPropertyDefinitionDescription();
      return pre ? descr.sqlPreSideEffect : descr.sqlSideEffect;
    }).map((r) => ({
      property: r,
      include: null,
    }));

    this.getAllIncludes().forEach((i) => {
      result = result.concat(
        i.getSinkingProperties().filter((d) => {
          const descr = d.getPropertyDefinitionDescription();
          return pre ? descr.sqlPreSideEffect : descr.sqlSideEffect;
        }).map((r) => ({
          property: r,
          include: i,
        }))
      );
    });

    return result;
  }
}
