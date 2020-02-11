"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("./actions/get");
const add_1 = require("./actions/add");
const search_1 = require("./actions/search");
const edit_1 = require("./actions/edit");
const delete_1 = require("./actions/delete");
// TODO flagging
function resolvers(appData) {
    return {
        getItemDefinition: get_1.getItemDefinitionFn(appData),
        searchItemDefinition: search_1.searchItemDefinitionFn(appData),
        searchModule: search_1.searchModuleFn(appData),
        addItemDefinition: add_1.addItemDefinitionFn(appData),
        editItemDefinition: edit_1.editItemDefinitionFn(appData),
        deleteItemDefinition: delete_1.deleteItemDefinitionFn(appData),
        getItemDefinitionList: get_1.getItemDefinitionListFn(appData),
        getModuleList: get_1.getModuleListFn(appData),
    };
}
exports.default = resolvers;
