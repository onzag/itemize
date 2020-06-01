"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const supportsImageLoading = !!document.createElement("img").loading;
class PropertyViewFileRenderer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.isScrollEventAttached = false;
        this.refImg = react_1.default.createRef();
        // loaded represents the properties src and srcset when using native
        // image loading it's unecessary to have them removed as the browser
        // will handle it natively
        this.state = {
            loaded: props.args.lazyLoad && !supportsImageLoading ? false : true,
        };
    }
    attachScrollEvent() {
        if (!this.isScrollEventAttached) {
            this.isScrollEventAttached = true;
            document.body.addEventListener("scroll", this.checkWhetherInViewOldSchool);
        }
    }
    removeScrollEvent() {
        if (this.isScrollEventAttached) {
            this.isScrollEventAttached = false;
            document.body.removeEventListener("scroll", this.checkWhetherInViewOldSchool);
        }
    }
    checkWhetherInViewOldSchool() {
        const bounding = this.refImg.current.getBoundingClientRect();
        const isInView = (bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
        if (isInView) {
            this.setState({ loaded: true });
            this.removeScrollEvent();
        }
        else {
            this.attachScrollEvent();
        }
    }
    setupIntersectionObserver() {
        const target = this.refImg.current;
        if (!target) {
            this.setState({
                loaded: true,
            });
            return;
        }
        this.io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.setState({
                        loaded: true,
                    });
                    this.io.unobserve(target);
                    this.io.disconnect();
                }
            });
        });
        this.io.observe(target);
    }
    removeIntersectionObserver() {
        if (this.io) {
            this.io.disconnect();
        }
    }
    componentDidMount() {
        if (this.props.args.lazyLoad) {
            if (!window.IntersectionObserver && !supportsImageLoading) {
                this.checkWhetherInViewOldSchool();
            }
            else if (window.IntersectionObserver && !supportsImageLoading) {
                this.setupIntersectionObserver();
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.args.lazyLoad && !prevProps.args.lazyLoad && !this.state.loaded) {
            if (!window.IntersectionObserver && !supportsImageLoading) {
                this.checkWhetherInViewOldSchool();
            }
            else if (window.IntersectionObserver && !supportsImageLoading) {
                this.setupIntersectionObserver();
            }
        }
    }
    componentWillUnmount() {
        this.removeScrollEvent();
        this.removeIntersectionObserver();
    }
    render() {
        if (!this.props.currentValue) {
            return null;
        }
        if (this.props.isSupportedImage) {
            const imageClassName = this.props.args.imageClassName;
            const imageSizes = this.props.args.imageSizes || "70vw";
            return (react_1.default.createElement("img", { ref: this.refImg, srcSet: !this.state.loaded ? null : this.props.imageSrcSet, sizes: imageSizes, src: !this.state.loaded ? null : this.props.currentValue.url, className: imageClassName, loading: this.props.args.lazyLoad && supportsImageLoading ? "lazy" : null }));
        }
        return (react_1.default.createElement("span", { className: "file", onClick: this.props.openFile.bind(null, this.props.currentValue) },
            react_1.default.createElement("span", { className: "file-container" },
                react_1.default.createElement("span", { className: "file-icon" },
                    react_1.default.createElement("span", { className: "file-extension" }, this.props.extension)),
                react_1.default.createElement("span", { className: "file-name" }, this.props.currentValue.name),
                react_1.default.createElement("span", { className: "file-size" }, this.props.prettySize))));
    }
}
exports.default = PropertyViewFileRenderer;
