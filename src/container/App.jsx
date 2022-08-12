import React, { Component } from "react";
import Movies from "../components/Movies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <>
        <Movies />
      </>
    );
  }
}
