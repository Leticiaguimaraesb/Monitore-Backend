import { Request, Response, NextFunction } from "express";
import { string, number, object } from "yup";

const userDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const userSchema = object({
      cpf_cnpj: string().min(11).required(),
      name: string().required(),
      celphone: string().min(11).required(),
      email: string().required(),
      password: string().min(8).required(),
      userType: string().required(),
      farm_cnpj: string().min(14).required(),
    });
    await userSchema.validate(userData);
    next();
  } catch (error) {
    next(error);
  }
};

const userPatchDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const userSchema = object({
      cpf_cnpj: string().min(11),
      name: string(),
      celphone: string().min(11),
      email: string(),
      password: string().min(8),
      userType: string(),
      farm_cnpj: string().min(14),
    });
    await userSchema.validate(userData);
    next();
  } catch (error) {
    next(error);
  }
};

export default { userDataValidator, userPatchDataValidator };
