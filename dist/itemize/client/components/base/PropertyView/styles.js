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
});
