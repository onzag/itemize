import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLString } from "graphql";
import { standardSQLOutFn } from "../sql";
import { IGQLValue } from "../../../../gql";
import { PropertyInvalidReason } from "../../PropertyDefinition";
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
  sqlIn: (value: PropertyDefinitionSupportedTextType, id: string) => {
    if (value === null) {
      return {
        [id]: null,
        [id + "_VECTOR"]: null,
      };
    }

    // TODO setup vector with the value
    // we need to know the subtype for this because html
    // is handled differently, as we need to extract, we also need to know
    // fts_language
    return {
      [id]: value,
      [id + "_VECTOR"]: null,
    };
  },
  sqlOut: standardSQLOutFn,
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any) => {
    // TODO we need the fts_language here to pass to the ts_vector
    const ftsLanguage = "english";
    const searchName = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + id;

    if (typeof data[searchName] !== "undefined" && data[searchName] !== null) {
      knexBuilder.andWhereRaw(
        sqlPrefix + id + "_VECTOR @@ to_tsvector(?, ?)",
        [ftsLanguage, data[searchName]],
      );
    }
  },

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
