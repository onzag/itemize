"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const uuid_1 = __importDefault(require("uuid"));
const util_1 = require("../../../../util");
const PropertyViewText_1 = require("../PropertyView/PropertyViewText");
const constants_1 = require("../../../../constants");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
class PropertyEntryText extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastLoadedFileError: null,
        };
        this.internalFileCache = {};
        this.onInsertFile = this.onInsertFile.bind(this);
        this.onInsertImage = this.onInsertImage.bind(this);
        this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
        this.onChangeHijacked = this.onChangeHijacked.bind(this);
        this.dismissLastLoadedFileError = this.dismissLastLoadedFileError.bind(this);
        this.cacheMediaPropertyInProps(props);
    }
    dismissLastLoadedFileError() {
        this.setState({
            lastLoadedFileError: null,
        });
    }
    componentWillUnmount() {
        Object.keys(this.internalFileCache).forEach((k) => {
            if (this.internalFileCache[k].url.startsWith("blob:")) {
                URL.revokeObjectURL(this.internalFileCache[k].url);
            }
        });
    }
    cacheMediaPropertyInProps(props) {
        const mediaPropertyName = props.property.getSpecialProperty("mediaProperty");
        if (mediaPropertyName) {
            this.cachedMediaProperty = props.itemDefinition.getPropertyDefinitionFor(mediaPropertyName, true);
            this.cachedMediaPropertyAcceptsFiles = util_1.processAccepts(this.cachedMediaProperty.getSpecialProperty("accept"), !!this.cachedMediaProperty.getSpecialProperty("imageUploader"));
            this.cachedMediaPropertyAcceptsImages = this.cachedMediaPropertyAcceptsFiles === "*" ?
                constants_1.FILE_SUPPORTED_IMAGE_TYPES.join(",") :
                this.cachedMediaPropertyAcceptsFiles.split(",").filter((accepting) => {
                    return accepting.startsWith("image");
                }).join(",");
        }
    }
    cacheCurrentFiles() {
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        if (relatedPropertyName) {
            const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
            const currentValue = relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
            if (currentValue) {
                currentValue.forEach((v) => {
                    this.internalFileCache[v.id] = v;
                });
            }
        }
    }
    componentDidMount() {
        if (this.props.property.isRichText()) {
            this.cacheCurrentFiles();
        }
    }
    componentDidUpdate(prevProps) {
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        // we assume that our related property has update if a value has been applied in which case we might want to load
        // such values in the cache
        if (relatedPropertyName &&
            prevProps.state.stateAppliedValue !== this.props.state.stateAppliedValue &&
            this.props.property.isRichText()) {
            this.cacheCurrentFiles();
        }
    }
    onChangeHijacked(value, internalValue) {
        // so first we try to read the html content in this fast and dirty way
        const dataSrcIdRegex = /data\-src\-id\=\"([A-Za-z0-9]+)\"/g;
        // this array for the ids we find
        const idsGathered = [];
        // and now we build a match loop
        let match;
        do {
            match = dataSrcIdRegex.exec(value);
            if (match) {
                const id = match[1];
                idsGathered.push(id);
                // we call the sync function to restore the file
                // into the current value of the property if necessary
                this.onSyncFile(id);
            }
        } while (match);
        // now we need to find the ones that have been deleted and are currently not loaded
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
        const currentValue = relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
        // if we got a value
        if (currentValue) {
            // we loop within it and see
            currentValue.forEach((v) => {
                // if it's not in the gathered list
                if (!idsGathered.includes(v.id)) {
                    this.onRemoveFile(v.id);
                }
            });
        }
        this.props.onChange(value, internalValue);
    }
    onRestoreHijacked() {
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
        relatedProperty.restoreValueFor(this.props.forId || null, this.props.forVersion || null);
        this.props.onRestore();
    }
    onSyncFile(fileId) {
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
        const currentValue = relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
        // it's almost certain that the file must be in this internal cache to restore files
        if ((!currentValue || !currentValue.find(v => v.id === fileId)) && this.internalFileCache[fileId]) {
            const newValue = currentValue !== null ?
                [...currentValue] : [];
            newValue.push(this.internalFileCache[fileId]);
            relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
            this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
        }
    }
    onRemoveFile(fileId) {
        const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty");
        const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
        const currentValue = relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
        // delete files but we don't get rid off them from the cache
        if (currentValue && currentValue.find(v => v.id === fileId)) {
            const newValue = currentValue.filter((f) => f.id !== fileId);
            relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue.length === 0 ? null : newValue, null);
            this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
        }
    }
    /**
     * Insers an image based on a file into the correlated file field and performs
     * the required checks
     * @param file the file to insert
     * @returns a promise, note that this promise can fail if the file itself fails and provide a generic error
     */
    async onInsertImage(file) {
        return new Promise((resolve, reject) => {
            const fileInserted = this.onInsertFile(file, true);
            const tempURL = fileInserted.url;
            const img = new Image();
            img.onload = () => {
                resolve({
                    result: fileInserted,
                    width: img.width,
                    height: img.height,
                });
            };
            img.onerror = () => {
                this.onRemoveFile(fileInserted.id);
                this.setState({
                    lastLoadedFileError: "image_uploader_invalid_type",
                });
                reject(new Error("Invalid Image"));
            };
            img.src = tempURL;
        });
    }
    /**
     * Inserts a file in the media property
     * @param file the file to insert
     * @param validateAgainstImages whether the errors and check given will be for image types
     */
    onInsertFile(file, validateAgainstImages) {
        // we do this generic check to test whether the file is an image, even when
        // the file check will do its own check
        if (validateAgainstImages && !util_1.checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsImages)) {
            this.setState({
                lastLoadedFileError: "image_uploader_invalid_type",
            });
            throw new Error("Invalid image type");
        }
        else if (!validateAgainstImages && !util_1.checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsFiles)) {
            this.setState({
                lastLoadedFileError: "file_uploader_invalid_type",
            });
            throw new Error("Invalid file type");
        }
        if (file.size > constants_1.MAX_FILE_SIZE) {
            this.setState({
                lastLoadedFileError: validateAgainstImages ? "image_uploader_file_too_big" : "file_uploader_file_too_big",
            });
            throw new Error("Size of image/file too large");
        }
        const tempURL = URL.createObjectURL(file);
        const id = "FILE" + uuid_1.default.v4().replace(/-/g, "");
        const addedFile = {
            name: file.name,
            type: file.type,
            id,
            url: tempURL,
            size: file.size,
            src: file,
        };
        const currentValue = this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
        const newValue = currentValue !== null ?
            [...currentValue] : [];
        newValue.push(addedFile);
        this.internalFileCache[id] = addedFile;
        this.cachedMediaProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
        this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
        return addedFile;
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.property !== this.props.property) {
            this.cacheMediaPropertyInProps(nextProps);
        }
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextProps.state) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.rtl !== !!nextProps.rtl ||
            this.props.forId !== nextProps.forId ||
            this.props.forVersion !== nextProps.forVersion ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            this.props.altDescription !== nextProps.altDescription ||
            this.props.altPlaceholder !== nextProps.altPlaceholder ||
            this.props.altLabel !== nextProps.altLabel ||
            !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon ||
            nextProps.renderer !== this.props.renderer ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        // get the invalid reason if any
        const isRichText = this.props.property.isRichText();
        const mediaPropertyId = this.props.property.getSpecialProperty("mediaProperty");
        const supportsMedia = !!mediaPropertyId && isRichText;
        const supportsVideos = isRichText && !!this.props.property.getSpecialProperty("supportsVideos");
        const supportsImages = supportsMedia && !!this.props.property.getSpecialProperty("supportsImages");
        const supportsFiles = supportsMedia && !!this.props.property.getSpecialProperty("supportsFiles");
        const i18nInLanguage = this.props.i18n[this.props.language];
        let currentValue = this.props.state.value;
        if (supportsMedia && currentValue && !this.props.state.stateValueHasBeenManuallySet) {
            const currentFiles = this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null);
            util_1.DOMPurify.addHook("afterSanitizeElements", PropertyViewText_1.propertyViewPostProcessingHook.bind(this, this.cachedMediaProperty, currentFiles, supportsImages, supportsVideos, supportsFiles));
            currentValue = util_1.DOMPurify.sanitize(currentValue, PropertyViewText_1.PROPERTY_VIEW_SANITIZE_CONFIG);
            util_1.DOMPurify.removeAllHooks();
            // TODO ensure proper sorting
        }
        let invalidReason = this.props.state.invalidReason;
        let invalidReasonIsMediaProperty = false;
        if (!invalidReason && supportsMedia) {
            const mediaPropertyState = this.cachedMediaProperty.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null);
            if (mediaPropertyState.invalidReason) {
                invalidReasonIsMediaProperty = true;
                invalidReason = mediaPropertyState.invalidReason;
            }
        }
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (!invalidReasonIsMediaProperty && isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        else if (invalidReasonIsMediaProperty && isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error["MEDIA_PROPERTY_" + invalidReason]) {
            i18nInvalidReason = i18nData.error["MEDIA_PROPERTY_" + invalidReason];
        }
        let lastLoadedFileError = this.state.lastLoadedFileError;
        if (lastLoadedFileError === "image_uploader_file_too_big" || lastLoadedFileError === "file_uploader_file_too_big") {
            lastLoadedFileError = util_1.localeReplacer(i18nInLanguage[lastLoadedFileError], pretty_bytes_1.default(constants_1.MAX_FILE_SIZE));
        }
        else if (lastLoadedFileError) {
            lastLoadedFileError = i18nInLanguage[lastLoadedFileError];
        }
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
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            i18nFormat: {
                formatBoldLabel: i18nInLanguage.format_bold,
                formatItalicLabel: i18nInLanguage.format_italic,
                formatUnderlineLabel: i18nInLanguage.format_underline,
                formatTitleLabel: i18nInLanguage.format_title,
                formatQuoteLabel: i18nInLanguage.format_quote,
                formatListNumberedLabel: i18nInLanguage.format_list_numbered,
                formatListBulletedLabel: i18nInLanguage.format_list_bulleted,
                formatAddImageLabel: i18nInLanguage.format_add_image,
                formatAddVideoLabel: i18nInLanguage.format_add_video,
                formatAddFileLabel: i18nInLanguage.format_add_file,
            },
            i18nLoadVideo: {
                title: i18nInLanguage.video_loader_title,
                label: i18nInLanguage.video_loader_label,
                placeholder: i18nInLanguage.video_loader_placeholder,
                invalid: i18nInLanguage.video_loader_invalid,
                submit: i18nInLanguage.video_loader_submit,
            },
            i18nGenericError: i18nInLanguage["generic_error"],
            i18nOk: i18nInLanguage["ok"],
            supportsImages,
            supportsFiles,
            supportsVideos,
            mediaPropertyAcceptsFiles: this.cachedMediaPropertyAcceptsFiles,
            mediaPropertyAcceptsImages: this.cachedMediaPropertyAcceptsImages,
            isRichText,
            lastLoadedFileError,
            dismissLastLoadedFileError: this.dismissLastLoadedFileError,
            onChange: supportsMedia ? this.onChangeHijacked : this.props.onChange,
            onRestore: supportsMedia ? this.onRestoreHijacked : this.props.onRestore,
            onInsertFile: this.onInsertFile,
            onInsertImage: this.onInsertImage,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryText;
