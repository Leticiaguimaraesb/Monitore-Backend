import { Request, Response, NextFunction } from "express";
import { number } from "yup";

const hasTrueStrict: { strict: boolean } = { strict: true };

const stagesPathValidatorByCulture = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pathStages = Number(req.params.id);
    const pathStagesSchema = number().required("Id is required");
    await pathStagesSchema.validate(pathStages, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default { stagesPathValidatorByCulture };
