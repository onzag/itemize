"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const PropertyEntryLocation_1 = require("../PropertyEntry/PropertyEntryLocation");
function isCenterBasicallyEquals(one, two) {
    const diffA = Math.abs(one[0] - two[0]);
    const diffB = Math.abs(one[1] - two[1]);
    if (diffA < 0.0001 && diffB < 0.001) {
        return true;
    }
    return false;
}
exports.isCenterBasicallyEquals = isCenterBasicallyEquals;
class PropertyViewLocation extends react_1.default.Component {
    constructor(props) {
        super(props);
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
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
        const oldValue = (prevProps.useAppliedValue ?
            prevProps.state.stateAppliedValue :
            prevProps.state.value);
        const newValue = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        if (newValue && !deep_equal_1.default(newValue, oldValue)) {
            let isCenteredToOldValue = false;
            if (oldValue) {
                const oldCenter = [oldValue.lat, oldValue.lng];
                isCenteredToOldValue = isCenterBasicallyEquals(this.state.viewport.center, oldCenter);
            }
            if (isCenteredToOldValue || !oldValue) {
                this.setState({
                    viewport: {
                        center: [newValue.lat, newValue.lng],
                        zoom: !oldValue ? PropertyEntryLocation_1.IViewportZoomEnumType.LARGE : this.state.viewport.zoom,
                    },
                });
            }
        }
    }
    onViewportChange(viewport) {
        this.setState({
            viewport,
        });
    }
    onResetViewportCenter() {
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        if (value) {
            const newViewport = {
                center: [value.lat, value.lng],
                zoom: PropertyEntryLocation_1.IViewportZoomEnumType.LARGE,
            };
            if (!deep_equal_1.default(newViewport, this.state.viewport)) {
                this.setState({
                    viewport: newViewport,
                });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return this.props.useAppliedValue !== nextProps.useAppliedValue ||
            (!this.props.useAppliedValue && !deep_equal_1.default(this.props.state.value, nextProps.state.value)) ||
            (this.props.useAppliedValue && !deep_equal_1.default(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
            !deep_equal_1.default(this.state, nextState) ||
            nextProps.property !== this.props.property ||
            nextProps.renderer !== this.props.renderer ||
            nextProps.country !== this.props.country ||
            !!this.props.rtl !== !!nextProps.rtl ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const value = (this.props.useAppliedValue ?
            this.props.state.stateAppliedValue :
            this.props.state.value);
        let canResetViewportCenter = false;
        if (value) {
            const expectedViewportCenter = [value.lat, value.lng];
            canResetViewportCenter = !isCenterBasicallyEquals(expectedViewportCenter, this.state.viewport.center);
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            currentValue: value,
            viewport: this.state.viewport,
            onViewportChange: this.onViewportChange,
            onResetViewportCenter: this.onResetViewportCenter,
            canResetViewportCenter,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.PropertyViewLocation = PropertyViewLocation;
