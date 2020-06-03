"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
require("./util.scss");
class DelayDisplay extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shown: false,
        };
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                shown: true,
            });
        }, this.props.duration);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    render() {
        if (this.state.shown) {
            return this.props.children;
        }
        return null;
    }
}
exports.DelayDisplay = DelayDisplay;
const progressingElementStyle = core_1.createStyles({
    progressWrapper: (props) => ({
        position: "relative",
        display: "inline-block",
        width: props.fullWidth ? "100%" : "auto",
    }),
    progressElement: (props) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -((props.progressSize || 24) / 2),
        marginLeft: -((props.progressSize || 24) / 2),
    }),
    cover: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
    }
});
exports.ProgressingElement = core_1.withStyles(progressingElementStyle)((props) => {
    const size = props.progressSize || 24;
    return (react_1.default.createElement("div", { className: `${props.classes.progressWrapper} ${props.className ? props.className : ""}` },
        props.children,
        props.isProgressing ?
            react_1.default.createElement(DelayDisplay, { duration: props.delayDuration || 300 },
                react_1.default.createElement("div", { className: props.classes.cover },
                    react_1.default.createElement(core_1.CircularProgress, { size: size, className: props.classes.progressElement }))) :
            null));
});
class SlowLoadingElement extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.unmounted = false;
        this.state = {
            isReady: false,
            readyForId: props.id || null,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.id !== state.readyForId) {
            return {
                isReady: false,
                readyForId: props.id,
            };
        }
        return null;
    }
    makeReady() {
        if (this.state.isReady) {
            return;
        }
        setTimeout(() => {
            if (!this.unmounted) {
                this.setState({
                    isReady: true,
                });
            }
        }, 10);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isReady !== nextState.isReady ||
            nextProps.id !== this.props.id ||
            nextProps.children !== this.props.children;
    }
    componentDidMount() {
        this.makeReady();
    }
    componentDidUpdate() {
        this.makeReady();
    }
    componentWillUnmount() {
        this.unmounted = true;
    }
    render() {
        if (this.state.isReady) {
            return this.props.children;
        }
        else if (!this.props.inline) {
            return react_1.default.createElement("div", { className: "slow-loading-ring-wrapper" },
                react_1.default.createElement("div", { className: "slow-loading-ring" }));
        }
        else {
            return null;
        }
    }
}
exports.SlowLoadingElement = SlowLoadingElement;
