import { Request, Response, NextFunction } from "express";
import { string, number, object } from "yup";

const hasTrueStrict: { strict: boolean } = { strict: true };

const plantingPathValidatorByFarm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pathPlanting = parseInt(req.params.id);
    const pathPlantingSchema = number().required("Id is required");
    await pathPlantingSchema.validate(pathPlanting, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const plantingQueryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farm = req.query.farm ? Number(req.query.farm) : undefined;
    const plot = req.query.plot;
    const date = req.query.date;
    const query = { farm, plot, date };

    const querySchema = object({
      farm: number(),
      plot: string(),
      date: string(),
    });
    await querySchema.validate(query, hasTrueStrict);

    next();
  } catch (error: unknown) {
    next(error);
  }
};

const plantingsDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const planting = req.body;
    const plantingSchema = object({
      date: string().required("Date is required"),
      saplings: number().required("Saplings is required"),
      plot: string().required("Plot is required"),
      stage: string().required("Stage is required"),
      user: string().required("User is required"),
      farm: string().required("Farm is required"),
    });
    await plantingSchema.validate(planting, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  plantingPathValidatorByFarm,
  plantingQueryValidator,
  plantingsDataValidator,
};
