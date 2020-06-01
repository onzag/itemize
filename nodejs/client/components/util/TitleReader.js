"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TitleSetter_1 = __importDefault(require("./TitleSetter"));
class TitleReader extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        TitleSetter_1.default.changedListeners.set(this, this.forceUpdate.bind(this));
    }
    componentWillUnmount() {
        TitleSetter_1.default.changedListeners.delete(this);
    }
    render() {
        return document.title;
    }
}
exports.default = TitleReader;
