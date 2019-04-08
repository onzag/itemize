import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext } from "../..";

interface IItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void,
  itemDefinition: ItemDefinition;
  hidePropertyEntries?: string[];
  hideItemComponentEntries?: boolean;
  useAlt?: boolean;
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
            </div>
          );
        }
      }
      </LocaleContext.Consumer>
    );
  }
}