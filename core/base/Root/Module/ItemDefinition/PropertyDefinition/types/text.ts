import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn, standardSQLEqualFn } from "../sql";
import { IGQLValue } from "../../../../gql";
import PropertyDefinition, { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_RAW_TEXT_LENGTH,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export type PropertyDefinitionSupportedTextType = string;
const typeValue: IPropertyDefinitionSupportedType = {
  gql: GraphQLString,
  nullableDefault: "",
  supportedSubtypes: ["html"],
  // TODO implement full text search
  sql: (id: string) => {
    return {
      [id]: "text",
      [id + "_VECTOR"]: "tsvector",
    };
  },
  sqlIn: (
    value: PropertyDefinitionSupportedTextType,
    id: string, property: PropertyDefinition,
    knex: any, dictionary: string,
  ) => {
    if (value === null) {
      return {
        [id]: null,
        [id + "_VECTOR"]: null,
      };
    }

    // TODO check if the text content usage actually creates a proper vector
    let escapedText = value;
    let purifiedText = value;
    if (property.getSubtype() === "html") {
      const dummyElement = PropertyDefinition.window.document.createElement("div");
      dummyElement.innerHTML = value.toString();
      escapedText = dummyElement.innerText;

      purifiedText = PropertyDefinition.purifier.sanitize(dummyElement);
    }

    return {
      [id]: purifiedText,
      [id + "_VECTOR"]: knex.raw(
        "to_tsvector(?, ?)",
        [
          dictionary,
          escapedText,
        ],
      ),
    };
  },
  sqlOut: standardSQLOutFn,
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any, dictionary: string) => {
    // TODO we need the fts_language here to pass to the ts_vector
    const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;

    if (typeof data[searchName] !== "undefined" && data[searchName] !== null) {
      knexBuilder.andWhereRaw(
        "?? @@ to_tsquery(?, ?)",
        [
          sqlPrefix + id + "_VECTOR",
          dictionary,
          data[searchName],
        ],
      );
    }
  },
  sqlEqual: standardSQLEqualFn,

  // validates the text, texts don't support json value
  validate: (s: PropertyDefinitionSupportedTextType, subtype?: string) => {
    if (typeof s !== "string") {
      return PropertyInvalidReason.UNSPECIFIED;

    // NOTE how the html text lengh is not checked, even when it is possible
    } else if (s.length > MAX_RAW_TEXT_LENGTH) {
      return PropertyInvalidReason.TOO_LARGE;
    }

    return null;
  },
  // the max length for the text
  // whether it is searchable or not
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
  supportsIcons: true,
  allowsMinMaxLengthDefined: true,
  // i18n attributes
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
  },
};
export default typeValue;
