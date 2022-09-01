import React, { Component } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
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

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    let errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema, { abortEarly: false });
    if (!result.error) return null;
    let errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = (e) => {
    const data = this.state.data;
    data[e.currentTarget.name] = e.currentTarget.value;
    const res = this.validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );
    this.setState({ errors: res || {} });
    if (res) return;
    this.setState({ data });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const res = this.validate();
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
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
