import { NextFunction, Request, Response } from "express";

import addressService from "../services/addressService";

const showAllAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAddresses = await addressService.getAllAddresses();
    res.status(200).json(allAddresses);
  } catch (error: unknown) {
    next(error);
  }
};

const showById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.addressid);
    const address = await addressService.findAddressById(id);
    res.status(200).json(address);
  } catch (error: unknown) {
    next(error);
  }
};

const showByCep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cep = req.params.addresscep;
    const address = await addressService.findAddressByCep(cep);
    res.status(200).json(address);
  } catch (error: unknown) {
    next(error);
  }
};

const showByStreet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const street = req.params.addressstreet;
    const address = await addressService.findAddressByStreet(street);
    res.status(200).json(address);
  } catch (error: unknown) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.addressid);
    const deletedAddress: unknown = await addressService.deleteAddressById(id);

    if (deletedAddress) res.status(200).json(deletedAddress);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  showAllAddresses,
  showById,
  showByCep,
  showByStreet,
  remove,
};
