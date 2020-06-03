"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const item_definition_loader_1 = require("../../components/item-definition-loader");
const avatar_1 = require("../../components/avatar");
const imported_resources_1 = require("../../../../imported-resources");
const VerifiedUser_1 = __importDefault(require("@material-ui/icons/VerifiedUser"));
const admin_toolbox_1 = require("./admin-toolbox");
const Reader_1 = __importDefault(require("../../../components/property/Reader"));
const I18nRead_1 = __importDefault(require("../../../components/localization/I18nRead"));
const View_1 = __importDefault(require("../../../components/property/View"));
const UserDataRetriever_1 = __importDefault(require("../../../components/user/UserDataRetriever"));
const publicUserProfileStyles = (theme) => core_1.createStyles({
    container: {
        paddingTop: "1rem",
    },
    paper: {
        padding: "1rem",
    },
    username: {
        fontWeight: 300,
        width: "100%",
        marginTop: "1rem",
        textAlign: "center",
    },
    country: {
        fontWeight: 300,
        width: "100%",
        marginTop: "0.5rem",
        textAlign: "center",
    },
    role: {
        fontWeight: 300,
        width: "100%",
        marginTop: "0.5rem",
        textAlign: "center",
    },
    verifiedIcon: {
        color: theme.palette.success.main,
    },
    aboutMeCard: {
        marginTop: "1rem",
        padding: "1rem",
    },
    spacer: {
        width: "6px",
        height: "2px",
        display: "inline-block",
    },
});
exports.PublicUserProfile = core_1.withStyles(publicUserProfileStyles)((props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Container, { maxWidth: "md", className: props.classes.container },
            react_1.default.createElement(core_1.Paper, { className: props.classes.paper },
                react_1.default.createElement(item_definition_loader_1.ItemDefinitionLoader, null,
                    react_1.default.createElement(avatar_1.Avatar, { size: "large", hideFlag: true, fullWidth: true }),
                    react_1.default.createElement(Reader_1.default, { id: "e_validated" }, (eValidated) => (react_1.default.createElement(Reader_1.default, { id: "username" }, (username) => (react_1.default.createElement(core_1.Typography, { variant: "h4", className: props.classes.username },
                        username,
                        eValidated ? react_1.default.createElement("span", null,
                            react_1.default.createElement("span", { className: props.classes.spacer }),
                            react_1.default.createElement(I18nRead_1.default, { id: "label", propertyId: "e_validated", capitalize: true }, (i18nUserValidated) => (react_1.default.createElement(core_1.Tooltip, { title: i18nUserValidated },
                                react_1.default.createElement(VerifiedUser_1.default, { className: props.classes.verifiedIcon }))))) : null)))))),
                react_1.default.createElement(Reader_1.default, { id: "app_country" }, (country) => {
                    if (!country) {
                        return null;
                    }
                    const countryobj = imported_resources_1.countries[country];
                    return react_1.default.createElement(core_1.Typography, { variant: "h5", className: props.classes.country }, countryobj.emoji + " " + countryobj.native);
                }),
                react_1.default.createElement(Reader_1.default, { id: "role" }, (role) => {
                    if (role !== "USER") {
                        return react_1.default.createElement(core_1.Typography, { variant: "h5", className: props.classes.role },
                            react_1.default.createElement(View_1.default, { id: "role", capitalize: true }));
                    }
                    return null;
                }),
                react_1.default.createElement(UserDataRetriever_1.default, null, (userData) => {
                    if (userData.role === "ADMIN") {
                        return react_1.default.createElement(admin_toolbox_1.AdminToolbox, null);
                    }
                    return null;
                }),
                react_1.default.createElement(core_1.Card, { className: props.classes.aboutMeCard, variant: "outlined" },
                    react_1.default.createElement(View_1.default, { id: "about_me" }))))));
});
