import knex from "knex";
import config from "../../../knexfile";
import { HarvestWhithNamesOfFKs, HarvestWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const insert = async (
  harvestData: HarvestWhithIDsOfFKs
): Promise<HarvestWhithIDsOfFKs> => {
  const newHarvest: HarvestWhithIDsOfFKs[] = await knexInstance("harvest")
    .insert(harvestData)
    .returning([
      "id",
      "date",
      "bags",
      "plot_id",
      "user_id",
      "farm_id",
      "planting_id",
    ]);

  return newHarvest[0];
};

const selectHarvestsByPlatingId = async (
  plantingId: number
): Promise<HarvestWhithIDsOfFKs[]> =>
  await knexInstance("harvest")
    .select("*")
    .where({ "harvest.planting_id": plantingId })
    .orderBy("date", "desc");

const selectFromAllByIdWithoutJoin = async (
  harvestId: number
): Promise<HarvestWhithIDsOfFKs | undefined> => {
  const harvests = await knexInstance("harvest")
    .select("*")
    .where({ "harvest.id": harvestId });

  return harvests[0];
};

const selectAllOfTheFarmWithJoin = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const harvests = await knexInstance("harvest")
    .select(
      "harvest.id",
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "harvest.farm_id")
    .where({ "harvest.farm_id": farmId });

  return harvests;
};

const selectFromFarmByIdWithJoin = async (
  farmId: number,
  harvestId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const harvests = await knexInstance("harvest")
    .select(
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "harvest.farm_id")
    .where({ "harvest.id": harvestId, "harvest.farm_id": farmId });

  return harvests;
};

const selectFromFarmByPlotIdWithJoin = async (
  farmId: number,
  plotId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const harvests = await knexInstance("harvest")
    .select(
      "harvest.id",
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "harvest.farm_id")
    .where({ "harvest.plot_id": plotId, "harvest.farm_id": farmId });

  return harvests;
};

const selectFromFarmByDateWithJoin = async (
  farmId: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const harvests = await knexInstance("harvest")
    .select(
      "harvest.id",
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "harvest.farm_id")
    .where({ "harvest.farm_id": farmId, "harvest.date": harvestDate });

  return harvests;
};

const selectFromFarmByDateAndPlotWithJoin = async (
  farmId: number,
  plotId: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const harvests = await knexInstance("harvest")
    .select(
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "harvest.farm_id")
    .where({
      "harvest.plot_id": plotId,
      "harvest.farm_id": farmId,
      "harvest.date": harvestDate,
    });
  return harvests;
};

const updateHarvest = async (
  harvestId: number,
  harvestData: HarvestWhithIDsOfFKs
): Promise<HarvestWhithIDsOfFKs> => {
  const updatedHarvest: HarvestWhithIDsOfFKs[] = await knexInstance("harvest")
    .update(harvestData)
    .where({ "harvest.id": harvestId })
    .returning(["id", "date", "bags", "plot_id", "user_id", "farm_id"]);

  return updatedHarvest[0];
};

const deleteHarvest = async (harvestId: number): Promise<boolean> => {
  const isDeleted = await knexInstance("harvest")
    .delete()
    .where({ "harvest.id": harvestId });

  if (isDeleted > 0) {
    return true;
  }
  return false;
};

export default {
  insert,
  selectHarvestsByPlatingId,
  selectFromAllByIdWithoutJoin,
  selectAllOfTheFarmWithJoin,
  selectFromFarmByIdWithJoin,
  selectFromFarmByPlotIdWithJoin,
  selectFromFarmByDateWithJoin,
  selectFromFarmByDateAndPlotWithJoin,
  updateHarvest,
  deleteHarvest,
};
