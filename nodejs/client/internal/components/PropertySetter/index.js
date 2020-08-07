"use strict";
/**
 * This contains the rather simple property setter component
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The property setter allows to manually set values for
 * properties, these then become readonly
 */
class PropertySetter extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // on mount we call the enforce
        this.props.onEnforce(this.props.value, this.props.forId || null, this.props.forVersion || null);
    }
    shouldComponentUpdate(nextProps) {
        // on update we check for the id
        const idHasChanged = (this.props.forId || null) !== (nextProps.forId || null) ||
            (this.props.forVersion || null) !== (nextProps.forVersion || null);
        // if such id has changed
        if (idHasChanged) {
            // we clear the enforcement
            this.props.onClearEnforcement(this.props.forId || null, this.props.forVersion || null);
        }
        // and if the slot id has changed or if the
        // new value does not match
        if (idHasChanged ||
            !deep_equal_1.default(nextProps.value, this.props.value)) {
            // we set the enforcement
            this.props.onEnforce(nextProps.value, nextProps.forId, nextProps.forVersion);
        }
        // this always returns null, never upates
        return false;
    }
    componentWillUnmount() {
        // we clear the enfocement on unmount
        this.props.onClearEnforcement(this.props.forId, this.props.forVersion);
    }
    render() {
        return null;
    }
}
exports.default = PropertySetter;
