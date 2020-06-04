"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_2 = require("../../../components/util");
exports.PROPERTY_VIEW_SANITIZE_CONFIG = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["frameborder", "allow", "allowfullscreen", "scrolling", "src", "spellcheck", "contenteditable"],
    ALLOW_UNKNOWN_PROTOCOLS: true,
};
exports.ALLOWED_CLASSES = [
    "image", "image-container", "image-pad", "video", "video-container",
    "file", "file-container", "file-icon", "file-extension", "file-size",
];
exports.ALLOWED_CLASSES_PREFIXES = [
    "rich-text--",
];
function cleanAllAttribs(node) {
    Array.prototype.slice.call(node.attributes).forEach((attr) => {
        node.removeAttribute(attr.name);
    });
}
function propertyViewPostProcessingHook(relatedProperty, currentFiles, supportsImages, supportsVideos, supportsFiles, node) {
    if (node.tagName === "IFRAME") {
        if (supportsVideos) {
            const videoSrc = node.dataset.videoSrc || "";
            const origin = node.dataset.videoOrigin || "";
            cleanAllAttribs(node);
            node.allowFullscreen = true;
            // src
            if (origin === "vimeo") {
                node.setAttribute("src", `https://player.vimeo.com/video/${videoSrc}?title=0&byline=0&portrait=0&badge=0`);
            }
            else if (origin === "youtube") {
                node.setAttribute("src", `https://youtube.com/embed/${videoSrc}?rel=0`);
            }
            // frameborder
            node.frameBorder = "0";
            // data-video-src
            node.dataset.videoSrc = videoSrc;
            // data-video-origin
            node.dataset.videoOrigin = origin;
            // allowfullscreen
            node.allowFullscreen = true;
        }
        else {
            node.parentElement && node.parentElement.removeChild(node);
        }
    }
    else if (node.tagName === "IMG") {
        if (supportsImages) {
            const srcId = node.dataset.srcId;
            const currentFile = currentFiles && currentFiles.find((f) => f.id === srcId);
            const alt = node.alt || "";
            const srcHeight = node.dataset.srcHeight;
            const srcWidth = node.dataset.srcWidth;
            cleanAllAttribs(node);
            if (!srcId || !currentFile) {
                node.parentElement && node.parentElement.removeChild(node);
            }
            else {
                const absolutedFile = util_1.fileURLAbsoluter(this.props.config.containersHostnamePrefixes, currentFile, this.props.itemDefinition, this.props.forId, this.props.forVersion || null, this.props.containerId, this.props.include, relatedProperty);
                const srcset = util_2.imageSrcSetRetriever(absolutedFile, relatedProperty);
                // srcset
                node.setAttribute("srcset", srcset);
                // src
                node.setAttribute("src", absolutedFile ? absolutedFile.url : "/rest/resource/image-fail.svg");
                // sizes
                node.setAttribute("sizes", "70vw");
                // data-src-width
                node.dataset.srcWidth = srcWidth;
                // data-src-id
                node.dataset.srcId = srcId;
                // data-src-height
                node.dataset.srcHeight = srcHeight;
                // alt
                node.alt = alt;
            }
        }
        else {
            node.parentElement && node.parentElement.removeChild(node);
        }
    }
    else if (node.className === "file") {
        if (supportsFiles) {
            const srcId = node.dataset.srcId;
            const src = node.dataset.src;
            cleanAllAttribs(node);
            const currentFile = currentFiles && currentFiles.find((f) => f.id === srcId);
            if (currentFile) {
                // spellcheck
                node.spellcheck = false;
                const absolutedFile = util_1.fileURLAbsoluter(this.props.config.containersHostnamePrefixes, currentFile, this.props.itemDefinition, this.props.forId, this.props.forVersion || null, this.props.containerId, this.props.include, relatedProperty);
                // data-src-id
                node.dataset.srcId = srcId;
                // data-src
                if (absolutedFile) {
                    node.dataset.src = absolutedFile.url;
                }
                else {
                    node.dataset.src = src;
                }
                // contenteditable
                node.contentEditable = "false";
                // class
                node.className = "file";
            }
            else {
                node.parentElement && node.parentElement.removeChild(node);
            }
        }
        else {
            node.parentElement && node.parentElement.removeChild(node);
        }
    }
    const style = node.getAttribute && node.getAttribute("style");
    if (style) {
        const removeStyle = style.indexOf("javascript") !== -1 ||
            style.indexOf("http") !== -1 ||
            style.indexOf("://") !== -1 ||
            node.style.position === "fixed";
        if (removeStyle) {
            node.removeAttribute("style");
        }
    }
    const classList = node.classList;
    if (classList) {
        classList.forEach((className) => {
            if (!exports.ALLOWED_CLASSES.includes(className)) {
                const isPrefixedByAValidPrefix = exports.ALLOWED_CLASSES_PREFIXES.some((prefix) => className.indexOf(prefix) === 0);
                if (!isPrefixedByAValidPrefix) {
                    node.classList.remove(className);
                }
            }
        });
    }
    const id = node.id;
    if (id) {
        node.removeAttribute("id");
    }
    return node;
}
exports.propertyViewPostProcessingHook = propertyViewPostProcessingHook;
class PropertyViewText extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return this.props.state.value !== nextProps.state.value ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.property !== this.props.property ||
            nextProps.forId !== this.props.forId ||
            nextProps.forVersion !== this.props.forVersion ||
            !!this.props.rtl !== !!nextProps.rtl ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        let currentValue = this.props.state.value;
        const isRichText = this.props.property.isRichText();
        const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty");
        const supportsMedia = !!mediaPropertyId && isRichText;
        const supportsVideos = isRichText && !!this.props.property.getSpecialProperty("supportsVideos");
        const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
        const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");
        if (isRichText) {
            const mediaProperty = mediaPropertyId && this.props.itemDefinition.getPropertyDefinitionFor(mediaPropertyId, true);
            const currentFiles = mediaProperty &&
                mediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
            util_1.DOMPurify.addHook("afterSanitizeElements", propertyViewPostProcessingHook.bind(this, mediaProperty, currentFiles, supportsImages, supportsVideos, supportsFiles));
            currentValue = util_1.DOMPurify.sanitize(currentValue, exports.PROPERTY_VIEW_SANITIZE_CONFIG);
            util_1.DOMPurify.removeAllHooks();
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue,
            isRichText: this.props.property.isRichText(),
            subtype: this.props.property.getSubtype(),
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyViewText;
