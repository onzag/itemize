"use strict";
/**
 * This is the include callout warning handler that handles how the include callout warning
 * is supposed to be shown
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Include_1 = require("../../../../base/Root/Module/ItemDefinition/Include");
const locale_provider_1 = require("../../providers/locale-provider");
const renderer_1 = require("../../../providers/renderer");
const deep_equal_1 = __importDefault(require("deep-equal"));
class ActualIncludeCalloutHandlerWarning extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.locale.language !== this.props.locale.language ||
            nextProps.locale.rtl !== this.props.locale.rtl ||
            nextProps.include !== this.props.include ||
            nextProps.renderer !== this.props.renderer ||
            !deep_equal_1.default(nextProps.rendererArgs, this.props.rendererArgs) ||
            nextProps.state.exclusionState !== this.props.state.exclusionState;
    }
    render() {
        let warning = this.props.include.getI18nDataFor(this.props.locale.language).callout_excluded_label;
        let active = this.props.include.isExclusionCallout() &&
            this.props.state.exclusionState === Include_1.IncludeExclusionState.EXCLUDED;
        const RendererElement = this.props.renderer;
        const rendererProps = {
            warning,
            active,
            args: this.props.rendererArgs,
            rtl: this.props.locale.rtl,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererProps));
    }
}
function IncludeCalloutWarning(props) {
    // Build the context and render sending the right props
    if (props.renderer) {
        return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (locale) => react_1.default.createElement(ActualIncludeCalloutHandlerWarning, Object.assign({}, props, { locale: locale, renderer: props.renderer, rendererArgs: props.rendererArgs || {} }))));
    }
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (locale) => react_1.default.createElement(ActualIncludeCalloutHandlerWarning, Object.assign({}, props, { locale: locale, renderer: renderers.IncludeCalloutWarning, rendererArgs: props.rendererArgs || {} })))));
}
exports.default = IncludeCalloutWarning;
