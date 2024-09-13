import {
  currentWeatherApi,
  forecastWeatherApi,
  forecastProWeatherApi,
  defaultParameters,
} from "./apiConnection";
import { QueryType } from "../../types/queryType";
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "../../types/weatherTypes";

const makeLocation = (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType
): string => {
  return countryName
    ? (`${cityName}, ${stateName}, ${countryName}` as string)
    : stateName
    ? (`${cityName}, ${stateName}` as string)
    : (cityName as string);
};

const getCurrentWeather = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType
): Promise<CurrentWeather> => {
  const location: string = makeLocation(cityName, stateName, countryName);

  const response = await currentWeatherApi.get(
    `?q=${location}&${defaultParameters}`
  );
  return response.data;
};

const get4DaysHourlyForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfHours: QueryType = "24" // 1 - 16
): Promise<HourlyWeather> => {
  const location: string = makeLocation(cityName, stateName, countryName);

  const response = await forecastProWeatherApi.get(
    `/hourly?q=${location}&${defaultParameters}&cnt=${numberOfHours}`
  );
  return response.data;
};

const getUpTo16DaysForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfDays: QueryType = "7" // 1 - 16
): Promise<DailyWeather> => {
  const location: string = makeLocation(cityName, stateName, countryName);

  const response = await forecastWeatherApi.get(
    `/daily?q=${location}&${defaultParameters}&cnt=${numberOfDays}`
  );
  return response.data;
};

const getUpTo30DaysForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfDays: QueryType = "7" // 1 - 16
): Promise<DailyWeather> => {
  const location: string = makeLocation(cityName, stateName, countryName);

  const response = await forecastProWeatherApi.get(
    `/climate?q=${location}&${defaultParameters}&cnt=${numberOfDays}`
  );
  return response.data;
};

export default {
  getCurrentWeather,
  get4DaysHourlyForecast,
  getUpTo16DaysForecast,
  getUpTo30DaysForecast,
};
