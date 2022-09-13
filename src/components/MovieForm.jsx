import { Button } from "react-bootstrap";
import React, { Component } from "react";
import Joi from "joi-browser";
import { getGenres } from "../fakeGenreService";
import { getMovie, saveMovie } from "../fakeMovieService";
import Input from "./common/Input";
import Select from "./common/Select";
import { validate, validateProperty } from "./utils/validate";
export default class MovieForm extends Component {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    console.log(this.props.match);
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genreId._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

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

  doSubmit = (e) => {
    e.preventDefault();
    const res = validate(this.state.data, this.schema);
    this.setState({ errors: res || {} });
    if (res) return;
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { data, genres, errors } = this.state;
    return (
      <div>
        <h3>Add Movie</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ width: "50%" }}>
            <Input
              label={"Title"}
              name={"title"}
              value={data.title}
              onValueChange={this.handleChange}
              type="text"
              error={errors.title}
            />
            <Select
              label={"Genre"}
              name={"genreId"}
              value={data.genreId}
              onValueChange={this.handleChange}
              error={errors.genreId}
              options={genres}
            />
            <Input
              label={"Number in Stock"}
              name={"numberInStock"}
              value={data.numberInStock}
              onValueChange={this.handleChange}
              type="numberInStock"
              error={errors.numberInStock}
            />

            <Input
              label={"Daily Rental Rate"}
              name={"dailyRentalRate"}
              value={data.dailyRentalRate}
              onValueChange={this.handleChange}
              type="dailyRentalRate"
              error={errors.dailyRentalRate}
            />

            <Button
              style={{ margin: "2% 0" }}
              className="btn btn-primary"
              onClick={this.doSubmit}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
