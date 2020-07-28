"use strict";
/**
 * Allows the application to know when it's outdated as a new version
 * with a different buildnumber has been launched, this usually means
 * the client loses connection and then reconnects realizing
 * the backend and the frontend don't match anymore and an updated
 * needs to be installed
 *
 * many things happen during an update, cleaning of the service workers cache,
 * and refreshing the app
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
/**
 * The actual class that really performs the logic
 * for outdated checking
 */
class ActualAppIsOutdatedChecker extends react_1.default.Component {
    constructor(props) {
        super(props);
        // due to SSR we cant use the remote listener here but we wait for it in mount
        // however clearly if the server is rendering this, it's not going to be
        // outdated
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
        this.setState({
            isOutdated: this.props.remoteListener.isAppUpdated(),
        });
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
/**
 * The app is outated checker provides information on an outdated application that requires
 * a reload (refresh) for it to be updated
 * @param props the props for outated checking
 * @returns a react component
 */
function AppIsOutdatedChecker(props) {
    return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(ActualAppIsOutdatedChecker, Object.assign({}, props, { remoteListener: data.remoteListener })))));
}
exports.default = AppIsOutdatedChecker;
