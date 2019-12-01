import React from "react";
import { Avatar as MAvatar } from "@material-ui/core";
import { Reader, Link } from "../../../itemize/client/app/elements";
import { countries } from "../../../itemize/resources";
import { withStyles, createStyles } from "@material-ui/styles";
import { WithStyles } from "react-jss";

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
}

function convertStringToNumber(str: string): number {
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    total += str.charCodeAt(i);
  }
  return total % 10;
}

// TODO profile picture support
// TODO onclick go to profile
export const Avatar = withStyles(avatarStyles)((props: IAvatarProps) => {
  return (
    <Reader id="username">
      {
        (userNameValue: string) => {
          let numberColorClassName = "";
          if (userNameValue) {
            numberColorClassName = props.classes["randomColor" + convertStringToNumber(userNameValue)];
          }
          if (props.hideFlag) {
            return <MAvatar alt={userNameValue} classes={{root: `${props.classes.avatar} ${numberColorClassName}`}}>
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
                // TODO get raw properties, such as id, country, etc...
                return <Link to={`/profile/${1}`}>
                  <MAvatar alt={userNameValue} classes={{root: `${props.classes.avatar} ${numberColorClassName}`}}>
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
  );
});