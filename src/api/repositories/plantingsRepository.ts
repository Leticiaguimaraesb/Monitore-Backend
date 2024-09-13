import knex from "knex";
import config from "../../../knexfile";
import {
  PlantingsWithIds,
  ColumnId,
  WhereType,
  PlantingsWithHarvestCount,
} from "../../types/plantingTypes";

const knexInstance = knex(config);

const selectLastActivePlantingOnPlot = (
  plot_id: number
): Promise<PlantingsWithIds[]> =>
  knexInstance("planting").select("*").where({ plot_id, active: true });

const selectAPlanting = (id: number) =>
  knexInstance("planting")
    .select(
      "planting.id",
      "planting.date",
      "planting.saplings",
      "plot.name as plot",
      "stages.stage as stage",
      "users.name as user",
      "farm.name as farm",
      "planting.active"
    )
    .join("plot", "plot.id", "=", "planting.plot_id")
    .join("stages", "stages.id", "=", "planting.stages_id")
    .join("users", "users.id", "=", "planting.user_id")
    .join("farm", "farm.id", "=", "planting.farm_id")
    .where({ "planting.id": id });

const selectAllPlantings = (where: WhereType, plot: string | undefined) =>
  knexInstance("planting")
    .select(
      "planting.id",
      "planting.date",
      "planting.saplings",
      "plot.name as plot",
      "stages.stage as stage",
      "users.name as user",
      "farm.name as farm",
      "planting.active"
    )
    .join("plot", "plot.id", "=", "planting.plot_id")
    .join("stages", "stages.id", "=", "planting.stages_id")
    .join("users", "users.id", "=", "planting.user_id")
    .join("farm", "farm.id", "=", "planting.farm_id")
    .where(where)
    .whereILike("plot.name", `%${plot ? plot : ""}%`);

const selectAllPlantingsInPlotWithHarvests = (
  plotId: number
): Promise<PlantingsWithHarvestCount[]> =>
  knexInstance("planting")
    .select(
      "planting.plot_id",
      "planting.id as planting_id",
      "planting.date",
      "planting.saplings",
      "planting.active"
    )
    .leftJoin("harvest", "planting.id", "=", "harvest.planting_id")
    .where({ "planting.plot_id": plotId })
    .groupBy("planting.id")
    .orderBy("planting.date", "desc")
    .count("harvest.id as harvests");

const selectId = (
  tableName: string,
  columnName: string,
  value: string
): Promise<Array<ColumnId>> =>
  knexInstance(tableName).select("id").where(columnName, "ilike", value);

const selectIdByNameAndByFarmId = async (
  tableName: string,
  columnName: string,
  value: string,
  farm_id: number
): Promise<Array<ColumnId>> =>
  knexInstance(tableName)
    .select("id")
    .where(columnName, "ilike", value)
    .andWhere({ farm_id });

const selectPlanting = (planting_id: number): Promise<PlantingsWithIds[]> =>
  knexInstance("planting").select("*").where({ id: planting_id });

const insertPlanting = (planting: PlantingsWithIds): Promise<Array<number>> =>
  knexInstance("planting").insert(planting);

const updatePlanting = (
  id: number,
  planting: PlantingsWithIds
): Promise<number> => knexInstance("planting").update(planting).where({ id });

const deletePlanting = (id: number): Promise<number> =>
  knexInstance("planting").delete().where({ id });

export default {
  selectLastActivePlantingOnPlot,
  selectAPlanting,
  selectAllPlantings,
  selectAllPlantingsInPlotWithHarvests,
  insertPlanting,
  selectId,
  selectIdByNameAndByFarmId,
  selectPlanting,
  updatePlanting,
  deletePlanting,
};
