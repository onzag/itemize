import React from "react";
import { Avatar as MAvatar } from "@material-ui/core";
import { countries } from "../../../itemize/imported-resources";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Reader } from "../../../itemize/client/components/property";
import { Link } from "../../../itemize/client/components/navigaton";

const avatarStyles = createStyles({
  flag: {
    position: "absolute",
    fontSize: "0.8rem",
    bottom: 0,
    right: 0,
  },
  avatar: {
    "overflow": "visible",
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

interface IAvatarProps extends WithStyles<typeof avatarStyles> {
  hideFlag?: boolean;
  large?: boolean;
}

// TODO profile picture support
// TODO make the color be about the id rather than the string
export const Avatar = withStyles(avatarStyles)((props: IAvatarProps) => {
  return (
    <Reader id="id">
      {(id: number) => (
        <Reader id="username">
          {
            (userNameValue: string) => {
              const numberColorClassName = id ? props.classes["randomColor" + (id % 10)] : null;
              if (props.hideFlag) {
                return <MAvatar
                  alt={userNameValue}
                  classes={{ root: `${props.classes.avatar} ${numberColorClassName} ${props.large ? props.classes.avatarLarge : ""}` }}
                >
                  {userNameValue ? userNameValue[0] : ""}
                </MAvatar>;
              }
              return <Reader id="app_country">
                {
                  (appCountryValue: string) => {
                    let countryEmoji = null;
                    if (appCountryValue && countries[appCountryValue]) {
                      countryEmoji = countries[appCountryValue].emoji;
                    }
                    return <Link to={`/profile/${id}`}>
                      <MAvatar
                        alt={userNameValue}
                        classes={{ root: `${props.classes.avatar} ${numberColorClassName} ${props.large ? props.classes.avatarLarge : ""}` }}
                      >
                        {userNameValue ? userNameValue[0] : ""}
                        <div className={props.classes.flag}>{countryEmoji}</div>
                      </MAvatar>
                    </Link>;
                  }
                }
              </Reader>;
            }
          }
        </Reader>
      )}
    </Reader>
  );
});
