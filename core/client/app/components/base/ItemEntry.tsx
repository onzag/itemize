import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext, Ii18NType } from "../..";
import PropertyEntry from "./PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Icon, Stepper, StepLabel, Step, StepContent, StepButton } from "@material-ui/core";
import Item, { IItemValue, ItemExclusionState } from "../../../../base/ItemDefinition/Item";

import "../../../theme/item-entry.scss";
import {
  PropertyEntryBooleanAsSwitchBase,
  PropertyEntryBooleanAsRadioBase,
} from "./PropertyEntry/PropertyEntryBoolean";

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
}

class ParentedItemEntry extends React.Component<IParentedItemEntryProps, {}> {
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
          />
        }
      </React.Fragment>
    );

    if (this.props.disableExpansionPanel) {
      return content;
    }

    return (
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className="item-parented-entry-label">{i18nName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="item-entry-expansion-panel-details">
          {content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

interface IWizardItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  onItemSetExclusionState: (item: Item, state: ItemExclusionState) => void;
  poked?: boolean;
  displayHidden?: boolean;
  markAsHidden?: string[];
  disableTitle?: boolean;
  itemDefinition: ItemDefinition;
}

interface IWizardItemEntryState {
  activeStep: string;
}

// tslint:disable-next-line: max-classes-per-file
export class WizardItemEntry extends React.Component<IWizardItemEntryProps, IWizardItemEntryState> {
  constructor(props: IItemEntryProps) {
    super(props);

    this.state = {
      activeStep: "extended-prop-entries",
    };

    this.goToStep = this.goToStep.bind(this);
  }
  public goToStep(n: string) {
    if (n === this.state.activeStep) {
      return;
    }

    this.setState({
      activeStep: n,
    });
  }
  public render() {
    const basicBasePropertyEntries = [];
    const basicExtendedPropertyEntries = [];
    const moderatePropertyEntries = [];
    const rarePropertyEntries = [];

    this.props.value.properties.forEach((propertyValue) => {
      const propertyDefinition = this.props.itemDefinition.getPropertyDefinitionFor(propertyValue.propertyId, true);
      if (
        (
          propertyValue.hidden ||
          (this.props.markAsHidden || []).includes(propertyDefinition.getId())
        ) &&
        !this.props.displayHidden
      ) {
        return;
      }

      let targetArray = propertyDefinition.checkIfIsExtension() ?
        basicExtendedPropertyEntries : basicBasePropertyEntries;
      const rarity = propertyDefinition.getRarity();

      if (rarity === "rare") {
        targetArray = rarePropertyEntries;
      } else if (rarity === "moderate") {
        targetArray = moderatePropertyEntries;
      }

      targetArray.push(
        {
          propertyDefinition,
          node: (
            <PropertyEntry
              key={propertyDefinition.getId()}
              property={propertyDefinition}
              value={propertyValue}
              onChange={this.props.onPropertyChange.bind(this, propertyDefinition)}
              poked={this.props.poked}
            />
          ),
        },
      );
    });

    return (
      <LocaleContext.Consumer>
      {
        (locale) => {
          const i18nData = this.props.itemDefinition.getI18nDataFor(locale.language);
          const itemEntries = this.props.value.items.map((ie) => {
            const item = this.props.itemDefinition.getItemFor(ie.itemId);
            return {
              item,
              node: (
                <ParentedItemEntry
                  key={ie.itemId}
                  value={ie}
                  onPropertyChange={this.props.onPropertyChange}
                  onItemSetExclusionState={this.props.onItemSetExclusionState}
                  displayHidden={this.props.displayHidden}
                  poked={this.props.poked}
                  language={locale.language}
                  i18n={locale.i18n}
                  parentItemDefinition={this.props.itemDefinition}
                  disableExpansionPanel={true}
                />
              ),
            };
          });

          // TODO catch invalid steps that has been skipped or are invalid
          // do something about them
          // need to have the following, uncompleted, in progress, completed,
          // completed_failed, completed_warning
          const steps = [
            basicExtendedPropertyEntries.length ?
              {
                key: "extended-prop-entries",
                fn: (index: number, selfStep: string, nextStep: string) => (
                  <Step key={selfStep}>
                    <StepButton onClick={this.goToStep.bind(this, selfStep)}>
                      {locale.i18n.extended_properties_wizard_label}
                    </StepButton>
                    <StepContent>
                      {basicExtendedPropertyEntries.map((m) => m.node)}
                    </StepContent>
                  </Step>
                ),
              } : null,

            basicBasePropertyEntries.length ?
              {
                key: "base-prop-entries",
                fn: (index: number, selfStep: string, nextStep: string) => (
                  <Step key={selfStep}>
                    <StepButton onClick={this.goToStep.bind(this, selfStep)}>
                      {locale.i18n.base_properties_wizard_label}
                    </StepButton>
                    <StepContent>
                      {basicBasePropertyEntries.map((m) => m.node)}
                    </StepContent>
                  </Step>
                ),
              } : null,

            moderatePropertyEntries.length ?
              {
                key: "moderate-prop-entries",
                fn: (index: number, selfStep: string, nextStep: string) => (
                  <Step key={selfStep}>
                    <StepButton onClick={this.goToStep.bind(this, selfStep)}>
                      {locale.i18n.moderate_properties_wizard_label}
                    </StepButton>
                    <StepContent>
                      {moderatePropertyEntries.map((m) => m.node)}
                    </StepContent>
                  </Step>
                ),
              } : null,

            rarePropertyEntries.length ?
              {
                key: "rare-prop-entries",
                fn: (index: number, selfStep: string, nextStep: string) => (
                  <Step key={selfStep}>
                    <StepButton onClick={this.goToStep.bind(this, selfStep)}>
                      {locale.i18n.rare_properties_wizard_label}
                    </StepButton>
                    <StepContent>
                      {rarePropertyEntries.map((m) => m.node)}
                    </StepContent>
                  </Step>
                ),
              } : null,

            ...itemEntries.map((ie) => ({
                key: `item-entry-${ie.item.getId()}`,
                fn: (
                  (index: number, selfStep: string, nextStep: string) =>
                  (<Step key={selfStep}>
                    <StepButton onClick={this.goToStep.bind(this, selfStep)}>
                      {ie.item.getI18nNameFor(locale.language)}
                    </StepButton>
                    <StepContent>
                      {ie.node}
                    </StepContent>
                  </Step>)),
              }),
            ),
          ].filter((m) => !!m).map((m, i, arr) => m.fn(i, arr[i].key, arr[i + 1] ? arr[i + 1].key : null));

          let activeStepAsNumber =
            steps.findIndex((step) => step.key === this.state.activeStep);
          if (activeStepAsNumber === -1) {
            activeStepAsNumber = 0;
          }

          const data = (
            <React.Fragment>
              {this.props.disableTitle ?
                null :
                <Typography className="item-entry-wizard-title">{i18nData.createFormTitle}</Typography>}
              <Stepper nonLinear={true} activeStep={activeStepAsNumber} orientation="vertical">
                {steps}
              </Stepper>
            </React.Fragment>
          );

          return (
            <div className="item-entry-wizard-container">
              {data}
            </div>
          );
        }
      }
      </LocaleContext.Consumer>
    );
  }
}

interface IItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  onItemSetExclusionState: (item: Item, state: ItemExclusionState) => void;
  disableTitle?: boolean;
  disableContainment?: boolean;
  displayHidden?: boolean;
  poked?: boolean;
  markAsHidden?: string[];
  itemDefinition: ItemDefinition;
}

// tslint:disable-next-line: max-classes-per-file
export default class ItemEntry extends React.Component<IItemEntryProps, {}> {
  constructor(props: IItemEntryProps) {
    super(props);
  }
  public render() {
    const basicPropertyEntries = [];
    const moderatePropertyEntries = [];
    const rarePropertyEntries = [];

    this.props.value.properties.forEach((propertyValue) => {
      const propertyDefinition = this.props.itemDefinition.getPropertyDefinitionFor(propertyValue.propertyId, true);
      if (
        (
          propertyValue.hidden ||
          (this.props.markAsHidden || []).includes(propertyDefinition.getId())
        ) &&
        !this.props.displayHidden
      ) {
        return;
      }

      let targetArray = basicPropertyEntries;
      const rarity = propertyDefinition.getRarity();

      if (rarity === "rare") {
        targetArray = rarePropertyEntries;
      } else if (rarity === "moderate") {
        targetArray = moderatePropertyEntries;
      }

      targetArray.push(
        <PropertyEntry
          key={propertyDefinition.getId()}
          property={propertyDefinition}
          value={propertyValue}
          onChange={this.props.onPropertyChange.bind(this, propertyDefinition)}
          poked={this.props.poked}
        />,
      );
    });

    return (
      <LocaleContext.Consumer>
      {
        (locale) => {
          const i18nData = this.props.itemDefinition.getI18nDataFor(locale.language);
          const itemEntries = this.props.value.items.map((ie) => {
            return (
              <ParentedItemEntry
                key={ie.itemId}
                value={ie}
                onPropertyChange={this.props.onPropertyChange}
                onItemSetExclusionState={this.props.onItemSetExclusionState}
                displayHidden={this.props.displayHidden}
                poked={this.props.poked}
                language={locale.language}
                i18n={locale.i18n}
                parentItemDefinition={this.props.itemDefinition}
              />
            );
          });

          const data = (
            <React.Fragment>
              {this.props.disableTitle ?
                null :
                <Typography className="item-entry-title">{i18nData.createFormTitle}</Typography>}
              {basicPropertyEntries}
              {itemEntries}
              {moderatePropertyEntries.length ? (
                <ExpansionPanel defaultExpanded={true}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className="item-entry-rarity-moderate-label">
                      {locale.i18n.moderate_properties_label}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="item-entry-expansion-panel-details">
                    {moderatePropertyEntries}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
              {rarePropertyEntries.length ? (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className="item-entry-rarity-rare-label">
                      {locale.i18n.rare_properties_label}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="item-entry-expansion-panel-details">
                    {rarePropertyEntries}
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
