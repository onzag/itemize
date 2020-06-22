"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const Include_1 = require("../../../base/Root/Module/ItemDefinition/Include");
function DifferingIncludesRetriever(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => {
        const finalProperties = props.mainIncludes.map((mainInclude) => {
            const includeData = itemDefinitionContext.state.includes.find(i => i.includeId === mainInclude);
            if (!includeData) {
                return null;
            }
            const exclusionStateDiffers = includeData.stateExclusion !== includeData.stateExclusionApplied;
            const include = itemDefinitionContext.idef.getIncludeFor(mainInclude);
            const allSinkingProperties = include.getSinkingPropertiesIds();
            if (exclusionStateDiffers &&
                (includeData.stateExclusion === Include_1.IncludeExclusionState.EXCLUDED ||
                    includeData.stateExclusionApplied === Include_1.IncludeExclusionState.EXCLUDED)) {
                return {
                    id: mainInclude,
                    exclusionStateDiffers: true,
                    differingProperties: allSinkingProperties,
                };
            }
            else if (includeData.stateExclusion === Include_1.IncludeExclusionState.EXCLUDED &&
                !exclusionStateDiffers) {
                return null;
            }
            const itemDefinition = include.getItemDefinition();
            const differingProperties = allSinkingProperties.filter((mainProperty) => {
                const propertyData = includeData.itemDefinitionState.properties.find(p => p.propertyId === mainProperty);
                if (!propertyData) {
                    return false;
                }
                const property = include.getSinkingPropertyFor(mainProperty);
                return !itemDefinition.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual({
                    itemDefinition,
                    include,
                    property,
                    id: property.getId(),
                    prefix: include.getPrefixedQualifiedIdentifier(),
                    a: propertyData.stateAppliedValue,
                    b: propertyData.value,
                });
            });
            if (!exclusionStateDiffers && differingProperties.length === 0) {
                return null;
            }
            return {
                id: mainInclude,
                exclusionStateDiffers,
                differingProperties,
            };
        }).filter(v => !!v);
        return props.children(finalProperties);
    }));
}
exports.default = DifferingIncludesRetriever;
