import { Router } from "express";
import authController from "../controllers/authController";
import userDataValidator from "../middlewares/userDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const userRoutes: Router = Router();

userRoutes.get("/", tokenValidator, authController.showAllUsers);
userRoutes.post("/login", authController.login);
userRoutes.post("/validatetoken", authController.vaidateToken);
userRoutes.get("/:userid", tokenValidator, authController.showById);
userRoutes.get(
  "/cpforcnpj/:usercpforcnpj",
  tokenValidator,
  authController.showByCpfOrCnpj
);
userRoutes.get("/name/:username", tokenValidator, authController.showByName);
userRoutes.post(
  "/",
  tokenValidator,
  userDataValidator.userDataValidator,
  authController.insert
);
userRoutes.patch(
  "/id/:userid",
  tokenValidator,
  userDataValidator.userPatchDataValidator,
  authController.update
);
userRoutes.delete("/:userid", tokenValidator, authController.remove);

export { userRoutes };
