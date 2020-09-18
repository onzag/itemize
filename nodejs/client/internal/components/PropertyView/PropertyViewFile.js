"use strict";
/**
 * Contains the property view file handler
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../components/util");
const constants_1 = require("../../../../constants");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const util_2 = require("../../../../util");
class PropertyViewFile extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && !deep_equal_1.default(this.props.state.value, nextProps.state.value)) ||
            (this.props.useAppliedValue && !deep_equal_1.default(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.property !== this.props.property ||
            nextProps.forId !== this.props.forId ||
            nextProps.forVersion !== this.props.forVersion ||
            !!this.props.rtl !== !!nextProps.rtl ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    openFile() {
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        window.open(value.url, value.name);
    }
    render() {
        let currentValue = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        const isSupportedImage = currentValue && constants_1.FILE_SUPPORTED_IMAGE_TYPES.includes(currentValue.type);
        if (currentValue &&
            currentValue.url.indexOf("blob:") !== 0) {
            const domain = process.env.NODE_ENV === "production" ? this.props.config.productionHostname : this.props.config.developmentHostname;
            currentValue = util_2.fileURLAbsoluter(domain, this.props.config.containersHostnamePrefixes, currentValue, this.props.itemDefinition, this.props.forId, this.props.forVersion, this.props.containerId, this.props.include, this.props.property, this.props.cacheFiles);
        }
        const prettySize = currentValue && pretty_bytes_1.default(currentValue.size);
        const extension = currentValue && util_2.mimeTypeToExtension(currentValue.type);
        const imageSrcSet = isSupportedImage ? util_1.imageSrcSetRetriever(currentValue, this.props.property) : null;
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue,
            openFile: this.openFile,
            isSupportedImage,
            imageSrcSet,
            prettySize,
            extension,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyViewFile;
