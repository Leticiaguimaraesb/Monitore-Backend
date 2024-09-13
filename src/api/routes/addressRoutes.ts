import { Router } from "express";
import addressController from "../controllers/addressController";
import { tokenValidator } from "../middlewares/tokenValidator";

const addressRoutes: Router = Router();

addressRoutes.get("/", tokenValidator, addressController.showAllAddresses);
addressRoutes.get("/:addressid", tokenValidator, addressController.showById);
addressRoutes.get(
  "/cep/:addresscep",
  tokenValidator,
  addressController.showByCep
);
addressRoutes.get(
  "/street/:addressstreet",
  tokenValidator,
  addressController.showByStreet
);
addressRoutes.delete("/:addressid", tokenValidator, addressController.remove);

export { addressRoutes };
