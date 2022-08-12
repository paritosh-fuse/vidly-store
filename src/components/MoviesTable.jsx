import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaUp,
  faSortAlphaDown,
  faSortNumericUp,
  faSortNumericDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Like from "./common/Like";

function getSortIcon(sortColumn, columnPath, columnType) {
  let icon = faSort;
  if (sortColumn.path === columnPath) {
    if (columnType === "alpha") {
      if (sortColumn.order === "desc") {
        icon = faSortAlphaUp;
      } else {
        icon = faSortAlphaDown;
      }
    } else {
      if (sortColumn.order === "desc") {
        icon = faSortNumericUp;
      } else {
        icon = faSortNumericDown;
      }
    }
  }
  return <FontAwesomeIcon icon={icon} />;
}

export default class MoviesTable extends Component {
  render() {
    const raiseSort = (path) => {
      const sortColumn = { ...this.props.sortColumn };
      if (sortColumn.path === path)
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      else {
        sortColumn.path = path;
        sortColumn.order = "asc";
      }
      this.props.onSort(sortColumn);
    };

    const { movies, onDelete, onLike, sortColumn } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th onClick={() => raiseSort("title")}>
              Title {getSortIcon(sortColumn, "title", "alpha")}
            </th>
            <th onClick={() => raiseSort("genre.name")}>
              Genre {getSortIcon(sortColumn, "genre.name", "alpha")}
            </th>
            <th onClick={() => raiseSort("numberInStock")}>
              Stock {getSortIcon(sortColumn, "numberInStock", "num")}
            </th>
            <th onClick={() => raiseSort("dailyRentalRate")}>
              Rate {getSortIcon(sortColumn, "dailyRentalRate", "num")}
            </th>
            <th>Like</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} handleLike={() => onLike(movie)} />
              </td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(movie)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
