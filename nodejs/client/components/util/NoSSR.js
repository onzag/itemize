"use strict";
/**
 * Allows to disable SSR to a given section of code, only takes into effect
 * if the server detects SSR is being used otherwise will render normally
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ssr_provider_1 = require("../../internal/providers/ssr-provider");
/**
 * The actual class for no ssr that performs the double pass
 * the original no ssr only uses this class if it considers itself
 * in a SSR context
 */
class ActualNoSSR extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shouldRender: false,
        };
    }
    componentDidMount() {
        this.setState({
            shouldRender: true,
        });
    }
    render() {
        if (this.state.shouldRender) {
            return this.props.children;
        }
        return null;
    }
}
/**
 * This SSR disabler is clever, if you are in a non-ssr context it will render
 * immediately, however if you are in a SSR enabled context then it will use a double
 * pass, this will ensure things are in sync
 * @param props the props
 */
function NoSSR(props) {
    return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssr) => {
        // we are in a SSR enabled context, we need to use double pass for this
        if (ssr) {
            return react_1.default.createElement(ActualNoSSR, Object.assign({}, props));
        }
        else {
            return props.children;
        }
    }));
}
exports.default = NoSSR;
