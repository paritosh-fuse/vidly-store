import React, { Component } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import { validate, validateProperty } from "./utils/validate";
export default class LoginForm extends Component {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {
      username: "",
      password: "",
    },
  };

  schema = {
    username: Joi.string().alphanum().min(3).required().label("Username"),
    password: Joi.string().alphanum().min(3).required().label("Password"),
  };

  handleChange = (e) => {
    const data = this.state.data;
    data[e.currentTarget.name] = e.currentTarget.value;
    const res = validateProperty(
      e.currentTarget.name,
      e.currentTarget.value,
      this.schema
    );
    this.setState({ errors: res || {} });
    if (res) return;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const res = validate(this.state.data, this.schema);
    this.setState({ errors: res || {} });
    if (res) return;
    console.log("submit");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ width: "50%" }}>
            <Input
              label={"Username"}
              name={"username"}
              value={data.username}
              onValueChange={this.handleChange}
              type="text"
              error={errors.username}
            />
            <Input
              label={"Password"}
              name={"password"}
              value={data.password}
              onValueChange={this.handleChange}
              type="password"
              error={errors.password}
            />

            <button
              style={{ margin: "2% 0" }}
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
