import { Request, Response, NextFunction } from "express";
import { string } from "yup";

const hasTrueStrict: { strict: boolean } = { strict: true };

const weatherCityQueryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const city = req.query.city as string;
    const citySchema = string().required("City name is required");
    await citySchema.validate(city, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default { weatherCityQueryValidator };
