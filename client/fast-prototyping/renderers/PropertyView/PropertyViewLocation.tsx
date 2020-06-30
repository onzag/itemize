import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { IPropertyViewLocationRendererProps } from "../../../internal/components/PropertyView/PropertyViewLocation";
import { createStyles, withStyles, WithStyles, IconButton, GpsFixedIcon } from "../../mui-core";
import { ZOOMS } from "../PropertyEntry/PropertyEntryLocation";

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
});

interface ActualPropertyViewLocationMapProps extends WithStyles<typeof locationMapStyles>, IPropertyViewLocationRendererProps {
}

interface PropertyViewLocationMapState {
  readyToMap: boolean;
}

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
    const viewport = {
      center: this.props.viewport.center,
      zoom: ZOOMS[this.props.viewport.zoom] || this.props.viewport.zoom,
    };
    
    const map = this.state.readyToMap ? (
      <CMap
        viewport={viewport}
        onViewportChange={this.props.onViewportChange}
      >
        <CTileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.currentValue ? <CMarker position={[
          this.props.currentValue.lat, this.props.currentValue.lng,
        ]} /> : null}
      </CMap>
    ) : null;

    let textHeader: React.ReactNode = null;
    if (this.props.currentValue === null && this.props.args.NullComponent) {
      const NullComponent = this.props.args.NullComponent;
      const nullArgs = this.props.args.nullComponentArgs;
      textHeader = <NullComponent {...nullArgs}/>;
    } else {
      textHeader = this.props.currentValue.txt + " - " + this.props.currentValue.atxt;
    }

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.locationTextHeader}>
          {textHeader}
        </div>
        <div className={this.props.classes.locationMapContainer}>
          {map}
          {this.props.canResetViewportCenter ?
            <IconButton onClick={this.props.onResetViewportCenter}>
              <GpsFixedIcon/>
            </IconButton>
          : null}
        </div>
      </div>
    )
  }
}

const PropertyViewLocationMap = withStyles(locationMapStyles)(ActualPropertyViewLocationMap);

export default function PropertyViewLocationRenderer(props: IPropertyViewLocationRendererProps) {
  if (props.currentValue === null && props.args.NullComponent && !props.args.nullComponentInMap) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    const Tag = props.args.hideMap ? "span" : "div";
    return <Tag><NullComponent {...nullArgs}/></Tag>;
  }

  if (props.args.hideMap) {
    return <span>{props.currentValue.txt + " - " + props.currentValue.atxt}</span>
  } else {
    return (<PropertyViewLocationMap {...props}/>);
  }
}