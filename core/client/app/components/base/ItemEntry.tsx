import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType, IPropertyDefinitionValue,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext, Ii18NType } from "../..";
import PropertyEntry from "./PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Icon, Stepper, StepLabel, Step, StepContent, StepButton, Button } from "@material-ui/core";
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
  displayHidden?: boolean;
  markAsHidden?: string[];
  disableTitle?: boolean;
  itemDefinition: ItemDefinition;
}

enum WizardStepValueStatus {
  COMPLETED,
  COMPLETED_FAILED,
  COMPLETED_WARNING,
}

interface IWizardItemEntryState {
  activeStep: string;
  valuesStatus: {
    [key: string]: WizardStepValueStatus;
  };
  pokeStatus: {
    [key: string]: boolean;
  };
}

function checkPropertyValueIsValid(value: IPropertyDefinitionValue) {
  return value.valid;
}

function checkAllPropertiesAreValid(values: IPropertyDefinitionValue[]) {
  return values.every((v) => v.valid);
}

function checkItemValueIsValid(value: IItemValue) {
  if (!value.itemDefinitionValue) {
    return true;
  }
  return checkAllPropertiesAreValid(value.itemDefinitionValue.properties) &&
    value.itemDefinitionValue.items.every((item) => checkItemValueIsValid(item));
}

function checkMultipleWizardStepIsValid(values: IWizardStepDataContainerType[]) {
  return values.every(checkSingleWizardStepIsValid);
}

function checkSingleWizardStepIsValid(value: IWizardStepDataContainerType) {
  if (value.propertyDefinition) {
    return checkPropertyValueIsValid(value.value as IPropertyDefinitionValue);
  } else {
    return checkItemValueIsValid(value.value as IItemValue);
  }
}

function checkMultipleWizardStepForWarning(values: IWizardStepDataContainerType[]) {
  return values.every(checkSingleWizardStepForWarning);
}

function checkSingleWizardStepForWarning(value: IWizardStepDataContainerType) {
  if (value.propertyDefinition) {
    return false;
  } else {
    return (
      value.item.isExclusionCallout() &&
      (value.value as IItemValue).exclusionState === ItemExclusionState.EXCLUDED
    );
  }
}

interface IWizardStepDataContainerType {
  propertyDefinition?: PropertyDefinition;
  item?: Item;
  value: IPropertyDefinitionValue | IItemValue;
  nodeFn: (poked: boolean) => React.ReactNode;
}

interface IWizardStepDefinitionReferenceType {
  key: string;
  value: IWizardStepDataContainerType[] | IWizardStepDataContainerType;
  fn: (
    index: number,
    activeIndex: number,
    selfStep: string,
    previousStep: string,
    allPreviousStep: IWizardStepDefinitionReferenceType[],
    nextStep: string,
    allPreviousStepAndSelf: IWizardStepDefinitionReferenceType[],
    allCheckedSteps: IWizardStepDefinitionReferenceType[],
  ) => React.ReactNode;
}

// tslint:disable-next-line: max-classes-per-file
export class WizardItemEntry extends React.Component<IWizardItemEntryProps, IWizardItemEntryState> {
  constructor(props: IItemEntryProps) {
    super(props);

    this.state = {
      activeStep: "extended-prop-entries",
      valuesStatus: {},
      pokeStatus: {},
    };

    this.goToStep = this.goToStep.bind(this);
  }
  public goToStep(
    n: string,
    stepsToChecked: IWizardStepDefinitionReferenceType[],
    stepsToCheck: IWizardStepDefinitionReferenceType[],
    preventActiveStepChangeIfLastIsFail: boolean,
    avoidPokingLast: boolean,
  ) {
    if (n === this.state.activeStep) {
      return;
    }

    const nValuesStatus = {...this.state.valuesStatus};
    const nPokeStatus = {...this.state.pokeStatus};
    let lastIsValid = false;
    stepsToChecked.concat(stepsToCheck).forEach((stepToCheck, index, arr) => {
      let isAllValid: boolean;
      let isAWarning: boolean;
      if (Array.isArray(stepToCheck.value)) {
        isAllValid = checkMultipleWizardStepIsValid(stepToCheck.value);
        isAWarning = checkMultipleWizardStepForWarning(stepToCheck.value);
      } else {
        isAllValid = checkSingleWizardStepIsValid(stepToCheck.value);
        isAWarning = checkSingleWizardStepForWarning(stepToCheck.value);
      }
      if (index === arr.length - 1) {
        lastIsValid = isAllValid;
      }
      nValuesStatus[stepToCheck.key] = isAllValid ?
        (isAWarning ? WizardStepValueStatus.COMPLETED_WARNING :
          WizardStepValueStatus.COMPLETED) : WizardStepValueStatus.COMPLETED_FAILED;
      if (!(avoidPokingLast && (index === arr.length - 1))) {
        nPokeStatus[stepToCheck.key] = true;
      }
    });

    if (preventActiveStepChangeIfLastIsFail && !lastIsValid) {
      this.setState({
        valuesStatus: nValuesStatus,
        pokeStatus: nPokeStatus,
      });
    } else {
      this.setState({
        activeStep: n,
        valuesStatus: nValuesStatus,
        pokeStatus: nPokeStatus,
      });
    }
  }
  public render() {
    const basicBasePropertyEntries: IWizardStepDataContainerType[] = [];
    const basicExtendedPropertyEntries: IWizardStepDataContainerType[] = [];
    const moderatePropertyEntries: IWizardStepDataContainerType[] = [];
    const rarePropertyEntries: IWizardStepDataContainerType[] = [];

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
          value: propertyValue,
          nodeFn: (poked: boolean) => (
            <PropertyEntry
              key={propertyDefinition.getId()}
              property={propertyDefinition}
              value={propertyValue}
              onChange={this.props.onPropertyChange.bind(this, propertyDefinition)}
              poked={poked}
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
              value: ie,
              nodeFn: (poked: boolean) => (
                <ParentedItemEntry
                  key={ie.itemId}
                  value={ie}
                  onPropertyChange={this.props.onPropertyChange}
                  onItemSetExclusionState={this.props.onItemSetExclusionState}
                  displayHidden={this.props.displayHidden}
                  poked={poked}
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

          const properties = [
            {
              key: "extended-prop-entries",
              value: basicExtendedPropertyEntries,
              i18n: "extended_properties_wizard_label",
            },
            {
              key: "base-prop-entries",
              value: basicBasePropertyEntries,
              i18n: "base_properties_wizard_label",
            },
            {
              key: "moderate-prop-entries",
              value: moderatePropertyEntries,
              i18n: "moderate_properties_wizard_label",
            },
            {
              key: "rare-prop-entries",
              value: rarePropertyEntries,
              i18n: "rare_properties_wizard_label",
            },
          ];

          const steps: IWizardStepDefinitionReferenceType[] = [
            ...properties.map((p) => {
              if (!p.value.length) {
                return null;
              }

              return {
                key: p.key,
                value: p.value,
                fn: (
                  index,
                  activeIndex,
                  selfStep,
                  previousStep,
                  allPreviousStep,
                  nextStep,
                  allPreviousStepAndSelf,
                  allCheckedSteps,
                ) => {
                  const stepStatus = this.state.valuesStatus[selfStep];
                  const pokeStatus = this.state.pokeStatus[selfStep];
                  let className = "item-entry-wizard-icon";
                  const stepIconProps: any = {classes: {root: className}};
                  if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_FAILED) {
                    className += " item-entry-wizard-icon--failed";
                    stepIconProps.icon = <Icon classes={{root: className}}>remove_circle</Icon>;
                  } else if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_WARNING) {
                    className += " item-entry-wizard-icon--warning";
                  }
                  return (
                    <Step key={selfStep} completed={typeof stepStatus !== "undefined"}>
                      <StepButton
                        onClick={this.goToStep.bind(this, selfStep, allCheckedSteps,
                          allPreviousStepAndSelf, false, true)}
                      >
                        <StepLabel StepIconProps={stepIconProps}>{locale.i18n[p.i18n]}</StepLabel>
                      </StepButton>
                      <StepContent>
                        {p.value.map((m) => m.nodeFn(pokeStatus))}
                        {previousStep ? <Button
                          variant="contained"
                          color="primary"
                          onClick={this.goToStep.bind(this, previousStep, allCheckedSteps,
                            allPreviousStep, false, false)}
                        >
                          Prev
                        </Button> : null}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.goToStep.bind(this, nextStep, allCheckedSteps,
                            allPreviousStepAndSelf, true, false)}
                        >
                          Next
                        </Button>
                      </StepContent>
                    </Step>
                  );
                },
              };
            }),

            ...itemEntries.map((ie) => ({
                key: `item-entry-${ie.item.getId()}`,
                value: ie,
                fn: (
                  index,
                  activeIndex,
                  selfStep,
                  previousStep,
                  allPreviousStep,
                  nextStep,
                  allPreviousStepAndSelf,
                  allCheckedSteps,
                ) => {
                  const stepStatus = this.state.valuesStatus[selfStep];
                  const pokeStatus = this.state.pokeStatus[selfStep];
                  let className = "item-entry-wizard-icon";
                  if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_FAILED) {
                    className += " item-entry-wizard-icon--failed";
                  } else if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_WARNING) {
                    className += " item-entry-wizard-icon--warning";
                  }
                  return (
                    <Step key={selfStep} completed={typeof stepStatus !== "undefined"}>
                      <StepButton
                        onClick={this.goToStep.bind(this, selfStep, allCheckedSteps,
                          allPreviousStepAndSelf, false, true)}
                      >
                        <StepLabel StepIconProps={{classes: {root: className}}}>
                          {ie.item.getI18nNameFor(locale.language)}
                        </StepLabel>
                      </StepButton>
                      <StepContent>
                        {ie.nodeFn(pokeStatus)}
                        {previousStep ? <Button
                          variant="contained"
                          color="primary"
                          onClick={this.goToStep.bind(this, previousStep, allCheckedSteps,
                            allPreviousStep, false, false)}
                        >
                          Prev
                        </Button> : null}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.goToStep.bind(this, nextStep, allCheckedSteps,
                            allPreviousStepAndSelf, true, false)}
                        >
                          Next
                        </Button>
                      </StepContent>
                    </Step>
                  );
                },
              }),
            ),
          ].filter((m) => !!m);

          let activeStepAsNumber =
            steps.findIndex((step) => step.key === this.state.activeStep);
          if (activeStepAsNumber === -1) {
            activeStepAsNumber = 0;
          }

          const stepsNodeArray = steps.map((m, i, arr) =>
            m.fn(
              i,
              activeStepAsNumber,
              m.key,
              arr[i - 1] ? arr[i - 1].key : null,
              arr.slice(0, i),
              arr[i + 1] ? arr[i + 1].key : null,
              arr.slice(0, i + 1),
              arr.filter((k) => typeof this.state.valuesStatus[k.key] !== "undefined"),
            ),
          );

          const data = (
            <React.Fragment>
              {this.props.disableTitle ?
                null :
                <Typography className="item-entry-wizard-title">{i18nData.createFormTitle}</Typography>}
              <Stepper nonLinear={true} activeStep={activeStepAsNumber} orientation="vertical">
                {stepsNodeArray}
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
