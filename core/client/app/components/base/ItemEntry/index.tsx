import React from "react";
import ItemDefinition, {
  IItemDefinitionValue,
} from "../../../../../base/ItemDefinition";
import PropertyDefinition, {
  PropertyDefinitionSupportedType, IPropertyDefinitionValue,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import { LocaleContext, ILocaleType } from "../../..";
import PropertyEntry from "../PropertyEntry";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography, Button, Icon, Snackbar, SnackbarContent, IconButton,
} from "@material-ui/core";
import Item, { ItemExclusionState, IItemValue } from "../../../../../base/ItemDefinition/Item";

import "../../../../theme/item-entry.scss";

import WizardItemEntry from "./WizardItemEntry";
import ParentedItemEntry from "./ParentedItemEntry";
import { ItemEntryDialogResponsive } from "./Dialog";

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
  autoFocusFirst?: boolean;

  asDialog?: boolean;
  dialogOpen?: boolean;
  onDialogClose?: () => void;
  onDialogSubmit?: () => void;
  onDialogCancel?: () => void;
}

interface IItemEntryState {
  poked: boolean;
  showErrorMessage: boolean;
}

function renderButtons(
  cancelButtonFn: () => void,
  okButtonFn: () => void,
  locale: ILocaleType,
) {
  return (
    <React.Fragment>
      {cancelButtonFn ? <Button
        color="secondary"
        onClick={cancelButtonFn}
        className="item-entry-button-prev"
      >
        <Icon>clear</Icon>
        &nbsp;
        {locale.i18n.cancel}
      </Button> : null}
      <Button
        color="primary"
        onClick={okButtonFn}
        className="item-entry-button-next"
      >
        {locale.i18n.ok}
        &nbsp;
        <Icon>done</Icon>
      </Button>
    </React.Fragment>
  );
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

function checkAllItemsAreValid(values: IItemValue[]) {
  return values.every(checkItemValueIsValid);
}

export default class ItemEntry extends React.Component<IItemEntryProps, IItemEntryState> {
  constructor(props: IItemEntryProps) {
    super(props);

    this.state = {
      poked: false,
      showErrorMessage: false,
    };

    this.attemptSubmit = this.attemptSubmit.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
  }
  public attemptSubmit() {
    let isValid = checkAllPropertiesAreValid(this.props.value.properties);
    if (isValid) {
      isValid = checkAllItemsAreValid(this.props.value.items);
    }

    if (!isValid) {
      this.setState({
        showErrorMessage: true,
        poked: true,
      });
    } else {
      this.props.onDialogSubmit();
    }
  }
  public hideErrorMessage() {
    this.setState({
      showErrorMessage: false,
    });
  }
  public render() {
    const basicPropertyEntries = [];
    const moderatePropertyEntries = [];
    const rarePropertyEntries = [];

    this.props.value.properties.forEach((propertyValue, index) => {
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
          poked={this.props.poked || this.state.poked}
          autoFocus={this.props.autoFocusFirst && index === 0}
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
                  poked={this.props.poked || this.state.poked}
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
                <React.Fragment>
                  <ItemEntryDialogResponsive
                    open={this.props.dialogOpen}
                    title={i18nData.createFormTitle}
                    onClose={this.props.onDialogClose}
                    buttons={renderButtons(
                      this.props.onDialogCancel,
                      this.attemptSubmit,
                      locale,
                    )}
                  >
                    {data}
                  </ItemEntryDialogResponsive>
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

export { WizardItemEntry };
