import { NextFunction, Request, Response } from "express";
import stagesService from "../services/stagesService";
import { StagesWithName } from "../../types/stagesTypes";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stages: StagesWithName[] = await stagesService.getAllStages();
    res.status(200).send(stages);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const stages: StagesWithName[] = await stagesService.getAllStagesOfACulture(
      id
    );
    res.status(200).send(stages);
  } catch (error: unknown) {
    next(error);
  }
};

export default { index, show };
