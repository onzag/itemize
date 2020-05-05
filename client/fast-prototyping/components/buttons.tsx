import React, { useState } from "react";
import { Button, PropTypes } from "@material-ui/core";
import { IActionSubmitOptions } from "../../providers/item-definition";
import { ProgressingElement } from "./util";
import SubmitActioner from "../../components/item-definition/SubmitActioner";
import { goBack, localizedRedirectTo } from "../../components/navigation";
import I18nRead from "../../components/localization/I18nRead";

interface ISubmitButtonProps {
  options: IActionSubmitOptions;
  i18nId: string;
  buttonClassName?: string;
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?: PropTypes.Color;
  buttonEndIcon?: React.ReactNode;
  buttonStartIcon?: React.ReactNode;
  CustomConfirmationComponent?: React.ComponentType<{isActive: boolean, onClose: (continueWithProcess: boolean) => void}>;
  redirectOnSuccess?: string;
  redirectGoBack?: boolean;
  redirectReplace?: boolean;
}

export function SubmitButton(props: ISubmitButtonProps) {
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const CustomConfirmationComponent = props.CustomConfirmationComponent;
  return (
    <SubmitActioner>
      {(actioner) => {
        const runProcess = async () => {
          const status = await actioner.submit(props.options);
          if (!status.error && props.redirectOnSuccess) {
            if(props.redirectGoBack) {
              goBack();
              setTimeout(() => {
                localizedRedirectTo(props.redirectOnSuccess, null, props.redirectReplace);
              }, 10);
            } else {
              localizedRedirectTo(props.redirectOnSuccess, null, props.redirectReplace);
            }
          }
        }
        const submitAction = () => {
          if (props.CustomConfirmationComponent) {
            setConfirmationIsActive(true);
          } else {
            runProcess();
          }
        }
        const onCloseAction = (continueWithProcess: boolean) => {
          setConfirmationIsActive(false);
          if (continueWithProcess) {
            runProcess();
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