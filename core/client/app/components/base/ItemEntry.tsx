import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext } from "../..";
import PropertyEntry from "./PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";

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
    const basicPropertyEntries = [];
    const rarePropertyEntries = [];

    this.props.value.properties.forEach((propertyValue) => {
      if (propertyValue.value.hidden && !this.props.displayHidden) {
        return;
      }
      let targetArray = basicPropertyEntries;
      if (propertyValue.definition.isRare()) {
        targetArray = rarePropertyEntries;
      }
      targetArray.push(
        <PropertyEntry
          key={propertyValue.definition.getId()}
          property={propertyValue.definition}
          value={propertyValue.value}
          onChange={this.props.onPropertyChange.bind(this, propertyValue.definition)}
          poked={this.props.poked}
        />,
      );
    });
    return (
      <LocaleContext.Consumer>
      {
        (locale) => {
          const i18nData = this.props.itemDefinition.getI18nDataFor(locale.language);
          return (
            <div className="item-entry-container">
              <span>{i18nData.createFormTitle}</span>
              {basicPropertyEntries}
              {rarePropertyEntries.length ? (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className="item-entry-rare-label">{locale.i18n.rare_properties_label}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>{rarePropertyEntries}</ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
            </div>
          );
        }
      }
      </LocaleContext.Consumer>
    );
  }
}
