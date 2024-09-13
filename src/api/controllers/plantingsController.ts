import { NextFunction, Request, Response } from "express";
import plantingsService from "../services/plantingsService";
import { PlantingsWithNames } from "../../types/plantingTypes";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { farm, plot, date } = req.query;
    const plantings = await plantingsService.getAllPlantings(farm, plot, date);
    res.status(200).send(plantings);
  } catch (error) {
    next(error);
  }
};

const showPlanting = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const planting = await plantingsService.getAPlanting(id);
    res.status(200).send(planting);
  } catch (error) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plotId = Number(req.params.id);
    const plantings =
      await plantingsService.getAllPlantingsByPlotWithHarvestCount(plotId);
    res.status(200).send(plantings);
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
    const { date, saplings, plot, stage, user, farm }: PlantingsWithNames =
      req.body;
    const planting: PlantingsWithNames = {
      date,
      saplings,
      plot,
      stage,
      user,
      farm,
    };
    const registeredPlanting = await plantingsService.postPlanting(planting);
    res.send(registeredPlanting);
  } catch (error: unknown) {
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
    const {
      date,
      saplings,
      plot,
      stage,
      user,
      farm,
      active,
    }: PlantingsWithNames = req.body;
    const planting: PlantingsWithNames = {
      date,
      saplings,
      plot,
      stage,
      user,
      farm,
      active,
    };
    const updatePlanting = await plantingsService.updatePlanting(id, planting);
    res.send(updatePlanting);
  } catch (error: unknown) {
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
    const deletePlanting = await plantingsService.deletePlanting(id);
    res.send(deletePlanting);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  index,
  showPlanting,
  show,
  insert,
  update,
  remove,
};
