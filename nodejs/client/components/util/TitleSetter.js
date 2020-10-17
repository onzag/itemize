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
exports.ActualTitleSetter = void 0;
const react_1 = __importDefault(require("react"));
const RootRetriever_1 = __importDefault(require("../root/RootRetriever"));
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
class ActualTitleSetter extends react_1.default.Component {
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
            ActualTitleSetter.changedListeners.forEach((listener) => listener());
        }
    }
    componentDidUpdate(prevProps) {
        // change the title if we have different titles
        if ((prevProps.children || "") !== (this.props.children || "")) {
            document.title = this.props.children || "";
            ActualTitleSetter.changedListeners.forEach((listener) => listener());
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
exports.ActualTitleSetter = ActualTitleSetter;
/**
 * Stores title readers to inform them of changes
 */
ActualTitleSetter.changedListeners = new Map();
/**
 * The title setter allows to set the title of the application dinamically
 *
 * If set in the og mode it will not do anything and it does not update the og
 * dinamically, only the document or both mode does it; the og mode is for server
 * use only
 */
class TitleSetter extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (typeof document === "undefined") {
            return (react_1.default.createElement(RootRetriever_1.default, null, (arg) => {
                if (this.props.type === "og" || !this.props.type || this.props.type === "both") {
                    arg.root.setStateKey("ogTitle", this.props.children);
                }
                if (this.props.type === "document" || !this.props.type || this.props.type === "both") {
                    arg.root.setStateKey("title", this.props.children);
                }
                return null;
            }));
        }
        else if (!this.props.type || this.props.type !== "og") {
            return (react_1.default.createElement(ActualTitleSetter, Object.assign({}, this.props)));
        }
        return null;
    }
}
exports.default = TitleSetter;
