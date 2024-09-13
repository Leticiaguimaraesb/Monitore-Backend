import { describe, expect, it, jest } from "@jest/globals";
import plotRepository from "../api/repositories/plotRepository";
import { allPlots, farm, plot, plotWitPlating } from "./mockPlots";
import plotService from "../api/services/plotsService";
import farmRepository from "../api/repositories/farmRepository";

describe("Get all plots of the farm", () => {
  it("Should return all plots of the informated farm", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectPlotsByFarmId")
      .mockResolvedValueOnce(allPlots);

    expect(await plotService.getPlotsInFarm(1)).toMatchObject([plot]);
  });

  it("Should throw an error if the informated farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.getPlotsInFarm(5);
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm does not exist!" });
    }
  });
});

describe("Get plots of the farm with plating data", () => {
  it("Should return all plots of the informated farm with active planting data", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectPlotByFarmIdWithJoin")
      .mockResolvedValueOnce([plotWitPlating]);

    expect(
      await plotService.getPlotsInFarmWithPlatingData(1, "")
    ).toMatchObject([plotWitPlating]);
  });

  it("Should throw an error if the informated farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.getPlotsInFarmWithPlatingData(5, "");
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm does not exist!" });
    }
  });
});

describe("Get a plot of the farm with plating data", () => {
  it("Should return the selected plots of the informated farm with active planting data", async () => {
    jest
      .spyOn(plotRepository, "selectPlotByFarmIdWithJoin")
      .mockResolvedValueOnce([plotWitPlating]);

    expect(await plotService.getAPlotWithPlantingData(10, 2)).toMatchObject([
      plotWitPlating,
    ]);
  });
});

describe("Insert a new plot on farm", () => {
  it("Should return the inserted plot", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectByNameAndFarmID")
      .mockResolvedValueOnce(undefined);

    jest.spyOn(plotRepository, "insertPlot").mockResolvedValueOnce(allPlots);

    expect(
      await plotService.postPlot({ name: "plotName", farm_id: 1 })
    ).toMatchObject(allPlots);
  });

  it("Should throw an error if the farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.postPlot({ name: "plotName", farm_id: 1 });
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm doesn't exist!" });
    }
  });

  it("Should throw an error if the plot already exists", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectByNameAndFarmID")
      .mockResolvedValueOnce(plot);

    try {
      await plotService.postPlot({ name: "plotName", farm_id: 1 });
    } catch (error) {
      expect(error).toMatchObject({ message: "The plot already exists!" });
    }
  });
});

describe("Update a plot on farm", () => {
  it("Should return the updated plot", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(plot);

    jest.spyOn(plotRepository, "updatePlot").mockResolvedValueOnce(plot);

    expect(
      await plotService.updatePlot(1, { name: "plotName", farm_id: 1 })
    ).toMatchObject(plot);
  });

  it("Should throw an error if the farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.updatePlot(1, { name: "plotName", farm_id: 1 });
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm does not exist!" });
    }
  });

  it("Should throw an error if the plot does not exist or does not belong to the farm", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(farm);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.updatePlot(1, { name: "plotName", farm_id: 1 });
    } catch (error) {
      expect(error).toMatchObject({
        message:
          "The plot does not exist or does not belong to the indicated farm!",
      });
    }
  });
});

describe("Delete a plot of the farm", () => {
  it("Should return the deleted plot of the farm", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(plot);

    jest.spyOn(plotRepository, "deletePlot").mockResolvedValueOnce(plot);

    expect(await plotService.deletePlot(1)).toMatchObject(plot);
  });

  it("Should throw an error if the informated plot id does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await plotService.deletePlot(1);
    } catch (error) {
      expect(error).toMatchObject({ message: "The plot does not exist!" });
    }
  });
});
