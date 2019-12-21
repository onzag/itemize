import React from "react";
import { LoginDialog } from "./general/login-dialog";
import { Navbar } from "./navbar";
import { Route, LocationStateReader, setHistoryState } from "../../itemize/client/components/navigaton";
import { Profile } from "./pages/profile";
import { FrontPage } from "./pages/frontpage";
import { SignupDialog } from "./general/signup-dialog";
import { TermsAndConditions } from "./pages/terms-and-conditions";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { Location } from "history";
import { UserIdRetriever } from "../../itemize/client/components/user";

interface IAppBaseProps {
  userId: number;
  location: Location;
}

class AppBase extends React.Component<IAppBaseProps, {}> {
  constructor(props: IAppBaseProps) {
    super(props);

    this.openLoginDialog = this.openLoginDialog.bind(this);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
    this.openSignupDialog = this.openSignupDialog.bind(this);
    this.closeSignupDialog = this.closeSignupDialog.bind(this);
    this.closeBoth = this.closeBoth.bind(this);
  }
  public shouldComponentUpdate(prevProps: IAppBaseProps) {
    return (
      this.props.userId !== prevProps.userId ||
      this.props.location.state.signupDialogOpen !== prevProps.location.state.signupDialogOpen ||
      this.props.location.state.loginDialogOpen !== prevProps.location.state.loginDialogOpen
    );
  }
  public componentDidUpdate() {
    if (
      this.props.userId &&
      (
        this.props.location.state.signupDialogOpen ||
        this.props.location.state.loginDialogOpen
      )
    ) {
      this.closeBoth();
    }
  }
  public openLoginDialog() {
    // we are using the signup dialog open as a flag
    // to replace the state instead
    setHistoryState(this.props.location, {
      signupDialogOpen: false,
      loginDialogOpen: true,
    }, this.props.location.state.signupDialogOpen);
  }
  public closeLoginDialog() {
    setHistoryState(this.props.location, {
      loginDialogOpen: false,
    }, true);
  }
  public openSignupDialog() {
    setHistoryState(this.props.location, {
      signupDialogOpen: true,
      loginDialogOpen: false,
    }, this.props.location.state.loginDialogOpen);
  }
  public closeSignupDialog() {
    setHistoryState(this.props.location, {
      signupDialogOpen: false,
    }, true);
  }
  public closeBoth() {
    setHistoryState(this.props.location, {
      signupDialogOpen: false,
      loginDialogOpen: false,
    }, true);
  }
  public render() {
    return (
      <React.Fragment>
        <Navbar onLoginClick={this.openLoginDialog} loggedUserId={this.props.userId}/>
        <span>{JSON.stringify(this.props.location)}</span>
        <LoginDialog
          onSignupRequest={this.openSignupDialog}
          open={this.props.location.state.loginDialogOpen || false}
          onClose={this.closeLoginDialog}
        />
        <SignupDialog
          onLoginRequest={this.openLoginDialog}
          open={this.props.location.state.signupDialogOpen || false}
          onClose={this.closeSignupDialog}
        />
      </React.Fragment>
    );
  }
}

export default function App() {
  return (
    <React.Fragment>
      <UserIdRetriever>
        {(userId) => (
          <LocationStateReader>
            {
              (location) => (
                <AppBase location={location} userId={userId} />
              )
            }
          </LocationStateReader>
        )}
      </UserIdRetriever>,
      <Route path="/" exact={true} component={FrontPage} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/profile/:id" component={Profile} />
    </React.Fragment>
  );
}
