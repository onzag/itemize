"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
class PropertySetter extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onEnforce(this.props.value, this.props.forId, this.props.forVersion);
    }
    componentDidUpdate(prevProps) {
        const idHasChanged = this.props.forId !== prevProps.forId ||
            (this.props.forVersion || null) !== (prevProps.forVersion || null);
        if (idHasChanged) {
            this.props.onClearEnforcement(prevProps.forId, prevProps.forVersion || null);
        }
        if (idHasChanged ||
            !deep_equal_1.default(prevProps.value, this.props.value)) {
            this.props.onEnforce(this.props.value, this.props.forId, this.props.forVersion);
        }
    }
    componentWillUnmount() {
        this.props.onClearEnforcement(this.props.forId, this.props.forVersion);
    }
    render() {
        return null;
    }
}
exports.default = PropertySetter;
