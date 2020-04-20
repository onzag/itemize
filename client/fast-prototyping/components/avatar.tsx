import React from "react";
import { Avatar as MAvatar, Badge, RootRef } from "@material-ui/core";
import { countries } from "../../../imported-resources";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Reader } from "../../components/property";
import { Link } from "../../components/navigaton";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { imageSizeRetriever, CacheableImageLoader } from "../../components/util";
import { IPropertyEntryFileRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryFile";
import Dropzone, { DropzoneRef } from "react-dropzone";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import { MAX_FILE_SIZE } from "../../../constants";
import { Alert } from "@material-ui/lab";

const avatarStyles = createStyles({
  flag: {
    position: "absolute",
    fontSize: "0.8rem",
    bottom: -2.5,
    right: -5,
  },
  hoverAddBackdrop: {
    "cursor": "pointer",
    "opacity": 0,
    "width": "100%",
    "height": "100%",
    "backgroundColor": "black",
    "color": "white",
    "position": "absolute",
    "alignItems": "center",
    "justifyContent": "center",
    "display": "flex",
    "zIndex": 1,
    "transition": "opacity 0.3s ease-in-out",
    "borderRadius": "100%",
    "&:hover, &.visible": {
      opacity: 0.5,
    }
  },
  avatar: {
    "cursor": "pointer",
    "&::after": {
      content: "''",
      opacity: 0,
      boxShadow: "0 0px 10px rgba(0,0,0)",
      transition: "opacity 0.3s ease-in-out",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "100%",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "100%",
      backgroundColor: "rgba(0,0,0,0.2)",
      transition: "opacity 0.3s ease-in-out",
      opacity: 0,
    },
    "&:hover::after": {
      opacity: 1,
    },
    "&:active::before": {
      opacity: 1,
    },
    "&:active::after": {
      opacity: 1,
    },
  },
  avatarContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  avatarUploadError: {
    marginTop: "1rem",
  },
  avatarContainerLarge: {
    paddingBottom: "1rem",
  },
  avatarBadge: {
    transform: "scale(1) translate(25%, -25%)",
  },
  avatarLarge: {
    width: "200px",
    height: "200px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "120px",
  },
  randomColor0: {
    backgroundColor: "#f44336",
    border: "solid 2px #b71c1c",
  },
  randomColor1: {
    backgroundColor: "#9c27b0",
    border: "solid 2px #4a148c",
  },
  randomColor2: {
    backgroundColor: "#3f51b5",
    border: "solid 2px #1a237e",
  },
  randomColor3: {
    backgroundColor: "#ff5722",
    border: "solid 2px #bf360c",
  },
  randomColor4: {
    backgroundColor: "#795548",
    border: "solid 2px #3e2723",
  },
  randomColor5: {
    backgroundColor: "#e91e63",
    border: "solid 2px #880e4f",
  },
  randomColor6: {
    backgroundColor: "#673ab7",
    border: "solid 2px #311b92",
  },
  randomColor7: {
    backgroundColor: "#2196f3",
    border: "solid 2px #0d47a1",
  },
  randomColor8: {
    backgroundColor: "#009688",
    border: "solid 2px #004d40",
  },
  randomColor9: {
    backgroundColor: "#607d8b",
    border: "solid 2px #263238",
  },
});

type profileURLFn = (id: number) => string;

interface IAvatarProps extends WithStyles<typeof avatarStyles> {
  hideFlag?: boolean;
  large?: boolean;
  showWarnings?: boolean;
  profileURL?: string | profileURLFn;
  cacheImage?: boolean;
}

interface IAvatarRendererProps extends IPropertyEntryFileRendererProps, WithStyles<typeof avatarStyles> {
}

export const Avatar = withStyles(avatarStyles)((props: IAvatarProps) => {
  const contentFn = (
    id: number,
    userNameValue: string,
    profilePictureValue: PropertyDefinitionSupportedFileType,
    email?: IPropertyDefinitionState,
    eValidated?: IPropertyDefinitionState,
  ) => {
    const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : null;

    const hasWarningForMissingEmail = !(email && email.value);
    const hasWarningForNotValidEmail = !(eValidated && eValidated.value);
    const hasWarning = email && eValidated && email.stateValueModified && eValidated.stateValueModified && props.showWarnings && (
      hasWarningForMissingEmail || hasWarningForNotValidEmail
    );

    const flag = props.hideFlag ? null : (
      <Reader id="app_country">
      {
        (appCountryValue: string) => {
          let countryEmoji = null;
          if (appCountryValue && countries[appCountryValue]) {
            countryEmoji = countries[appCountryValue].emoji;
          }

          return <div className={props.classes.flag}>{countryEmoji}</div>;
        }
      }
      </Reader>
    )

    const imageSources = imageSizeRetriever(profilePictureValue);

    const avatarWithSource = (imageSrc: string) => (
      <MAvatar
        alt={userNameValue}
        classes={{ root: `${props.classes.avatar} ${numberColorClassName} ${props.large ? props.classes.avatarLarge : ""}` }}
        src={imageSrc}
      >
        {userNameValue ? userNameValue[0] : ""}
      </MAvatar>
    );

    const imageSrc = props.large ? imageSources.imageLargeSizeURL : imageSources.imageSmallSizeURL;

    const content = (
      <div className={props.classes.avatarContainer}>
        {props.cacheImage ?
          <CacheableImageLoader src={imageSrc}>
            {avatarWithSource}
          </CacheableImageLoader> :
          avatarWithSource(imageSrc)
        }
        {flag}
      </div>
    );

    const avatar = props.profileURL ? (
      <Link to={typeof props.profileURL === "string" ? props.profileURL : props.profileURL(id)}>
        {content}
      </Link>
    ) : content;

    if (props.showWarnings && hasWarning) {
      return <Badge badgeContent={1} color="secondary" classes={{badge: props.classes.avatarBadge}}>
        {avatar}
      </Badge>
    } else {
      return avatar;
    }
  }
  return (
    <Reader id="id">
      {(id: number) => (
        <Reader id="profile_picture">
          {(profilePictureValue: PropertyDefinitionSupportedFileType) => (
            <Reader id="username">
              {
                (userNameValue: string) => {
                  if (!props.showWarnings) {
                    return contentFn(id, userNameValue, profilePictureValue);
                  }

                  return (
                    <Reader id="email">
                      {(email: string, emailState: IPropertyDefinitionState) => (
                        <Reader id="e_validated">
                          {(eValidated: boolean, eValidatedState: IPropertyDefinitionState) => {
                            return contentFn(id, userNameValue, profilePictureValue, emailState, eValidatedState);
                          }}
                        </Reader>
                      )}
                    </Reader>
                  )
                }
              }
            </Reader>
          )}
        </Reader>
      )}
    </Reader>
  );
});

function onDrop(onSetFile: (file: File) => void, files: File[]) {
  onSetFile(files[0]);
}

export const AvatarRenderer = withStyles(avatarStyles)((props: IAvatarRendererProps) => {
  const dropzoneRef = React.useRef<DropzoneRef>();
  return (
    <div className={`${props.classes.avatarContainer} ${props.classes.avatarContainerLarge}`}>
      <Reader id="username">{
        (username: string) => (
          <Reader id="id">
            {(id: number) => {
              const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : null;

              return (
                <Dropzone
                  onDropAccepted={onDrop.bind(null, props.onSetFile)}
                  onDropRejected={onDrop.bind(null, props.onSetFile)}
                  maxSize={MAX_FILE_SIZE}
                  accept={props.accept}
                  multiple={false}
                  noClick={false}
                  ref={dropzoneRef}
                  disabled={props.disabled}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    const { ref, ...rootProps } = getRootProps();
                    return (
                      <RootRef rootRef={ref}>
                        <div {...rootProps}>
                          <input {...getInputProps()} />
                          <div className={props.classes.avatarContainer}>
                            <CacheableImageLoader src={props.imageSizes.imageLargeSizeURL}>
                              {(largeImageURL) => (
                                <MAvatar
                                  classes={{ root: `${props.classes.avatar} ${numberColorClassName} ${props.classes.avatarLarge}` }}
                                  src={largeImageURL}
                                >
                                  {username ? username[0] : ""}
                                </MAvatar>
                              )}
                            </CacheableImageLoader>
                            <div className={`${props.classes.hoverAddBackdrop} ${isDragAccept || isDragReject ? "visible" : ""}`}>
                              {isDragReject ? <BrokenImageIcon fontSize="large"/> : <AddAPhotoIcon fontSize="large"/>}
                            </div>
                          </div>
                        </div>
                      </RootRef>
                    );
                  }}
                </Dropzone>
              )
            }}
          </Reader>
        )
      }</Reader>
      {props.currentInvalidReason || props.rejectedReason ? <Alert classes={{root: props.classes.avatarUploadError}} severity="error">
        {props.currentInvalidReason || props.rejectedReason}
      </Alert> : null}
    </div>
  );
});