import { getItemDefinitionFn, getModuleListFn, getItemDefinitionListFn } from "./actions/get";
import { addItemDefinitionFn } from "./actions/add";
import { searchItemDefinitionFn, searchModuleFn } from "./actions/search";
import { editItemDefinitionFn } from "./actions/edit";
import { IAppDataType } from "..";
import { IGraphQLResolversType } from "../../base/Root/gql";
import { deleteItemDefinitionFn } from "./actions/delete";

// TODO flagging
// TODO implementation of tokens
// TODO implement unique in property definition and a resolver to check for such unique values in
// these, the reason we need them is for unique keys, there should also be a i18n key for that,
// and the builder and everything

export default function resolvers(appData: IAppDataType): IGraphQLResolversType {
  return {
    getItemDefinition: getItemDefinitionFn(appData),
    searchItemDefinition: searchItemDefinitionFn(appData),
    searchModule: searchModuleFn(appData),
    addItemDefinition: addItemDefinitionFn(appData),
    editItemDefinition: editItemDefinitionFn(appData),
    deleteItemDefinition: deleteItemDefinitionFn(appData),
    getItemDefinitionList: getItemDefinitionListFn(appData),
    getModuleList: getModuleListFn(appData),

    // flagItem
    // clearFlags
    // addModerationMessage
    // blockItem
    // banItem
    // autocomplete
  };
}
