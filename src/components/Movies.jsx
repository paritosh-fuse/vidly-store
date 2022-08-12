import { getMovies } from "../fakeMovieService";
import React, { Component } from "react";

import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import filter_data from "./utils/filter";
import { getGenres } from "../fakeGenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
export default class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 5,
    activePage: 1,
    selectedGenre: "all",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      genre: [{ _id: "all", name: "All Genres" }, ...getGenres()],
      movies: getMovies(),
    });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((item) => item._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    movie["liked"] = !movie.liked;
    this.setState([...this.state.movies, movie]);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ activePage: page });
  };

  handleGenreSelection = (genre) => {
    this.setState({ selectedGenre: genre });
  };
  render() {
    const { pageSize, activePage, movies, genre, selectedGenre, sortColumn } =
      this.state;
    const movies_filtered = filter_data(movies, "genre", "_id", selectedGenre);
    const sorted_data = _.orderBy(
      movies_filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies_paginated = paginate(sorted_data, pageSize, activePage);
    return (
      <div className="row" style={{ padding: 20 }}>
        <div className="col-3">
          <ListGroup
            items={genre}
            selectedGenre={selectedGenre}
            onGenreChange={this.handleGenreSelection}
          />
        </div>
        <div className="col">
          {movies.length === 0 ? (
            <p>No Movies to Show!</p>
          ) : (
            <div>
              <div>{`Showing ${movies_filtered.length} movies`}</div>
              <div>
                <MoviesTable
                  movies={movies_paginated}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                />
              </div>
              <div>
                <Pagination
                  itemsCount={movies_filtered.length}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                  activePage={activePage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
