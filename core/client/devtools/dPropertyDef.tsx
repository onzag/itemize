import React from "react";
import DevToolRawVisualizer from "./dRawVisualizer";
import PropertyDefinition, {
  IPropertyDefinitionValue,
} from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import PropertyEntry from "../app/components/base/PropertyEntry";
import { getItemDefPath } from "./dItemDef";
import { getModulePath } from "./dModule";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

interface IPropertyDefProps {
  property: PropertyDefinition;
  language: string;
}

interface IPropertyDefState {
  expanded: boolean;
  searchMode: boolean;
  detachedPropertyInstance: PropertyDefinition;
  detachedPropertyForMainInstance: PropertyDefinition;
  currentValue: IPropertyDefinitionValue;
  poked: boolean;
}

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  propertyDefItem: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: "2px",
    color: "#000",
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
    paddingTop: "2px",
    paddingBottom: "2px",
  },
};

export function getPropertyDefPath(propertyDef: PropertyDefinition): string {
  if (propertyDef.checkIfIsExtension()) {
    return getModulePath(propertyDef.getParentModule()) +
      "__" + propertyDef.getId();
  }
  return getItemDefPath(propertyDef.getParentItemDefinition()) +
    "__" + propertyDef.getId();
}

export default class DevToolPropertyDefinition extends
  React.Component<IPropertyDefProps, IPropertyDefState> {

  public static getDerivedStateFromProps(
    props: IPropertyDefProps,
    state: IPropertyDefState,
  ): Partial<IPropertyDefState> {
    if (
      !state.detachedPropertyInstance ||
      props.property.getId() !== state.detachedPropertyInstance.getId() ||
      props.property !== state.detachedPropertyForMainInstance
    ) {
      const detachedPropertyInstance = props.property.getNewInstance();
      // Restoration of value attempt
      if (state.currentValue) {
        detachedPropertyInstance.applyValue(state.currentValue);
      }
      return {
        detachedPropertyInstance,
        currentValue: state.currentValue ? state.currentValue :
          detachedPropertyInstance.getCurrentValueNoExternalChecking(),
        detachedPropertyForMainInstance: props.property,
      };
    }
    return null;
  }

  private updateTimeout: NodeJS.Timer;
  private lastUpdateId: number;

  constructor(props: IPropertyDefProps) {
    super(props);

    this.state = {
      expanded: JSON.parse(localStorage.getItem(
        "__dev__propdef__expanded" +
        getPropertyDefPath(props.property),
      ) || "false"),
      searchMode: false,
      currentValue: null,
      detachedPropertyInstance: null,
      detachedPropertyForMainInstance: null,
      poked: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.togglePoked = this.togglePoked.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  public toggleExpand() {
    localStorage.setItem(
      "__dev__propdef__expanded" +
      getPropertyDefPath(this.props.property),
      JSON.stringify(!this.state.expanded),
    );
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  public togglePoked() {
    this.setState({
      poked: !this.state.poked,
    });
  }
  public onChange(newValue: PropertyDefinitionSupportedType, internalValue?: any) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    this.state.detachedPropertyInstance.setCurrentValue(newValue, internalValue);
    this.setState({
      currentValue: this.state.detachedPropertyInstance.getCurrentValueNoExternalChecking(),
    });

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(async () => {
      const newCurrentValue = await this.state.detachedPropertyInstance.getCurrentValue();
      if (this.lastUpdateId === currentUpdateId) {
        this.setState({
          currentValue: newCurrentValue,
        });
      }
    }, 300);
  }
  public render() {
    let valueToStringify = this.state.currentValue;
    // a small hack due to internal values being too long
    if (
      valueToStringify.internalValue !== null &&
      typeof valueToStringify.internalValue !== "string"
    ) {
      valueToStringify = {...this.state.currentValue, internalValue: "[TOO BIG TO DISPLAY]"};
    }

    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const label = i18nData ? i18nData.label : null;
    const nullable = this.props.property.isNullable() ? <span> / nullable</span> : null;
    const hidden = this.props.property.isHidden() ? <span> / hidden</span> : null;
    const rarity = this.props.property.getRarity() !== "standard" ?
      <span> / rarity:{this.props.property.getRarity()}</span> : null;
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
          {nullable}{hidden}{rarity}{retrievalDisabled}{rangedSearchDisabled}
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
            poked={this.state.poked}
          />
          <br/>
          <button onClick={this.togglePoked}>{this.state.poked ? "UnPoke" : "Poke"}</button>
          <br/>
          <code>
            {JSON.stringify(valueToStringify, null, 2)}
          </code>
          <DevToolRawVisualizer content={this.props.property.rawData} />
        </div> : null}
      </div>
    );
  }
}
