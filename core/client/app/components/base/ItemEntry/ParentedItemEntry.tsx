import React from "react";
import ItemDefinition from "../../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Icon,
} from "@material-ui/core";
import Item, { IItemValue, ItemExclusionState } from "../../../../../base/ItemDefinition/Item";
import {
  PropertyEntryBooleanAsSwitchBase,
  PropertyEntryBooleanAsRadioBase,
} from "../PropertyEntry/PropertyEntryBoolean";

import ItemEntry from ".";
import { Ii18NType } from "../../../../../base/Root";

interface IParentedItemEntryProps {
  value: IItemValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  onItemSetExclusionState: (item: Item, state: ItemExclusionState) => void;
  displayHidden?: boolean;
  poked?: boolean;
  language: string;
  i18n: Ii18NType;
  parentItemDefinition: ItemDefinition;
  disableExpansionPanel?: boolean;
  autoFocusFirst?: boolean;
}

export default class ParentedItemEntry extends React.Component<IParentedItemEntryProps, {}> {
  constructor(props: IParentedItemEntryProps) {
    super(props);

    this.setExclusionState = this.setExclusionState.bind(this);
  }

  public setExclusionState(item: Item, state: ItemExclusionState) {
    this.props.onItemSetExclusionState(item, state);
  }

  public render() {
    const item = this.props.parentItemDefinition.getItemFor(this.props.value.itemId);
    const i18nName = item.getI18nNameFor(this.props.language);

    const hasNoItemEntryDataToShow =
      this.props.value.itemDefinitionValue === null ||
      (!this.props.value.itemDefinitionValue.properties.length &&
        !this.props.value.itemDefinitionValue.items.length);

    let exclusionSwitch = null;
    if (this.props.value.canExclusionBeSet) {
      const i18nData = item.getI18nDataFor(this.props.language);
      if (item.isExclusionTernary()) {
        exclusionSwitch = (
          <PropertyEntryBooleanAsRadioBase
            onChange={this.setExclusionState.bind(this, item)}
            value={this.props.value.exclusionState}
            values={[{
              value: ItemExclusionState.ANY,
              label: i18nData.anyLabel,
            }, {
              value: ItemExclusionState.INCLUDED,
              label: i18nData.includedLabel,
            }, {
              value: ItemExclusionState.EXCLUDED,
              label: i18nData.excludedLabel,
            }]}
            label={i18nData.exclusionTernarySelectorLabel}
          />
        );
      } else {
        exclusionSwitch = (
          <PropertyEntryBooleanAsSwitchBase
            onChange={this.setExclusionState.bind(
              this,
              item,
              (
                this.props.value.exclusionState === ItemExclusionState.EXCLUDED ?
                  ItemExclusionState.INCLUDED :
                  ItemExclusionState.EXCLUDED
              ),
            )}
            checked={this.props.value.exclusionState === ItemExclusionState.EXCLUDED}
            label={i18nData.exclusionSelectorLabel}
          />
        );
      }
    }

    let exclusionWarning = null;
    if (
      this.props.value.exclusionState === ItemExclusionState.EXCLUDED &&
      item.isExclusionCallout()
    ) {
      exclusionWarning = (
        <div className="item-parented-callout-warning">
          <Typography>
            <Icon>warning</Icon>
            {this.props.i18n.callout_exclude_warning}
          </Typography>
        </div>
      );
    }

    const content = (
      <React.Fragment>
        {exclusionSwitch}
        {exclusionWarning}
        {
          hasNoItemEntryDataToShow ? null :
            <ItemEntry
              value={this.props.value.itemDefinitionValue}
              onPropertyChange={this.props.onPropertyChange}
              onItemSetExclusionState={this.props.onItemSetExclusionState}
              displayHidden={this.props.displayHidden}
              poked={this.props.poked}
              disableTitle={true}
              disableContainment={true}
              itemDefinition={item.getItemDefinition()}
              autoFocusFirst={this.props.autoFocusFirst}
            />
        }
      </React.Fragment>
    );

    if (this.props.disableExpansionPanel) {
      return content;
    }

    return (
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="item-parented-entry-label">{i18nName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="item-entry-expansion-panel-details">
          {content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
