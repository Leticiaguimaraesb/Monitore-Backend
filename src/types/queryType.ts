import QueryString from "qs";

export type QueryType =
  | string
  | QueryString.ParsedQs
  | string[]
  | QueryString.ParsedQs[]
  | undefined;
