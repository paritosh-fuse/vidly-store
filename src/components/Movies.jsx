import React, { Component } from "react";
import Pagination from "./common/Pagination";
import { getMovies } from "../fakeMovieService";
import { paginate } from "./utils/paginate";
import filter_data from "./utils/filter";
import { getGenres } from "../fakeGenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import Input from "./common/Input";

export default class Movies extends Component {
  state = {
    movies: [],
    allMovies: [],
    genre: [],
    pageSize: 5,
    activePage: 1,
    selectedGenre: "all",
    sortColumn: { path: "title", order: "asc" },
    search: "",
  };

  componentDidMount() {
    this.setState({
      genre: [{ _id: "all", name: "All Genres" }, ...getGenres()],
      movies: getMovies(),
      allMovies: getMovies(),
    });
  }

  getPagedData = () => {
    const { pageSize, activePage, movies, selectedGenre, sortColumn } =
      this.state;
    const movies_filtered = filter_data(movies, "genre", "_id", selectedGenre);
    const sorted_data = _.orderBy(
      movies_filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies_paginated = paginate(sorted_data, pageSize, activePage);
    return { totalCount: movies_filtered.length, data: movies_paginated };
  };

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

  handleSearch = (e) => {
    console.log(e.currentTarget.value);
    if (!e.currentTarget.value) {
      this.setState({ movies: this.state.allMovies });
      return;
    }
    const allMovies = this.state.allMovies;
    const filteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    this.setState({ movies: filteredMovies });
    console.log(filteredMovies);
  };
  render() {
    const { pageSize, activePage, genre, selectedGenre, sortColumn } =
      this.state;
    const { history } = this.props;
    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row" style={{ padding: 20 }}>
        <div style={{ padding: "2%" }}>
          <Input
            label={"Search"}
            name={"search"}
            value={data.search}
            onValueChange={this.handleSearch}
            type="text"
          />
        </div>
        <div className="col-3">
          <ListGroup
            items={genre}
            selectedGenre={selectedGenre}
            onGenreChange={this.handleGenreSelection}
          />
        </div>
        <div className="col">
          {totalCount === 0 ? (
            <div>
              <p>No Movies to Show!</p>
            </div>
          ) : (
            <div>
              <button
                style={{ margin: "0 0 1% 0" }}
                className="btn btn-primary"
                onClick={() => history.push("/movie/new")}
              >
                New Movie
              </button>
              <div>{`Showing ${totalCount} movies`}</div>
              <div>
                <MoviesTable
                  movies={data}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                />
              </div>
              <div>
                <Pagination
                  itemsCount={totalCount}
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
