"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const gql_client_util_1 = require("../../../../client/internal/gql-client-util");
;
class PropertyViewReference extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStrValue: "",
            currentFindError: null,
        };
        this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
    }
    componentDidMount() {
        const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        const internalValue = !this.props.useAppliedValue || (this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value) ? this.props.state.internalValue : null;
        if (value &&
            !internalValue) {
            const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
            this.findCurrentStrValue(this.props.state.value, filterByLanguage ? this.props.language : null);
        }
    }
    getSpecialData() {
        const modPath = this.props.property.getSpecialProperty("referencedModule");
        if (!modPath) {
            throw new Error("For usage with references you must specify a referencedModule special property for " + this.props.property.getId());
        }
        const idefPath = this.props.property.getSpecialProperty("referencedItemDefinition");
        if (!idefPath) {
            throw new Error("For usage with references you must specify a referencedItemDefinition special property for " + this.props.property.getId());
        }
        const searchProp = this.props.property.getSpecialProperty("referencedSearchProperty");
        if (!searchProp) {
            throw new Error("For usage with references you must specify a referencedSearchProperty special property for " + this.props.property.getId());
        }
        const displayProp = this.props.property.getSpecialProperty("referencedDisplayProperty");
        if (!displayProp) {
            throw new Error("For usage with references you must specify a referencedDisplayProperty special property for " + this.props.property.getId());
        }
        const root = this.props.property.getParentModule().getParentRoot();
        const mod = root.getModuleFor(modPath.split("/"));
        const idef = mod.getItemDefinitionFor(idefPath.split("/"));
        const dProp = idef.getPropertyDefinitionFor(displayProp, true);
        const sProp = idef.getPropertyDefinitionFor(searchProp, true);
        return [idef, dProp, sProp];
    }
    getSSRFoundValue(forId, forVersion) {
        if (!forId || !this.props.ssr) {
            return null;
        }
        const [idef, dProp] = this.getSpecialData();
        const match = this.props.ssr.queries.find((v) => v.idef === idef.getQualifiedPathName() && v.id === forId && v.version === forVersion);
        if (!match) {
            return null;
        }
        const pMatch = match.value && match.value.DATA && match.value.DATA[dProp.getId()];
        if (!pMatch) {
            return null;
        }
        return pMatch.toString();
    }
    async findCurrentStrValue(forId, forVersion) {
        if (this.currentlyFindingValueFor &&
            this.currentlyFindingValueFor[0] === forId &&
            this.currentlyFindingValueFor[1] === forVersion) {
            return;
        }
        const ssrValue = this.getSSRFoundValue(forId, forVersion);
        if (ssrValue) {
            this.setState({
                currentStrValue: ssrValue,
            });
            return;
        }
        this.currentlyFindingValueFor = [forId, forVersion];
        const [idef, dProp] = this.getSpecialData();
        const fields = {
            DATA: {
                [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {},
            }
        };
        const result = await gql_client_util_1.runGetQueryFor({
            args: {},
            fields,
            returnMemoryCachedValues: false,
            returnWorkerCachedValues: false,
            returnWorkerCachedValuesIfNoInternet: true,
            language: this.props.language,
            id: forId,
            version: null,
            cacheStore: false,
            token: this.props.token,
            itemDefinition: idef,
        });
        if (result.error) {
            this.setState({
                currentFindError: result.error,
            });
            return;
        }
        this.setState({
            currentFindError: null,
        });
        const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
        if (!pMatch) {
            return;
        }
        this.setState({
            currentStrValue: pMatch.toString(),
        });
    }
    componentDidUpdate(prevProps) {
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        const internalValue = !this.props.useAppliedValue || (this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value) ? this.props.state.internalValue : null;
        if (value &&
            !internalValue) {
            this.findCurrentStrValue(value, filterByLanguage ? this.props.language : null);
        }
        else if (filterByLanguage &&
            value &&
            prevProps.language !== this.props.language) {
            this.findCurrentStrValue(value, this.props.language);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && this.props.state.value !== nextProps.state.value) ||
            (this.props.useAppliedValue && this.props.state.stateAppliedValue !== nextProps.state.stateAppliedValue) ||
            !!this.props.rtl !== !!nextProps.rtl ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.capitalize !== this.props.capitalize ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        let i18nData = null;
        let nullValueLabel = null;
        if (this.props.property && this.props.property.hasSpecificValidValues()) {
            i18nData = this.props.property.getI18nDataFor(this.props.language);
            nullValueLabel = this.props.property.isNullable() ?
                i18nData && i18nData.null_value : null;
        }
        const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        const internalValue = !this.props.useAppliedValue || (this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value) ? this.props.state.internalValue : null;
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        const currentValue = (value === null || isNaN(value)) ?
            nullValueLabel :
            (internalValue ||
                this.state.currentStrValue ||
                this.getSSRFoundValue(this.props.state.value, filterByLanguage ? this.props.language : null) || "");
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            language: this.props.language,
            currentValue,
            capitalize: !!this.props.capitalize,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyViewReference;
