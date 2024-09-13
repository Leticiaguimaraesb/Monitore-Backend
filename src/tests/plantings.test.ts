import plantingsService from "../api/services/plantingsService";
import plantingsRepository from "../api/repositories/plantingsRepository";
import { describe, expect, jest } from "@jest/globals";
import { plantingData, platingWithHarvest } from "./mockPlantings";
import {
  PlantingsWithHarvestCount,
  PlantingsWithNames,
} from "../types/plantingTypes";
import plotRepository from "../api/repositories/plotRepository";
import { plot } from "./mockPlots";

describe("Plantings Tests", () => {
  it("Read All Plantings", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantings")
      .mockResolvedValueOnce([plantingData]);
    const result: PlantingsWithNames[] = await plantingsService.getAllPlantings(
      1,
      1,
      "2023-06-26"
    );
    expect(result).toMatchObject([plantingData]);
  });

  it("Read All Plantings in Plot with Harvests count", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(plot);
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsInPlotWithHarvests")
      .mockResolvedValueOnce([platingWithHarvest]);
    const result: PlantingsWithHarvestCount[] =
      await plantingsService.getAllPlantingsByPlotWithHarvestCount(1);
    expect(result).toMatchObject([platingWithHarvest]);
  });

  it("Plantings not found", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantings")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getAllPlantings(3, 3, undefined);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Plantings not found",
        status: 200,
      });
    }
  });

  it("Plot not found", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await plantingsService.getAllPlantingsByPlotWithHarvestCount(3);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Plot not found",
        status: 200,
      });
    }
  });

  it("Create a planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([{ id: 1 }]);
    jest
      .spyOn(plantingsRepository, "selectIdByNameAndByFarmId")
      .mockResolvedValue([{ id: 1 }]);
    jest
      .spyOn(plantingsRepository, "selectLastActivePlantingOnPlot")
      .mockResolvedValueOnce([plantingData]);
    jest.spyOn(plantingsRepository, "updatePlanting").mockResolvedValueOnce(1);
    jest
      .spyOn(plantingsRepository, "insertPlanting")
      .mockResolvedValueOnce([1]);
    const result: string = await plantingsService.postPlanting(plantingData);
    expect(result).toBe("Registered planting");
  });
  it("Some ID can not found - Create Planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([]);
    try {
      await plantingsService.postPlanting(plantingData);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Some ID can not found",
        status: 200,
      });
    }
  });
  it("Update a planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([{ id: 1 }]);
    jest
      .spyOn(plantingsRepository, "selectIdByNameAndByFarmId")
      .mockResolvedValue([{ id: 1 }]);
    jest.spyOn(plantingsRepository, "updatePlanting").mockResolvedValueOnce(1);
    const result: string = await plantingsService.updatePlanting(
      1,
      plantingData
    );
    expect(result).toBe("Planting has been updated");
  });
  it("Some ID can not found - Update Planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([]);
    try {
      await plantingsService.updatePlanting(1, plantingData);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Some ID can not found",
        status: 200,
      });
    }
  });
  it("Delete a planting", async () => {
    jest.spyOn(plantingsRepository, "deletePlanting").mockResolvedValue(1);
    const result: string = await plantingsService.deletePlanting(1);
    expect(result).toBe("Planting has benn deleted");
  });
  it("Planting not found - Delete Planting", async () => {
    jest.spyOn(plantingsRepository, "deletePlanting").mockResolvedValue(0);
    try {
      await plantingsService.deletePlanting(0);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Planting not found",
        status: 200,
      });
    }
  });

  it("Select Id", async () => {
    jest
      .spyOn(plantingsRepository, "selectId")
      .mockResolvedValueOnce([{ id: 1 }]);
    const result: number | null = await plantingsService.selectId(
      "plot",
      "name",
      "plot"
    );
    expect(result).toBe(1);
  });
  it("Return NULL - Select Id", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValueOnce([]);
    try {
      await plantingsService.selectId("plots", "names", "plots");
    } catch (error) {
      expect(error).toBe(null);
    }
  });
});
