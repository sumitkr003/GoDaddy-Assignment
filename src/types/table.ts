import type { JSX } from "react";

type Column = {
  id: string;
  label: string;
  align?: "right";
  cell?: (row: Row) => JSX.Element;
};

type Row = {
  [key: string]: string | number;
};

export type { Column, Row };
