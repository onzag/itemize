import { getItemDefinitionFn, getModuleListFn, getItemDefinitionListFn } from "./actions/get";
import { addItemDefinitionFn } from "./actions/add";
import { searchItemDefinitionFn, searchModuleFn, searchModuleTraditionalFn, searchItemDefinitionTraditionalFn} from "./actions/search";
import { editItemDefinitionFn } from "./actions/edit";
import { IAppDataType } from "..";
import { IGraphQLResolversType } from "../../base/Root/gql";
import { deleteItemDefinitionFn } from "./actions/delete";

// TODO flagging

export default function resolvers(appData: IAppDataType): IGraphQLResolversType {
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

    // flagItem
    // clearFlags
    // addModerationMessage
    // blockItem
    // banItem
  };
}
