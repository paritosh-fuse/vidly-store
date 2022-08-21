import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaUp,
  faSortAlphaDown,
  faSortNumericUp,
  faSortNumericDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

function getSortIcon(sortColumn, columnPath, columnType) {
  let icon = faSort;
  if (sortColumn.path === columnPath) {
    if (columnType === "alpha") {
      if (sortColumn.order === "desc") {
        icon = faSortAlphaUp;
      } else {
        icon = faSortAlphaDown;
      }
    } else if (columnType === "num") {
      if (sortColumn.order === "desc") {
        icon = faSortNumericUp;
      } else {
        icon = faSortNumericDown;
      }
    }
  } else {
    return null;
  }
  return <FontAwesomeIcon icon={icon} />;
}

export default class TableHeader extends Component {
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

    const { sortColumn, columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key || column.path}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {getSortIcon(sortColumn, column.path, column.type)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
