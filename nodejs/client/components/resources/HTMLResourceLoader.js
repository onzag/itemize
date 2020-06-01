"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class HTMLResourceLoader extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: null,
            loading: false,
            failed: false,
        };
    }
    async load() {
        this.setState({
            htmlContent: null,
            failed: false,
            loading: false,
        });
        if (this.props.src === null) {
            return;
        }
        const waitTimeoutForLoading = setTimeout(() => {
            this.setState({
                loading: true,
            });
        }, 600);
        try {
            const htmlFetchResponse = await fetch("/rest/resource/" + this.props.src, {
                headers: {
                    "sw-cacheable": "true",
                },
            });
            if (htmlFetchResponse.status !== 200 &&
                htmlFetchResponse.status !== 0) {
                throw new Error("Invalid status code");
            }
            const htmlContent = await htmlFetchResponse.text();
            clearTimeout(waitTimeoutForLoading);
            this.setState({
                htmlContent,
                loading: false,
                failed: false,
            });
        }
        catch (err) {
            clearTimeout(waitTimeoutForLoading);
            this.setState({
                htmlContent: null,
                loading: false,
                failed: true,
            });
        }
    }
    componentDidMount() {
        this.load();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.src !== this.props.src) {
            this.load();
        }
    }
    render() {
        if (this.state.loading && this.props.loadingComponent) {
            return this.props.loadingComponent;
        }
        else if (this.state.failed && this.props.failedComponent) {
            return this.props.failedComponent;
        }
        const WrapperComponent = this.props.wrapper || "div";
        return (react_1.default.createElement(WrapperComponent, { className: this.props.wrapperClassName, dangerouslySetInnerHTML: { __html: this.state.htmlContent } }));
    }
}
exports.default = HTMLResourceLoader;
