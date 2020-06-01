"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const constants_1 = require("../../../../constants");
const uuid_1 = __importDefault(require("uuid"));
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const util_1 = require("../../../../util");
const util_2 = require("../../../components/util");
class PropertyEntryFile extends react_1.default.Component {
    constructor(props) {
        super(props);
        // the pool is set
        this.ownedObjectURLPool = {};
        this.state = {
            rejectedValue: null,
            rejected: false,
            rejectedReason: null,
        };
        // the functions are binded
        this.onSetFile = this.onSetFile.bind(this);
        this.onRemoveFile = this.onRemoveFile.bind(this);
        this.openFile = this.openFile.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            nextProps.forId !== this.props.forId ||
            nextProps.forVersion !== this.props.forVersion ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            this.props.altDescription !== nextProps.altDescription ||
            this.props.altPlaceholder !== nextProps.altPlaceholder ||
            this.props.altLabel !== nextProps.altLabel ||
            !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon ||
            nextProps.renderer !== this.props.renderer ||
            this.state.rejected !== nextState.rejected ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    componentWillUnmount() {
        // revoke urls on unmount
        Object.keys(this.ownedObjectURLPool).forEach((id) => {
            URL.revokeObjectURL(this.ownedObjectURLPool[id]);
        });
    }
    openFile(value) {
        window.open(value.url, value.name);
    }
    onSetFile(file) {
        // when a drop is accepted, let's check, if it's a single file
        const id = "FILE" + uuid_1.default.v4().replace(/-/g, "");
        const objectURL = URL.createObjectURL(file);
        this.ownedObjectURLPool[id] = objectURL;
        const value = {
            name: file.name,
            type: file.type,
            id,
            url: objectURL,
            size: file.size,
            src: file,
        };
        const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
        const accept = util_1.processAccepts(this.props.property.getSpecialProperty("accept"), isExpectingImages);
        // check if it's images we are accepting
        if (!util_1.checkFileInAccepts(value.type, accept)) {
            this.setState({
                rejected: true,
                rejectedValue: value,
                rejectedReason: this.props.i18n[this.props.language][(isExpectingImages ? "image_uploader_invalid_type" : "file_uploader_invalid_type")],
            });
            return;
        }
        else if (value.size > constants_1.MAX_FILE_SIZE) {
            const prettySize = pretty_bytes_1.default(constants_1.MAX_FILE_SIZE);
            this.setState({
                rejected: true,
                rejectedValue: value,
                rejectedReason: util_1.localeReplacer(this.props.i18n[this.props.language][(isExpectingImages ? "image_uploader_file_too_big" : "file_uploader_file_too_big")], prettySize),
            });
            return;
        }
        else {
            this.setState({
                rejected: false,
                rejectedValue: null,
                rejectedReason: null,
            });
        }
        this.props.onChange(value, null);
    }
    onRemoveFile() {
        this.props.onChange(null, null);
    }
    render() {
        // getting the basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        const isSupportedImage = !this.props.state.value ?
            false :
            constants_1.FILE_SUPPORTED_IMAGE_TYPES.includes(this.props.state.value.type);
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        let currentValue = this.state.rejectedValue ||
            this.props.state.value;
        if (currentValue &&
            currentValue.url.indexOf("blob:") !== 0) {
            if (this.ownedObjectURLPool[currentValue.id]) {
                currentValue = {
                    ...currentValue,
                    url: this.ownedObjectURLPool[currentValue.id],
                };
            }
            else {
                currentValue = util_2.fileURLAbsoluter(this.props.config.containersHostnamePrefixes, currentValue, this.props.itemDefinition, this.props.forId, this.props.forVersion, this.props.containerId, this.props.include, this.props.property);
            }
        }
        const imageSizes = isSupportedImage ? util_2.imageSizeRetriever(currentValue, this.props.property) : null;
        const imageSrcSet = isSupportedImage ? util_2.imageSrcSetRetriever(currentValue, this.props.property, imageSizes) : null;
        const isExpectingImages = !!this.props.property.getSpecialProperty("imageUploader");
        const accept = util_1.processAccepts(this.props.property.getSpecialProperty("accept"), isExpectingImages);
        // the placeholder when active
        let genericActivePlaceholder = this.props.i18n[this.props.language].file_uploader_placeholder_active_single;
        if (isExpectingImages) {
            genericActivePlaceholder = this.props.i18n[this.props.language].image_uploader_placeholder_active_single;
        }
        genericActivePlaceholder = util_1.capitalize(genericActivePlaceholder);
        let genericDeleteLabel = this.props.i18n[this.props.language].file_uploader_delete_file;
        if (isExpectingImages) {
            genericDeleteLabel = this.props.i18n[this.props.language].image_uploader_delete_file;
        }
        genericDeleteLabel = util_1.capitalize(genericDeleteLabel);
        let genericSelectLabel = this.props.i18n[this.props.language].file_uploader_select_file;
        if (isExpectingImages) {
            genericSelectLabel = this.props.i18n[this.props.language].image_uploader_select_file;
        }
        genericSelectLabel = util_1.capitalize(genericSelectLabel);
        const prettySize = currentValue && pretty_bytes_1.default(currentValue.size);
        const extension = currentValue && util_1.mimeTypeToExtension(currentValue.type);
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            icon: this.props.icon,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onRestore: this.props.onRestore,
            canRestore: !deep_equal_1.default(this.props.state.value, this.props.state.stateAppliedValue),
            onSetFile: this.onSetFile,
            onRemoveFile: this.onRemoveFile,
            openFile: this.openFile,
            accept,
            isExpectingImages,
            genericActivePlaceholder,
            genericDeleteLabel,
            genericSelectLabel,
            rejected: this.state.rejected,
            rejectedReason: this.state.rejectedReason,
            isSupportedImage,
            imageSrcSet,
            imageSizes,
            prettySize,
            extension,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryFile;
