import QueryString from "qs";

type PlantingsWithIds = {
  id?: number;
  date?: string;
  saplings?: number;
  plot_id?: number;
  stages_id?: number;
  user_id?: number;
  farm_id?: number;
  active?: boolean;
};

type PlantingsWithNames = {
  id?: number;
  date: string;
  saplings: number;
  plot: string;
  stage: string;
  user: string;
  farm: string;
  active?: boolean;
};

type PlantingsWithHarvestCount = {
  plot_id: number;
  planting_id: number;
  date: string;
  saplings: number;
  active: boolean;
  harvests: string;
};

type ColumnId = {
  id: number;
};

type WhereType = {
  "planting.farm_id"?: QueryStringOrNumber;
  "planting.plot_id"?: QueryStringOrNumber;
  "planting.date"?: QueryStringOrNumber;
  "plot.name"?: QueryStringOrNumber;
};

type QueryStringOrNumber =
  | number
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;

export {
  PlantingsWithIds,
  PlantingsWithNames,
  PlantingsWithHarvestCount,
  ColumnId,
  WhereType,
  QueryStringOrNumber,
};
