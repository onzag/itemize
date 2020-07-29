"use strict";
/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * keeps track of invalid two instances
 */
let TitleSetterInstanceIsLoaded = false;
/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 *
 * Do not have two title setters at once as this would cause an error
 */
class TitleSetter extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (TitleSetterInstanceIsLoaded) {
            throw new Error("Two instances of TitleSetter have been loaded at once, this is not allowed");
        }
        // we mark it as loaded
        TitleSetterInstanceIsLoaded = true;
        // store the original title of the app (which is more often than not the app title)
        this.originalTitle = document.title;
        document.title = this.props.children || "";
        if (this.originalTitle !== document.title) {
            TitleSetter.changedListeners.forEach((listener) => listener());
        }
    }
    componentDidUpdate(prevProps) {
        // change the title if we have different titles
        if ((prevProps.children || "") !== (this.props.children || "")) {
            document.title = this.props.children || "";
            TitleSetter.changedListeners.forEach((listener) => listener());
        }
    }
    componentWillUnmount() {
        // restore the title
        document.title = this.originalTitle;
        // no more loaded
        TitleSetterInstanceIsLoaded = false;
    }
    render() {
        // retuns nothing
        return null;
    }
}
exports.default = TitleSetter;
/**
 * Stores title readers to inform them of changes
 */
TitleSetter.changedListeners = new Map();
