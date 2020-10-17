"use strict";
/**
 * Contains the filtering and ordering function to perform actual searches
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.DataCorruptionError = void 0;
const cache_worker_1 = require("./cache.worker");
const constants_1 = require("../../../../constants");
const nanodate_1 = require("../../../../nanodate");
/**
 * An instance version of the error that contains
 * the raw object data of the error
 */
class DataCorruptionError extends Error {
    constructor(message) {
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DataCorruptionError.prototype);
    }
}
exports.DataCorruptionError = DataCorruptionError;
/**
 * Given a bunch of search records it will perform
 * the ordering and filtering of such records to return
 * them in place, as such it needs to read from the indexeddb
 * cache, this is a heavy process
 * @param rootProxy the root proxy we need to extract the functionality
 * for ordering and checking equality
 * @param db the database object
 * @param searchRecords the search records we got
 * @param searchArgs the search arguments (that would be sent to the server) an we need
 * to emulate for
 */
async function search(rootProxy, db, searchRecords, searchArgs) {
    // so now we get the new records with a promise where we read a bunch of stuff
    let newSearchRecords = (await Promise.all(
    // for that we map our current records
    searchRecords.map(async (result) => {
        try {
            // and we need to read these values
            const queryIdentifier = `${constants_1.PREFIX_GET}${result.type}.${result.id}.${result.version || ""}`;
            const value = await db.get(cache_worker_1.QUERIES_TABLE_NAME, queryIdentifier);
            // so no value, this is odd as this is considered data corruption because before coming
            // here all search records must have been ensured
            if (!value) {
                // This means data corruption, we cancel everything, data is corrupted
                throw new DataCorruptionError("Search function was executed with missing value for " + queryIdentifier);
            }
            else if (value.value === null) {
                return null;
            }
            else {
                const checkedValue = await checkOne(rootProxy, result, value.value, searchArgs);
                if (!checkedValue.shouldBeIncluded) {
                    return null;
                }
                return checkedValue;
            }
        }
        catch (err) {
            console.error(err);
            // pipe the data corruption error, we need to refetch we can fix this
            if (err instanceof DataCorruptionError) {
                throw err;
            }
            return null;
        }
    }))).filter((r) => !!r);
    // so now we got to order by
    const orderBy = searchArgs.orderBy;
    const orderBySorted = Object.keys(orderBy).map((orderByProperty) => {
        return {
            property: orderByProperty,
            priority: orderBy[orderByProperty].priority,
            nulls: orderBy[orderByProperty].nulls,
            direction: orderBy[orderByProperty].direction,
        };
    }).sort((a, b) => a.priority - b.priority);
    // and then after that, we need to apply the sorted on these records
    orderBySorted.forEach((sortRule) => {
        // for the nanodate based checks
        if (sortRule.property === "created_at" || sortRule.property === "edited_at") {
            newSearchRecords = newSearchRecords.sort((a, b) => {
                // remember if there's no value.DATA or the item is null or whatever
                // it would have never gotten here
                const aValue = a.value.DATA[sortRule.property];
                const bValue = b.value.DATA[sortRule.property];
                // however the value itself can be null
                if (aValue === bValue) {
                    return 0;
                }
                else if (aValue === null) {
                    return sortRule.nulls === "last" ? 1 : -1;
                }
                else if (bValue === null) {
                    return sortRule.nulls === "last" ? -1 : 1;
                }
                const aComposed = new nanodate_1.NanoSecondComposedDate(aValue);
                const bComposed = new nanodate_1.NanoSecondComposedDate(bValue);
                if (aComposed.greaterThan(bComposed)) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            // we are done
            return;
        }
        // for the remaining orer by rules
        newSearchRecords = newSearchRecords.sort((a, b) => {
            // remember if there's no value.DATA or the item is null or whatever
            // it would have never gotten here
            const aValue = a.value.DATA[sortRule.property];
            const bValue = b.value.DATA[sortRule.property];
            // we need our registry
            const itemDefinition = rootProxy.registry[a.searchRecord.type];
            const property = itemDefinition.getPropertyDefinitionFor(sortRule.property, true);
            const description = property.getPropertyDefinitionDescription();
            // no rule, can't do anything
            if (!description.localOrderBy) {
                return 0;
            }
            // otherwise we return this, we are
            // using or local order by function for it
            return description.localOrderBy({
                direction: sortRule.direction,
                nulls: sortRule.nulls,
                a: aValue,
                b: bValue,
                id: property.getId(),
                prefix: "",
                property,
                itemDefinition,
            });
        });
    });
    // and now we can send only the 
    return newSearchRecords.map((r) => r.searchRecord);
}
exports.search = search;
/**
 * Performs the check of a single search record to see if it passes
 * the filtering rules that the client is assigning to it
 * @param rootProxy the root proxy
 * @param searchRecord the search record itself
 * @param value the value we received for such record
 * @param searchArgs the search arguments
 */
async function checkOne(rootProxy, searchRecord, value, searchArgs) {
    // so by default we included
    let shouldBeIncluded = true;
    // if there is no value, aka the item has been deleted
    if (!value) {
        shouldBeIncluded = false;
        // if there is no DATA aka the item is blocked
    }
    else if (!value.DATA) {
        shouldBeIncluded = false;
    }
    // otherwise if it passed that, let's check more specifically
    if (shouldBeIncluded) {
        // let's get the item definition this search is about
        const itemDefinition = rootProxy.registry[searchRecord.type];
        // now we check every single property using the local search
        shouldBeIncluded = itemDefinition.getAllPropertyDefinitionsAndExtensions().every((pd) => {
            if (!pd.isSearchable()) {
                return true;
            }
            const description = pd.getPropertyDefinitionDescription();
            return description.localSearch({
                args: searchArgs,
                gqlValue: value,
                property: pd,
                id: pd.getId(),
                prefix: "",
                itemDefinition,
                include: null,
            });
        });
        // and now we consider whether it should be included by includes if it passed all that
        if (shouldBeIncluded) {
            // so now we get all includes
            shouldBeIncluded = itemDefinition.getAllIncludes().every((i) => {
                // the expected exclusion state
                const expectedIncludeExclusionState = searchArgs[i.getQualifiedExclusionStateIdentifier()];
                // and the one that it currently has
                const appliedIncludeExclusionState = value[i.getQualifiedExclusionStateIdentifier()];
                // if we don't expect anything then this is basically true
                if (typeof expectedIncludeExclusionState === "undefined") {
                    return true;
                    // if we don't spect any state, but rather an specific one, and it doesn't match we return null
                }
                else if (expectedIncludeExclusionState !== "ANY" &&
                    appliedIncludeExclusionState !== expectedIncludeExclusionState) {
                    return false;
                }
                // otherwise if we expect ANY or INCLUDED and it's not excluded, we check every single property
                if (expectedIncludeExclusionState !== "EXCLUDED" && appliedIncludeExclusionState !== "EXCLUDED") {
                    return i.getSinkingProperties().every((sp) => {
                        if (!sp.isSearchable()) {
                            return true;
                        }
                        const sinkingDescription = sp.getPropertyDefinitionDescription();
                        return sinkingDescription.localSearch({
                            args: searchArgs,
                            gqlValue: value,
                            property: sp,
                            id: sp.getId(),
                            prefix: i.getPrefixedQualifiedIdentifier(),
                            itemDefinition,
                            include: i,
                        });
                    });
                }
                // this will occur if it's ANY and it's EXCLUDED
                return true;
            });
        }
    }
    return {
        shouldBeIncluded,
        value,
        searchRecord,
    };
}
