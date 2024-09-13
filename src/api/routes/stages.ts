import { Router } from "express";
import stagesController from "../controllers/stagesController";
import middleware from "../middlewares/stagesDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const router: Router = Router();

router.get("/", tokenValidator, stagesController.index);
router.get(
  "/:id",
  tokenValidator,
  middleware.stagesPathValidatorByCulture,
  stagesController.show
);

export { router };
