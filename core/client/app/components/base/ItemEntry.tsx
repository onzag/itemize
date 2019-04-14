import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType, IPropertyDefinitionValue,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext } from "../..";
import PropertyEntry from "./PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import { IItemValue } from "../../../../base/ItemDefinition/Item";

import "../../../theme/item-entry.scss";

interface IParentedItemEntryProps {
  value: IItemValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  displayHidden?: boolean;
  poked?: boolean;
  language: string;
}

class ParentedItemEntry extends React.Component<IParentedItemEntryProps, {}> {
  constructor(props: IParentedItemEntryProps) {
    super(props);
  }

  public render() {
    const i18nName = this.props.value.item.getI18nNameFor(this.props.language);

    const hasNoItemEntryDataToShow =
      !this.props.value.itemDefinitionValue.properties.length &&
      !this.props.value.itemDefinitionValue.items.length;

    return (
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className="item-parented-entry-label">{i18nName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="item-entry-expansion-panel-details">
          {
            hasNoItemEntryDataToShow ? null :
            <ItemEntry
              value={this.props.value.itemDefinitionValue}
              onPropertyChange={this.props.onPropertyChange}
              displayHidden={this.props.displayHidden}
              poked={this.props.poked}
              disableTitle={true}
              disableContainment={true}
            />
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

interface IItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  useAlt?: boolean;
  disableTitle?: boolean;
  disableContainment?: boolean;
  displayHidden?: boolean;
  poked?: boolean;
  markAsUncommon?: string[];
  markAsRare?: string[];
  markAsHidden?: string[];
}

// tslint:disable-next-line: max-classes-per-file
export default class ItemEntry extends React.Component<IItemEntryProps, {}> {
  constructor(props: IItemEntryProps) {
    super(props);
  }
  public render() {
    const basicPropertyEntries = [];
    const uncommonPropertyEntries = [];
    const rarePropertyEntries = [];
    const rareAndUncommonPropertyEntries = [];

    this.props.value.properties.forEach((propertyValue) => {
      if (
        (
          propertyValue.hidden ||
          (this.props.markAsHidden || []).includes(propertyValue.propertyDefinition.getId())
        ) &&
        !this.props.displayHidden
      ) {
        return;
      }

      let targetArray = basicPropertyEntries;
      const isRare = propertyValue.propertyDefinition.isRare() ||
        (this.props.markAsRare || []).includes(propertyValue.propertyDefinition.getId());
      const isUncommon = propertyValue.propertyDefinition.isUncommon() ||
        (this.props.markAsUncommon || []).includes(propertyValue.propertyDefinition.getId());

      if (isRare && isUncommon) {
        targetArray = rareAndUncommonPropertyEntries;
      } else if (isRare) {
        targetArray = rarePropertyEntries;
      } else if (isUncommon) {
        targetArray = uncommonPropertyEntries;
      }

      targetArray.push(
        <PropertyEntry
          key={propertyValue.propertyDefinition.getId()}
          property={propertyValue.propertyDefinition}
          value={propertyValue}
          onChange={this.props.onPropertyChange.bind(this, propertyValue.propertyDefinition)}
          poked={this.props.poked}
          uncommon={isUncommon}
        />,
      );
    });

    return (
      <LocaleContext.Consumer>
      {
        (locale) => {
          const i18nData = this.props.value.itemDefinition.getI18nDataFor(locale.language);
          const itemEntries = this.props.value.items.map((ie) => {
            return (
              <ParentedItemEntry
                key={ie.item.getId()}
                value={ie}
                onPropertyChange={this.props.onPropertyChange}
                displayHidden={this.props.displayHidden}
                poked={this.props.poked}
                language={locale.language}
              />
            );
          });

          const data = (
            <React.Fragment>
              {this.props.disableTitle ?
                null :
                <Typography className="item-entry-title">{i18nData.createFormTitle}</Typography>}
              {basicPropertyEntries}
              {uncommonPropertyEntries.length ? (
                <ExpansionPanel defaultExpanded={true}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className="item-entry-uncommon-label">
                      {locale.i18n.uncommon_properties_label}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="item-entry-expansion-panel-details">
                    {uncommonPropertyEntries}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
              {itemEntries}
              {rarePropertyEntries.length ? (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className="item-entry-rare-label">{locale.i18n.rare_properties_label}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="item-entry-expansion-panel-details">
                    {rarePropertyEntries}
                    {rareAndUncommonPropertyEntries.length ? (
                      <React.Fragment>
                        <Typography className="item-entry-rare-and-uncommon-label">
                          {locale.i18n.uncommon_properties_label}
                        </Typography>
                        {rareAndUncommonPropertyEntries}
                      </React.Fragment>
                    ) : null}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
            </React.Fragment>
          );

          if (this.props.disableContainment) {
            return data;
          }

          return (
            <div className="item-entry-container">
              {data}
            </div>
          );
        }
      }
      </LocaleContext.Consumer>
    );
  }
}
