"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const imported_resources_1 = require("../../../imported-resources");
const styles_1 = require("@material-ui/styles");
const Link_1 = __importDefault(require("../../components/navigation/Link"));
const util_1 = require("../../components/util");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const AddAPhoto_1 = __importDefault(require("@material-ui/icons/AddAPhoto"));
const BrokenImage_1 = __importDefault(require("@material-ui/icons/BrokenImage"));
const constants_1 = require("../../../constants");
const lab_1 = require("@material-ui/lab");
const Reader_1 = __importDefault(require("../../components/property/Reader"));
const avatarStyles = styles_1.createStyles({
    flag: {
        position: "absolute",
        fontSize: "0.8rem",
        bottom: -2.5,
        right: -5,
    },
    hoverAddBackdrop: {
        "cursor": "pointer",
        "opacity": 0,
        "width": "100%",
        "height": "100%",
        "backgroundColor": "black",
        "color": "white",
        "position": "absolute",
        "alignItems": "center",
        "justifyContent": "center",
        "display": "flex",
        "zIndex": 1,
        "transition": "opacity 0.3s ease-in-out",
        "borderRadius": "100%",
        "&:hover, &.visible": {
            opacity: 0.5,
        }
    },
    avatar: {
        "cursor": "pointer",
        "&::after": {
            content: "''",
            opacity: 0,
            boxShadow: "0 0px 10px rgba(0,0,0)",
            transition: "opacity 0.3s ease-in-out",
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "100%",
        },
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            transition: "opacity 0.3s ease-in-out",
            opacity: 0,
        },
        "&:hover::after": {
            opacity: 1,
        },
        "&:active::before": {
            opacity: 1,
        },
        "&:active::after": {
            opacity: 1,
        },
    },
    fullWidth: {
        width: "100%",
    },
    avatarContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    avatarUploadError: {
        marginTop: "1rem",
    },
    avatarContainerLarge: {
        paddingBottom: "1rem",
    },
    avatarBadge: {
        transform: "scale(1) translate(25%, -25%)",
    },
    avatarLarge: {
        width: "200px",
        height: "200px",
        color: "rgba(255,255,255,0.7)",
        fontSize: "120px",
    },
    avatarMedium: {
        width: "70px",
        height: "70px",
        fontSize: "30px",
    },
    randomColor0: {
        backgroundColor: "#f44336",
        border: "solid 2px #b71c1c",
    },
    randomColor1: {
        backgroundColor: "#9c27b0",
        border: "solid 2px #4a148c",
    },
    randomColor2: {
        backgroundColor: "#3f51b5",
        border: "solid 2px #1a237e",
    },
    randomColor3: {
        backgroundColor: "#ff5722",
        border: "solid 2px #bf360c",
    },
    randomColor4: {
        backgroundColor: "#795548",
        border: "solid 2px #3e2723",
    },
    randomColor5: {
        backgroundColor: "#e91e63",
        border: "solid 2px #880e4f",
    },
    randomColor6: {
        backgroundColor: "#673ab7",
        border: "solid 2px #311b92",
    },
    randomColor7: {
        backgroundColor: "#2196f3",
        border: "solid 2px #0d47a1",
    },
    randomColor8: {
        backgroundColor: "#009688",
        border: "solid 2px #004d40",
    },
    randomColor9: {
        backgroundColor: "#607d8b",
        border: "solid 2px #263238",
    },
    specialUser: {
        border: "solid 2px #ffeb3b",
        boxShadow: "0px 0px 0px 2px #ffeb3b",
    },
    specialUserMedium: {
        boxShadow: "0px 0px 0px 4px #ffeb3b"
    },
    specialUserLarge: {
        boxShadow: "0px 0px 0px 10px #ffeb3b"
    },
});
exports.Avatar = styles_1.withStyles(avatarStyles)((props) => {
    const contentFn = (id, role, userNameValue, profilePictureValue, email, eValidated, address) => {
        const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : "";
        const hasWarningForMissingEmail = !(email && email.stateAppliedValue);
        const hasWarningForNotValidEmail = !(eValidated && eValidated.stateAppliedValue);
        const hasAnotherWarningForMissingAddress = !(address && address.stateAppliedValue);
        const hasWarning = email && eValidated && address && props.showWarnings && (hasWarningForMissingEmail || hasWarningForNotValidEmail || hasAnotherWarningForMissingAddress);
        const isSpecialUser = role !== "USER";
        const flag = props.hideFlag ? null : (react_1.default.createElement(Reader_1.default, { id: "app_country" }, (appCountryValue) => {
            let countryEmoji = null;
            if (appCountryValue && imported_resources_1.countries[appCountryValue]) {
                countryEmoji = imported_resources_1.countries[appCountryValue].emoji;
            }
            return react_1.default.createElement("div", { className: props.classes.flag }, countryEmoji);
        }));
        const imageSources = util_1.imageSizeRetriever(profilePictureValue, null);
        const avatarWithSource = (imageSrc) => (react_1.default.createElement(core_1.Avatar, { alt: userNameValue, classes: { root: `${props.classes.avatar} ${numberColorClassName} ` +
                    `${props.size === "large" ? props.classes.avatarLarge : ""} ${props.size === "medium" ? props.classes.avatarMedium : ""} ` +
                    `${isSpecialUser ? props.classes.specialUser : ""} ${isSpecialUser && props.size === "large" ? props.classes.specialUserLarge : ""} ` +
                    `${isSpecialUser && props.size === "medium" ? props.classes.specialUserMedium : ""}` }, src: imageSrc }, userNameValue ? userNameValue[0].toUpperCase() : ""));
        const imageSrc = props.size === "large" ? imageSources.imageLargeSizeURL : imageSources.imageSmallSizeURL;
        const content = (react_1.default.createElement("div", { className: `${props.classes.avatarContainer} ${props.fullWidth ? props.classes.fullWidth : ""}` },
            props.cacheImage ?
                avatarWithSource(util_1.cacheableQSLoader(imageSrc)) :
                avatarWithSource(imageSrc),
            flag));
        const avatar = props.profileURL ? (react_1.default.createElement(Link_1.default, { to: typeof props.profileURL === "string" ? props.profileURL : props.profileURL(id) }, content)) : content;
        if (props.showWarnings && hasWarning) {
            let warningCount = 0;
            if (hasWarningForMissingEmail || hasWarningForNotValidEmail) {
                warningCount++;
            }
            if (hasAnotherWarningForMissingAddress) {
                warningCount++;
            }
            return react_1.default.createElement(core_1.Badge, { badgeContent: warningCount, color: "secondary", classes: { badge: props.classes.avatarBadge } }, avatar);
        }
        else {
            return avatar;
        }
    };
    return (react_1.default.createElement(Reader_1.default, { id: "id" }, (id) => (react_1.default.createElement(Reader_1.default, { id: "profile_picture" }, (profilePictureValue) => (react_1.default.createElement(Reader_1.default, { id: "role" }, (role) => (react_1.default.createElement(Reader_1.default, { id: "username" }, (userNameValue) => {
        if (!props.showWarnings) {
            return contentFn(id, role, userNameValue, profilePictureValue);
        }
        return (react_1.default.createElement(Reader_1.default, { id: "email" }, (email, emailState) => (react_1.default.createElement(Reader_1.default, { id: "e_validated" }, (eValidated, eValidatedState) => (react_1.default.createElement(Reader_1.default, { id: "address" }, (address, addressState) => {
            return contentFn(id, role, userNameValue, profilePictureValue, emailState, eValidatedState, addressState);
        }))))));
    }))))))));
});
function onDrop(onSetFile, files) {
    onSetFile(files[0]);
}
exports.AvatarRenderer = styles_1.withStyles(avatarStyles)((props) => {
    const dropzoneRef = react_1.default.useRef();
    return (react_1.default.createElement("div", { className: `${props.classes.avatarContainer} ${props.classes.avatarContainerLarge}` },
        react_1.default.createElement(Reader_1.default, { id: "username" }, (username) => (react_1.default.createElement(Reader_1.default, { id: "role" }, (role) => (react_1.default.createElement(Reader_1.default, { id: "id" }, (id) => {
            const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : "";
            const specialUserClassName = role !== "USER" ? props.classes.specialUser : "";
            const specialUserSizeClassName = specialUserClassName && props.classes.specialUserLarge;
            return (react_1.default.createElement(react_dropzone_1.default, { onDropAccepted: onDrop.bind(null, props.onSetFile), onDropRejected: onDrop.bind(null, props.onSetFile), maxSize: constants_1.MAX_FILE_SIZE, accept: props.accept, multiple: false, noClick: false, ref: dropzoneRef, disabled: props.disabled }, ({ getRootProps, getInputProps, isDragAccept, isDragReject, }) => {
                const { ref, ...rootProps } = getRootProps();
                return (react_1.default.createElement(core_1.RootRef, { rootRef: ref },
                    react_1.default.createElement("div", Object.assign({}, rootProps),
                        react_1.default.createElement("input", Object.assign({}, getInputProps())),
                        react_1.default.createElement("div", { className: props.classes.avatarContainer },
                            react_1.default.createElement(core_1.Avatar, { classes: {
                                    root: `${props.classes.avatar} ${numberColorClassName} ` +
                                        `${props.classes.avatarLarge} ` +
                                        `${specialUserClassName} ${specialUserSizeClassName}`
                                }, src: util_1.cacheableQSLoader(props.imageSizes && props.imageSizes.imageLargeSizeURL) }, username ? username[0].toLocaleUpperCase() : ""),
                            react_1.default.createElement("div", { className: `${props.classes.hoverAddBackdrop} ${isDragAccept || isDragReject ? "visible" : ""}` }, isDragReject ? react_1.default.createElement(BrokenImage_1.default, { fontSize: "large" }) : react_1.default.createElement(AddAPhoto_1.default, { fontSize: "large" }))))));
            }));
        }))))),
        props.currentInvalidReason || props.rejectedReason ? react_1.default.createElement(lab_1.Alert, { classes: { root: props.classes.avatarUploadError }, severity: "error" }, props.currentInvalidReason || props.rejectedReason) : null));
});
