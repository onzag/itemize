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

export function isCenterBasicallyEquals(one: [number, number], two: [number, number]) {
  const diffA = Math.abs(one[0] - two[0]);
  const diffB = Math.abs(one[1] - two[1]);

  if (diffA < 0.0001 && diffB < 0.001) {
    return true;
  }

  return false;
}

export class PropertyViewLocation extends React.Component<
  IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>,
  IPropertyViewLocationRendererState
> {
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
  public componentDidUpdate(
    prevProps: IPropertyViewHandlerProps<IPropertyViewLocationRendererProps>,
  ) {
    const oldValue = (
      prevProps.useAppliedValue ?
      prevProps.state.stateAppliedValue :
      prevProps.state.value
    ) as IPropertyDefinitionSupportedLocationType;
    const newValue = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedLocationType;

    if (newValue && !equals(newValue, oldValue)) {
      let isCenteredToOldValue = false;
      if (oldValue) {
        const oldCenter = [oldValue.lat, oldValue.lng] as [number, number];
        isCenteredToOldValue = isCenterBasicallyEquals(this.state.viewport.center, oldCenter);
      }
      if (isCenteredToOldValue || !oldValue) {
        this.setState({
          viewport: {
            center: [newValue.lat, newValue.lng],
            zoom: !oldValue ? IViewportZoomEnumType.LARGE : this.state.viewport.zoom,
          },
        })
      }
    }
  }
  public onViewportChange(viewport: IViewport) {
    this.setState({
      viewport,
    });
  }
  public onResetViewportCenter() {
    const value = (
      this.props.useAppliedValue ?
      this.props.state.stateAppliedValue :
      this.props.state.value
    ) as IPropertyDefinitionSupportedLocationType;

    if (value) {
      const newViewport: IViewport = {
        center: [value.lat, value.lng],
        zoom: IViewportZoomEnumType.LARGE,
      };
      if (!equals(newViewport, this.state.viewport)) {
        this.setState({
          viewport: newViewport,
        });
      }
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
      const expectedViewportCenter = [value.lat, value.lng] as [number, number];
      canResetViewportCenter = !isCenterBasicallyEquals(expectedViewportCenter, this.state.viewport.center);
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