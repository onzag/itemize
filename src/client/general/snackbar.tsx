import React from "react";
import { Snackbar as MUISnackbar, IconButton, Icon } from "@material-ui/core";
import { I18nRead, I18nReadError } from "../../../itemize/client/components/localization";
import { GraphQLEndpointErrorType } from "../../../itemize/base/errors";

interface ISnackbarProps {
  uniqueId: string;
  i18nDisplay: GraphQLEndpointErrorType | string;
  open: boolean;
  onClose: () => void;
}

export default function Snackbar(props: ISnackbarProps) {
  let message: React.ReactNode;
  let autoHideDuration: number;
  if (typeof props.i18nDisplay === "string") {
    message = <I18nRead id={props.i18nDisplay}/>;
    autoHideDuration = 3000;
  } else {
    message = <I18nReadError error={props.i18nDisplay}/>;
    autoHideDuration = null;
  }
  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      autoHideDuration={autoHideDuration}
      onClose={props.onClose}
      ContentProps={{
        "aria-describedby": props.uniqueId,
      }}
      message={<span id={props.uniqueId}>
        {message}
      </span>}
      action={
        <I18nRead id="close">
          {(i18nClose: string) => (
            <IconButton
              aria-label={i18nClose}
              color="inherit"
              onClick={props.onClose}
            >
              <Icon>close</Icon>
            </IconButton>
          )}
        </I18nRead>
      }
    />
  );
}
