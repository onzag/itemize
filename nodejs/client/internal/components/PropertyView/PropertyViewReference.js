"use strict";
/**
 * Contains the view handler for the reference
 * subtype, aka integer/reference
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const gql_client_util_1 = require("../../../../client/internal/gql-client-util");
/**
 * The property view reference handler, note how unlike most
 * other handlers this handler uses the property view simple renderer
 * in order to render its value
 */
class PropertyViewReference extends react_1.default.Component {
    constructor(props) {
        super(props);
        /**
         * First we start with this state, note how the current str value is null
         * but despite of that we will be able to retrieve the ssr value if found
         */
        this.state = {
            currentStrValue: "",
            currentFindError: null,
        };
        // find the current string value
        this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
    }
    componentDidMount() {
        // first we ge the current value
        const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        // also the internal value, which is assigned by an entry,
        // but the internal value is only relevant if we are not
        // using the applied value 
        const internalValue = 
        // so if not applied value or we are using an applied value and that is equal to the current value
        // then we can use our internal value
        !this.props.useAppliedValue || (this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value) ? this.props.state.internalValue : null;
        // so if we got a value and not an internal value
        // as the internal value will be used otherwise
        if (value &&
            !internalValue) {
            // we can call the find function that will set the current str value
            const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
            this.findCurrentStrValue(this.props.state.value, filterByLanguage ? this.props.language : null);
        }
    }
    /**
     * Provides the special data for the reference
     * @returns an array where 0 is the item definition that is target, 1 is the property definition
     * we are using for display
     */
    getSpecialData() {
        const modPath = this.props.property.getSpecialProperty("referencedModule");
        if (!modPath) {
            throw new Error("For usage with references you must specify a referencedModule special property for " + this.props.property.getId());
        }
        const idefPath = this.props.property.getSpecialProperty("referencedItemDefinition");
        if (!idefPath) {
            throw new Error("For usage with references you must specify a referencedItemDefinition special property for " + this.props.property.getId());
        }
        const displayProp = this.props.property.getSpecialProperty("referencedDisplayProperty");
        if (!displayProp) {
            throw new Error("For usage with references you must specify a referencedDisplayProperty special property for " + this.props.property.getId());
        }
        const root = this.props.property.getParentModule().getParentRoot();
        const mod = root.getModuleFor(modPath.split("/"));
        const idef = mod.getItemDefinitionFor(idefPath.split("/"));
        const dProp = idef.getPropertyDefinitionFor(displayProp, true);
        return [idef, dProp];
    }
    /**
     * Provides the SSR found value if any found and if SSR active
     * @param forId for the given id
     * @param forVersion for the given version
     * @returns a string value or null if nothing found
     */
    getSSRFoundValue(forId, forVersion) {
        if (!forId || !this.props.ssr) {
            return null;
        }
        // we get our special data
        const [idef, dProp] = this.getSpecialData();
        // and try to find a match in the queries that do fit our id and version
        const match = this.props.ssr.queries.find((v) => v.idef === idef.getQualifiedPathName() && v.id === forId && v.version === forVersion);
        // if no match we return null
        if (!match) {
            return null;
        }
        // we try to find the property value of the display property in the data
        const pMatch = match.value && match.value.DATA && match.value.DATA[dProp.getId()];
        // otherwise null
        if (!pMatch) {
            return null;
        }
        return pMatch.toString();
    }
    /**
     * Finds the current string value for the given id and version
     * @param forId
     * @param forVersion
     */
    async findCurrentStrValue(forId, forVersion) {
        // avoid if currently searching for the same thing
        if (this.currentlyFindingValueFor &&
            this.currentlyFindingValueFor[0] === forId &&
            this.currentlyFindingValueFor[1] === forVersion) {
            return;
        }
        // try to find it from the SSR
        const ssrValue = this.getSSRFoundValue(forId, forVersion);
        // if there set the state to that
        if (ssrValue) {
            this.setState({
                currentStrValue: ssrValue,
            });
            return;
        }
        // now we are currently finding the value for this
        this.currentlyFindingValueFor = [forId, forVersion];
        // get these
        const [idef, dProp] = this.getSpecialData();
        // and let's build the fields we are needing for it
        const fields = {
            DATA: {
                [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {},
            }
        };
        // and now we can run a get query for it
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
            token: this.props.tokenData.token,
            itemDefinition: idef,
            waitAndMerge: true,
        });
        if (this.currentlyFindingValueFor &&
            this.currentlyFindingValueFor[0] === forId &&
            this.currentlyFindingValueFor[1] === forVersion) {
            // if there's an error
            if (result.error) {
                this.setState({
                    currentFindError: result.error,
                });
                return;
            }
            // otherwise remove an older error
            this.setState({
                currentFindError: null,
            });
            // get the specific property
            const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
            if (!pMatch) {
                return;
            }
            // and set the state to that
            this.setState({
                currentStrValue: pMatch.toString(),
            });
            this.currentlyFindingValueFor = null;
        }
    }
    componentDidUpdate(prevProps) {
        // we need to know if we are filtering by language
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        // the current value we have
        const value = (this.props.useAppliedValue ? this.props.state.stateAppliedValue : this.props.state.value);
        const oldValue = (prevProps.useAppliedValue ? prevProps.state.stateAppliedValue : prevProps.state.value);
        // and equally there might be an internal value already set by an entry which represents the value
        // for this thing, if there's one, let's use that value rather than anything else
        const internalValue = !this.props.useAppliedValue || (this.props.useAppliedValue && this.props.state.stateAppliedValue === this.props.state.value) ? this.props.state.internalValue : null;
        // if there's a value and there's no internal value
        if (value &&
            !internalValue &&
            oldValue !== value) {
            // then we attempt to find
            this.findCurrentStrValue(value, filterByLanguage ? this.props.language : null);
            // we will also do the same thing, if the language
            // changes
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
