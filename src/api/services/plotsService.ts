import { PlotWhithIDsOfFKs, PlotWithPlatingData } from "../../types/plotTypes";
import plotRepository from "../repositories/plotRepository";
import farmRepository from "../repositories/farmRepository";
import { makeError } from "../middlewares/errorHandler";
import { FarmWhithIDsOfFKs } from "../../types";
import { QueryStringOrNumber } from "../../types/plantingTypes";

const getPlotsInFarm = async (
  farm_id: number
): Promise<PlotWhithIDsOfFKs[]> => {
  const existsFarm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByIdWithoutJoin(farm_id);

  if (!existsFarm)
    throw makeError({ message: "The farm does not exist!", status: 200 });

  return await plotRepository.selectPlotsByFarmId(farm_id);
};

const getPlotsInFarmWithPlatingData = async (
  farm: QueryStringOrNumber,
  plot: QueryStringOrNumber
): Promise<PlotWithPlatingData[]> => {
  const existsFarm: FarmWhithIDsOfFKs | undefined = farm
    ? await farmRepository.selectByIdWithoutJoin(Number(farm))
    : undefined;

  if (!existsFarm)
    throw makeError({ message: "The farm does not exist!", status: 200 });

  const plotName = plot ? String(plot) : "";
  return await plotRepository.selectPlotByFarmIdWithJoin(
    Number(farm),
    plotName
  );
};

const getAPlotWithPlantingData = async (
  id: number,
  farm_id: number
): Promise<PlotWithPlatingData[]> => {
  const plot = await plotRepository.selectPlotByFarmIdWithJoin(farm_id, "", id);
  return plot;
};

const postPlot = async (
  plot: PlotWhithIDsOfFKs
): Promise<Array<PlotWhithIDsOfFKs>> => {
  const farm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByIdWithoutJoin(plot.farm_id!);
  if (!farm)
    throw makeError({ message: "The farm doesn't exist!", status: 200 });

  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectByNameAndFarmID(plot.farm_id!, plot.name!);
  if (existsPlot)
    throw makeError({ message: "The plot already exists!", status: 200 });

  const newPlot: PlotWhithIDsOfFKs[] = [{ name: plot.name, farm_id: farm.id }];

  try {
    return await plotRepository.insertPlot(newPlot[0]);
  } catch (error) {
    throw error;
  }
};

const updatePlot = async (
  id: number,
  plot: PlotWhithIDsOfFKs
): Promise<PlotWhithIDsOfFKs> => {
  const farm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByIdWithoutJoin(plot.farm_id!);
  if (!farm)
    throw makeError({ message: "The farm does not exist!", status: 200 });

  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectPlotByIdAndFarmId(id, farm.id!);
  if (!existsPlot)
    throw makeError({
      message:
        "The plot does not exist or does not belong to the indicated farm!",
      status: 200,
    });

  try {
    return await plotRepository.updatePlot(id, {
      name: plot.name,
    });
  } catch (error) {
    throw error;
  }
};

const deletePlot = async (id: number): Promise<PlotWhithIDsOfFKs> => {
  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectByIdWhithoutJoin(id);
  if (!existsPlot)
    throw makeError({
      message: "The plot does not exist!",
      status: 200,
    });

  try {
    return await plotRepository.deletePlot(id);
  } catch (error) {
    throw error;
  }
};

export default {
  getPlotsInFarm,
  getPlotsInFarmWithPlatingData,
  getAPlotWithPlantingData,
  postPlot,
  updatePlot,
  deletePlot,
};
