import { QueryType } from "../../types/queryType";
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "../../types/weatherTypes";
import { makeError } from "../middlewares/errorHandler";
import weatherApi from "../weatherApi";

const current = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType
): Promise<CurrentWeather> => {
  return await weatherApi.getCurrentWeather(city, state, country);
};

const hourlyForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  hours?: QueryType
): Promise<HourlyWeather> => {
  const hoursParam: number = hours ? Number(hours as string) : 0;
  if (hoursParam > 96)
    throw makeError({
      message: "Hours must be in 1 - 96 interval",
      status: 200,
    });

  return await weatherApi.get4DaysHourlyForecast(city, state, country, hours);
};

const upTo16DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
): Promise<DailyWeather> => {
  const daysParam: number = days ? Number(days as string) : 0;
  if (daysParam > 16)
    throw makeError({
      message: "Days must be in 1 - 16 interval",
      status: 200,
    });

  return await weatherApi.getUpTo16DaysForecast(city, state, country, days);
};

const upTo30DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
): Promise<DailyWeather> => {
  const daysParam: number = days ? Number(days as string) : 0;
  if (daysParam > 30)
    throw makeError({
      message: "Days must be in 1 - 30 interval",
      status: 200,
    });

  return await weatherApi.getUpTo30DaysForecast(city, state, country, days);
};

export default {
  current,
  hourlyForecast,
  upTo16DaysForecast,
  upTo30DaysForecast,
};
