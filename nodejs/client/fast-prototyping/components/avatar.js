"use strict";
/**
 * The avatar allows to show an user avatar in a nice way using the mui avatar
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarRenderer = exports.Avatar = void 0;
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const imported_resources_1 = require("../../../imported-resources");
const Link_1 = __importDefault(require("../../components/navigation/Link"));
const util_1 = require("../../components/util");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const constants_1 = require("../../../constants");
const Reader_1 = __importDefault(require("../../components/property/Reader"));
/**
 * We build the styles with the create styles function
 */
const avatarStyles = mui_core_1.createStyles({
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
/**
 * The simple avatar is just a react component that displays a simple material
 * ui specific avatar, nothing too special about this
 */
class SimpleAvatar extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(mui_core_1.Avatar, { alt: this.props.userNameValue, classes: {
                root: `${this.props.classes.avatar} ${this.props.numberColorClassName} ` +
                    `${this.props.size === "large" ? this.props.classes.avatarLarge : ""} ` +
                    `${this.props.size === "medium" ? this.props.classes.avatarMedium : ""} ` +
                    `${this.props.isSpecialUser ? this.props.classes.specialUser : ""} ` +
                    `${this.props.isSpecialUser && this.props.size === "large" ? this.props.classes.specialUserLarge : ""} ` +
                    `${this.props.isSpecialUser && this.props.size === "medium" ? this.props.classes.specialUserMedium : ""}`
            }, src: this.props.imgSrc }, this.props.userNameValue ? this.props.userNameValue[0].toUpperCase() : ""));
    }
}
/**
 * The avatar content will do complex logic in order
 * to display the avatar of a given user in an efficient way
 */
class ActualAvatar extends react_1.default.PureComponent {
    render() {
        // so we assign a random color based on the user id
        const numberColorClassName = this.props.id ? this.props.classes["randomColor" + (this.props.id % 10)] : "";
        // now the flag logic
        const flag = this.props.countryCode && imported_resources_1.countries[this.props.countryCode] ? (react_1.default.createElement("div", { className: this.props.classes.flag }, imported_resources_1.countries[this.props.countryCode].emoji)) : null;
        // and now we get the image sources from the image size retriever, only the standard
        // sources as we pass no property definition to it
        const imageSources = util_1.imageSizeRetriever(this.props.profilePictureValue, null);
        // so which source to use depends, for size large the large image, otherwise the small
        // yes even for medium
        const imageSrc = this.props.size === "large" ? imageSources.imageLargeSizeURL : imageSources.imageSmallSizeURL;
        // now this will be the content
        const content = (react_1.default.createElement("div", { className: `${this.props.classes.avatarContainer} ${this.props.fullWidth ? this.props.classes.fullWidth : ""}` },
            react_1.default.createElement(SimpleAvatar, { imgSrc: this.props.cacheImage ? util_1.cacheableQSLoader(imageSrc) : imageSrc, size: this.props.size, numberColorClassName: numberColorClassName, isSpecialUser: this.props.isSpecialUser, userNameValue: this.props.userNameValue, classes: this.props.classes }),
            flag));
        // this will be the actual avatar, depending if we wrap it with a router link or not
        // according to the logic
        const avatar = this.props.profileURL ? (react_1.default.createElement(Link_1.default, { className: this.props.linkClassName, to: this.props.profileURL }, content)) : content;
        // so now for warnings
        if (this.props.warningCount) {
            return (react_1.default.createElement(mui_core_1.Badge, { badgeContent: this.props.warningCount > 99 ? "99+" : this.props.warningCount, color: "secondary", classes: { badge: this.props.classes.avatarBadge } }, avatar));
        }
        else {
            // no warnings, return as it is
            return avatar;
        }
    }
}
/**
 * Will display an avatar for a given user, this fast prototyping
 * component makes no assumptions and as such you will have to implement
 * your own wrapper around it to make your own avatar type
 */
exports.Avatar = mui_core_1.withStyles(avatarStyles)(ActualAvatar);
/**
 * When we drop the file, it takes a callback
 * @param onSetFile the onSetFile function of the renderer, it's bind here
 * @param files the files that have dropped by the react dropzone utility
 */
function onDrop(onSetFile, files) {
    // we only set one file
    onSetFile(files[0]);
}
/**
 * A fully custom renderer for the avatar component for usage with file types
 * so it can be passed as a custom renderer via the entry, eg...
 * <Entry id="profile_picture" renderer={AvatarRenderer}/> rather
 * than using the default
 */
exports.AvatarRenderer = mui_core_1.withStyles(avatarStyles)((props) => {
    const dropzoneRef = react_1.default.useRef();
    // we are using readers inside the avatar renderer, which is quite the feat, but nonetheless allowed
    // a bit inefficient but should work out just fine for this
    return (react_1.default.createElement("div", { className: `${props.classes.avatarContainer} ${props.classes.avatarContainerLarge}` },
        react_1.default.createElement(Reader_1.default, { id: "username" }, (username) => (react_1.default.createElement(Reader_1.default, { id: "role" }, (role) => (react_1.default.createElement(Reader_1.default, { id: "id" }, (id) => {
            const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : "";
            const specialUserClassName = (props.args.specialUsers || []).includes(role) ? props.classes.specialUser : "";
            const specialUserSizeClassName = specialUserClassName && props.classes.specialUserLarge;
            return (react_1.default.createElement(react_dropzone_1.default, { onDropAccepted: onDrop.bind(null, props.onSetFile), onDropRejected: onDrop.bind(null, props.onSetFile), maxSize: constants_1.MAX_FILE_SIZE, accept: props.accept, multiple: false, noClick: false, ref: dropzoneRef, disabled: props.disabled }, ({ getRootProps, getInputProps, isDragAccept, isDragReject, }) => {
                const { ref, ...rootProps } = getRootProps();
                return (react_1.default.createElement(mui_core_1.RootRef, { rootRef: ref },
                    react_1.default.createElement("div", Object.assign({}, rootProps),
                        react_1.default.createElement("input", Object.assign({}, getInputProps())),
                        react_1.default.createElement("div", { className: props.classes.avatarContainer },
                            react_1.default.createElement(mui_core_1.Avatar, { classes: {
                                    root: `${props.classes.avatar} ${numberColorClassName} ` +
                                        `${props.classes.avatarLarge} ` +
                                        `${specialUserClassName} ${specialUserSizeClassName}`
                                }, src: util_1.cacheableQSLoader(props.imageSizes && props.imageSizes.imageLargeSizeURL) }, username ? username[0].toLocaleUpperCase() : ""),
                            react_1.default.createElement("div", { className: `${props.classes.hoverAddBackdrop} ${isDragAccept || isDragReject ? "visible" : ""}` }, isDragReject ? react_1.default.createElement(mui_core_1.BrokenImageIcon, { fontSize: "large" }) : react_1.default.createElement(mui_core_1.AddAPhotoIcon, { fontSize: "large" }))))));
            }));
        }))))),
        props.currentInvalidReason || props.rejectedReason ? react_1.default.createElement(mui_core_1.Alert, { classes: { root: props.classes.avatarUploadError }, severity: "error" }, props.currentInvalidReason || props.rejectedReason) : null));
});
