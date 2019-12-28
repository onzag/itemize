import Moment from "moment";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES, EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS, MODERATION_FIELDS } from "./constants";
import ItemDefinition, { ItemDefinitionIOActions } from "./base/Root/Module/ItemDefinition";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
export function escapeStringRegexp(str: string) {
  return str.replace(matchOperatorsRe, "\\$&");
}

const mimeExtensions = {
  "audio/aac": "aac",
  "application/x-abiword": "abw",
  "application/x-freearc": "arc",
  "video/x-msvideo": "avi",
  "application/vnd.amazon.ebook": "azw",
  "application/octet-stream": "bin",
  "image/bmp": "bmp",
  "application/x-bzip": "bz",
  "application/x-bzip2": "bz2",
  "application/x-csh": "csh",
  "text/css": "css",
  "text/csv": "csv",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-fontobject": "eot",
  "application/epub+zip": "epub",
  "image/gif": "gif",
  "text/html": "html",
  "image/vnd.microsoft.icon": "ico",
  "text/calendar": "ics",
  "application/java-archive": "jar",
  "image/jpeg": "jpg",
  "text/javascript": "js",
  "application/json": "json",
  "application/ld+json": "jsonld",
  "audio/midi audio/x-midi": "mid",
  "audio/mpeg": "mp3",
  "video/mpeg": "mpeg",
  "application/vnd.apple.installer+xml": "mpkg",
  "application/vnd.oasis.opendocument.presentation": "odp",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/vnd.oasis.opendocument.text": "odt",
  "audio/ogg": "oga",
  "video/ogg": "ogv",
  "application/ogg": "ogx",
  "font/otf": "otf",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/x-rar-compressed": "rar",
  "application/rtf": "rtf",
  "application/x-sh": "sh",
  "image/svg+xml": "svg",
  "application/x-shockwave-flash": "swf",
  "application/x-tar": "tar",
  "image/tiff": "tiff",
  "font/ttf": "ttf",
  "text/plain": "txt",
  "application/vnd.visio": "vsd",
  "audio/wav": "wav",
  "audio/webm": "weba",
  "video/webm": "webm",
  "image/webp": "webp",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "application/xhtml+xml": "xhtml",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/xml if not readable from casual users (RFC 3023, section 3)": "xml",
  "application/vnd.mozilla.xul+xml": "xul",
  "application/zip": "zip",
  "video/3gpp": "3gp",
  "video/3gpp2": "3g2",
  "application/x-7z-compressed": "7z",
};

export function mimeTypeToExtension(str: string) {
  return mimeExtensions[str] || str.split("/")[1] || "txt";
}

export function localeReplacer(str: string, ...args: any[]): string {
  return str.replace(/\{(\d+)\}/g, (match, indexMatch) => (args[indexMatch] || "?"));
}

export function localeReplacerToArray(str: string, ...args: any[]): any[] {
  const splitted: string[] = str.split(/\{(\d+)\}/g);
  const result: any[] = [];

  splitted.forEach((splitResult, index) => {
    if (!splitResult) {
      return;
    }

    if (index % 2 === 1) {
      if (typeof args[splitResult] !== "undefined") {
        result.push(args[splitResult]);
      } else {
        result.push("?");
      }
    } else {
      result.push(splitResult);
    }
  });

  return result;
}

/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 */
export function getNormalizedDateTimeFormat(value: string) {
  // Since we cannot have a mask that uses only one H
  // we need to return it with two, same for the second
  // we canot have a one or two digits situation

  if (value === "H:mm") {
    return "HH:mm";
  } else if (value === "h:mm A") {
    return "hh:mm A";
  }

  // any other value is tipically allowed
  return value;
}

export function getLocalizedTimeFormat(normalize: boolean) {
  const LT = (Moment.localeData() as any)._longDateFormat.LT;
  if (!normalize) {
    return LT;
  }
  return LT;
}

export function getLocalizedDateFormat(normalize: boolean) {
  const L = (Moment.localeData() as any)._longDateFormat.L;
  if (!normalize) {
    return L;
  }
  return getNormalizedDateTimeFormat(L);
}

export function getLocalizedDateTimeFormat(normalize: boolean) {
  return getLocalizedDateFormat(normalize) + " " + getLocalizedTimeFormat(normalize);
}

export function getFieldsAndArgs(
  options: {
    includeArgs: boolean,
    includeFields: boolean,
    onlyIncludeProperties?: string[],
    onlyIncludeItems?: string[],
    onlyIncludePropertiesForArgs?: string[],
    onlyIncludeItemsForArgs?: string[],
    appliedOwner?: number,
    userRole: string;
    userId: number;
    itemDefinitionInstance: ItemDefinition;
    forId: number;
  },
) {
  // so the requested fields, at base, it's just nothing
  const requestFields: any = {
    DATA: {},
  };
  // and these would be the arguments for the graphql query
  const argumentsForQuery: any = {};

  // now we go for the standard fields, and we add all of them
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields.DATA[p] = {};
  });
  // we add the external ones as well
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
    requestFields[p] = {};
  });
  // and if our role allows it, we add the moderation fields
  if (ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(options.userRole)) {
    MODERATION_FIELDS.forEach((mf) => {
      requestFields.DATA[mf] = {};
    });
  }

  // we get the applied owner of this item, basically what we have loaded
  // for this user created_by or id if the item is marked as if its id
  // is the owner, in the case of null, the applied owner is -1
  const appliedOwner = options.appliedOwner || options.itemDefinitionInstance.getAppliedValueOwnerIfAny(
    options.forId || null,
  );

  // Now we get all the property definitions and extensions for the item
  // you might wonder why we check role access one by one and not the total
  // well, we literally don't care, the developer is reponsible to deny this
  // to get here, we are just building a query, not preventing a submit
  options.itemDefinitionInstance.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
    // now how we tell if it should be included in fields, well first
    // are we including fields at all? well if yes, then are we specifying
    // specific properties that should be included or are we taking all
    // if taking all it depends on the rules, and the role access
    const shouldBeIncludedInFields = options.includeFields ? (
      options.onlyIncludeProperties ?
        options.onlyIncludeProperties.includes(pd.getId()) :
        (
          !pd.isRetrievalDisabled() && pd.checkRoleAccessFor(
            ItemDefinitionIOActions.READ,
            options.userRole,
            options.userId,
            appliedOwner,
            false,
          )
        )
    ) : false;

    // so if all that messy conditional passes
    if (shouldBeIncludedInFields) {
      // we add it to the fields we want to add
      // because it's a property it goes in data
      requestFields.DATA[pd.getId()] = {};

      // now we get the description for this field
      const propertyDescription = pd.getPropertyDefinitionDescription();
      // if there are graphql fields defined
      if (propertyDescription.gqlFields) {
        // we add each one of them
        Object.keys(propertyDescription.gqlFields).forEach((field) => {
          requestFields.DATA[pd.getId()][field] = {};
        });
      }
    }

    // now for the arguments, same rule
    // are we including arguments at all?
    // are we specifying which specific arguments?
    // otherwise use the role access for it
    const shouldBeIncludedInArgs = options.includeArgs ? (
      options.onlyIncludePropertiesForArgs ?
        options.onlyIncludePropertiesForArgs.includes(pd.getId()) :
        pd.checkRoleAccessFor(
          !options.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
          options.userRole,
          options.userId,
          appliedOwner,
          false,
        )
    ) : false;

    // the value for an argument is the value of the property
    // as it is
    if (shouldBeIncludedInArgs) {
      argumentsForQuery[pd.getId()] = pd.getCurrentValue(options.forId || null);
    }
  });

  // now we go for the items
  options.itemDefinitionInstance.getAllItems().forEach((item) => {
    // and now we get the qualified identifier that grapqhl expects
    const qualifiedId = item.getQualifiedIdentifier();

    if (options.includeFields) {
      // items are always expected to have a value
      requestFields.DATA[item.getQualifiedExclusionStateIdentifier()] = {};
      requestFields.DATA[qualifiedId] = {};
    }

    if (options.includeArgs) {
      // we set the exclusion state we expect, it might be a ternary as well
      // like in search mode
      argumentsForQuery[
        item.getQualifiedExclusionStateIdentifier()
      ] = item.getExclusionState(options.forId || null);
      // we add it to the data, and we add it to the arguments
      argumentsForQuery[qualifiedId] = {};
    }

    // now the conditional for whether we need to have that item properties in the arg
    const itemShouldBeIncludedInArgs = options.includeArgs ? (
      options.onlyIncludeItemsForArgs ?
        options.onlyIncludeItemsForArgs.includes(item.getId()) :
        true
    ) : false;

    // and for the fields
    const itemShouldBeIncludedInFields = options.includeFields ? (
      options.onlyIncludeItems ?
        options.onlyIncludeItems.includes(item.getId()) :
        true
    ) : false;

    if (!itemShouldBeIncludedInArgs && !itemShouldBeIncludedInFields) {
      // if we don't we can just skip
      return;
    }

    // otherwise we need the sinking properties
    // as only the sinking properties manage
    item.getSinkingProperties().forEach((sp) => {
      // we always check for role access and whether we can retrieve it or not
      if (
        itemShouldBeIncludedInFields &&
        !sp.isRetrievalDisabled() &&
        sp.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          options.userRole,
          options.userId,
          appliedOwner,
          false,
        )
      ) {
        requestFields.DATA[qualifiedId][item.getPrefixedQualifiedIdentifier() + sp.getId()] = {};

        const propertyDescription = sp.getPropertyDefinitionDescription();
        if (propertyDescription.gqlFields) {
          Object.keys(propertyDescription.gqlFields).forEach((field) => {
            requestFields.DATA[qualifiedId][item.getPrefixedQualifiedIdentifier() + sp.getId()][field] = {};
          });
        }
      }

      if (
        itemShouldBeIncludedInArgs &&
        sp.checkRoleAccessFor(
          !options.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
          options.userRole,
          options.userId,
          appliedOwner,
          false,
        )
      ) {
        argumentsForQuery[qualifiedId][sp.getId()] = sp.getCurrentValue(options.forId || null);
      }
    });

    if (Object.keys(requestFields.DATA[qualifiedId]).length === 0) {
      delete requestFields.DATA[qualifiedId];
    }
    if (Object.keys(argumentsForQuery[qualifiedId]).length === 0) {
      delete argumentsForQuery[qualifiedId];
    }
  });

  return {requestFields, argumentsForQuery};
}

export const DOMWindow = JSDOM ? (new JSDOM("")).window : window;
export const DOMPurify = createDOMPurify(DOMWindow);
