"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SetVar_1 = __importDefault(require("./SetVar"));
class ReadVar extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.isUnmounted = false;
        this.onTickled = this.onTickled.bind(this);
    }
    onTickled() {
        if (!this.isUnmounted) {
            this.forceUpdate();
        }
    }
    componentDidMount() {
        SetVar_1.default.addListener(this.props.id, this.onTickled);
    }
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            SetVar_1.default.removeListener(prevProps.id, this.onTickled);
            SetVar_1.default.addListener(this.props.id, this.onTickled);
            this.forceUpdate();
        }
    }
    componentWillUnmount() {
        this.isUnmounted = true;
    }
    render() {
        return this.props.children(SetVar_1.default.VAR_REGISTRY[this.props.id]);
    }
}
exports.default = ReadVar;
