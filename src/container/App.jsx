import React, { Component } from "react";
import Movies from "../components/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/products" component={() => <Movies />} />
      </Switch>
    );
  }
}
