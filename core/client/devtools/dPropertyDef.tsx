import * as React from "react";
import DevToolRawVisualizer from "./dRawVisualizer";
import PropertyDefinition, {
  IPropertyValueGetterType,
  PropertyDefinitionSupportedType,
} from "../../base/ItemDefinition/PropertyDefinition";
import PropertyEntry from "../app/components/base/PropertyEntry";

interface IPropertyDefProps {
  property: PropertyDefinition;
  locale: string;
}

interface IPropertyDefState {
  expanded: boolean;
  searchMode: boolean;
  detachedPropertyInstance: PropertyDefinition;
  currentValue: IPropertyValueGetterType;
}

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  propertyDefItem: {
    width: "100%",
    backgroundColor: "#e8f5e9",
    marginTop: "2px",
  },
  propertyDefTitle: {
    width: "100%",
    backgroundColor: "#66bb6a",
    padding: "5px",
    color: "#000000",
    cursor: "pointer",
    userSelect: "none",
  },
  propertyDefChildren: {
    width: "100%",
    paddingLeft: "15px",
    paddingBottom: "2px",
  },
};

export default class DevToolPropertyDefinition extends
  React.Component<IPropertyDefProps, IPropertyDefState> {

  public static getDerivedStateFromProps(
    props: IPropertyDefProps,
    state: IPropertyDefState,
  ): Partial<IPropertyDefState> {
    if (
      !state.detachedPropertyInstance ||
      props.property.getId() !== state.detachedPropertyInstance.getId()
    ) {
      const detachedPropertyInstance = props.property.getNewInstance();
      return {
        detachedPropertyInstance,
        currentValue: detachedPropertyInstance.getCurrentValue(),
      };
    }
    return null;
  }

  constructor(props: IPropertyDefProps) {
    super(props);

    this.state = {
      expanded: false,
      searchMode: false,
      currentValue: null,
      detachedPropertyInstance: null,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  public toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  public onChange(newValue: PropertyDefinitionSupportedType) {
    this.state.detachedPropertyInstance.setCurrentValue(newValue);
    this.setState({
      currentValue: this.state.detachedPropertyInstance.getCurrentValue(),
    });
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.locale);
    const label = i18nData ? i18nData.label : null;
    const nullable = this.props.property.isNullable() ? <span> / nullable</span> : null;
    const hidden = this.props.property.isHidden() ? <span> / hidden</span> : null;
    const rare = this.props.property.isRare() ? <span> / rare</span> : null;
    const retrievalDisabled = this.props.property.isRetrievalDisabled() ?
      <span> / can't retrieve</span> : null;
    const rangedSearchDisabled = this.props.property.isRangedSearchDisabled() ?
      <span> / can't range seach</span> : null;
    const searchLevel =  <span> / search:{this.props.property.getSearchLevel()}</span>;
    return (
      <div style={devtoolsStyle.propertyDefItem}>
        <p
          onClick={this.toggleExpand}
          style={devtoolsStyle.propertyDefTitle}
        >
          <b>{this.state.expanded ? "-" : "+"} </b>
          <b>{this.props.property.getId()}</b>
          <span> / type:{this.props.property.getType()}</span>
          {nullable}{hidden}{rare}{retrievalDisabled}{rangedSearchDisabled}
          {searchLevel}
          {label ? <span> - {label}</span> : null}
          <span> (property definition)</span>
        </p>
        {this.state.expanded ? <div style={devtoolsStyle.propertyDefChildren}>
          <p>
            This is a detached view of the property
            it acts as if all the other properties are in its default
            so the property might be dysfunctional (say as a side effect of
            the default value of another property)
          </p>
          <PropertyEntry
            property={this.props.property}
            value={this.state.currentValue}
            onChange={this.onChange}
          />
          <code>
            {JSON.stringify(this.state.currentValue, null, 2)}
          </code>
          <DevToolRawVisualizer content={this.props.property.rawData} />
        </div> : null}
      </div>
    );
  }
}
