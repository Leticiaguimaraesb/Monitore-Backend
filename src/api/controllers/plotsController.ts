import { NextFunction, Request, Response } from "express";
import { PlotWhithIDsOfFKs, PlotWithPlatingData } from "../../types/plotTypes";
import plotService from "../services/plotsService";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farm_id = Number(req.params.id);
    const allPlotsOnFarm: PlotWhithIDsOfFKs[] =
      await plotService.getPlotsInFarm(farm_id);
    res.status(200).send(allPlotsOnFarm);
  } catch (error) {
    next(error);
  }
};

const indexWithPlatingData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { farm, plot } = req.query;
    const allPlotsOnFarm: PlotWithPlatingData[] =
      await plotService.getPlotsInFarmWithPlatingData(farm, plot);
    res.status(200).send(allPlotsOnFarm);
  } catch (error) {
    next(error);
  }
};

const showWithPlatingData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, farm_id } = req.params;
    const plotOnFarm: PlotWithPlatingData[] =
      await plotService.getAPlotWithPlantingData(Number(id), Number(farm_id));
    res.status(200).send(plotOnFarm);
  } catch (error) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, farm_id } = req.body;
    const plot: PlotWhithIDsOfFKs = { name, farm_id };
    const newPlot: PlotWhithIDsOfFKs[] = await plotService.postPlot(plot);
    res.status(200).send(newPlot);
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const plot: PlotWhithIDsOfFKs = req.body;
    const updatedPlot: PlotWhithIDsOfFKs = await plotService.updatePlot(
      id,
      plot
    );
    res.status(200).send(updatedPlot);
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deletedPlot: PlotWhithIDsOfFKs = await plotService.deletePlot(id);
    res.status(200).send({
      message: "The following Plot was deleted with success",
      plot: deletedPlot,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  indexWithPlatingData,
  showWithPlatingData,
  insert,
  update,
  remove,
};
