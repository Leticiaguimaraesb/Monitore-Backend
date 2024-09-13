import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const parameters = {
  units: "metric",
  lang: "pt_br",
  appid: "d7fefb0c3acf5e8879f7ea77cc51ce57",
};

export const defaultParameters = `appid=${parameters.appid}&units=${parameters.units}&lang=${parameters.lang}`;

export const currentWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

export const forecastWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast/",
});

export const forecastProWeatherApi = axios.create({
  baseURL: "https://pro.openweathermap.org/data/2.5/forecast/",
});
