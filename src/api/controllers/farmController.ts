import { NextFunction, Request, Response } from "express";
import farmService from "../services/farmService";

const showAllFarms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allFarms = await farmService.getAllFarms();
    res.status(200).json(allFarms);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newFarm = await farmService.registerFarm(req.body);
    res.status(201).json(newFarm);
  } catch (error: unknown) {
    next(error);
  }
};

const showById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.farmid);
    const farm = await farmService.findFarmById(id);
    res.status(200).json(farm);
  } catch (error: unknown) {
    next(error);
  }
};

const showByCnpj = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cnpj = req.params.farmcnpj;
    const farm = await farmService.findFarmByCnpj(cnpj);
    res.status(200).json(farm);
  } catch (error: unknown) {
    next(error);
  }
};

const showByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.farmname;
    const farm = await farmService.findFarmByName(name);
    res.status(200).json(farm);
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedFarm = await farmService.updateFarmByCnpj(
      req.body,
      req.params.farmcnpj
    );
    res.status(201).json(updatedFarm);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.farmid);
    const deletedFarm: unknown = await farmService.deleteFarmById(id);

    if (deletedFarm) res.status(200).json(deletedFarm);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllFarms,
  insert,
  showById,
  showByCnpj,
  showByName,
  update,
  remove,
};
