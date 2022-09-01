import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Movies from "../components/Movies";
import MovieForm from "../components/MovieForm";
import Rentals from "../components/Rentals";
import Customers from "../components/Customers";
import NotFound from "../components/NotFound";
import NavBar from "../components/common/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginForm from "../components/LoginForm";

export default class App extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <Route path="/login" component={(props) => <LoginForm {...props} />} />
        <Route
          path="/movie/:id"
          component={(props) => <MovieForm {...props} />}
        />
        <Route path="/movies" component={(props) => <Movies {...props} />} />
        <Route
          path="/customers"
          component={(props) => <Customers {...props} />}
        />
        <Route path="/rentals" component={(props) => <Rentals {...props} />} />
        <Route
          path="/not-found"
          component={(props) => <NotFound {...props} />}
        />
        <Redirect from="/" exact to="/movies" />
      </main>
    );
  }
}
