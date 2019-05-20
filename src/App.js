import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import Home from "./component/Home";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
      </Switch>
    );
  }
}

export default App;
