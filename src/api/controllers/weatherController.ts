import { Request, Response, NextFunction } from "express";
import weathterService from "../services/weatherService";
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "../../types/weatherTypes";

const getCurrentWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { city, state, country } = req.query;
    const response: CurrentWeather = await weathterService.current(
      city,
      state,
      country
    );
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getHourlyForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { city, state, country, hours } = req.query;
    const response: HourlyWeather = await weathterService.hourlyForecast(
      city,
      state,
      country,
      hours
    );
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getDailyForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { city, state, country, days } = req.query;
    const response: DailyWeather = await weathterService.upTo16DaysForecast(
      city,
      state,
      country,
      days
    );
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const getMonthForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { city, state, country, days } = req.query;
    const response: DailyWeather = await weathterService.upTo30DaysForecast(
      city,
      state,
      country,
      days
    );
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

export default {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getMonthForecast,
};
