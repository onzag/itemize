"use strict";
/**
 * Contains fast prototyping utilities for fast developing
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlowLoadingElement = exports.ProgressingElement = void 0;
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../mui-core");
const util_1 = require("../../components/util");
require("./util.scss");
/**
 * The progressing element sytle for the progressing element
 */
const progressingElementStyle = mui_core_1.createStyles({
    progressWrapper: (props) => ({
        position: "relative",
        display: "inline-block",
        width: props.fullWidth ? "100%" : "auto",
    }),
    progressElement: (props) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -((props.progressCircleSize || 24) / 2),
        marginLeft: -((props.progressCircleSize || 24) / 2),
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
/**
 * Shows a loading circle on top of a component to show that such is loading
 * @param props the loading props
 * @returns a react component
 */
exports.ProgressingElement = mui_core_1.withStyles(progressingElementStyle)((props) => {
    const size = props.progressCircleSize || 24;
    return (react_1.default.createElement("div", { className: `${props.classes.progressWrapper} ${props.className ? props.className : ""}` },
        props.children,
        props.isProgressing ?
            react_1.default.createElement(util_1.DelayDisplay, { duration: props.delayDuration || 300 },
                react_1.default.createElement("div", { className: props.classes.cover },
                    react_1.default.createElement(mui_core_1.CircularProgress, { size: size, className: props.classes.progressElement }))) :
            null));
});
/**
 * Some elements can be fairly heavy and slow loading, this component will detach the execution of some of these components
 * so that they don't have to slow down the execution of other code, doesn't play nice with SSR
 */
class SlowLoadingElement extends react_1.default.Component {
    constructor(props) {
        super(props);
        /**
         * Becomes true once unmounted, avoid setState on
         * unmounted components if the element really takes a while
         * to load
         */
        this.unmounted = false;
        this.state = {
            isReady: false,
            readyForId: props.id || null,
        };
    }
    static getDerivedStateFromProps(props, state) {
        // basically if the id changes, we consider ourselves not ready anymore
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
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isReady && !prevState.isReady && this.props.onMount) {
            this.props.onMount();
        }
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
