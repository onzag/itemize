"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
class ActualOfflineStatusRetriever extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            offline: this.props.remoteListener.isOffline(),
        };
        this.onConnectionStatusChange = this.onConnectionStatusChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.children !== this.props.children ||
            nextState.offline !== this.state.offline;
    }
    componentDidMount() {
        this.props.remoteListener.addConnectStatusListener(this.onConnectionStatusChange);
    }
    componentWillUnmount() {
        this.props.remoteListener.removeConnectStatusListener(this.onConnectionStatusChange);
    }
    onConnectionStatusChange() {
        this.setState({
            offline: this.props.remoteListener.isOffline(),
        });
    }
    render() {
        return this.props.children(this.state.offline);
    }
}
function OfflineStatusRetriever(props) {
    return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualOfflineStatusRetriever, Object.assign({}, props, { remoteListener: data.remoteListener })))));
}
exports.default = OfflineStatusRetriever;
