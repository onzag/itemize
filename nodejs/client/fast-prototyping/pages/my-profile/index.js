"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const module_1 = require("../../../providers/module");
const item_definition_1 = require("../../../providers/item-definition");
const current_user_1 = require("./current-user");
const util_1 = require("../../components/util");
const Redirect_1 = __importDefault(require("../../../components/navigation/Redirect"));
const needs_submit_prompt_1 = require("../../components/needs-submit-prompt");
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const TitleSetter_1 = __importDefault(require("../../../components/util/TitleSetter"));
function MyProfile() {
    return (react_1.default.createElement(util_1.SlowLoadingElement, { id: "profile" },
        react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
            if (!userData.id) {
                return (react_1.default.createElement(Redirect_1.default, { to: "/" }));
            }
            let properties = [
                "username",
                "app_language",
                "app_country",
                "app_currency",
                "e_validated",
                "role",
                "profile_picture",
                "email",
                "password",
                "e_notifications",
                "e_newsletter",
                "address",
                "about_me",
            ];
            return (react_1.default.createElement(module_1.ModuleProvider, { module: "users" },
                react_1.default.createElement(item_definition_1.ItemDefinitionProvider, { itemDefinition: "user", properties: properties, forId: userData.id, assumeOwnership: true, includePolicies: true, longTermCaching: true, markForDestructionOnLogout: true, cleanOnDismount: {
                        propertiesToRestoreOnAny: [
                            "username",
                            "email",
                            "about_me",
                        ]
                    } },
                    react_1.default.createElement(needs_submit_prompt_1.NeedsSubmitPrompt, { properties: [
                            "email",
                            "username",
                            "about_me",
                        ], i18nConfirm: "update_profile", confirmationSubmitOptions: {
                            properties: ["email", "username", "about_me"],
                            differingOnly: true,
                        } }),
                    react_1.default.createElement(I18nRead_1.default, { id: "profile", capitalize: true }, (i18nProfile) => {
                        return (react_1.default.createElement(TitleSetter_1.default, null, i18nProfile));
                    }),
                    react_1.default.createElement(current_user_1.CurrentUserProfile, null))));
        })));
}
exports.MyProfile = MyProfile;
