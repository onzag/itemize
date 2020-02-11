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
        };
    }
    async load() {
        if (this.props.location === null || this.state.htmlContent !== null) {
            this.setState({
                htmlContent: null,
            });
            if (this.props.location === null) {
                return;
            }
        }
        try {
            const htmlContent = await fetch("/rest/resource/" + this.props.location).then((v) => v.text());
            this.setState({
                htmlContent,
            });
        }
        catch (err) {
            // DO NOTHING
        }
    }
    componentDidMount() {
        this.load();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.load();
        }
    }
    render() {
        const WrapperComponent = this.props.wrapper || "div";
        return (<WrapperComponent className={this.props.wrapperClassName} dangerouslySetInnerHTML={{ __html: this.state.htmlContent }}/>);
    }
}
exports.default = HTMLResourceLoader;
