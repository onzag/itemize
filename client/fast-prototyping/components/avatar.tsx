/**
 * The avatar allows to show an user avatar in a nice way using the mui avatar
 * 
 * @module
 */

import React, { useMemo } from "react";
import { countries } from "../../../imported-resources";
import Link from "../../components/navigation/Link";
import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { imageSizeRetriever, cacheableQSLoader } from "../../components/util";
import { IPropertyEntryFileRendererProps } from "../../internal/components/PropertyEntry/PropertyEntryFile";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { MAX_FILE_SIZE } from "../../../constants";
import Reader from "../../components/property/Reader";
import { default as MAvatar } from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Alert from '@mui/material/Alert';
import { styled, SxProps } from '@mui/material/styles';

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    transform: "scale(1) translate(25%, -25%)",
  },
});

const Flag = styled("div")({
  position: "absolute",
  fontSize: "0.8rem",
  bottom: -2.5,
  right: -5,
});

const StyledLink = styled(Link)({});

interface IHoverAddBackdropProps {
  visible: boolean;
}

const HoverAddBackdrop = styled("div", {
  shouldForwardProp: (prop) => prop !== "visible"
})<IHoverAddBackdropProps>(({ visible }) => ({
  "cursor": "pointer",
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
  "&:hover": {
    opacity: 0.5,
  },
  "opacity": visible ? 0.5 : 0,
}));

interface IAvatarContainerProps {
  large?: boolean;
  fullWidth?: boolean;
}

const AvatarContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "large" && prop !== "fullWidth"
})<IAvatarContainerProps>(({ large, fullWidth }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingBottom: large ? "1rem" : "auto",
  width: fullWidth ? "100%" : "auto",
}));

/**
 * We build the styles with the create styles function
 */
const avatarStyles = {
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
};

/**
 * The properties for the avatar
 */
interface IAvatarProps {
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
   * Material UI based sx props for the link
   */
  linkSx?: SxProps;
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
interface SimpleAvatarProps {
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
  numberColorId: number;
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
function SimpleAvatar(props: SimpleAvatarProps) {
  const sx = useMemo(() => {
    const value = {
      ...avatarStyles.avatar,
      ...avatarStyles["randomColor" + props.numberColorId],
    };

    if (props.size === "large") {
      Object.assign(value, avatarStyles.avatarLarge);
    } else if (props.size === "medium") {
      Object.assign(value, avatarStyles.avatarMedium);
    }

    if (props.isSpecialUser) {
      Object.assign(value, avatarStyles.specialUser);

      if (props.size === "large") {
        Object.assign(value, avatarStyles.specialUserLarge);
      } else if (props.size === "medium") {
        Object.assign(value, avatarStyles.specialUserMedium);
      }
    }

    return value;
  }, [props.size, props.isSpecialUser, props.numberColorId]);

  return (
    <MAvatar
      alt={props.userNameValue}
      sx={sx}
      src={props.imgSrc}
    >
      {props.userNameValue ? props.userNameValue[0].toUpperCase() : ""}
    </MAvatar>
  )
}

/**
 * The avatar content will do complex logic in order
 * to display the avatar of a given user in an efficient way
 */
export class Avatar extends React.PureComponent<IAvatarProps> {
  public render() {
    // so we assign a random color based on the user id
    const numberColorId = this.props.id ? this.props.id.charCodeAt(0) % 10 : 0;

    // now the flag logic
    const flag = this.props.countryCode && countries[this.props.countryCode] ? (
      <Flag>{countries[this.props.countryCode].emoji}</Flag>
    ) : null;

    // and now we get the image sources from the image size retriever, only the standard
    // sources as we pass no property definition to it
    const imageSources = imageSizeRetriever(this.props.profilePictureValue, null);

    // so which source to use depends, for size large the large image, otherwise the small
    // yes even for medium
    const imageSrc = this.props.size === "large" ? imageSources.imageLargeSizeURL : imageSources.imageSmallSizeURL;

    // now this will be the content
    const content = (
      <AvatarContainer fullWidth={true}>
        <SimpleAvatar
          imgSrc={this.props.cacheImage ? cacheableQSLoader(imageSrc) : imageSrc}
          size={this.props.size}
          numberColorId={numberColorId}
          isSpecialUser={this.props.isSpecialUser}
          userNameValue={this.props.userNameValue}
        />
        {flag}
      </AvatarContainer>
    );

    // this will be the actual avatar, depending if we wrap it with a router link or not
    // according to the logic
    const avatar = this.props.profileURL ? (
      <StyledLink
        className={this.props.linkClassName}
        sx={this.props.linkSx}
        to={this.props.profileURL}
      >
        {content}
      </StyledLink>
    ) : content;

    // so now for warnings
    if (this.props.warningCount) {
      return (
        <StyledBadge
          badgeContent={this.props.warningCount > 99 ? "99+" : this.props.warningCount}
          color="error"
        >
          {avatar}
        </StyledBadge>
      );
    } else {
      // no warnings, return as it is
      return avatar;
    }
  }
}

/**
 * The avatar renderer uses the same property entry file renderer props
 */
interface IAvatarRendererProps extends IPropertyEntryFileRendererProps {
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

interface IAvatarRendererInternalContentProps extends IAvatarRendererProps {
  username: string;
  numberColorId: number;
  isSpecialUser: boolean;
}

function AvatarRendererInternalContent(props: IAvatarRendererInternalContentProps) {
  const dropzoneRef = React.useRef<DropzoneRef>();

  const sx = useMemo(() => {
    const value = {
      ...avatarStyles.avatar,
      ...avatarStyles.avatarLarge,
      ...avatarStyles["randomColor" + props.numberColorId],
    };

    if (props.isSpecialUser) {
      Object.assign(value, avatarStyles.specialUser);
      Object.assign(value, avatarStyles.specialUserLarge);
    }

    return value;
  }, [props.isSpecialUser, props.numberColorId])

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
          <>
            <div {...(rootProps as any)}>
              <input {...(getInputProps() as any)} />
              <AvatarContainer>
                <MAvatar
                  sx={sx}
                  src={cacheableQSLoader(props.imageSizes && props.imageSizes.imageLargeSizeURL)}
                >
                  {props.username ? props.username[0].toLocaleUpperCase() : ""}
                </MAvatar>
                <HoverAddBackdrop visible={isDragAccept || isDragReject}>
                  {isDragReject ? <BrokenImageIcon fontSize="large" /> : <AddAPhotoIcon fontSize="large" />}
                </HoverAddBackdrop>
              </AvatarContainer>
            </div>
          </>
        );
      }}
    </Dropzone>
  )
}

/**
 * A fully custom renderer for the avatar component for usage with file types
 * so it can be passed as a custom renderer via the entry, eg...
 * <Entry id="profile_picture" renderer={AvatarRenderer}/> rather
 * than using the default
 */
export function AvatarRenderer(props: IAvatarRendererProps) {
  // we are using readers inside the avatar renderer, which is quite the feat, but nonetheless allowed
  // a bit inefficient but should work out just fine for this
  return (
    <AvatarContainer large={true}>
      <Reader id="username">{
        (username: string) => (
          <Reader id="role">{
            (role: string) => (
              <Reader id="id">
                {(id: string) => {
                  const numberColorId = id.charCodeAt(0) % 10;

                  return <AvatarRendererInternalContent
                    {...props}
                    username={username}
                    numberColorId={numberColorId}
                    isSpecialUser={(props.args.specialUsers || []).includes(role)}
                  />
                }}
              </Reader>
            )
          }</Reader>
        )
      }</Reader>
      {props.currentInvalidReason || props.rejectedReason ? <Alert sx={{ marginTop: "1rem" }} severity="error">
        {props.currentInvalidReason || props.rejectedReason}
      </Alert> : null}
    </AvatarContainer>
  );
}