import React, { Component } from "react";
import Counter from "../components/Counter";

export default class CounterScreen extends Component {
  render() {
    return (
      <>
        <Counter />
        <Counter />
      </>
    );
  }
}
