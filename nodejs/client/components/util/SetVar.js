"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
class SetVar extends react_1.default.Component {
    static addListener(id, listener) {
        if (!SetVar.VAR_LISTENER_REGISTRY[id]) {
            SetVar.VAR_LISTENER_REGISTRY[id] = [];
        }
        if (SetVar.VAR_LISTENER_REGISTRY[id].indexOf(listener) === -1) {
            SetVar.VAR_LISTENER_REGISTRY[id].push(listener);
        }
    }
    static removeListener(id, listener) {
        if (!SetVar.VAR_LISTENER_REGISTRY[id]) {
            return;
        }
        const index = SetVar.VAR_LISTENER_REGISTRY[id].indexOf(listener);
        if (index !== -1) {
            SetVar.VAR_LISTENER_REGISTRY[id].splice(index, 1);
        }
    }
    tickle(id) {
        const listeners = SetVar.VAR_LISTENER_REGISTRY[id];
        if (listeners && listeners.length) {
            listeners.forEach((l) => l());
        }
    }
    componentDidMount() {
        SetVar.VAR_REGISTRY[this.props.id] = this.props.value;
        this.tickle(this.props.id);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.id !== this.props.id) {
            delete SetVar.VAR_REGISTRY[this.props.id];
            SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
            this.tickle(this.props.id);
            this.tickle(nextProps.id);
        }
        else if (!deep_equal_1.default(nextProps.value, this.props.value)) {
            SetVar.VAR_REGISTRY[nextProps.id] = nextProps.value;
            this.tickle(nextProps.id);
        }
        return false;
    }
    componentWillUnmount() {
        delete SetVar.VAR_REGISTRY[this.props.id];
        this.tickle(this.props.id);
    }
    render() {
        return null;
    }
}
exports.default = SetVar;
SetVar.VAR_REGISTRY = {};
SetVar.VAR_LISTENER_REGISTRY = {};
