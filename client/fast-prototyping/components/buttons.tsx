import React from "react";
import { SubmitActioner } from "../../components/item-definition";
import { Button, CircularProgress, PropTypes } from "@material-ui/core";
import { I18nRead } from "../../components/localization";
import { IActionSubmitOptions } from "../../providers/item-definition";
import { DelayDisplay } from "./util";

interface ISubmitButtonProps {
  options: IActionSubmitOptions;
  i18nId: string;
  buttonClassName?: string;
  buttonVariant?: "text" | "outlined" | "contained";
  buttonColor?: PropTypes.Color;
}

export function SubmitButton(props: ISubmitButtonProps) {
  return (
    <SubmitActioner>
      {(actioner) => {
        const submitAction = () => actioner.submit(props.options);
        return (
          <Button variant={props.buttonVariant} color={props.buttonColor} className={props.buttonClassName} onClick={submitAction}>
            <I18nRead capitalize={true} id={props.i18nId} />
            {
              actioner.submitting ?
              <DelayDisplay duration={700}>
                <CircularProgress/>
              </DelayDisplay> :
              null
            }
          </Button>
        );
      }}
    </SubmitActioner>
  )
}

export function SearchButton() {

}

export function DeleteButton() {

}