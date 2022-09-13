import React, { Component } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import { validate, validateProperty } from "./utils/validate";
export default class Register extends Component {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {
      username: "",
      password: "",
      name: "",
    },
  };

  schema = {
    username: Joi.string().alphanum().min(3).required().label("Username"),
    name: Joi.string().alphanum().min(3).required().label("Name"),
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
        <h2>Register</h2>
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

            <Input
              label={"Name"}
              name={"name"}
              value={data.name}
              onValueChange={this.handleChange}
              type="name"
              error={errors.name}
            />

            <button
              style={{ margin: "2% 0" }}
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}
