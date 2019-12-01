import React from "react";
import { LoginDialog } from "./general/login-dialog";
import { Navbar } from "./navbar";
import { Route } from "../../itemize/client/app/elements";
import { Profile } from "./pages/profile";
import { FrontPage } from "./pages/frontpage";

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
  }
  public openLoginDialog() {
    this.setState({
      loginDialogOpen: true,
    });
  }
  public closeLoginDialog() {
    this.setState({
      loginDialogOpen: false,
    });
  }
  public render() {
    return (
      <React.Fragment>
        <Navbar onLoginClick={this.openLoginDialog}/>
        <LoginDialog open={this.state.loginDialogOpen} onClose={this.closeLoginDialog}/>
        USERID = {this.props.userId}
        <Route path="/" exact={true} component={FrontPage}/>
        <Route path="/profile/:id" component={Profile}/>
      </React.Fragment>
    );
  }
}
