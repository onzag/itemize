"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SetVar_1 = __importDefault(require("./SetVar"));
class ReadManyVar extends react_1.default.PureComponent {
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
        this.props.ids.forEach((id) => {
            SetVar_1.default.addListener(id, this.onTickled);
        });
    }
    componentDidUpdate(prevProps) {
        const idsAdded = this.props.ids.filter((id) => !prevProps.ids.includes(id));
        const idsRemoved = prevProps.ids.filter((id) => !this.props.ids.includes(id));
        idsAdded.forEach((id) => {
            SetVar_1.default.addListener(id, this.onTickled);
        });
        idsRemoved.forEach((id) => {
            SetVar_1.default.removeListener(id, this.onTickled);
        });
        if (idsAdded.length || idsRemoved.length) {
            this.forceUpdate();
        }
    }
    componentWillUnmount() {
        this.isUnmounted = true;
    }
    render() {
        return this.props.children(this.props.ids.map((id) => SetVar_1.default.VAR_REGISTRY[id]));
    }
}
exports.default = ReadManyVar;
