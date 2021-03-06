/**
 * Contains the property view location renderer
 * 
 * @module
 */

import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { IPropertyViewLocationRendererProps } from "../../../internal/components/PropertyView/PropertyViewLocation";
import { createStyles, withStyles, WithStyles, IconButton, GpsFixedIcon } from "../../mui-core";
import { ZOOMS } from "../PropertyEntry/PropertyEntryLocation";

// this logic is similar to the entry
// it has to do with SSR not supporting
// any of these
let CMap: typeof Map;
let CTileLayer: typeof TileLayer;
let CMarker: typeof Marker;
let L: any;
if (typeof document !== "undefined") {
  const LL = require("react-leaflet");
  CMap = LL.Map;
  CTileLayer = LL.TileLayer;
  CMarker = LL.Marker;
  L = require("leaflet");

  // https://github.com/PaulLeCam/react-leaflet/issues/453
  // bug in leaflet
  delete (L.Icon as any).Default.prototype._getIconUrl;
  (L.Icon as any).Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
}

/**
 * The location map styles
 */
const locationMapStyles = createStyles({
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
 * The actual props with the injection of the handler
 */
interface ActualPropertyViewLocationMapProps extends WithStyles<typeof locationMapStyles>, IPropertyViewLocationRendererProps {
}

/**
 * We need this boolean to do a double pass
 */
interface PropertyViewLocationMapState {
  readyToMap: boolean;
}

/**
 * The actual location map
 */
class ActualPropertyViewLocationMap extends React.Component<ActualPropertyViewLocationMapProps, PropertyViewLocationMapState> {
  constructor(props: ActualPropertyViewLocationMapProps) {
    super(props);

    this.state = {
      readyToMap: false,
    }
  }
  public componentDidMount() {
    this.setState({
      readyToMap: true,
    });
  }
  public render() {
    let viewport = ZOOMS[this.props.viewport.zoom] ? {
      center: this.props.viewport.center,
      zoom: ZOOMS[this.props.viewport.zoom],
    } : this.props.viewport;

    const map = this.state.readyToMap ? (
      <CMap
        viewport={viewport}
        onViewportChanged={this.props.onViewportChange}
      >
        <CTileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.currentValue ? <CMarker position={[
          this.props.currentValue.lat, this.props.currentValue.lng,
        ]} /> : null}
        {this.props.canResetViewportCenter ?
          <IconButton onClick={this.props.onResetViewportCenter} className={this.props.classes.restoreButton}>
            <GpsFixedIcon/>
          </IconButton>
        : null}
      </CMap>
    ) : null;

    let textHeader: React.ReactNode = null;
    if (this.props.currentValue === null && this.props.args.NullComponent) {
      const NullComponent = this.props.args.NullComponent;
      const nullArgs = this.props.args.nullComponentArgs;
      textHeader = <NullComponent {...nullArgs}/>;
    } else {
      textHeader = this.props.currentValue ? (
        this.props.currentValue.txt + " - " + this.props.currentValue.atxt
      ) : null;
    }

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.locationTextHeader}>
          {textHeader}
        </div>
        <div className={this.props.classes.locationMapContainer}>
          {map}
        </div>
      </div>
    )
  }
}

const PropertyViewLocationMap = withStyles(locationMapStyles)(ActualPropertyViewLocationMap);

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
export default function PropertyViewLocationRenderer(props: IPropertyViewLocationRendererProps) {
  if (props.currentValue === null && props.args.NullComponent && !props.args.nullComponentInMap) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    const Tag = props.args.hideMap ? "span" : "div";
    return <Tag><NullComponent {...nullArgs}/></Tag>;
  }

  if (props.args.hideMap) {
    if (props.currentValue) {
      return <span>{props.currentValue.txt + " - " + props.currentValue.atxt}</span>
    } else {
      return <span/>
    }
  } else {
    return (<PropertyViewLocationMap {...props}/>);
  }
}
