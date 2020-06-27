import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import equals from "deep-equal";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IViewport, IViewportZoomEnumType } from "../PropertyEntry/PropertyEntryLocation";

export interface IPropertyViewLocationRendererProps extends IPropertyViewRendererProps<IPropertyDefinitionSupportedLocationType> {
  viewport: IViewport;
  onViewportChange: (viewport: IViewport) => void;
  onResetViewportCenter: () => void;
  canResetViewportCenter: boolean;
}

interface IPropertyViewLocationRendererState {
  viewport: IViewport;
}

export class PropertyViewLocation extends React.Component<
  IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>,
  IPropertyViewLocationRendererState
> {
  private preventViewportDidUpdateChange: boolean = false;
  constructor(props: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>) {
    super(props);

    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedLocationType;

    const center: [number, number] =  value ? [value.lat, value.lng] : [props.country.latitude, props.country.longitude];
    const zoom = value ? IViewportZoomEnumType.LARGE : IViewportZoomEnumType.SMALL;

    this.state = {
      viewport: {
        center,
        zoom,
      }
    }

    this.onViewportChange = this.onViewportChange.bind(this);
    this.onResetViewportCenter = this.onResetViewportCenter.bind(this);
  }
  public componentDidUpdate(prevProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>) {
    if (!this.preventViewportDidUpdateChange) {
      const value = (
        this.props.useAppliedValue ?
        this.props.state.stateAppliedValue :
        this.props.state.value
      ) as IPropertyDefinitionSupportedLocationType;

      if (value) {
        let oldValue: IPropertyDefinitionSupportedLocationType = (
          prevProps.useAppliedValue ?
          prevProps.state.stateAppliedValue :
          prevProps.state.value
        ) as IPropertyDefinitionSupportedLocationType;

        if (!equals(value, oldValue)) {
          this.setState({
            viewport: {
              center: [value.lat, value.lng],
              zoom: IViewportZoomEnumType.LARGE,
            },
          })
        }
      }
    }
  }
  public onViewportChange(viewport: IViewport) {
    this.preventViewportDidUpdateChange = true;
    this.setState({
      viewport,
    });
  }
  public onResetViewportCenter() {
    this.preventViewportDidUpdateChange = false;

    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedLocationType;

    if (value) {
      this.setState({
        viewport: {
          center: [value.lat, value.lng],
          zoom: IViewportZoomEnumType.LARGE,
        },
      });
    }
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>,
    nextState: IPropertyViewLocationRendererState,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.useAppliedValue !== nextProps.useAppliedValue ||
      (!this.props.useAppliedValue && !equals(this.props.state.value, nextProps.state.value)) ||
      (this.props.useAppliedValue && !equals(this.props.state.stateAppliedValue, nextProps.state.stateAppliedValue)) ||
      !equals(this.state, nextState) ||
      nextProps.property !== this.props.property ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.country !== this.props.country ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedLocationType;

    let canResetViewportCenter: boolean = false;
    if (value) {
      const expectedViewport = {
        center: [value.lat, value.lng],
        zoom: IViewportZoomEnumType.LARGE,
      };
      canResetViewportCenter = !equals(expectedViewport, this.state.viewport);
    }
    
    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewLocationRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue: value,
      viewport: this.state.viewport,
      onViewportChange: this.onViewportChange,
      onResetViewportCenter: this.onResetViewportCenter,
      canResetViewportCenter,
    };

    return <RendererElement {...rendererArgs}/>
  }
}