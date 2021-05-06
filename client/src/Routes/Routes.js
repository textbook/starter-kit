import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import LoginPage from "../LoginPage/LoginPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/Registration" component={RegistrationPage}></Route>
      <Route exact path="/Login" component={LoginPage}></Route>
    </Switch>
  );
}

export default Routes;
