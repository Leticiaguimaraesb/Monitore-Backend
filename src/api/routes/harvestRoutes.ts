import { Router } from "express";
import harvestController from "../controllers/harvestController";
import dataValidator from "../middlewares/harvestsDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const harvestRouter: Router = Router();

harvestRouter.post(
  "/",
  tokenValidator,
  dataValidator.harvestDataValidator,
  harvestController.insert
);

harvestRouter.get("/farm/:farmid", tokenValidator, harvestController.index);

harvestRouter.get(
  "/farm/:farmid/plot/:plotid",
  tokenValidator,
  harvestController.getHarvestsOfTheFarmByPlotId
);

harvestRouter.get(
  "/farm/:farmid/date/:harvestdate",
  tokenValidator,
  harvestController.getHarvestsOfTheFarmByDate
);

harvestRouter.get(
  "/farm/:farmid/plot/:plotid/date/:harvestdate",
  tokenValidator,
  harvestController.getHarvestOfTheFarmByDateAndPlot
);

harvestRouter.get(
  "/planting/:id",
  tokenValidator,
  harvestController.showByPlating
);

harvestRouter.patch(
  "/:harvestid",
  tokenValidator,
  dataValidator.harvestPatchDataValidator,
  harvestController.updateHarvestOfTheFarm
);

harvestRouter.delete(
  "/:harvestid",
  tokenValidator,
  harvestController.deleteHarvest
);

export { harvestRouter };
