import { Request, Response, NextFunction } from "express";
import { object, string, number } from "yup";

const harvestDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const harvestData = req.body;
    const harvestSchema = object({
      date: string().required(),
      bags: number().min(1).required(),
      plot_id: number().required(),
      user_id: number().required(),
      farm_id: number().required(),
      planting_id: number().required(),
    });
    await harvestSchema.validate(harvestData);
    next();
  } catch (error) {
    next(error);
  }
};

const harvestPatchDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const harvestData = req.body;
    const harvestSchema = object({
      date: string(),
      bags: number().min(1),
      plot_name: string(),
      user_name: string(),
      farm_name: string(),
    });
    await harvestSchema.validate(harvestData);
    next();
  } catch (error) {
    next(error);
  }
};

export default { harvestDataValidator, harvestPatchDataValidator };
