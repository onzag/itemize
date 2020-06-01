"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
exports.STANDARD_THEME = {
    containerWidth: "100%",
};
exports.style = (theme) => styles_1.createStyles({
    container: {
        width: theme.containerWidth,
    },
    calloutExclusionWarning: {
        width: "100%",
    },
    calloutExclusionWarningIcon: {},
    switchContainer: {
        width: "100%",
    },
    switchFormControl: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    switchLabel: {},
    switchLabelSingleLine: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
