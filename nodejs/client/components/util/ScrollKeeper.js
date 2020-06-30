"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MEMORY_SCROLLS = {};
class ScrollKeeper extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }
    recalculateScroll() {
        let scrollTop = 0;
        if (this.props.mantainPosition) {
            scrollTop = MEMORY_SCROLLS[this.props.id] || 0;
        }
        document.body.scrollTop = scrollTop;
    }
    onScroll() {
        if (this.props.mantainPosition) {
            MEMORY_SCROLLS[this.props.id] = document.body.scrollTop;
        }
    }
    addEventListenerForScroll() {
        document.body.addEventListener("scroll", this.onScroll);
    }
    removeEventListenerForScroll() {
        document.body.removeEventListener("scroll", this.onScroll);
    }
    componentDidMount() {
        if (this.props.mantainPosition) {
            this.addEventListenerForScroll();
        }
        this.recalculateScroll();
    }
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.recalculateScroll();
            if (this.props.mantainPosition && !prevProps.mantainPosition) {
                this.addEventListenerForScroll();
            }
            else if (prevProps.mantainPosition && !this.props.mantainPosition) {
                this.removeEventListenerForScroll();
            }
        }
    }
    componentWillUnmount() {
        this.removeEventListenerForScroll();
    }
    render() {
        return this.props.children;
    }
}
exports.default = ScrollKeeper;
