import { Router } from "express";
import plantingsController from "../controllers/plantingsController";
import middleware from "../middlewares/plantingsDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const router: Router = Router();

router.get(
  "/",
  tokenValidator,
  middleware.plantingQueryValidator,
  plantingsController.index
);
router.get(
  "/plot/:id",
  tokenValidator,
  middleware.plantingPathValidatorByFarm,
  plantingsController.show
);
router.get("/:id", tokenValidator, plantingsController.showPlanting);
router.post("/", middleware.plantingsDataValidator, plantingsController.insert);
router.put(
  "/:id",
  tokenValidator,
  middleware.plantingPathValidatorByFarm,
  middleware.plantingsDataValidator,
  plantingsController.update
);
router.delete(
  "/:id",
  tokenValidator,
  middleware.plantingPathValidatorByFarm,
  plantingsController.remove
);

export { router };
