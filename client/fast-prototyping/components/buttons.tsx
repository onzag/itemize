/**
 * Contains the submit, search and delete button for fast prototyping
 * usage
 * 
 * @module
 */

import React, { useState } from "react";
import { IActionSubmitOptions, IActionResponseWithId, IActionSearchOptions, IActionDeleteOptions, IBasicActionResponse } from "../../providers/item";
import { ProgressingElement } from "./util";
import SubmitActioner from "../../components/item/SubmitActioner";
import { goBack, localizedRedirectTo } from "../../components/navigation";
import I18nRead from "../../components/localization/I18nRead";
import SearchActioner from "../../components/search/SearchActioner";
import DeleteActioner from "../../components/item/DeleteActioner";
import { CreateReportDialog } from "./moderation";
import Button from "@mui/material/Button";

/**
 * A redirect function called on the success event
 */
type RedirectCallbackFn = (status: IActionResponseWithId) => string;

/**
 * The generic options for every button
 */
interface IGenericButtonProps {
  /**
   * An id for the i18n read element
   */
  i18nId: string;
  /**
   * A wrapper class name, the button is wrapped by the progressing
   * element, you might want to change its class name
   */
  wrapperClassName?: string;
  /**
   * The button class name itself
   */
  buttonClassName?: string;
  /**
   * The button variant for MUI
   */
  buttonVariant?: "text" | "outlined" | "contained";
  /**
   * The button color
   */
  buttonColor?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  /**
   * An icon for the button
   */
  buttonEndIcon?: React.ReactNode;
  /**
   * Another icon for the button but at the end
   */
  buttonStartIcon?: React.ReactNode;
  /**
   * Make button disabled
   */
  buttonDisabled?: boolean;
}

/**
 * The submit button props
 */
interface ISubmitButtonProps extends IGenericButtonProps {
  /**
   * The submit options to trigger in the actioner
   */
  options: IActionSubmitOptions;
  /**
   * If specified, instead of immediately submitting will ask
   * for confirmation of this action via this component, the component
   * must take an isActive prop and onClose props, when it closes it would give true or false
   * to specifies if it will submit or cancel, true = submit, false = cancel
   */
  CustomConfirmationComponent?: React.ComponentType<{ isActive: boolean, onClose: (continueWithProcess: boolean) => void }>;
  /**
   * Redirect to an url if succeeded
   */
  redirectOnSuccess?: string | RedirectCallbackFn;
  /**
   * Go back if succeed
   */
  redirectGoBack?: boolean;
  /**
   * Replace during redirection, doesn't work with goback
   */
  redirectReplace?: boolean;
  /**
   * A function that triggers when it has submitted and gives the state of the
   * submit action
   */
  onSubmit?: (status: IActionResponseWithId) => Promise<void>;
}

/**
 * Provides a very useful submit button that extends via the submit
 * actioner and it's fully functional; needs to be in an item
 * definition context
 * 
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another submit actioner to fetch the error itself
 * 
 * @param props the submit button props
 * @returns a react component
 */
export function SubmitButton(props: ISubmitButtonProps) {
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const CustomConfirmationComponent = props.CustomConfirmationComponent;
  return (
    <SubmitActioner>
      {(actioner) => {
        const runProcess = async () => {
          const status = await actioner.submit(props.options);
          props.onSubmit && (await props.onSubmit(status));

          if (!status.error && !props.redirectOnSuccess && props.redirectGoBack) {
            goBack();
          } else if (!status.error && props.redirectOnSuccess) {
            const redirectCalculated: string = typeof props.redirectOnSuccess === "string" ?
              props.redirectOnSuccess : props.redirectOnSuccess(status);
            if (props.redirectGoBack) {
              goBack();
              setTimeout(() => {
                localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
              }, 10);
            } else {
              localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
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
          <>
            <ProgressingElement isProgressing={actioner.submitting} className={props.wrapperClassName}>
              <Button
                variant={props.buttonVariant}
                color={props.buttonColor}
                endIcon={props.buttonEndIcon}
                startIcon={props.buttonStartIcon}
                className={props.buttonClassName}
                disabled={props.buttonDisabled}
                onClick={submitAction}
              >
                <I18nRead capitalize={true} id={props.i18nId} />
              </Button>
            </ProgressingElement>
            {
              CustomConfirmationComponent ?
                <CustomConfirmationComponent isActive={confirmationIsActive} onClose={onCloseAction} /> :
                null
            }
          </>
        );
      }}
    </SubmitActioner>
  );
}

/**
 * The search button props
 */
interface ISearchButtonProps extends IGenericButtonProps {
  /**
   * The search options to trigger in the search actioner
   */
  options: IActionSearchOptions;
}

/**
 * Allows to create a fast prototyping button that will trigger a search
 * once clicked, uses the search actioner and must be in an item definition context
 * in search mode
 * 
 * If you need to access the error please use the snackbar.tsx component
 * in addition of another search actioner to fetch the error itself
 * 
 * @param props the search button props
 * @returns a react component
 */
export function SearchButton(props: ISearchButtonProps) {
  return (
    <SearchActioner>
      {(actioner) => {
        return (
          <>
            <ProgressingElement isProgressing={actioner.searching} className={props.wrapperClassName}>
              <Button
                variant={props.buttonVariant}
                color={props.buttonColor}
                endIcon={props.buttonEndIcon}
                startIcon={props.buttonStartIcon}
                className={props.buttonClassName}
                disabled={props.buttonDisabled}
                onClick={actioner.search.bind(null, props.options)}
              >
                <I18nRead capitalize={true} id={props.i18nId} />
              </Button>
            </ProgressingElement>
          </>
        );
      }}
    </SearchActioner>
  )
}

/**
 * A redirect function called on the success event
 */
type RedirectCallbackDeleteFn = (status: IBasicActionResponse) => string;

/**
 * The delete button props
 */
interface IDeleteButtonProps extends IGenericButtonProps {
  /**
   * The search options to trigger in the search actioner
   */
  options: IActionDeleteOptions;
  /**
   * If specified, instead of immediately deleting will ask
   * for confirmation of this action via this component, the component
   * must take an isActive prop and onClose props, when it closes it would give true or false
   * to specifies if it will delete or cancel, true = delete, false = cancel
   */
  CustomConfirmationComponent?: React.ComponentType<{ isActive: boolean, onClose: (continueWithProcess: boolean) => void }>;
  /**
   * Redirect to an url if succeeded
   */
  redirectOnSuccess?: string | RedirectCallbackDeleteFn;
  /**
   * Go back if succeed
   */
  redirectGoBack?: boolean;
  /**
   * Replace during redirection, doesn't work with goback
   */
  redirectReplace?: boolean;
  /**
   * A function that triggers when it has submitted and gives the state of the
   * submit action
   */
  onDelete?: (status: IBasicActionResponse) => Promise<void>;
}


export function DeleteButton(props: IDeleteButtonProps) {
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const CustomConfirmationComponent = props.CustomConfirmationComponent;
  return (
    <DeleteActioner>
      {(actioner) => {
        const runProcess = async () => {
          const status = await actioner.delete(props.options);
          props.onDelete && (await props.onDelete(status));

          if (!status.error && !props.redirectOnSuccess && props.redirectGoBack) {
            goBack();
          } else if (!status.error && props.redirectOnSuccess) {
            const redirectCalculated: string = typeof props.redirectOnSuccess === "string" ?
              props.redirectOnSuccess : props.redirectOnSuccess(status);
            if (props.redirectGoBack) {
              goBack();
              setTimeout(() => {
                localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
              }, 10);
            } else {
              localizedRedirectTo(redirectCalculated, null, props.redirectReplace);
            }
          }
        }
        const deleteAction = () => {
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
          <>
            <ProgressingElement isProgressing={actioner.deleting} className={props.wrapperClassName}>
              <Button
                variant={props.buttonVariant}
                color={props.buttonColor}
                endIcon={props.buttonEndIcon}
                startIcon={props.buttonStartIcon}
                className={props.buttonClassName}
                disabled={props.buttonDisabled}
                onClick={deleteAction}
              >
                <I18nRead capitalize={true} id={props.i18nId} />
              </Button>
            </ProgressingElement>
            {
              CustomConfirmationComponent ?
                <CustomConfirmationComponent isActive={confirmationIsActive} onClose={onCloseAction} /> :
                null
            }
          </>
        );
      }}
    </DeleteActioner>
  );
}

/**
 * The delete button props
 */
interface IReportButtonProps extends IGenericButtonProps {
  dialogMessageNode?: React.ReactNode;
  dialogTitle?: React.ReactNode;
}

export function ReportButton(props: IReportButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Button
        variant={props.buttonVariant}
        color={props.buttonColor}
        endIcon={props.buttonEndIcon}
        startIcon={props.buttonStartIcon}
        className={props.buttonClassName}
        disabled={props.buttonDisabled}
        onClick={setIsActive.bind(null, true)}
      >
        <I18nRead capitalize={true} id={props.i18nId} />
      </Button>
      <CreateReportDialog
        isOpened={isActive}
        onClose={setIsActive.bind(null, false)}
        title={props.dialogTitle}
        messageNode={props.dialogMessageNode}
      />
    </>
  );
}