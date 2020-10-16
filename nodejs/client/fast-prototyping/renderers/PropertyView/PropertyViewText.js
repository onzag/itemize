"use strict";
/**
 * Contains the property view text renderer, another large
 * thing used for text/plain or text/html text, but not unsubtyped
 * text
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyViewText_1 = require("../../../internal/components/PropertyView/PropertyViewText");
const react_1 = __importDefault(require("react"));
const util_1 = require("../../../../util");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * The current intersection observer
 */
let io;
/**
 * old school listenrs that use the scroll of the document, these are listeners that should
 * trigger every scroll, they return false onse they are done, true if they should reset
 */
let oldSchoolListeners = [];
/**
 * triggers all the old school listeners
 */
const triggerOldSchoolListeners = () => {
    oldSchoolListeners = oldSchoolListeners.filter((l) => l());
};
/**
 * this is the main old school listener that listens to the scroll event
 * it's unset at first just like the io
 */
let primaryOldSchoolListener;
/**
 * restores the element info making the item virtually loaded
 * @param target the target to restore
 */
function restoreElementInfo(target) {
    if (!target.dataset.propertySet) {
        return;
    }
    // we read the property set from the attribute that we will transform
    const recoveredPropertySet = target.dataset.propertySet.split(";").map((s) => s.split(","));
    // clean it
    target.dataset.propertySet = "";
    // and now pass every property
    recoveredPropertySet.forEach((propertySet) => {
        const propertyInDataSet = propertySet[0];
        const propertyInAttr = propertySet[1];
        // and set the attributes
        target.setAttribute(propertyInAttr, target.dataset[propertyInDataSet]);
        target.dataset[propertyInDataSet] = "";
    });
}
/**
 * checks whether a component is in view, this is for the old school mode
 * @param elem the element to check if it's in view
 */
function componentIsInView(elem) {
    const bounding = elem.getBoundingClientRect();
    return (bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
}
/**
 * Preopares an element for lazy loading
 * will restore its former structure, if it knows that it supports the loading=lazy property
 * @param element the element to prepare for lazy load
 * @param propertySet the properties to move, from dataset to the main
 */
function lazyLoaderPrepare(element, propertySet) {
    // first we add the property set information that we will use
    element.dataset.propertySet = propertySet.map((s) => s.join(",")).join(";");
    // now we check if this is an image that has a loading property that uses lazyloading
    // this is supported in modern browsers but only works with images and the likes
    if (element.loading) {
        // we restore the info
        restoreElementInfo(element);
        // and mark it as lazy
        element.loading = "lazy";
        // otherwise using the intersection observer if we have it
    }
}
/**
 * marks an html element to be lazy loaded in 3 ways
 * @param element the element
 * @param propertySet a property set to copy from the dataset to the attribute itself
 */
function lazyloaderExecute(element) {
    // has already been lazy loaded using loading=lazy
    if (!element.dataset.propertySet) {
        return;
    }
    if (window.IntersectionObserver) {
        // if we haven't created a main
        if (!io) {
            // we crate the observer
            io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        restoreElementInfo(target);
                        io.unobserve(target);
                    }
                });
            });
        }
        // and start observing the dom node
        io.observe(element);
    }
    else {
        // otherwise the old school mode
        oldSchoolListeners.push(() => {
            if (componentIsInView(element)) {
                restoreElementInfo(element);
                return false;
            }
            return true;
        });
        // and if we don't have the scroll observer we create one right away
        if (!primaryOldSchoolListener) {
            primaryOldSchoolListener = () => {
                triggerOldSchoolListeners();
            };
            document.addEventListener("scroll", primaryOldSchoolListener);
        }
    }
}
/**
 * The rich text viewer used to view only types of text/html
 */
class PropertyViewRichTextViewer extends react_1.default.Component {
    /**
     * The builder for the rich text viewer in text/html
     * @param props the props
     */
    constructor(props) {
        super(props);
        this.divref = react_1.default.createRef();
        this.cheapdiv = util_1.DOMWindow.document.createElement("div");
        this.state = {
            html: this.getHTML(props.children, props.disableLinks, props.isTemplate, props.disableHTMLTemplating, props.templateArgs),
        };
    }
    /**
     * For a given html it will provide the brand new html
     * that is going to be rendered instead for the inner html
     * @param html
     */
    getHTML(html, disableLinks, isTemplate, disableHTMLTemplating, templateArgs) {
        // with no html it's null
        if (!html) {
            return null;
        }
        // otherwse let's check we first assign it to the cheap div
        // note that this content has already been sanitized by the sanitizer
        // in the handler and now follows the text specs
        this.cheapdiv.innerHTML = html;
        // so first we get all the images
        this.cheapdiv.querySelectorAll("img").forEach((img) => {
            let a = null;
            if (!disableLinks) {
                // this will wrap our image, for SEO purposes as well as to
                // have a click to it
                a = util_1.DOMWindow.document.createElement("a");
                a.href = img.src;
                a.title = img.alt || "";
            }
            // yes the src can be a blob, if the image hasn't been uploaded
            // yet, this is a valid protocol, and since it's local, lazyloading
            // preparations make no sense
            if (!img.src.startsWith("blob:")) {
                // we move all these attributes to the dataset
                img.dataset.srcset = img.srcset;
                img.removeAttribute("srcset");
                img.dataset.src = img.src;
                img.removeAttribute("src");
                img.dataset.sizes = img.sizes;
                img.removeAttribute("sizes");
            }
            if (!disableLinks) {
                // now we replace the img with the a link
                img.parentNode.replaceChild(a, img);
                // and add the image inside the a link
                a.appendChild(img);
            }
        });
        // we do the same with iframes
        this.cheapdiv.querySelectorAll("iframe").forEach((iframe) => {
            if (!iframe.src.startsWith("blob:")) {
                iframe.dataset.src = iframe.src;
                iframe.removeAttribute("src");
            }
        });
        if (isTemplate) {
            util_1.processTemplateInitialization(this.cheapdiv, disableHTMLTemplating, this.props.templateArgs, this.props.templateArgs, []);
        }
        // and return the fresh inner html
        return this.cheapdiv.innerHTML;
    }
    /**
     * Prepares the lazy loader, runs on mounting or changing
     */
    prepareLazyLoader() {
        // we do it for each image
        this.divref.current.querySelectorAll("img").forEach((img) => {
            if (img.dataset.src) {
                lazyLoaderPrepare(img, [["sizes", "sizes"], ["srcset", "srcset"], ["src", "src"]]);
            }
        });
        // and each iframe
        this.divref.current.querySelectorAll("iframe").forEach((iframe) => {
            if (iframe.dataset.src) {
                lazyLoaderPrepare(iframe, [["src", "src"]]);
            }
        });
    }
    /**
     * updates the html
     * @param html the html to update for
     */
    updateHTML(html, disableLinks, isTemplate, disableHTMLTemplating, templateArgs) {
        this.setState({
            html: this.getHTML(html, disableLinks, isTemplate, disableHTMLTemplating, templateArgs),
        });
    }
    /**
     * Attach the events that are required for lazyloading
     */
    attachEvents() {
        // first we get all the images
        this.divref.current.querySelectorAll("img").forEach((img) => {
            // this dataset will only exist if loading!=lazy as otherwise the information
            // would have been restored during preparation
            if (img.dataset.src) {
                // so we would execute our lazyloader on the image if we know it needs such
                lazyloaderExecute(img);
            }
        });
        // the same can be said about iframe
        this.divref.current.querySelectorAll("iframe").forEach((iframe) => {
            if (iframe.dataset.src) {
                lazyloaderExecute(iframe);
            }
        });
        // about files, it's a bit different, we just want to add the click event to it
        this.divref.current.querySelectorAll(".file").forEach((file) => {
            const container = file.querySelector(".file-container");
            const title = file.querySelector(".file-title");
            container.addEventListener("click", () => {
                if (file.dataset.src) {
                    window.open(file.dataset.src, title ? title.textContent : "_blank");
                }
            });
        });
        // and now we trigger our old school listeners to it, since the images can be in view already
        // if there are no old school listeners this function will do nothing as none is listening
        triggerOldSchoolListeners();
    }
    attachTemplateListeners() {
        PropertyViewText_1.SUPPORTED_TEMPLATE_EVENTS.forEach((eventKey) => {
            this.divref.current.querySelectorAll("[data-on-" + eventKey + "]").forEach((node) => {
                const functionToCall = node.getAttribute("data-on-" + eventKey);
                let processedFunctionToCall = functionToCall.trim();
                const fn = this.props.templateArgs[processedFunctionToCall];
                if (typeof fn === "undefined") {
                    console.warn("Listener does not match a function to call in template at data-on-" + eventKey + "=" + JSON.stringify(functionToCall));
                }
                else if (typeof fn !== "function" && fn !== null) {
                    console.warn("Listener is not an actual function but rather " +
                        (typeof fn) +
                        " at data-on-" + eventKey + "=" + JSON.stringify(functionToCall));
                }
                else if (fn !== null) {
                    this.divref.current.addEventListener(eventKey, fn);
                }
            });
        });
        this.divref.current.querySelectorAll("[data-ui-handler]").forEach((node) => {
            const handlerToUseKey = node.dataset.uiHandler;
            const handler = this.props.templateArgs[handlerToUseKey];
            if (typeof handler === "undefined") {
                console.warn("Handler is not specified at data-ui-handler=" + JSON.stringify(handlerToUseKey));
            }
            else if (handler && handler.load) {
                const handlerContextPath = JSON.parse(node.dataset.uiHandlerContext);
                let contextArgsToUse = this.props.templateArgs;
                handlerContextPath.forEach((key) => {
                    contextArgsToUse = contextArgsToUse[key];
                });
                handler.load(node, util_1.DOMWindow, contextArgsToUse, this.props.templateArgs);
            }
        });
        this.divref.current.querySelectorAll("[data-hover-style]").forEach((node) => {
            const styleToUse = node.getAttribute("data-hover-style");
            const originalStyle = node.getAttribute("style");
            node.addEventListener("moouseover", () => {
                node.setAttribute("style", styleToUse);
            });
            node.addEventListener("mouseleave", () => {
                if (originalStyle) {
                    node.setAttribute("style", originalStyle);
                }
                else {
                    node.removeAttribute("style");
                }
            });
        });
        this.divref.current.querySelectorAll("[data-active-style]").forEach((node) => {
            const styleToUse = node.getAttribute("data-active-style");
            const originalStyle = node.getAttribute("style");
            const setStyle = () => {
                node.setAttribute("style", styleToUse);
            };
            const rmStyle = () => {
                if (originalStyle) {
                    node.setAttribute("style", originalStyle);
                }
                else {
                    node.removeAttribute("style");
                }
            };
            node.addEventListener("touchstart", setStyle);
            node.addEventListener("touchend", rmStyle);
            node.addEventListener("mousedown", setStyle);
            node.addEventListener("mouseup", rmStyle);
        });
    }
    dropOldHandlers() {
        this.divref.current.querySelectorAll("[data-ui-handler]").forEach((node) => {
            const handlerToUseKey = node.dataset.uiHandler;
            const handler = this.props.templateArgs[handlerToUseKey];
            if (typeof handler === "undefined") {
                console.warn("Handler is not specified at data-ui-handler=" + JSON.stringify(handlerToUseKey));
            }
            else if (handler && handler.unload) {
                const handlerContextPath = JSON.parse(node.dataset.uiHandlerContext);
                let contextArgsToUse = this.props.templateArgs;
                handlerContextPath.forEach((key) => {
                    contextArgsToUse = contextArgsToUse[key];
                });
                handler.unload(node, util_1.DOMWindow, contextArgsToUse, this.props.templateArgs);
            }
        });
    }
    componentDidMount() {
        // we prepare all the lazy loader stuff which might make our things
        // go with loading=lazy
        this.prepareLazyLoader();
        // and attach the events for the stuff
        this.attachEvents();
        if (this.props.isTemplate) {
            this.attachTemplateListeners();
        }
    }
    componentDidUpdate() {
        // on any update we do the same as we only really update when the html changes
        // any other updates are denied
        this.prepareLazyLoader();
        this.attachEvents();
        if (this.props.isTemplate) {
            this.attachTemplateListeners();
        }
    }
    componentWillUnmount() {
        if (this.props.isTemplate) {
            this.dropOldHandlers();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.children !== this.props.children ||
            nextProps.disableLinks !== this.props.disableLinks ||
            nextProps.isTemplate !== this.props.isTemplate ||
            nextProps.disableHTMLTemplating !== this.props.disableHTMLTemplating ||
            !deep_equal_1.default(nextProps.templateArgs, this.props.templateArgs)) {
            this.dropOldHandlers();
            this.updateHTML(nextProps.children, nextProps.disableLinks, nextProps.isTemplate, nextProps.disableHTMLTemplating, nextProps.templateArgs);
        }
        // see only when the html changes
        return this.state.html !== nextState.html;
    }
    render() {
        return (react_1.default.createElement("div", { className: "rich-text", ref: this.divref, dangerouslySetInnerHTML: { __html: this.state.html } }));
    }
}
exports.PropertyViewRichTextViewer = PropertyViewRichTextViewer;
/**
 * The property view text renderer
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 *
 * @param props the props passed by the handler
 * @returns a react element
 */
function PropertyViewTextRenderer(props) {
    if (props.args.NullComponent && props.currentValue === null) {
        const NullComponent = props.args.NullComponent;
        const nullArgs = props.args.nullComponentArgs;
        return react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
    }
    if (props.isRichText) {
        return (react_1.default.createElement(PropertyViewRichTextViewer, { disableLinks: !!props.args.disableLinks, isTemplate: !!props.args.makeTemplate, templateArgs: props.args.templateArgs, disableHTMLTemplating: !!props.args.disableHTMLTemplating }, props.currentValue));
    }
    else if (props.subtype === "plain") {
        return (react_1.default.createElement("div", { className: "plain-text" }, props.currentValue));
    }
    return (react_1.default.createElement("span", null, props.currentValue));
}
exports.default = PropertyViewTextRenderer;
