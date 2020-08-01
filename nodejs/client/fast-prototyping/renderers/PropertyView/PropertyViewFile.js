"use strict";
/**
 * Contains the property view file renderer
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// check for whether the current environment supports lazyload standard loading form
// because of SSR we must check for document
const supportsBasicLoadingProperty = typeof document !== "undefined" ? !!document.createElement("img").loading : false;
/**
 * The property view file renderer will show a file, and if it's an image
 * it will show as an image with all lazyloading and all
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - imageClassName: the image class name for the img tag when an image is available
 * - imageSizes: the image sizes for the sizes attribute for the image, default 70vw
 * - lazyLoad: whether to use lazyloading for images alone
 */
class PropertyViewFileRenderer extends react_1.default.Component {
    /**
     * Builds the renderer
     * @param props the handler passed props
     */
    constructor(props) {
        super(props);
        /**
         * whether the scroll event is actually attached
         */
        this.isScrollEventAttached = false;
        this.refImg = react_1.default.createRef();
        // loaded represents the properties src and srcset when using native
        // image loading it's unecessary to have them removed as the browser
        // will handle it natively
        this.state = {
            loaded: false,
        };
    }
    /**
     * Attach the scroll event, only necessary for traditional
     * lazyloading
     */
    attachScrollEvent() {
        // if we don't have a scroll event
        if (!this.isScrollEventAttached) {
            // we add it
            this.isScrollEventAttached = true;
            document.body.addEventListener("scroll", this.checkWhetherInViewOldSchool);
        }
    }
    /**
     * Removes the attached scroll event for lazyloading
     */
    removeScrollEvent() {
        if (this.isScrollEventAttached) {
            this.isScrollEventAttached = false;
            document.body.removeEventListener("scroll", this.checkWhetherInViewOldSchool);
        }
    }
    /**
     * Old school way to check if an element is in view
     */
    checkWhetherInViewOldSchool() {
        const bounding = this.refImg.current.getBoundingClientRect();
        const isInView = (bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
        // if it's in view we set it as loaded
        if (isInView) {
            this.setState({ loaded: true });
            this.removeScrollEvent();
        }
        else {
            this.attachScrollEvent();
        }
    }
    /**
     * Intersection observer way to check if the image is in view
     */
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
                    // this one is disposable
                    this.io.disconnect();
                    this.io = null;
                }
            });
        });
        this.io.observe(target);
    }
    /**
     * Remove the intersection observer if it exist
     * it might have never been triggered
     */
    removeIntersectionObserver() {
        if (this.io) {
            this.io.disconnect();
        }
    }
    /**
     * Now when the element mounts
     */
    componentDidMount() {
        // we can't know if supports image loading is valid via lazy yet because the constructor
        // can run within SSR, so we need to do it here
        const supportsBasicLoadingPropertyAndWantsToLazyLoad = this.props.args.lazyLoad && supportsBasicLoadingProperty;
        if (supportsBasicLoadingPropertyAndWantsToLazyLoad && !this.state.loaded) {
            // this will set all srcs and since loading is lazy already
            // it should be fine
            this.setState({
                loaded: true,
            });
        }
        if (this.props.args.lazyLoad) {
            if (!window.IntersectionObserver && !supportsBasicLoadingProperty) {
                this.checkWhetherInViewOldSchool();
            }
            else if (window.IntersectionObserver && !supportsBasicLoadingProperty) {
                this.setupIntersectionObserver();
            }
        }
    }
    componentDidUpdate(prevProps) {
        // if now we want to lazyload but we didn't want before
        if (this.props.args.lazyLoad && !prevProps.args.lazyLoad && !this.state.loaded) {
            if (!window.IntersectionObserver && !supportsBasicLoadingProperty) {
                this.checkWhetherInViewOldSchool();
            }
            else if (window.IntersectionObserver && !supportsBasicLoadingProperty) {
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
            if (this.props.args.NullComponent) {
                const NullComponent = this.props.args.NullComponent;
                const nullArgs = this.props.args.nullComponentArgs;
                return react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
            }
            return null;
        }
        if (this.props.isSupportedImage) {
            const imageClassName = this.props.args.imageClassName;
            const imageSizes = this.props.args.imageSizes || "70vw";
            // since the image is never loaded at start, the src will always be null
            // but data-src will be there, so SEO should be able to figure this one out
            // also including the a tag should find it out
            return (react_1.default.createElement("a", { href: this.props.currentValue.url, title: this.props.currentValue.name },
                react_1.default.createElement("img", { ref: this.refImg, srcSet: !this.state.loaded ? null : this.props.imageSrcSet, sizes: imageSizes, "data-src": this.props.currentValue.url, src: !this.state.loaded ? null : this.props.currentValue.url, className: imageClassName, loading: this.props.args.lazyLoad ? "lazy" : null, alt: this.props.currentValue.name })));
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
