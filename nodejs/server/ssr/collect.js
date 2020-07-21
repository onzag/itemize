"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemDefinition_1 = require("../../base/Root/Module/ItemDefinition");
const basic_1 = require("../resolvers/basic");
const server_1 = require("../../server");
const constants_1 = require("../../constants");
;
async function collect(root, appData, appliedRule, collectionPoint, index, allCollectionPoints) {
    let status = true;
    let signature = "NULL";
    let lastModified = null;
    let query = null;
    let subcollection = null;
    const splittedModule = collectionPoint[0].split("/");
    const splittedIdef = collectionPoint[1].split("/");
    if (splittedModule[0] === "") {
        splittedModule.shift();
    }
    if (splittedIdef[0] === "") {
        splittedIdef.shift();
    }
    // get the module and the item definition
    const mod = root.getModuleFor(splittedModule);
    const idef = mod.getItemDefinitionFor(splittedIdef);
    // and we ask the cache for the given value
    let rowValue;
    try {
        rowValue = await appData.cache.requestValue(idef, collectionPoint[2], collectionPoint[3]);
    }
    catch (err) {
        server_1.logger.error("ssrGenerator [SERIOUS]: Collection failed due to request not passing", {
            errStack: err.stack,
            errMessage: err.message,
        });
        // this is bad our collection failed, it's actually handled gracefully thanks
        // to the fact I can still serve no data at all and the app should work just fine
        // to a client, but nonetheless not a good idea
        status = false;
    }
    // now we check, is it not found, if it's not found, or signature is going to be
    // null for such index
    if (rowValue === null) {
        signature = "NOT_FOUND";
    }
    else {
        // otherwise it's when it was last modified
        lastModified = new Date(rowValue.last_modified);
        signature = rowValue.type + "." + rowValue.id + "." + (rowValue.version || "") + "." + rowValue.last_modified;
    }
    // now we build the fileds for the given role access
    const fields = idef.buildFieldsForRoleAccess(ItemDefinition_1.ItemDefinitionIOActions.READ, appliedRule.forUser.role, appliedRule.forUser.id, rowValue ? (idef.isOwnerObjectId() ? rowValue.id : rowValue.created_by) : constants_1.UNSPECIFIED_OWNER);
    // and if we have fields at all, such user might not even have access to them at all
    // which is possible
    if (fields) {
        // we build the value for the given role with the given fields
        const value = rowValue === null ? null : basic_1.filterAndPrepareGQLValue(appData.knex, appData.cache.getServerData(), rowValue, fields, appliedRule.forUser.role, idef);
        const valueToReturnToUser = value ? value.toReturnToUser : null;
        if (valueToReturnToUser && valueToReturnToUser.DATA) {
            const allProps = idef.getAllPropertyDefinitionsAndExtensions();
            const references = allProps.filter((p) => p.getType() === "integer" && p.getSubtype() === "reference");
            if (references.length) {
                const newCollectionList = [];
                references.forEach((ref) => {
                    const referenceValue = valueToReturnToUser.DATA[ref.getId()];
                    if (referenceValue) {
                        const modPath = ref.getSpecialProperty("referencedModule");
                        const idefPath = ref.getSpecialProperty("referencedItemDefinition");
                        const searchByLanguage = ref.getSpecialProperty("referencedFilterByLanguage");
                        const newPoint = [
                            modPath,
                            idefPath,
                            referenceValue,
                            searchByLanguage ? appliedRule.language : null,
                        ];
                        const currentIndex = allCollectionPoints.findIndex((point) => point[0] === newPoint[0] &&
                            point[1] === newPoint[1] &&
                            point[2] === newPoint[2] &&
                            point[3] === newPoint[3]);
                        if (currentIndex < 0) {
                            newCollectionList.push(newPoint);
                        }
                    }
                });
                if (newCollectionList.length) {
                    subcollection = await Promise.all(newCollectionList.map(collect.bind(null, root, appData, appliedRule)));
                }
            }
        }
        // and now we build the query
        query = {
            idef: idef.getQualifiedPathName(),
            id: collectionPoint[2],
            version: collectionPoint[3],
            value: valueToReturnToUser,
            fields: value ? value.requestFields : null,
        };
    }
    else {
        // means no access to them at all
        query = null;
    }
    return {
        status,
        lastModified,
        signature,
        query,
        subcollection,
    };
}
exports.collect = collect;
