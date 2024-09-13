import { NextFunction, Request, Response } from "express";
import harvestService from "../services/harvestService";

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const harvestData = req.body;
    const newHarvest = await harvestService.registerNewHarvest(harvestData);
    res.status(200).json(newHarvest);
  } catch (error: unknown) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.farmid);
    const harvests = await harvestService.getAllHarvestsOfTheFarm(id);
    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

const showByPlating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const harvests = await harvestService.getHarvestByPlantingId(id);
    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

const getHarvestsOfTheFarmByPlotId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farID = Number(req.params.farmid);
    const plotID = Number(req.params.plotid);

    const harvests = await harvestService.getHarvestsOfTheFarmByPlotId(
      farID,
      plotID
    );

    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};
const getHarvestsOfTheFarmByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmID = Number(req.params.farmid);
    const harvestDate = req.params.harvestdate;

    const harvests = await harvestService.getHarvestsOfTheFarmByDate(
      farmID,
      harvestDate
    );

    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

const getHarvestOfTheFarmByDateAndPlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmID = Number(req.params.farmid);
    const plotId = Number(req.params.plotid);
    const harvestDate = req.params.harvestdate;

    const harvests = await harvestService.getHarvestOfTheFarmByDateAndPlot(
      farmID,
      plotId,
      harvestDate
    );

    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

const updateHarvestOfTheFarm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.harvestid);
    const newHarvestData = req.body;
    const newHarvest = await harvestService.updateHarvest(id, newHarvestData);

    res.status(200).json(newHarvest);
  } catch (error: unknown) {
    next(error);
  }
};

const deleteHarvest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.harvestid);
    const deleteStatus = await harvestService.deleteHarvest(id);
    res.status(200).json(deleteStatus);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  insert,
  index,
  showByPlating,
  getHarvestsOfTheFarmByPlotId,
  getHarvestsOfTheFarmByDate,
  getHarvestOfTheFarmByDateAndPlot,
  updateHarvestOfTheFarm,
  deleteHarvest,
};
