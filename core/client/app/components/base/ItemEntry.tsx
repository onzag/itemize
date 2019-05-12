import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType, IPropertyDefinitionValue,
} from "../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext, Ii18NType, ILocaleType } from "../..";
import PropertyEntry from "./PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Icon,
  Stepper,
  StepLabel,
  Step,
  StepContent,
  StepButton,
  Button,
  withMobileDialog,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
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

interface IWizardItemEntryProps {
  value: IItemDefinitionValue;
  onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
  onItemSetExclusionState: (item: Item, state: ItemExclusionState) => void;
  displayHidden?: boolean;
  markAsHidden?: string[];
  disableTitle?: boolean;
  itemDefinition: ItemDefinition;
  asDialog?: boolean;
  dialogOpen?: boolean;
  onDialogClose?: () => void;
  onSubmit: () => void;
}

enum WizardStepValueStatus {
  COMPLETED = "COMPLETED",
  COMPLETED_FAILED = "COMPLETED_FAILED",
  COMPLETED_WARNING = "COMPLETED_WARNING",
}

interface IWizardItemEntryState {
  activeStep: string;
  activeStepAsNumber: number;
  valuesStatus: {
    [key: string]: WizardStepValueStatus;
  };
  pokeStatus: {
    [key: string]: boolean;
  };
  steps: IWizardStepDefinitionReferenceType[];
  showErrorMessage: boolean;
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
  nodeFn: (poked: boolean, locale: ILocaleType) => React.ReactNode;
}

interface IWizardStepDefinitionReferenceType {
  key: string;
  value: IWizardStepDataContainerType[] | IWizardStepDataContainerType;
  fn: (
    index: number,
    allSteps: IWizardStepDefinitionReferenceType[],
    selfStepKey: string,
    previousStepKey: string,
    nextStepKey: string,
    locale: ILocaleType,
    goToStep: any,
  ) => {
    prevButtonFn: any,
    nextButtonFn: any,
    node: React.ReactNode,
    failed: boolean,
    missing: boolean,
  };
}

function renderButtons(
  prevButtonFn: () => void,
  nextButtonFn: () => void,
  locale: ILocaleType,
  isLast: boolean,
) {
  return (
    <React.Fragment>
      {prevButtonFn ? <Button
        color="primary"
        onClick={prevButtonFn}
        className="item-entry-button-prev"
      >
        <Icon>keyboard_arrow_left</Icon>
        {locale.i18n.wizard_prev}
      </Button> : null}
      <Button
        color="primary"
        onClick={nextButtonFn}
        className="item-entry-button-next"
      >
        {isLast ? locale.i18n.wizard_submit : locale.i18n.wizard_next}
        <Icon>keyboard_arrow_right</Icon>
      </Button>
    </React.Fragment>
  );
}

// tslint:disable-next-line: max-classes-per-file
export class WizardItemEntry extends React.Component<IWizardItemEntryProps, IWizardItemEntryState> {
  public static getDerivedStateFromProps(
    props: IWizardItemEntryProps,
    state: IWizardItemEntryState,
  ) {
    const basicBasePropertyEntries: IWizardStepDataContainerType[] = [];
    const basicExtendedPropertyEntries: IWizardStepDataContainerType[] = [];
    const moderatePropertyEntries: IWizardStepDataContainerType[] = [];
    const rarePropertyEntries: IWizardStepDataContainerType[] = [];

    props.value.properties.forEach((propertyValue) => {
      const propertyDefinition = props.itemDefinition.getPropertyDefinitionFor(propertyValue.propertyId, true);
      if (
        (
          propertyValue.hidden ||
          (props.markAsHidden || []).includes(propertyDefinition.getId())
        ) &&
        !props.displayHidden
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
              onChange={props.onPropertyChange.bind(this, propertyDefinition)}
              poked={poked}
            />
          ),
        },
      );
    });

    const itemEntries = props.value.items.map((ie) => {
      const item = props.itemDefinition.getItemFor(ie.itemId);
      return {
        item,
        value: ie,
        nodeFn: (poked: boolean, locale: ILocaleType) => (
          <ParentedItemEntry
            key={ie.itemId}
            value={ie}
            onPropertyChange={props.onPropertyChange}
            onItemSetExclusionState={props.onItemSetExclusionState}
            displayHidden={props.displayHidden}
            poked={poked}
            language={locale.language}
            i18n={locale.i18n}
            parentItemDefinition={props.itemDefinition}
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
            allSteps,
            selfStepKey,
            previousStepKey,
            nextStepKey,
            locale,
            goToStep,
          ) => {
            const stepStatus = state.valuesStatus[selfStepKey];
            const pokeStatus = state.pokeStatus[selfStepKey];
            let labelErrored = false;
            const stepIconProps: any = { classes: { root: "item-entry-wizard-icon" } };
            if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_FAILED) {
              stepIconProps.classes.root += " item-entry-wizard-icon--failed";
              labelErrored = true;
            } else if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_WARNING) {
              stepIconProps.classes.root += " item-entry-wizard-icon--warning";
            }
            const prevButtonFn = previousStepKey ?
              goToStep.bind(this, previousStepKey, false) : null;
            const nextButtonFn = goToStep.bind(this, nextStepKey, true);
            return {
              prevButtonFn,
              nextButtonFn,
              failed: stepStatus === WizardStepValueStatus.COMPLETED_FAILED,
              missing: !stepStatus,
              node: (
                <Step key={selfStepKey} completed={typeof stepStatus !== "undefined"}>
                  <StepButton
                    onClick={goToStep.bind(this, selfStepKey, false)}
                  >
                    <StepLabel
                      error={labelErrored}
                      StepIconProps={stepIconProps}
                    >
                      {locale.i18n[p.i18n]}
                    </StepLabel>
                  </StepButton>
                  <StepContent>
                    {p.value.map((m) => m.nodeFn(pokeStatus, locale))}
                    {
                      props.asDialog ?
                      null :
                      renderButtons(prevButtonFn, nextButtonFn, locale, index === allSteps.length - 1)
                    }
                  </StepContent>
                </Step>
              ),
            };
          },
        };
      }),

      ...itemEntries.map((ie) => ({
        key: `item-entry-${ie.item.getId()}`,
        value: ie,
        fn: (
          index,
          allSteps,
          selfStepKey,
          previousStepKey,
          nextStepKey,
          locale,
          goToStep,
        ) => {
          const stepStatus = state.valuesStatus[selfStepKey];
          const pokeStatus = state.pokeStatus[selfStepKey];
          let labelErrored = false;
          const stepIconProps: any = { classes: { root: "item-entry-wizard-icon" } };
          if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_FAILED) {
            labelErrored = true;
            stepIconProps.classes.root += " item-entry-wizard-icon--failed";
          } else if (pokeStatus && stepStatus === WizardStepValueStatus.COMPLETED_WARNING) {
            stepIconProps.classes.root += " item-entry-wizard-icon--warning";
          }
          const prevButtonFn = previousStepKey ?
            goToStep.bind(this, previousStepKey, false) : null;
          const nextButtonFn = goToStep.bind(this, nextStepKey, true);
          return {
            prevButtonFn,
            nextButtonFn,
            failed: stepStatus === WizardStepValueStatus.COMPLETED_FAILED,
            missing: !stepStatus,
            node: (
              <Step key={selfStepKey} completed={typeof stepStatus !== "undefined"}>
                <StepButton
                  onClick={goToStep.bind(this, selfStepKey, false)}
                >
                  <StepLabel
                    error={labelErrored}
                    StepIconProps={stepIconProps}
                  >
                    {ie.item.getI18nNameFor(locale.language)}
                  </StepLabel>
                </StepButton>
                <StepContent>
                  {ie.nodeFn(pokeStatus, locale)}
                  {
                    props.asDialog ?
                    null :
                    renderButtons(prevButtonFn, nextButtonFn, locale, index === allSteps.length - 1)
                  }
                </StepContent>
              </Step>
            ),
          };
        },
      }),
      ),
    ].filter((m) => !!m);

    let activeStepAsNumber =
      steps.findIndex((step) => step.key === state.activeStep);
    if (activeStepAsNumber === -1) {
      activeStepAsNumber = 0;
    }

    const actualActiveStep = steps[activeStepAsNumber].key;

    return {
      steps,
      activeStep: actualActiveStep,
      activeStepAsNumber,
    };
  }

  constructor(props: IWizardItemEntryProps) {
    super(props);

    this.state = {
      activeStep: "extended-prop-entries",
      activeStepAsNumber: 0,
      valuesStatus: {},
      pokeStatus: {},
      steps: [],
      showErrorMessage: false,
    };

    this.goToStep = this.goToStep.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
  }
  public hideErrorMessage() {
    this.setState({
      showErrorMessage: false,
    });
  }
  public goToStep(
    id: string,
    preventIfActiveIsFail: boolean,
  ) {
    if (id === this.state.activeStep) {
      return;
    }

    const checkedSteps = this.state.steps.filter((s) => this.state.valuesStatus[s.key]);
    const activeStep = this.state.steps[this.state.activeStepAsNumber];
    let nextStepAsNumber = this.state.steps.findIndex((s) => s.key === id);
    if (nextStepAsNumber === -1) {
      nextStepAsNumber = 0;
    }
    const nextStep = this.state.steps[nextStepAsNumber];

    const stepsBehindThisStep = this.state.steps.slice(0, nextStepAsNumber);
    const extraStepsToCheck = checkedSteps.concat([activeStep])
      .filter((p) => !stepsBehindThisStep.find((s) => s.key === p.key));

    const nValuesStatus = { ...this.state.valuesStatus };
    const nPokeStatus = { ...this.state.pokeStatus };
    let activeIsValid = true;
    let firstFailedStateNotSelf: IWizardStepDefinitionReferenceType = null;
    extraStepsToCheck.concat(stepsBehindThisStep).forEach((stepToCheck) => {
      let isAllValid: boolean;
      let isAWarning: boolean;
      if (Array.isArray(stepToCheck.value)) {
        isAllValid = checkMultipleWizardStepIsValid(stepToCheck.value);
        isAWarning = checkMultipleWizardStepForWarning(stepToCheck.value);
      } else {
        isAllValid = checkSingleWizardStepIsValid(stepToCheck.value);
        isAWarning = checkSingleWizardStepForWarning(stepToCheck.value);
      }
      if (stepToCheck.key === activeStep.key) {
        activeIsValid = isAllValid;
      }
      nValuesStatus[stepToCheck.key] = isAllValid ?
        (isAWarning ? WizardStepValueStatus.COMPLETED_WARNING :
          WizardStepValueStatus.COMPLETED) : WizardStepValueStatus.COMPLETED_FAILED;

      if (stepToCheck.key !== nextStep.key) {
        nPokeStatus[stepToCheck.key] = true;

        if (!isAllValid && !firstFailedStateNotSelf) {
          firstFailedStateNotSelf = stepToCheck;
        }
      }
    });

    if (preventIfActiveIsFail && !activeIsValid) {
      this.setState({
        valuesStatus: nValuesStatus,
        pokeStatus: nPokeStatus,
      });
    } else if (!id && firstFailedStateNotSelf) {
      this.setState({
        showErrorMessage: true,
        activeStep: firstFailedStateNotSelf.key,
        valuesStatus: nValuesStatus,
        pokeStatus: nPokeStatus,
      });
    } else if (!id) {
      this.props.onSubmit();
    } else {
      this.setState({
        activeStep: id,
        valuesStatus: nValuesStatus,
        pokeStatus: nPokeStatus,
      });
    }
  }
  public render() {
    return (
      <LocaleContext.Consumer>
        {
          (locale) => {
            const i18nData = this.props.itemDefinition.getI18nDataFor(locale.language);

            const stepsNodeDataArray = this.state.steps.map((m, i, arr) =>
              m.fn(
                i,
                this.state.steps,
                m.key,
                arr[i - 1] ? arr[i - 1].key : null,
                arr[i + 1] ? arr[i + 1].key : null,
                locale,
                this.goToStep,
              ),
            );

            const currentNodeData = stepsNodeDataArray[this.state.activeStepAsNumber];
            const currentNodeIsLast = stepsNodeDataArray.length - 1 === this.state.activeStepAsNumber;

            const data = (
              <React.Fragment>
                {this.props.disableTitle || this.props.asDialog ?
                  null :
                  <Typography className="item-entry-wizard-title">{i18nData.createFormTitle}</Typography>}
                <Stepper nonLinear={true} activeStep={this.state.activeStepAsNumber} orientation="vertical">
                  {stepsNodeDataArray.map((nd) => nd.node)}
                </Stepper>
              </React.Fragment>
            );

            if (this.props.asDialog) {
              return (
                <React.Fragment>
                  <ItemEntryDialog
                    fullScreen={true}
                    open={this.props.dialogOpen}
                    title={i18nData.createFormTitle}
                    onClose={this.props.onDialogClose}
                    buttons={
                      renderButtons(
                        currentNodeData.prevButtonFn,
                        currentNodeData.nextButtonFn,
                        locale,
                        currentNodeIsLast,
                      )
                    }
                  >
                    {data}
                  </ItemEntryDialog>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={this.state.showErrorMessage}
                    autoHideDuration={6000}
                    onClose={this.hideErrorMessage}
                  >
                    <SnackbarContent
                      aria-describedby="client-snackbar"
                      message={
                        <span id="client-snackbar">
                          <Icon>error</Icon>
                          {locale.i18n.wizard_invalid_message}
                        </span>
                      }
                      action={[
                        <IconButton
                          key="close"
                          color="inherit"
                          onClick={this.hideErrorMessage}
                        >
                          <Icon>close</Icon>
                        </IconButton>,
                      ]}
                    />
                  </Snackbar>
                </React.Fragment>
              );
            }

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
  asDialog?: boolean;
  dialogOpen?: boolean;
  onDialogClose?: () => void;
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
                {this.props.disableTitle || this.props.asDialog ?
                  null :
                  <Typography className="item-entry-title">{i18nData.createFormTitle}</Typography>}
                {basicPropertyEntries}
                {itemEntries}
                {moderatePropertyEntries.length ? (
                  <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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

            if (this.props.asDialog) {
              return (
                <ItemEntryDialog
                  fullScreen={true}
                  open={this.props.dialogOpen}
                  title={i18nData.createFormTitle}
                  onClose={this.props.onDialogClose}
                >
                  {data}
                </ItemEntryDialog>
              );
            }

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

interface IItemEntryDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: any;
  fullScreen?: boolean;
  buttons?: React.ReactNode;
}

function ItemEntryDialog(props: IItemEntryDialogProps) {
  return (
    <Dialog
      classes={{
        paper: "item-entry-dialog",
      }}
      open={props.open}
      onClose={props.onClose}
      fullScreen={props.fullScreen}
      scroll="paper"
    >
      <AppBar className="item-entry-dialog-appbar">
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
            <Icon>close</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit" className="item-entry-dialog-title">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className="item-entry-dialog-content">
        {props.children}
      </DialogContent>
      {props.buttons ? <DialogActions className="item-entry-dialog-actions">
        {props.buttons}
      </DialogActions> : null}
    </Dialog>
  );
}