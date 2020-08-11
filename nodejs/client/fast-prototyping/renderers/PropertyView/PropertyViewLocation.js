"use strict";
/**
 * Contains the property view location renderer
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mui_core_1 = require("../../mui-core");
const PropertyEntryLocation_1 = require("../PropertyEntry/PropertyEntryLocation");
// this logic is similar to the entry
// it has to do with SSR not supporting
// any of these
let CMap;
let CTileLayer;
let CMarker;
let L;
if (typeof document !== "undefined") {
    const LL = require("react-leaflet");
    CMap = LL.Map;
    CTileLayer = LL.TileLayer;
    CMarker = LL.Marker;
    L = require("leaflet");
    // https://github.com/PaulLeCam/react-leaflet/issues/453
    // bug in leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
}
/**
 * The location map styles
 */
const locationMapStyles = mui_core_1.createStyles({
    container: {
        width: "100%",
    },
    iconButton: {
        "backgroundColor": "#2196f3",
        "color": "#fff",
        "&:hover": {
            backgroundColor: "#1976d2",
        },
        "position": "absolute",
    },
    locationTextHeader: {
        height: "3rem",
        fontSize: "0.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "solid 1px #ccc",
    },
    locationMapContainer: {
        position: "relative",
        width: "100%",
    },
    restoreButton: {
        position: "absolute",
        zIndex: 1000,
        bottom: 10,
        left: 10,
        backgroundColor: "white",
        border: "solid 1px #ccc",
        boxShadow: "0 1px 5px rgba(0,0,0,0.65)",
        "&:hover": {
            backgroundColor: "white",
        },
    }
});
/**
 * The actual location map
 */
class ActualPropertyViewLocationMap extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            readyToMap: false,
        };
    }
    componentDidMount() {
        this.setState({
            readyToMap: true,
        });
    }
    render() {
        let viewport = PropertyEntryLocation_1.ZOOMS[this.props.viewport.zoom] ? {
            center: this.props.viewport.center,
            zoom: PropertyEntryLocation_1.ZOOMS[this.props.viewport.zoom],
        } : this.props.viewport;
        const map = this.state.readyToMap ? (react_1.default.createElement(CMap, { viewport: viewport, onViewportChanged: this.props.onViewportChange },
            react_1.default.createElement(CTileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
            this.props.currentValue ? react_1.default.createElement(CMarker, { position: [
                    this.props.currentValue.lat, this.props.currentValue.lng,
                ] }) : null,
            this.props.canResetViewportCenter ?
                react_1.default.createElement(mui_core_1.IconButton, { onClick: this.props.onResetViewportCenter, className: this.props.classes.restoreButton },
                    react_1.default.createElement(mui_core_1.GpsFixedIcon, null))
                : null)) : null;
        let textHeader = null;
        if (this.props.currentValue === null && this.props.args.NullComponent) {
            const NullComponent = this.props.args.NullComponent;
            const nullArgs = this.props.args.nullComponentArgs;
            textHeader = react_1.default.createElement(NullComponent, Object.assign({}, nullArgs));
        }
        else {
            textHeader = this.props.currentValue.txt + " - " + this.props.currentValue.atxt;
        }
        return (react_1.default.createElement("div", { className: this.props.classes.container },
            react_1.default.createElement("div", { className: this.props.classes.locationTextHeader }, textHeader),
            react_1.default.createElement("div", { className: this.props.classes.locationMapContainer }, map)));
    }
}
const PropertyViewLocationMap = mui_core_1.withStyles(locationMapStyles)(ActualPropertyViewLocationMap);
/**
 * Provides a renderer to view location
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - hideMap: whether to hide the map
 *
 * @param props the props for the location renderer
 * @returns a react element
 */
function PropertyViewLocationRenderer(props) {
    if (props.currentValue === null && props.args.NullComponent && !props.args.nullComponentInMap) {
        const NullComponent = props.args.NullComponent;
        const nullArgs = props.args.nullComponentArgs;
        const Tag = props.args.hideMap ? "span" : "div";
        return react_1.default.createElement(Tag, null,
            react_1.default.createElement(NullComponent, Object.assign({}, nullArgs)));
    }
    if (props.args.hideMap) {
        if (props.currentValue) {
            return react_1.default.createElement("span", null, props.currentValue.txt + " - " + props.currentValue.atxt);
        }
        else {
            return react_1.default.createElement("span", null);
        }
    }
    else {
        return (react_1.default.createElement(PropertyViewLocationMap, Object.assign({}, props)));
    }
}
exports.default = PropertyViewLocationRenderer;
