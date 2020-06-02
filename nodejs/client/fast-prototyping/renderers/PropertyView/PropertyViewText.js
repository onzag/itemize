"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// The current intersection observer
let io;
// old school listenrs that use the scroll of the document, these are listeners that should
// trigger every scroll, they return false onse they are done, true if they should reset
let oldSchoolListeners = [];
// triggers all the old school listeners
const triggerOldSchoolListeners = () => {
    oldSchoolListeners = oldSchoolListeners.filter((l) => l());
};
// this is the main old school listener that listens to the scroll event
// it's unset at first just like the io
let primaryOldSchoolListener;
// restores the element info making the item virtually loaded
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
// checks whether a component is in view, this is for the old school mode
function componentIsInView(elem) {
    const bounding = elem.getBoundingClientRect();
    return (bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
}
/**
 * marks an html element to be lazy loaded in 3 ways
 * @param element the element
 * @param propertySet a property set to copy from the dataset to the attribute itself
 */
function lazyloader(element, propertySet) {
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
    else if (window.IntersectionObserver) {
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
// TODOSSR nothing visible in here and this one is important
class PropertyViewRichTextViewer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.divref = react_1.default.createRef();
        this.cheapdiv = typeof document !== "undefined" ? document.createElement("div") : null;
    }
    updateHTML(html) {
        if (!html) {
            this.divref.current.innerHTML = "";
            return;
        }
        this.cheapdiv.innerHTML = html;
        this.cheapdiv.querySelectorAll("img").forEach((img) => {
            if (!img.src.startsWith("blob:")) {
                img.dataset.srcset = img.srcset;
                img.removeAttribute("srcset");
                img.dataset.src = img.src;
                img.removeAttribute("src");
                img.dataset.sizes = img.sizes;
                img.removeAttribute("sizes");
                lazyloader(img, [["sizes", "sizes"], ["srcset", "srcset"], ["src", "src"]]);
            }
        });
        this.cheapdiv.querySelectorAll("iframe").forEach((iframe) => {
            if (!iframe.src.startsWith("blob:")) {
                iframe.dataset.src = iframe.src;
                lazyloader(iframe, [["src", "src"]]);
            }
        });
        this.cheapdiv.querySelectorAll(".file").forEach((file) => {
            const container = file.querySelector(".file-container");
            const title = file.querySelector(".file-title");
            container.addEventListener("click", () => {
                if (file.dataset.src) {
                    window.open(file.dataset.src, title ? title.textContent : "_blank");
                }
            });
        });
        this.divref.current.innerHTML = "";
        while (this.cheapdiv.childNodes.length) {
            this.divref.current.appendChild(this.cheapdiv.childNodes[0]);
        }
        triggerOldSchoolListeners();
    }
    componentDidMount() {
        this.updateHTML(this.props.children);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.children !== this.props.children) {
            this.updateHTML(nextProps.children);
        }
        return false;
    }
    render() {
        return (react_1.default.createElement("div", { className: "rich-text", ref: this.divref }));
    }
}
exports.PropertyViewRichTextViewer = PropertyViewRichTextViewer;
function PropertyViewTextRenderer(props) {
    if (props.isRichText) {
        return (react_1.default.createElement(PropertyViewRichTextViewer, null, props.currentValue));
    }
    else if (props.subtype === "plain") {
        return (react_1.default.createElement("div", { className: "plain-text" }, props.currentValue));
    }
    return (react_1.default.createElement("span", null, props.currentValue));
}
exports.default = PropertyViewTextRenderer;
