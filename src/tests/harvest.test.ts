import { describe, expect, jest } from "@jest/globals";
import harvestService from "../api/services/harvestService";
import harvestRepository from "../api/repositories/harvestRepository";
import plotRepository from "../api/repositories/plotRepository";
import userRepository from "../api/repositories/usersRepository";
import farmRepository from "../api/repositories/farmRepository";
import {
  mockedPlotWhithIds,
  mockedFarmWhithIds,
  mockedHarvestWithIds,
  mockedHarvestWithNames,
  mockedUserWhithIds,
} from "./harvestMock";
import plantingsRepository from "../api/repositories/plantingsRepository";
import { plantingData } from "./mockPlantings";

describe("Harvest Services Tests - registerNewHarvest Function", () => {
  it("Resgister a harvest", async () => {
    jest
      .spyOn(userRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(plantingsRepository, "selectPlanting")
      .mockResolvedValueOnce([plantingData]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    const result = await harvestService.registerNewHarvest({
      date: new Date("2023-06-28T03:00:00.000Z"),
      bags: 40,
      plot_id: 1,
      user_id: 1,
      farm_id: 1,
    });

    expect(result).toMatchObject(mockedHarvestWithIds);
  });
  it("Resgister fail because plot does not exist", async () => {
    jest
      .spyOn(userRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(plantingsRepository, "selectPlanting")
      .mockResolvedValueOnce([plantingData]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_id: 1,
        user_id: 1,
        farm_id: 1,
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "Plot Not Found", status: 200 });
    }
  });

  it("Resgister fail because user does not exist", async () => {
    jest
      .spyOn(userRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(plantingsRepository, "selectPlanting")
      .mockResolvedValueOnce([plantingData]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_id: 1,
        user_id: 1,
        farm_id: 1,
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "User Not Found", status: 200 });
    }
  });

  it("Resgister fail because Farm does not exist", async () => {
    jest
      .spyOn(userRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(plantingsRepository, "selectPlanting")
      .mockResolvedValueOnce([plantingData]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_id: 1,
        user_id: 1,
        farm_id: 1,
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "Farm Not Found", status: 200 });
    }
  });

  it("Resgister fail because Planting does not exist", async () => {
    jest
      .spyOn(userRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest.spyOn(plantingsRepository, "selectPlanting").mockResolvedValueOnce([]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_id: 1,
        user_id: 1,
        farm_id: 1,
      });
    } catch (error) {
      expect(error).toMatchObject({
        message: "Planting Not Found",
        status: 200,
      });
    }
  });
});

describe("Harvest Services Tests - getHarvestsOfTheFarm Functions", () => {
  it("Return all Harvests os the farm", async () => {
    jest
      .spyOn(harvestRepository, "selectAllOfTheFarmWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getAllHarvestsOfTheFarm(1);

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Return all Harvests of the plating", async () => {
    jest
      .spyOn(harvestRepository, "selectHarvestsByPlatingId")
      .mockResolvedValueOnce([mockedHarvestWithIds]);

    const result = await harvestService.getHarvestByPlantingId(1);

    expect(result).toMatchObject([mockedHarvestWithIds]);
  });

  it("Farm does not have harvests", async () => {
    jest
      .spyOn(harvestRepository, "selectAllOfTheFarmWithJoin")
      .mockResolvedValueOnce([]);

    const result = await harvestService.getAllHarvestsOfTheFarm(1);

    expect(result).toMatchObject([]);
  });

  it("Get Harvests of the farm by plot id", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "selectFromFarmByPlotIdWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getHarvestsOfTheFarmByPlotId(1, 1);

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Get Harvests of the farm by harvest date", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(harvestRepository, "selectFromFarmByDateWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getHarvestsOfTheFarmByDate(
      1,
      "2023-06-28"
    );

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Get Harvests of the farm by plot and harvest date", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);

    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(harvestRepository, "selectFromFarmByDateAndPlotWithJoin")
      .mockResolvedValueOnce([mockedFarmWhithIds]);

    const result = await harvestService.getHarvestOfTheFarmByDateAndPlot(
      1,
      1,
      "2023-06-28"
    );

    expect(result).toMatchObject([mockedFarmWhithIds]);
  });

  it("Error test, farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await harvestService.getHarvestsOfTheFarmByPlotId(1, 1);
    } catch (error) {
      expect(error).toMatchObject({ message: "Farm Not Found", status: 200 });
      jest.clearAllMocks();
    }
  });

  it("Error test, plot does not exist", async () => {
    try {
      jest.clearAllMocks();

      jest
        .spyOn(farmRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(mockedFarmWhithIds);
      jest
        .spyOn(plotRepository, "selectByIdWhithoutJoin")
        .mockResolvedValueOnce(undefined);

      await harvestService.getHarvestsOfTheFarmByPlotId(1, 7);
    } catch (error) {
      expect(error).toMatchObject({ message: "Plot Not Found", status: 200 });
    }
  });
});
