import React, { Component } from "react";
import { Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Counter extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        <Badge
          bg={this.state.count === 0 ? "warning" : "primary"}
          style={{ margin: 5 }}
        >
          {this.state.count === 0 ? "Zero" : this.state.count}
        </Badge>
        <Button
          size="sm"
          variant="success"
          style={{ margin: 5 }}
          onClick={this.handleIncrement}
        >
          Increment
        </Button>
        <Button
          size="sm"
          variant="danger"
          style={{ margin: 5 }}
          onClick={this.handleDecrement}
          disabled={this.state.count === 0}
        >
          Decrement
        </Button>
      </div>
    );
  }
}
