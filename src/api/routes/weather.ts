import { Router } from "express";
import weatherController from "../controllers/weatherController";
import middleware from "../middlewares/weatherQueryValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const router: Router = Router();

router.get(
  "/current",
  tokenValidator,
  middleware.weatherCityQueryValidator,
  weatherController.getCurrentWeather
);
router.get(
  "/hourly",
  tokenValidator,
  middleware.weatherCityQueryValidator,
  weatherController.getHourlyForecast
);
router.get(
  "/daily",
  tokenValidator,
  middleware.weatherCityQueryValidator,
  weatherController.getDailyForecast
);
router.get(
  "/month",
  tokenValidator,
  middleware.weatherCityQueryValidator,
  weatherController.getMonthForecast
);

export { router };
