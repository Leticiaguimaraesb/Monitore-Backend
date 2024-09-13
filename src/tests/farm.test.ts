import farmRepository from "../api/repositories/farmRepository";
import farmService from "../api/services/farmService";
import { describe, expect, jest } from "@jest/globals";
import {
  mockAddress,
  mockFarmWithAddress,
  mockFarmWithAddressId,
  mockFarmWithAddressResult,
} from "./mockFarm";
import addressRepository from "../api/repositories/addressRepository";

describe("Tests farm service functions", () => {
  it("register new farm", async () => {
    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(addressRepository, "insertNewAddress")
      .mockResolvedValueOnce(mockAddress);

    jest
      .spyOn(farmRepository, "insertNewFarm")
      .mockResolvedValueOnce(mockFarmWithAddress);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValue(mockAddress);

    const result = await farmService.registerFarm(mockFarmWithAddressResult);

    expect(result).toMatchObject(mockFarmWithAddressResult);
  });
  it("get all farms", async () => {
    jest
      .spyOn(farmRepository, "index")
      .mockResolvedValueOnce([mockFarmWithAddress]);

    const result = await farmService.getAllFarms();

    expect(result).toMatchObject([mockFarmWithAddressResult]);
  });

  it("get farm by cnpj", async () => {
    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(mockFarmWithAddressId);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockAddress);

    const result = await farmService.findFarmByCnpj("00000000000000");

    expect(result).toMatchObject(mockFarmWithAddressResult);
  });

  it("get farm by id", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockFarmWithAddressId);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockAddress);

    const result = await farmService.findFarmById(1);

    expect(result).toMatchObject(mockFarmWithAddressResult);
  });

  it("get farm by name", async () => {
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockFarmWithAddressId);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockAddress);

    const result = await farmService.findFarmByName("Fazenda Rebel Alliance");

    expect(result).toMatchObject(mockFarmWithAddressResult);
  });

  it("update farm by id", async () => {
    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(mockFarmWithAddress);

    jest.spyOn(addressRepository, "updateAddress").mockResolvedValueOnce(1);

    jest
      .spyOn(farmRepository, "updateFarm")
      .mockResolvedValueOnce(mockFarmWithAddress);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValue(mockAddress);

    const result = await farmService.updateFarmByCnpj(
      mockFarmWithAddressResult,
      "00000000000000"
    );

    expect(result).toMatchObject(mockFarmWithAddressResult);
  });

  it("delete farm by id", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockFarmWithAddress);
    jest.spyOn(farmRepository, "deleteFarm").mockResolvedValueOnce(1);

    const result = await farmService.deleteFarmById(1);

    expect(result).toBe(true);
  });
});

describe("Tests errors of farm service functions", () => {
  it("register new farm - Farm already registered", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByCnpjWithoutJoin")
        .mockResolvedValueOnce(mockFarmWithAddress);

      jest
        .spyOn(farmRepository, "insertNewFarm")
        .mockResolvedValueOnce(mockFarmWithAddress);

      jest
        .spyOn(addressRepository, "selectByIdWithoutJoin")
        .mockResolvedValue(mockAddress);

      jest
        .spyOn(addressRepository, "insertNewAddress")
        .mockResolvedValueOnce(mockAddress);

      await farmService.registerFarm(mockFarmWithAddressResult);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm already registered",
        status: 200,
      });
    }
  });
  it("get all farms - error getting farms", async () => {
    try {
      jest.spyOn(farmRepository, "index").mockResolvedValueOnce([]);

      await farmService.getAllFarms();
    } catch (error) {
      expect(error).toMatchObject({
        message: "Error getting Farms",
        status: 200,
      });
    }
  });

  it("get farm by cnpj - Farm not Found ", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByCnpjWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await farmService.findFarmByCnpj("00000000000000");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });

  it("get farm by id - Farm not Found ", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await farmService.findFarmById(1);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });

  it("get farm by name - Farm not Found ", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByNameWhithoutJoin")
        .mockResolvedValueOnce(undefined);

      await farmService.findFarmByName("Fazenda Rebel Alliance");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });

  it("update farm by id - Farm not Found ", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByCnpjWithoutJoin")
        .mockResolvedValueOnce(mockFarmWithAddress);

      jest
        .spyOn(farmRepository, "updateFarm")
        .mockResolvedValueOnce(mockFarmWithAddress);

      jest
        .spyOn(addressRepository, "selectByIdWithoutJoin")
        .mockResolvedValue(mockAddress);

      jest.spyOn(addressRepository, "updateAddress").mockResolvedValueOnce(1);

      await farmService.updateFarmByCnpj(mockFarmWithAddress, "00000000000000");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });

  it("delete farm by id - Farm not Found ", async () => {
    try {
      jest
        .spyOn(farmRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await farmService.deleteFarmById(1);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });
});
