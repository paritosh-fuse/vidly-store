import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Table from "./common/Table";
import Like from "./common/Like";

export default class MoviesTable extends Component {
  render() {
    const { movies, onDelete, onLike, sortColumn, onSort } = this.props;
    const columns = [
      { path: "title", label: "Title", type: "alpha" },
      { path: "genre.name", label: "Genre", type: "alpha" },
      { path: "numberInStock", label: "Stock", type: "num" },
      { path: "dailyRentalRate", label: "Rate", type: "num" },
      {
        key: "like",
        content: (movie) => (
          <Like liked={movie.liked} handleLike={() => onLike(movie)} />
        ),
        label: "Like",
      },
      {
        key: "delete",
        content: (movie) => (
          <Button size="sm" variant="danger" onClick={() => onDelete(movie)}>
            Delete
          </Button>
        ),
        label: "Delete",
      },
    ];
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={columns}
        data={movies}
      />
    );
  }
}
