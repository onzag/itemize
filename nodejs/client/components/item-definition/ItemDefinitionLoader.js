"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
class ActualItemDefinitionLoader extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
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
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
function ItemDefinitionLoader(props) {
    return (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualItemDefinitionLoader, Object.assign({}, props, { itemDefinitionContext: itemDefinitionContext })))));
}
exports.default = ItemDefinitionLoader;
