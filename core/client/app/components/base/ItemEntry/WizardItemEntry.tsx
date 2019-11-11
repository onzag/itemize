import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../../base/Root/Module/ItemDefinition";
import PropertyDefinition, {
  IPropertyDefinitionValue,
} from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { LocaleContext, ILocaleContextType } from "../../..";
import PropertyEntry from "../PropertyEntry";
import {
  Typography,
  Icon,
  Stepper,
  StepLabel,
  Step,
  StepContent,
  StepButton,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import Item, { IItemValue, ItemExclusionState } from "../../../../../base/Root/Module/ItemDefinition/Item";

import ParentedItemEntry from "./ParentedItemEntry";
import ItemEntryDialog from "./Dialog";
import { PropertyDefinitionSupportedType } from "../../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

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
  nodeFn: (poked: boolean, locale: ILocaleContextType) => React.ReactNode;
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
    locale: ILocaleContextType,
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
  locale: ILocaleContextType,
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

export default class WizardItemEntry extends React.Component<IWizardItemEntryProps, IWizardItemEntryState> {
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

      const isAutoFocus = targetArray.length === 0;
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
              autoFocus={isAutoFocus}
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
        nodeFn: (poked: boolean, locale: ILocaleContextType) => (
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
            autoFocusFirst={true}
          />
        ),
      };
    });

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
                    className="item-entry-dialog-wizard"
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
