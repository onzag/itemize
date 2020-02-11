"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../internal/app");
exports.ModuleContext = react_1.default.createContext(null);
class ActualModuleProvider extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.mod !== nextProps.mod ||
            this.props.children !== nextProps.children ||
            this.props.root !== nextProps.root ||
            this.props.remoteListener !== nextProps.remoteListener;
    }
    render() {
        return (<exports.ModuleContext.Provider value={{
            mod: this.props.root.getModuleFor(this.props.mod.split("/")),
            remoteListener: this.props.remoteListener,
        }}>
        {this.props.children}
      </exports.ModuleContext.Provider>);
    }
}
function ModuleProvider(props) {
    return (<app_1.DataContext.Consumer>
      {(data) => {
        return (<ActualModuleProvider root={data.value} mod={props.module} remoteListener={data.remoteListener}>
              {props.children}
            </ActualModuleProvider>);
    }}
    </app_1.DataContext.Consumer>);
}
exports.ModuleProvider = ModuleProvider;
