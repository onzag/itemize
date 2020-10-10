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
const item_1 = require("../../providers/item");
/**
 * Class that actually does the item definition loader conditional logic and optimizes
 */
class ActualItemLoader extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        // so we only render if any of our logical rendering attributes differ
        return nextProps.itemContext.loadError !== this.props.itemContext.loadError ||
            nextProps.children !== this.props.children ||
            nextProps.itemContext.blocked !== this.props.itemContext.blocked ||
            nextProps.itemContext.blockedButDataAccessible !==
                this.props.itemContext.blockedButDataAccessible ||
            nextProps.itemContext.notFound !== this.props.itemContext.notFound ||
            nextProps.itemContext.loading !== this.props.itemContext.loading ||
            nextProps.itemContext.loaded !== this.props.itemContext.loaded;
    }
    render() {
        return this.props.children({
            loaded: this.props.itemContext.loaded,
            loading: this.props.itemContext.loading,
            notFound: this.props.itemContext.notFound,
            blocked: this.props.itemContext.blocked,
            hasBlockedAccess: this.props.itemContext.blockedButDataAccessible,
            error: this.props.itemContext.loadError,
            reload: this.props.itemContext.reload,
        });
    }
}
/**
 * The item definition loader component allows for conditional rendering depending on the
 * fact on the state of the item definition value itself, allows for many types of
 * rendering conditions depending on the loading state, should use mostly if a forId
 * is specified as that requires loading
 */
function ItemLoader(props) {
    return (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContext) => (react_1.default.createElement(ActualItemLoader, Object.assign({}, props, { itemContext: itemContext })))));
}
exports.default = ItemLoader;
