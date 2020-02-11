"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const react_leaflet_1 = require("react-leaflet");
const leaflet_1 = __importDefault(require("leaflet"));
require("leaflet/dist/leaflet.css");
require("../../../internal/theme/leaflet.scss");
// https://github.com/PaulLeCam/react-leaflet/issues/453
// bug in leaflet
delete leaflet_1.default.Icon.Default.prototype._getIconUrl;
leaflet_1.default.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
class PropertyViewLocation extends react_1.default.Component {
    static getDerivedStateFromProps(props, state) {
        const valueAsLocation = props.state.value;
        const latitude = valueAsLocation ? valueAsLocation.lat : props.country.latitude;
        const longitude = valueAsLocation ? valueAsLocation.lng : props.country.longitude;
        const newViewport = {
            center: [latitude, longitude],
            zoom: valueAsLocation ? 16 : 4,
        };
        if (!deep_equal_1.default(newViewport, state.viewport)) {
            return {
                viewport: newViewport,
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const valueAsLocation = props.state.value;
        const latitude = valueAsLocation ? valueAsLocation.lat : props.country.latitude;
        const longitude = valueAsLocation ? valueAsLocation.lng : props.country.longitude;
        // set the initial state
        this.state = {
            viewport: {
                center: [latitude, longitude],
                zoom: valueAsLocation ? 16 : 4,
            },
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            nextProps.country !== this.props.country;
    }
    render() {
        // the location to mark is the currently set value
        const currentLocationToMark = this.props.state.value && [
            this.props.state.value.lat,
            this.props.state.value.lng,
        ];
        // the txt
        const currentLocationDataTxt = this.props.state.value &&
            this.props.state.value.txt;
        // and the alternative txt data
        const currentLocationDataATxt = this.props.state.value &&
            this.props.state.value.atxt;
        return (<div className={this.props.classes.container}>
        <div>
          {currentLocationDataATxt}
        </div>
        <div>
          <react_leaflet_1.Map viewport={this.state.viewport}>
            <react_leaflet_1.TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            {currentLocationToMark ? <react_leaflet_1.Marker position={currentLocationToMark}>
              <react_leaflet_1.Popup>{currentLocationDataTxt}{currentLocationDataATxt ? <br /> : null}{currentLocationDataATxt}</react_leaflet_1.Popup>
            </react_leaflet_1.Marker> : null}
          </react_leaflet_1.Map>
        </div>
      </div>);
    }
}
exports.default = PropertyViewLocation;
