import React from "react";
import { Table as BTable } from "react-bootstrap";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table({ sortColumn, onSort, columns, data }) {
  return (
    <BTable>
      <TableHeader sortColumn={sortColumn} onSort={onSort} columns={columns} />
      <TableBody data={data} columns={columns} />
    </BTable>
  );
}
