import {
  ColumnId,
  PlantingsWithIds,
  PlantingsWithNames,
  WhereType,
  QueryStringOrNumber,
  PlantingsWithHarvestCount,
} from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";
import plotRepository from "../repositories/plotRepository";
import { PlotWhithIDsOfFKs } from "../../types";

const getAllPlantings = async (
  farm: QueryStringOrNumber,
  plot: QueryStringOrNumber,
  date: QueryStringOrNumber
) => {
  const where: WhereType = {};
  if (farm) where["planting.farm_id"] = Number(farm);
  if (date) where["planting.date"] = date;
  if (typeof plot === "string") {
    plot;
  } else {
    plot = "";
  }
  console.log(plot);
  const plantings = await plantingsRepository.selectAllPlantings(where, plot);
  if (!plantings.length) {
    throw makeError({ message: "Plantings not found", status: 200 });
  }
  return plantings;
};

const getAPlanting = async (id: number) => {
  const planting = await plantingsRepository.selectAPlanting(id);
  if (!planting.length) {
    throw makeError({ message: "Planting not found", status: 200 });
  }
  return planting;
};

const getAllPlantingsByPlotWithHarvestCount = async (
  plotId: number
): Promise<PlantingsWithHarvestCount[]> => {
  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!existsPlot) throw makeError({ message: "Plot not found", status: 200 });

  return await plantingsRepository.selectAllPlantingsInPlotWithHarvests(plotId);
};

const postPlanting = async (planting: PlantingsWithNames): Promise<string> => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  const existsPLot = farmId
    ? await plantingsRepository.selectIdByNameAndByFarmId(
        "plot",
        "name",
        plot,
        farmId
      )
    : [];

  let plotId: number | null | undefined = existsPLot.length
    ? existsPLot[0].id
    : null;

  if (plotId === null && typeof farmId === "number") {
    const newPlot = await plotRepository.insertPlot({
      name: plot,
      farm_id: farmId,
    });
    console.log(newPlot);

    plotId = newPlot[0].id;
  }

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
      ...data,
    };

    // atualiza o ultimo plantio ativo para inativo
    await updateLastActivePlanting(plotId);

    await plantingsRepository.insertPlanting(formatedPlanting);
    return "Registered planting";
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 200,
    });
  }
};

const updatePlanting = async (
  id: number,
  planting: PlantingsWithNames
): Promise<string> => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  const existsPLot = farmId
    ? await plantingsRepository.selectIdByNameAndByFarmId(
        "plot",
        "name",
        plot,
        farmId
      )
    : [];

  const plotId: number | null = existsPLot.length ? existsPLot[0].id : null;

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
      ...data,
    };

    if (planting.active) await updateLastActivePlanting(plotId);

    await plantingsRepository.updatePlanting(id, formatedPlanting);
    return "Planting has been updated";
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 200,
    });
  }
};

const deletePlanting = async (id: number): Promise<string> => {
  const planting: number = await plantingsRepository.deletePlanting(id);
  if (!planting)
    throw makeError({ message: "Planting not found", status: 200 });
  return "Planting has benn deleted";
};

const selectId = async (
  tableName: string,
  columnName: string,
  value: string
): Promise<number | null> => {
  const result: ColumnId[] = await plantingsRepository.selectId(
    tableName,
    columnName,
    value
  );
  return result.length > 0 ? result[0].id : null;
};

// atualiza o ultimo plantio ativo para inativo
const updateLastActivePlanting = async (plotId: number) => {
  const lastActivePlatings =
    await plantingsRepository.selectLastActivePlantingOnPlot(plotId);
  if (lastActivePlatings.length) {
    lastActivePlatings[0].active = false;
    await plantingsRepository.updatePlanting(
      lastActivePlatings[0].id!,
      lastActivePlatings[0]
    );
  }
};

export default {
  getAllPlantings,
  getAPlanting,
  getAllPlantingsByPlotWithHarvestCount,
  postPlanting,
  updatePlanting,
  deletePlanting,
  selectId,
};
