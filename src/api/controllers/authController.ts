import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";

const showAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await authService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error: unknown) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.authenticateUser(req.body);
    res.status(201).json(token);
  } catch (error: unknown) {
    next(error);
  }
};

const vaidateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await authService.validateToken(req.body.token);
    res.status(201).json(response);
  } catch (error: unknown) {
    next(error);
  }
};

const showById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.userid);
    const user = await authService.findUserById(id);
    res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

const showByCpfOrCnpj = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cpfOrCnpj = req.params.usercpforcnpj;
    const user = await authService.findUserByCpfOrCnpj(cpfOrCnpj);
    res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

const showByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.username;
    const user = await authService.findUserByName(name);
    res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.userid);
    const updatedUser = await authService.updateUserById(id, req.body);
    res.status(201).json(updatedUser);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.userid);
    const deletedUser: unknown = await authService.deleteUserById(id);

    if (deletedUser) res.status(200).json(deletedUser);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllUsers,
  insert,
  login,
  vaidateToken,
  showById,
  showByCpfOrCnpj,
  showByName,
  update,
  remove,
};
