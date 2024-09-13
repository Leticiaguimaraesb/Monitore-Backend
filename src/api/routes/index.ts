import { Router } from "express";
import { router as weatherRoutes } from "./weather";
import { router as plantingRoutes } from "./plantings";
import { harvestRouter } from "./harvestRoutes";
import { userRoutes } from "./userRoutes";
import { farmRoutes } from "./farmRoutes";
import { addressRoutes } from "./addressRoutes";
import { router as plotRoutes } from "./plots";
import { router as stagesRoutes } from "./stages";

const router: Router = Router();

router.use("/weather", weatherRoutes);
router.use("/harvests", harvestRouter);
router.use("/users", userRoutes);
router.use("/farms", farmRoutes);
router.use("/addresses", addressRoutes);
router.use("/plots", plotRoutes);
router.use("/plantings", plantingRoutes);
router.use("/stages", stagesRoutes);

export { router };
