import React from "react";
import { Button } from "react-bootstrap";

export default function MovieForm({ match, history }) {
  return (
    <div>
      <h3>Movie {match.params.id}</h3>
      <Button onClick={() => history.push("/movies")}>Save</Button>
    </div>
  );
}
