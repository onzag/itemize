import React, { useState } from "react";
import { SubmitActioner } from "../../components/item-definition";
import { Button, PropTypes } from "@material-ui/core";
import { I18nRead } from "../../components/localization";
import { IActionSubmitOptions } from "../../providers/item-definition";
import { ProgressingElement } from "./util";

interface ISubmitButtonProps {
  options: IActionSubmitOptions;
  i18nId: string;
  buttonClassName?: string;
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?: PropTypes.Color;
  buttonEndIcon?: React.ReactNode;
  buttonStartIcon?: React.ReactNode;
  CustomConfirmationComponent?: React.ComponentType<{isActive: boolean, onClose: (continueWithProcess: boolean) => void}>
}

export function SubmitButton(props: ISubmitButtonProps) {
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const CustomConfirmationComponent = props.CustomConfirmationComponent;
  return (
    <SubmitActioner>
      {(actioner) => {
        const submitAction = () => {
          if (props.CustomConfirmationComponent) {
            setConfirmationIsActive(true);
          } else {
            actioner.submit(props.options);
          }
        }
        const onCloseAction = (continueWithProcess: boolean) => {
          setConfirmationIsActive(false);
          if (continueWithProcess) {
            actioner.submit(props.options);
          } else {
            actioner.clean(props.options, "fail");
          }
        }
        return (
          <React.Fragment>
            <ProgressingElement isProgressing={actioner.submitting}>
              <Button
                variant={props.buttonVariant}
                color={props.buttonColor}
                endIcon={props.buttonEndIcon}
                startIcon={props.buttonStartIcon}
                className={props.buttonClassName}
                onClick={submitAction}
              >
                <I18nRead capitalize={true} id={props.i18nId} />
              </Button>
            </ProgressingElement>
            {
              CustomConfirmationComponent ?
                <CustomConfirmationComponent isActive={confirmationIsActive} onClose={onCloseAction}/> :
                null
            }
          </React.Fragment>
        );
      }}
    </SubmitActioner>
  )
}

export function SearchButton() {

}

export function DeleteButton() {

}