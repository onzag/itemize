"use strict";
/**
 * Provides an item definition loader component that allows for functionality
 * regarding notFound, blocked, data accessible, loading, loaded, etc... with
 * conditional rendering
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
/**
 * Class that actually does the item definition loader conditional logic and optimizes
 */
class ActualItemDefinitionLoader extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // so we only render if any of our logical rendering attributes differ
        return nextProps.itemDefinitionContext.loadError !== this.props.itemDefinitionContext.loadError ||
            nextProps.children !== this.props.children ||
            nextProps.itemDefinitionContext.blocked !== this.props.itemDefinitionContext.blocked ||
            nextProps.itemDefinitionContext.blockedButDataAccessible !==
                this.props.itemDefinitionContext.blockedButDataAccessible ||
            nextProps.itemDefinitionContext.notFound !== this.props.itemDefinitionContext.notFound ||
            nextProps.itemDefinitionContext.loading !== this.props.itemDefinitionContext.loading ||
            nextProps.itemDefinitionContext.loaded !== this.props.itemDefinitionContext.loaded;
    }
    render() {
        return this.props.children({
            loaded: this.props.itemDefinitionContext.loaded,
            loading: this.props.itemDefinitionContext.loading,
            notFound: this.props.itemDefinitionContext.notFound,
            blocked: this.props.itemDefinitionContext.blocked,
            hasBlockedAccess: this.props.itemDefinitionContext.blockedButDataAccessible,
            error: this.props.itemDefinitionContext.loadError,
            reload: this.props.itemDefinitionContext.reload,
        });
    }
}
/**
 * The item definition loader component allows for conditional rendering depending on the
 * fact on the state of the item definition value itself, allows for many types of
 * rendering conditions depending on the loading state, should use mostly if a forId
 * is specified as that requires loading
 */
function ItemDefinitionLoader(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualItemDefinitionLoader, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = ItemDefinitionLoader;
