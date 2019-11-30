import React from "react";
import { LoginDialog } from "./general/login-dialog";
import { Navbar } from "./navbar";
import { Route } from "../../itemize/client/app/elements";

interface IAppState {
  loginDialogOpen: boolean;
  signupDialogOpen: boolean;
}

interface IAppProps {
  userId: number;
}

function testFrontpage() {
  return (
    <div>
      <div>aaaaaaaaa</div>
      <div>aaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaaa</div>
      <div>aaaaaaaaaaaa</div>
    </div>
  );
}

function testProfile() {
  return (
    <div>
      <div>bbbbbbbbbbbbbbbb</div>
      <div>bbbbbbbbbbbbbbbbb</div>
      <div>bbbbbbbbbbbbbbbbb</div>
      <div>bbbbbbbbbbbbbbbb</div>
      <div>bbbbbbbbbbbbbbbb</div>
    </div>
  );
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
        <Route path="/" exact={true} component={testFrontpage}/>
        <Route path="/profile/:id" component={testProfile}/>
      </React.Fragment>
    );
  }
}
