/**
 * The avatar allows to show an user avatar in a nice way using the mui avatar
 * 
 * @module
 */

import React from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { countries } from "../../../imported-resources";
import Link from "../../components/navigation/Link";
import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { imageSizeRetriever, cacheableQSLoader } from "../../components/util";
import { IPropertyEntryFileRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryFile";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { MAX_FILE_SIZE } from "../../../constants";
import Reader from "../../components/property/Reader";
import { default as MAvatar } from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import RootRef from "@material-ui/core/RootRef";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Alert from "@material-ui/lab/Alert";

/**
 * We build the styles with the create styles function
 */
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
  fullWidth: {
    width: "100%",
  },
  avatarContainer: {
    position: "relative",
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
  avatarMedium: {
    width: "70px",
    height: "70px",
    fontSize: "30px",
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
  specialUser: {
    border: "solid 2px #ffeb3b",
    boxShadow: "0px 0px 0px 2px #ffeb3b",
  },
  specialUserMedium: {
    boxShadow: "0px 0px 0px 4px #ffeb3b"
  },
  specialUserLarge: {
    boxShadow: "0px 0px 0px 10px #ffeb3b"
  },
});

/**
 * The properties for the avatar
 */
interface IAvatarProps extends WithStyles<typeof avatarStyles> {
  /**
   * size small, medium or large changes how it displays
   */
  size: "small" | "medium" | "large";
  /**
   * the profile url for the user, can be a string or a function; if not provided the avatar
   * will not have a redirection attached to it
   */
  profileURL?: string;
  /**
   * Whether to cache the image that is displayed, normally uses the small image unless it's in large
   * mode, that will be cached
   */
  cacheImage?: boolean;
  /**
   * whether to make the width of the avatar 100%
   */
  fullWidth?: boolean;
  /**
   * an extra class name for the link component only truly useful
   * if profileURL is defined
   */
  linkClassName?: string;
  /**
   * The id of the user currently logged, it is used
   * for 
   */
  id: string;
  /**
   * The username of this user
   */
  userNameValue: string;
  /**
   * Will give it a ring around the user to make it realize
   * that it a special kind of user
   */
  isSpecialUser?: boolean;
  /**
   * The profile picture file for this user, if given
   * will display a profile image
   */
  profilePictureValue?: PropertyDefinitionSupportedFileType;
  /**
   * If provided will display a flag with the profile image itself
   */
  countryCode?: string;
  /**
   * Adds warnings to the image
   */
  warningCount?: number;
}

/**
 * The simple avatar is basically just a component that displays the avatar
 * as it is, without much fuzz, it's pure to mantain itself
 * very efficient
 */
interface SimpleAvatarProps extends WithStyles<typeof avatarStyles> {
  /**
   * The source of the image
   */
  imgSrc: string;
  /**
   * The size
   */
  size: "small" | "medium" | "large";
  /**
   * The colored class name that is to be used
   */
  numberColorClassName: string;
  /**
   * Whether it is an special user
   */
  isSpecialUser: boolean;
  /**
   * The username
   */
  userNameValue: string;
}

/**
 * The simple avatar is just a react component that displays a simple material
 * ui specific avatar, nothing too special about this
 */
class SimpleAvatar extends React.PureComponent<SimpleAvatarProps> {
  public render() {
    return (
      <MAvatar
        alt={this.props.userNameValue}
        classes={{
          root: `${this.props.classes.avatar} ${this.props.numberColorClassName} ` +
            `${this.props.size === "large" ? this.props.classes.avatarLarge : ""} ` +
            `${this.props.size === "medium" ? this.props.classes.avatarMedium : ""} ` +
            `${this.props.isSpecialUser ? this.props.classes.specialUser : ""} ` +
            `${this.props.isSpecialUser && this.props.size === "large" ? this.props.classes.specialUserLarge : ""} ` +
            `${this.props.isSpecialUser && this.props.size === "medium" ? this.props.classes.specialUserMedium : ""}`
        }}
        src={this.props.imgSrc}
      >
        {this.props.userNameValue ? this.props.userNameValue[0].toUpperCase() : ""}
      </MAvatar>
    )
  }
}

/**
 * The avatar content will do complex logic in order
 * to display the avatar of a given user in an efficient way
 */
class ActualAvatar extends React.PureComponent<IAvatarProps> {
  public render() {
    // so we assign a random color based on the user id
    const numberColorClassName = this.props.id ? this.props.classes["randomColor" + (this.props.id.charCodeAt(0) % 10)] : "";

    // now the flag logic
    const flag = this.props.countryCode && countries[this.props.countryCode] ? (
      <div className={this.props.classes.flag}>{countries[this.props.countryCode].emoji}</div>
    ) : null;

    // and now we get the image sources from the image size retriever, only the standard
    // sources as we pass no property definition to it
    const imageSources = imageSizeRetriever(this.props.profilePictureValue, null);

    // so which source to use depends, for size large the large image, otherwise the small
    // yes even for medium
    const imageSrc = this.props.size === "large" ? imageSources.imageLargeSizeURL : imageSources.imageSmallSizeURL;

    // now this will be the content
    const content = (
      <div className={`${this.props.classes.avatarContainer} ${this.props.fullWidth ? this.props.classes.fullWidth : ""}`}>
        <SimpleAvatar
          imgSrc={this.props.cacheImage ? cacheableQSLoader(imageSrc) : imageSrc}
          size={this.props.size}
          numberColorClassName={numberColorClassName}
          isSpecialUser={this.props.isSpecialUser}
          userNameValue={this.props.userNameValue}
          classes={this.props.classes}
        />
        {flag}
      </div>
    );

    // this will be the actual avatar, depending if we wrap it with a router link or not
    // according to the logic
    const avatar = this.props.profileURL ? (
      <Link
        className={this.props.linkClassName}
        to={this.props.profileURL}
      >
        {content}
      </Link>
    ) : content;

    // so now for warnings
    if (this.props.warningCount) {
      return (
        <Badge
          badgeContent={this.props.warningCount > 99 ? "99+" : this.props.warningCount}
          color="secondary"
          classes={{ badge: this.props.classes.avatarBadge }}
        >
          {avatar}
        </Badge>
      );
    } else {
      // no warnings, return as it is
      return avatar;
    }
  }
}

/**
 * Will display an avatar for a given user, this fast prototyping
 * component makes no assumptions and as such you will have to implement
 * your own wrapper around it to make your own avatar type
 */
export const Avatar = withStyles(avatarStyles)(ActualAvatar);

/**
 * The avatar renderer uses the same property entry file renderer props with the same
 * styles that the avatar itself uses
 */
interface IAvatarRendererProps extends IPropertyEntryFileRendererProps, WithStyles<typeof avatarStyles> {
}

/**
 * When we drop the file, it takes a callback
 * @param onSetFile the onSetFile function of the renderer, it's bind here
 * @param files the files that have dropped by the react dropzone utility
 */
function onDrop(onSetFile: (file: File) => void, files: any[]) {
  // we only set one file
  // dropzone API became inconsistent with this on its previous version
  onSetFile(typeof files[0].file !== "undefined" ? files[0].file : files[0]);
}

/**
 * A fully custom renderer for the avatar component for usage with file types
 * so it can be passed as a custom renderer via the entry, eg...
 * <Entry id="profile_picture" renderer={AvatarRenderer}/> rather
 * than using the default
 */
export const AvatarRenderer = withStyles(avatarStyles)((props: IAvatarRendererProps) => {
  const dropzoneRef = React.useRef<DropzoneRef>();
  // we are using readers inside the avatar renderer, which is quite the feat, but nonetheless allowed
  // a bit inefficient but should work out just fine for this
  return (
    <div className={`${props.classes.avatarContainer} ${props.classes.avatarContainerLarge}`}>
      <Reader id="username">{
        (username: string) => (
          <Reader id="role">{
            (role: string) => (
              <Reader id="id">
                {(id: string) => {
                  const numberColorClassName = id ? props.classes["randomColor" + (id.charCodeAt(0) % 10)] : "";
                  const specialUserClassName = (props.args.specialUsers || []).includes(role) ? props.classes.specialUser : "";
                  const specialUserSizeClassName = specialUserClassName && props.classes.specialUserLarge;

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
                            <div {...(rootProps as any)}>
                              <input {...(getInputProps() as any)} />
                              <div className={props.classes.avatarContainer}>
                                <MAvatar
                                  classes={{
                                    root: `${props.classes.avatar} ${numberColorClassName} ` +
                                      `${props.classes.avatarLarge} ` +
                                      `${specialUserClassName} ${specialUserSizeClassName}`
                                  }}
                                  src={cacheableQSLoader(props.imageSizes && props.imageSizes.imageLargeSizeURL)}
                                >
                                  {username ? username[0].toLocaleUpperCase() : ""}
                                </MAvatar>
                                <div className={`${props.classes.hoverAddBackdrop} ${isDragAccept || isDragReject ? "visible" : ""}`}>
                                  {isDragReject ? <BrokenImageIcon fontSize="large" /> : <AddAPhotoIcon fontSize="large" />}
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
        )
      }</Reader>
      {props.currentInvalidReason || props.rejectedReason ? <Alert classes={{ root: props.classes.avatarUploadError }} severity="error">
        {props.currentInvalidReason || props.rejectedReason}
      </Alert> : null}
    </div>
  );
});