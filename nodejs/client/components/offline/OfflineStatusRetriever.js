"use strict";
/**
 * Allows to create conditional rendering for when the app is offline
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
const TIME_WHEN_SRC_LOADED = (new Date()).getTime();
/**
 * The class, which actualy uses a standard component
 * and shouldComponentUpdate
 */
class ActualOfflineStatusRetriever extends react_1.default.Component {
    constructor(props) {
        super(props);
        // so we initially get the state from the remote listener
        // note how we check for the remote listener itself, as it can be undefined
        // if we happen to be on the server side
        this.state = {
            // so there's a lot of unwrap it, the reason why offline is false in the server side
            // via SSR is that if you got the resource via the server, you must be online
            offline: this.props.remoteListener ? this.props.remoteListener.isOffline() : false,
            // now whether you can accept the conclusion, if you fetch this from the server side you accept it right away
            // otherwise it depends, if when this loaded and the app started to execute, there have been 3 seconds in total
            // since the app loaded, then the conclusion must be valid, the socket hasn't connected in 3 seconds
            // something has gone wrong, this mainly applies for components that have been added later on
            canAcceptConclusion: this.props.remoteListener ? TIME_WHEN_SRC_LOADED - (new Date()).getTime() > 3000 : true,
        };
        // and then add the a on connection status change
        this.onConnectionStatusChange = this.onConnectionStatusChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // only if the children and the conclusion changes, of both the offline state and whether
        // we can accept such conclusion, we accept it
        return nextProps.children !== this.props.children ||
            (nextState.offline && nextState.canAcceptConclusion) !== (this.state.offline && this.state.canAcceptConclusion);
    }
    /**
     * when the mount event happens
     */
    componentDidMount() {
        // we first take some time and wait 1 second, for the user
        // to be connected, since the remote listener is offline until
        // it is connected, and we don't want offline status retriever to show
        // when the app is online, we wait 1 second to show
        setTimeout(() => {
            this.setState({
                canAcceptConclusion: true,
            });
        }, 1000);
        // and add the listener to listen for changes
        this.props.remoteListener.addConnectStatusListener(this.onConnectionStatusChange);
    }
    componentWillUnmount() {
        // remove the listener
        this.props.remoteListener.removeConnectStatusListener(this.onConnectionStatusChange);
    }
    onConnectionStatusChange() {
        this.setState({
            offline: this.props.remoteListener.isOffline(),
        });
    }
    render() {
        return this.props.children(this.state.offline && this.state.canAcceptConclusion);
    }
}
/**
 * Allows to check for the offline status of the application, there's a time of grace
 * as it assumes the application is online
 * @param props the props
 * @returns a react component
 */
function OfflineStatusRetriever(props) {
    return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualOfflineStatusRetriever, Object.assign({}, props, { remoteListener: data.remoteListener })))));
}
exports.default = OfflineStatusRetriever;
