import { getItemDefinitionFnRQ, getModuleListFnRQ, getItemDefinitionListFnRQ } from "./actions/get";
import { addItemDefinitionFnRQ } from "./actions/add";
import { searchItemDefinitionFnRQ, searchModuleFnRQ, searchModuleTraditionalFnRQ, searchItemDefinitionTraditionalFnRQ} from "./actions/search";
import { editItemDefinitionFnRQ } from "./actions/edit";
import { IAppDataType } from "..";
import { deleteItemDefinitionFnRQ } from "./actions/delete";
import { IRQResolversType } from "../../base/Root/rq";

export function resolversRQ(appData: IAppDataType): IRQResolversType {
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
