"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const PropertyEntryLocation_1 = require("../PropertyEntry/PropertyEntryLocation");
class PropertyViewLocation extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.preventViewportDidUpdateChange = false;
        const value = this.props.state.value;
        const center = value ? [value.lat, value.lng] : [props.country.latitude, props.country.longitude];
        const zoom = value ? PropertyEntryLocation_1.IViewportZoomEnumType.LARGE : PropertyEntryLocation_1.IViewportZoomEnumType.SMALL;
        this.state = {
            viewport: {
                center,
                zoom,
            }
        };
        this.onViewportChange = this.onViewportChange.bind(this);
        this.onResetViewportCenter = this.onResetViewportCenter.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (!this.preventViewportDidUpdateChange) {
            const value = this.props.state.value;
            if (value) {
                const oldValue = prevProps.state.value;
                if (!deep_equal_1.default(value, oldValue)) {
                    this.setState({
                        viewport: {
                            center: [value.lat, value.lng],
                            zoom: PropertyEntryLocation_1.IViewportZoomEnumType.LARGE,
                        },
                    });
                }
            }
        }
    }
    onViewportChange(viewport) {
        this.preventViewportDidUpdateChange = true;
        this.setState({
            viewport,
        });
    }
    onResetViewportCenter() {
        this.preventViewportDidUpdateChange = false;
        const value = this.props.state.value;
        if (value) {
            this.setState({
                viewport: {
                    center: [value.lat, value.lng],
                    zoom: PropertyEntryLocation_1.IViewportZoomEnumType.LARGE,
                },
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return !deep_equal_1.default(this.props.state.value, nextProps.state.value) ||
            !deep_equal_1.default(this.state, nextState) ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.country !== this.props.country ||
            !!this.props.rtl !== !!nextProps.rtl ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const value = this.props.state.value;
        let canResetViewportCenter = false;
        if (value) {
            const expectedViewport = {
                center: [value.lat, value.lng],
                zoom: PropertyEntryLocation_1.IViewportZoomEnumType.LARGE,
            };
            canResetViewportCenter = !deep_equal_1.default(expectedViewport, this.state.viewport);
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue: this.props.state.value,
            viewport: this.state.viewport,
            onViewportChange: this.onViewportChange,
            onResetViewportCenter: this.onResetViewportCenter,
            canResetViewportCenter,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewLocation = PropertyViewLocation;
