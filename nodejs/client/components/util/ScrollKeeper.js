"use strict";
/**
 * Allows for fine control of the scroll position using
 * react, as it keeps it based on the same id
 *
 * it's a memory leaky implementation but should do just fine
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * The stored scrolls by id
 */
const MEMORY_SCROLLS = {};
/**
 * The scroll keeper allows to keep the scroll on position 0 or on a stored
 * position
 */
class ScrollKeeper extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }
    recalculateScroll() {
        // so we recalculate where we should be scrolled
        let scrollTop = 0;
        if (this.props.mantainPosition) {
            // if we are mantaining the old position we try this
            scrollTop = MEMORY_SCROLLS[this.props.id] || 0;
        }
        document.body.scrollTop = scrollTop;
    }
    onScroll() {
        // when we scroll we might need to store this last
        // position if we are asked to
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
