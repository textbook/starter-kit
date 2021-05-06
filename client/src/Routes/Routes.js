import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/Registration" component={LandingPage}></Route>
      <Route exact path="/" component={LandingPage}></Route>
    </Switch>
  );
}

export default Routes;
