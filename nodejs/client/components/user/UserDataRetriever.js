"use strict";
/**
 * Does the very simple job of retrieving the current user data
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const token_provider_1 = require("../../internal/providers/token-provider");
/**
 * Provides the current user data, aka id and role, of the logged in user,
 * id might be null, and role can be the GUEST_METAROLE in such case
 *
 * If you need more information about the user you should use the item definition
 * provider under this data retriever, aka ModuleProvider for users, ItemDefinitionProvider for
 * user, forId the id used here; then you might read things like email and username
 *
 * remember to put assumeOwnership as true, while it has little effect, given that there are no
 * includes in the user
 *
 * @param props the data retriver props
 * @returns a react element
 */
function UserDataRetriever(props) {
    return (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (value) => {
        return props.children({
            id: value.id,
            role: value.role,
        });
    }));
}
exports.default = UserDataRetriever;
