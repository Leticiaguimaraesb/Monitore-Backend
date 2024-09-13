import { Request, Response, NextFunction } from "express";
import { string, number, object } from "yup";

const farmDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmData = req.body;
    const farmSchema = object({
      cnpj: string().min(14).required(),
      name: string().required(),
      phone: string().min(11).required(),
      address: object({
        number: number().required(),
        complement: string().required(),
        neighborhood: string().required(),
        city: string().required(),
        state: string().required(),
        cep: string().min(8).required(),
        reference_point: string().required(),
      }).required(),
    });
    await farmSchema.validate(farmData);
    next();
  } catch (error) {
    next(error);
  }
};

const farmPatchDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmData = req.body;
    const farmSchema = object({
      cnpj: string().min(14),
      name: string(),
      phone: string().min(11),
      address: object({
        number: number(),
        complement: string(),
        neighborhood: string(),
        city: string(),
        state: string(),
        cep: string().min(8),
        reference_point: string(),
      }),
    });
    await farmSchema.validate(farmData);
    next();
  } catch (error) {
    next(error);
  }
};

export default { farmDataValidator, farmPatchDataValidator };
