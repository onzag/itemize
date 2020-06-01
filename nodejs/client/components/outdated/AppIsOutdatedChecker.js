"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
class ActualAppIsOutdatedChecker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOutdated: false,
        };
        this.onAppUpdated = this.onAppUpdated.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.children !== this.props.children ||
            nextState.isOutdated !== this.state.isOutdated;
    }
    componentDidMount() {
        this.props.remoteListener.addAppUpdatedListener(this.onAppUpdated);
    }
    componentWillUnmount() {
        this.props.remoteListener.removeAppUpdatedListener(this.onAppUpdated);
    }
    onAppUpdated() {
        this.setState({
            isOutdated: this.props.remoteListener.isAppUpdated(),
        });
    }
    render() {
        return this.props.children(this.state.isOutdated);
    }
}
function AppIsOutdatedChecker(props) {
    return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualAppIsOutdatedChecker, Object.assign({}, props, { remoteListener: data.remoteListener })))));
}
exports.default = AppIsOutdatedChecker;
