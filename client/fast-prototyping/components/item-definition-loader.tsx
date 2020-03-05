import React from "react";
import { withStyles, WithStyles, Theme, createStyles, Typography, IconButton, Backdrop, CircularProgress } from "@material-ui/core";
import { ItemDefinitionLoader as NItemDefinitionLoader, IItemDefinitionLoaderInfoArgType } from "../../components/item-definition";
import { I18nRead, I18nReadError } from "../../components/localization";
import RefreshIcon from "@material-ui/icons/Refresh";
import equals from "deep-equal";

const itemDefinitionLoaderStyles = (theme: Theme) => createStyles({
  container: {
    position: "relative",
  },
  flexingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  circularProgress: {
    width: "40px",
    height: "40px",
    position: "absolute",
    left: "50%",
    marginLeft: "-20px",
    top: "50%",
    marginTop: "-20px",
  },
});

interface ItemDefinitionLoaderProps extends WithStyles<typeof itemDefinitionLoaderStyles> {
  notFoundMessageKey?: string;
  blockedMessageKey?: string;
  notFoundImage?: string;
  blockedImage?: string;
  errorImage?: string;
  msWaitedToShowLoadingAnimation?: number;
  children: React.ReactChild;
}

interface ActualItemDefinitionLoaderProps extends ItemDefinitionLoaderProps {
  info: IItemDefinitionLoaderInfoArgType;
}

interface ActualItemDefinitionLoaderState {
  showLoadingAnimation: boolean;
}

class ActualItemDefinitionLoader extends React.Component<ActualItemDefinitionLoaderProps, ActualItemDefinitionLoaderState> {
  private loadingTimeout: NodeJS.Timeout;
  constructor(props: ActualItemDefinitionLoaderProps) {
    super(props);

    this.state = {
      showLoadingAnimation: false,
    }
  }
  public shouldComponentUpdate(nextProps: ActualItemDefinitionLoaderProps, nextState: ActualItemDefinitionLoaderState) {
    return nextProps.notFoundImage !== this.props.notFoundImage ||
      nextProps.blockedMessageKey !== this.props.blockedMessageKey ||
      nextProps.notFoundImage !== this.props.notFoundImage ||
      nextProps.blockedImage !== this.props.blockedImage ||
      nextProps.errorImage !== this.props.errorImage ||
      nextProps.children !== this.props.children ||
      !equals(nextProps.info, this.props.info) ||
      nextState.showLoadingAnimation !== this.state.showLoadingAnimation;
  }
  private setLoadingAnimationTimeout() {
    this.loadingTimeout = setTimeout(() => {
      if (this.props.info.loading) {
        this.setState({
          showLoadingAnimation: true,
        });
      }
    }, this.props.msWaitedToShowLoadingAnimation || 700);
  }
  public componentDidMount() {
    if (this.props.info.loading) {
      this.setLoadingAnimationTimeout();
    }
  }
  public componentDidUpdate() {
    if (this.props.info.loading) {
      this.setLoadingAnimationTimeout();
    } else {
      clearTimeout(this.loadingTimeout);
      if (this.state.showLoadingAnimation) {
        this.setState({
          showLoadingAnimation: false,
        });
      }
    }
  }
  public render() {
    const notFound = this.props.info.notFound;
    const blocked = this.props.info.blocked;
    const hasBlockedAccess = this.props.info.hasBlockedAccess;
    const error = this.props.info.error;
    if (
      notFound ||
      (blocked && !hasBlockedAccess) ||
      error
    ) {
      let errorComponent = null;
      let imageComponent = null;
      if (notFound) {
        errorComponent = <I18nRead id={this.props.notFoundMessageKey || "error.NOT_FOUND"} capitalize={true}/>;
        if (this.props.notFoundImage) {
          imageComponent = <img src={this.props.notFoundImage} />
        }
      } else if (blocked) {
        errorComponent = <I18nRead id={this.props.blockedMessageKey || "error.BLOCKED"} capitalize={true}/>;
        if (this.props.blockedImage) {
          imageComponent = <img src={this.props.blockedImage} />
        }
      } else if (error) {
        errorComponent = <I18nReadError error={this.props.info.error} capitalize={true}/>;
        if (this.props.errorImage) {
          imageComponent = <img src={this.props.errorImage} />
        }
      }
      return (
        <div className={this.props.classes.flexingContainer}>
          <Typography>{errorComponent}</Typography>
          {imageComponent}
          <I18nRead id="reload">
            {(i18nReload: string) => (
              <IconButton color="inherit" onClick={this.props.info.reload} aria-label={i18nReload}>
                <RefreshIcon />
              </IconButton>
            )}
          </I18nRead>
        </div>
      );
    }

    return <div className={this.props.classes.container}>
      {this.state.showLoadingAnimation ? <CircularProgress className={this.props.classes.circularProgress}/> : null}
      {this.props.children}
    </div>;
  }
}

export const ItemDefinitionLoader = withStyles(itemDefinitionLoaderStyles)((props: ItemDefinitionLoaderProps) => {
  return (
    <NItemDefinitionLoader>
      {(arg) => {
        return <ActualItemDefinitionLoader {...props} info={arg}/>
      }}
    </NItemDefinitionLoader>
  )
});