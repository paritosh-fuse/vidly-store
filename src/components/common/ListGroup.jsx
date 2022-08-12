import React from "react";

export default function ListGroup(props) {
  const { items, onGenreChange, selectedGenre } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={`list-group-item ${
            selectedGenre === item._id ? "active" : ""
          }`}
          key={item._id}
        >
          <a
            href="/#"
            className="page-link"
            onClick={() => onGenreChange(item._id)}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
