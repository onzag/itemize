import { getItemDefinitionFn, getModuleListFn, getItemDefinitionListFn,
  getItemDefinitionFnRQ, getModuleListFnRQ, getItemDefinitionListFnRQ } from "./actions/get";
import { addItemDefinitionFn, addItemDefinitionFnRQ } from "./actions/add";
import { searchItemDefinitionFn, searchModuleFn, searchModuleTraditionalFn, searchItemDefinitionTraditionalFn,
  searchItemDefinitionFnRQ, searchModuleFnRQ, searchModuleTraditionalFnRQ, searchItemDefinitionTraditionalFnRQ} from "./actions/search";
import { editItemDefinitionFn, editItemDefinitionFnRQ } from "./actions/edit";
import { IAppDataType } from "..";
import { IGraphQLResolversType } from "../../base/Root/gql";
import { deleteItemDefinitionFn, deleteItemDefinitionFnRQ } from "./actions/delete";

export function resolvers(appData: IAppDataType): IGraphQLResolversType {
  return {
    getItemDefinition: getItemDefinitionFn(appData),
    searchItemDefinition: searchItemDefinitionFn(appData),
    searchItemDefinitionTraditional: searchItemDefinitionTraditionalFn(appData),
    searchModule: searchModuleFn(appData),
    searchModuleTraditional: searchModuleTraditionalFn(appData),
    addItemDefinition: addItemDefinitionFn(appData),
    editItemDefinition: editItemDefinitionFn(appData),
    deleteItemDefinition: deleteItemDefinitionFn(appData),
    getItemDefinitionList: getItemDefinitionListFn(appData),
    getModuleList: getModuleListFn(appData),
  };
}

export function resolversRQ(appData: IAppDataType): IGraphQLResolversType {
  return {
    getItemDefinition: getItemDefinitionFnRQ(appData),
    searchItemDefinition: searchItemDefinitionFnRQ(appData),
    searchItemDefinitionTraditional: searchItemDefinitionTraditionalFnRQ(appData),
    searchModule: searchModuleFnRQ(appData),
    searchModuleTraditional: searchModuleTraditionalFnRQ(appData),
    addItemDefinition: addItemDefinitionFnRQ(appData),
    editItemDefinition: editItemDefinitionFnRQ(appData),
    deleteItemDefinition: deleteItemDefinitionFnRQ(appData),
    getItemDefinitionList: getItemDefinitionListFnRQ(appData),
    getModuleList: getModuleListFnRQ(appData),
  };
}
