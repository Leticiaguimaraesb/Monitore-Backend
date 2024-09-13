import { expect, describe, jest } from "@jest/globals";
import weatherApi from "../api/weatherApi";
import weatherService from "../api/services/weatherService";
import {
  currentWeatherData,
  hourlyWeatherData,
  dailyWeatherData,
} from "./mockWeather";

describe("Get current weather", () => {
  it("should return the forecast data for the current day", async () => {
    jest
      .spyOn(weatherApi, "getCurrentWeather")
      .mockResolvedValueOnce(currentWeatherData);

    expect(await weatherService.current("Ipatinga")).toMatchObject({
      name: "Ipatinga",
    });
  });
});

describe("Get hourly weather forecast", () => {
  it("should return the forecast data hour by hour", async () => {
    jest
      .spyOn(weatherApi, "get4DaysHourlyForecast")
      .mockResolvedValueOnce(hourlyWeatherData);

    expect(await weatherService.hourlyForecast("Ipatinga")).toMatchObject({
      city: {
        name: "Ipatinga",
      },
      cnt: 24,
    });
  });

  it("should throw an error if the hour param is greater than 96", async () => {
    jest
      .spyOn(weatherApi, "get4DaysHourlyForecast")
      .mockResolvedValueOnce(hourlyWeatherData);

    try {
      await weatherService.hourlyForecast("Ipatinga", "", "", "98");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Hours must be in 1 - 96 interval",
      });
    }
  });
});

describe("Get daily weather forecast", () => {
  it("should return the daily forecast up to 16 days", async () => {
    jest
      .spyOn(weatherApi, "getUpTo16DaysForecast")
      .mockResolvedValueOnce(dailyWeatherData);

    expect(await weatherService.upTo16DaysForecast("Ipatinga")).toMatchObject({
      city: {
        name: "Ipatinga",
      },
      cnt: 24,
    });
  });

  it("should throw an error if the days param is greater than 16", async () => {
    jest
      .spyOn(weatherApi, "getUpTo16DaysForecast")
      .mockResolvedValueOnce(dailyWeatherData);

    try {
      await weatherService.upTo16DaysForecast("Ipatinga", "", "", "17");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Days must be in 1 - 16 interval",
      });
    }
  });
});

describe("Get month weather forecast", () => {
  it("should return the daily forecast up to 30 days", async () => {
    jest
      .spyOn(weatherApi, "getUpTo30DaysForecast")
      .mockResolvedValueOnce(dailyWeatherData);

    expect(await weatherService.upTo30DaysForecast("Ipatinga")).toMatchObject({
      city: {
        name: "Ipatinga",
      },
      cnt: 24,
    });
  });

  it("should throw an error if the days param is greater than 30", async () => {
    jest
      .spyOn(weatherApi, "getUpTo16DaysForecast")
      .mockResolvedValueOnce(dailyWeatherData);

    try {
      await weatherService.upTo30DaysForecast("Ipatinga", "", "", "31");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Days must be in 1 - 30 interval",
      });
    }
  });
});
