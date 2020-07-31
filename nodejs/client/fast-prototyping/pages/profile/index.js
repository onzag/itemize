"use strict";
/**
 * The user profile that is as seen by the public
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const public_user_1 = require("./public-user");
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
/**
 * Represents a public user profile component
 * that displays basic information about a public user
 *
 * @param props the profile props
 * @returns a react element
 */
function Profile(props) {
    const currentUserId = parseInt(props.match.params.id) || null;
    const properties = [
        "username",
        "app_language",
        "app_country",
        "app_currency",
        "e_validated",
        "role",
        "profile_picture",
        "about_me",
    ];
    return (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
        react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: properties, forId: currentUserId, assumeOwnership: false, includePolicies: false },
            react_1.default.createElement(I18nRead_1.default, { id: "profile", capitalize: true }, (i18nProfile) => {
                return (react_1.default.createElement(TitleSetter_1.default, null, i18nProfile));
            }),
            react_1.default.createElement(public_user_1.PublicUserProfile, null))));
}
exports.Profile = Profile;
