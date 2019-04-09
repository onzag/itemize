import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext } from "../..";
import PropertyEntry from "./PropertyEntry";

interface IItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  itemDefinition: ItemDefinition;
  hidePropertyEntries?: string[];
  hideItemComponentEntries?: boolean;
  useAlt?: boolean;
  displayHidden?: boolean;
  poked?: boolean;
}

export default class ItemEntry extends React.Component<IItemEntryProps, {}> {
  constructor(props: IItemEntryProps) {
    super(props);
  }
  public render() {
    return (
      <LocaleContext.Consumer>
      {
        (locale) => {
          const i18nData = this.props.itemDefinition.getI18nDataFor(locale.language);
          return (
            <div className="item-entry-container">
              <span>{i18nData.createFormTitle}</span>
              {this.props.value.properties.map((propertyValue) => {
                if (propertyValue.value.hidden && !this.props.displayHidden) {
                  return null;
                }
                return (
                  <PropertyEntry
                    key={propertyValue.definition.getId()}
                    property={propertyValue.definition}
                    value={propertyValue.value}
                    onChange={this.props.onPropertyChange.bind(this, propertyValue.definition)}
                    poked={this.props.poked}
                  />
                );
              })}
            </div>
          );
        }
      }
      </LocaleContext.Consumer>
    );
  }
}
