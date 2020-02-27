import React from "react";
import { IPropertyViewProps } from ".";
import equals from "deep-equal";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../../../internal/theme/leaflet.scss";
import { IPropertyDefinitionSupportedLocationType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";

// https://github.com/PaulLeCam/react-leaflet/issues/453
// bug in leaflet
delete (L.Icon as any).Default.prototype._getIconUrl;
(L.Icon as any).Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// the viewport for the map
interface IViewport {
  center: [number, number];
  zoom: number;
}

// location state, sadly it needs a lot in the state
// department
interface IPropertyViewLocationState {
  viewport: IViewport;
}

export default class PropertyViewLocation
  extends React.Component<IPropertyViewProps, IPropertyViewLocationState> {

  public static getDerivedStateFromProps(
    props: IPropertyViewProps,
    state: IPropertyViewLocationState,
  ): Partial<IPropertyViewLocationState> {
    const valueAsLocation = props.state.value as IPropertyDefinitionSupportedLocationType;
    const latitude = valueAsLocation ? valueAsLocation.lat : props.country.latitude;
    const longitude = valueAsLocation ? valueAsLocation.lng : props.country.longitude;
    const newViewport: IViewport = {
      center: [latitude, longitude],
      zoom: valueAsLocation ? 16 : 4,
    };

    if (!equals(newViewport, state.viewport)) {
      return {
        viewport: newViewport,
      };
    }
    return null;
  }

  constructor(props: IPropertyViewProps) {
    super(props);

    const valueAsLocation = props.state.value as IPropertyDefinitionSupportedLocationType;
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

  public shouldComponentUpdate(
    nextProps: IPropertyViewProps,
    nextState: IPropertyViewLocationState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState) ||
      !equals(this.props.state, nextProps.state) ||
      nextProps.country !== this.props.country;
  }

  public render() {
    // the location to mark is the currently set value
    const currentLocationToMark = this.props.state.value && [
      (this.props.state.value as IPropertyDefinitionSupportedLocationType).lat,
      (this.props.state.value as IPropertyDefinitionSupportedLocationType).lng,
    ];

    // the txt
    const currentLocationDataTxt = this.props.state.value &&
      (this.props.state.value as IPropertyDefinitionSupportedLocationType).txt;

    // and the alternative txt data
    const currentLocationDataATxt = this.props.state.value &&
      (this.props.state.value as IPropertyDefinitionSupportedLocationType).atxt;

    return (
      <div className={this.props.classes.container}>
        <div>
          {currentLocationDataATxt}
        </div>
        <div>
          <Map
            viewport={this.state.viewport}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {currentLocationToMark ? <Marker position={currentLocationToMark}>
              <Popup>{currentLocationDataTxt}{currentLocationDataATxt ? <br/> : null}{currentLocationDataATxt}</Popup>
            </Marker> : null}
          </Map>
        </div>
      </div>
    );
  }
}
