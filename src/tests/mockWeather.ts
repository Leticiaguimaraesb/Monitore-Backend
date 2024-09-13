import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "../types/weatherTypes";

export const currentWeatherData: CurrentWeather = {
  timezone: -10800,
  id: 3461144,
  name: "Ipatinga",
  cod: 200,
};

export const hourlyWeatherData: HourlyWeather = {
  city: {
    id: 3461144,
    name: "Ipatinga",
  },
  cod: "200",
  cnt: 24,
};

export const dailyWeatherData: DailyWeather = {
  city: {
    id: 3461144,
    name: "Ipatinga",
  },
  cod: "200",
  cnt: 24,
};
