"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
let TitleSetterInstanceIsLoaded = false;
class TitleSetter extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (TitleSetterInstanceIsLoaded) {
            throw new Error("Two instances of TitleSetter have been loaded at once, this is not allowed");
        }
        TitleSetterInstanceIsLoaded = true;
        this.originalTitle = document.title;
        document.title = this.props.children || "";
        if (this.originalTitle !== document.title) {
            TitleSetter.changedListeners.forEach((listener) => listener());
        }
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.children || "") !== (this.props.children || "")) {
            document.title = this.props.children || "";
            TitleSetter.changedListeners.forEach((listener) => listener());
        }
    }
    componentWillUnmount() {
        document.title = this.originalTitle;
        TitleSetterInstanceIsLoaded = false;
    }
    render() {
        return null;
    }
}
exports.default = TitleSetter;
TitleSetter.changedListeners = new Map();
