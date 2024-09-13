import { Router } from "express";
import farmController from "../controllers/farmController";
import farmDataValidator from "../middlewares/farmDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const farmRoutes: Router = Router();

farmRoutes.get("/", tokenValidator, farmController.showAllFarms);
farmRoutes.get("/:farmid", tokenValidator, farmController.showById);
farmRoutes.get("/cnpj/:farmcnpj", tokenValidator, farmController.showByCnpj);
farmRoutes.get("/name/:farmname", tokenValidator, farmController.showByName);
farmRoutes.post(
  "/",
  tokenValidator,
  farmDataValidator.farmDataValidator,
  farmController.insert
);
farmRoutes.patch(
  "/cnpj/:farmcnpj",
  tokenValidator,
  farmDataValidator.farmPatchDataValidator,
  farmController.update
);
farmRoutes.delete("/:farmid", tokenValidator, farmController.remove);

export { farmRoutes };
