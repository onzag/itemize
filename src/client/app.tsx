import React from "react";
import { LoginDialog } from "./general/login-dialog";
import { Navbar } from "./navbar";
import { Route } from "../../itemize/client/components/navigaton";
import { Profile } from "./pages/profile";
import { FrontPage } from "./pages/frontpage";
import { SignupDialog } from "./general/signup-dialog";

interface IAppState {
  loginDialogOpen: boolean;
  signupDialogOpen: boolean;
}

interface IAppProps {
  userId: number;
}

export default class App extends React.Component<IAppProps, IAppState> {
  public static getDerivedStateFromProps(
    props: IAppProps,
  ): Partial<IAppState> {
    // automatically close the dialogs when
    // user is logged in
    if (props.userId) {
      return {
        loginDialogOpen: false,
        signupDialogOpen: false,
      };
    }
    return null;
  }
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loginDialogOpen: false,
      signupDialogOpen: false,
    };

    this.openLoginDialog = this.openLoginDialog.bind(this);
    this.closeLoginDialog = this.closeLoginDialog.bind(this);
    this.openSignupDialog = this.openSignupDialog.bind(this);
    this.closeSignupDialog = this.closeSignupDialog.bind(this);
  }
  public openLoginDialog() {
    this.setState({
      signupDialogOpen: false,
      loginDialogOpen: true,
    });
  }
  public closeLoginDialog() {
    this.setState({
      loginDialogOpen: false,
    });
  }
  public openSignupDialog() {
    this.setState({
      signupDialogOpen: true,
      loginDialogOpen: false,
    });
  }
  public closeSignupDialog() {
    this.setState({
      signupDialogOpen: false,
    });
  }
  public render() {
    return (
      <React.Fragment>
        <Navbar onLoginClick={this.openLoginDialog} loggedUserId={this.props.userId}/>
        <LoginDialog
          onSignupRequest={this.openSignupDialog}
          open={this.state.loginDialogOpen}
          onClose={this.closeLoginDialog}
        />
        <SignupDialog
          onLoginRequest={this.openLoginDialog}
          open={this.state.signupDialogOpen}
          onClose={this.closeSignupDialog}
        />
        <Route path="/" exact={true} component={FrontPage}/>
        <Route path="/profile/:id" component={Profile}/>
      </React.Fragment>
    );
  }
}
