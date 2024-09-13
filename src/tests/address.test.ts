import addressRepository from "../api/repositories/addressRepository";
import addressService from "../api/services/addressService";
import { describe, expect, jest } from "@jest/globals";
import { addressDataWithId, addressDataWithoutId } from "./mockAddress";

describe("Tests address service functions", () => {
  it("register a new address", async () => {
    jest
      .spyOn(addressRepository, "insertNewAddress")
      .mockResolvedValueOnce(addressDataWithId);

    const result = await addressService.registerAddress(addressDataWithoutId);

    expect(result).toMatchObject(addressDataWithId);
  });

  it("get all addres", async () => {
    jest
      .spyOn(addressRepository, "index")
      .mockResolvedValueOnce([addressDataWithId]);

    const result = await addressService.getAllAddresses();

    expect(result).toMatchObject([addressDataWithId]);
  });

  it("Find address by id", async () => {
    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(addressDataWithId);

    const result = await addressService.findAddressById(1);

    expect(result).toMatchObject(addressDataWithId);
  });

  it("Find address by street", async () => {
    jest
      .spyOn(addressRepository, "selectByStreetWithoutJoin")
      .mockResolvedValueOnce(addressDataWithId);

    const result = await addressService.findAddressByStreet(
      "Avenida Castelo Branco"
    );

    expect(result).toMatchObject(addressDataWithId);
  });

  it("Update address by id", async () => {
    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(addressDataWithId);

    jest.spyOn(addressRepository, "updateAddress").mockResolvedValueOnce(1);

    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce({
        id: 1,
        street: "Avenida Castelo Branco",
        number: 1,
        complement: "Terceiro Andar",
        neighborhood: "Horto",
        city: "Ipatinga",
        state: "Minas Gerais",
        cep: "35162080",
        reference_point: "Em frente à praça",
      });

    const result = await addressService.updateAddressById(1, {
      street: "Avenida Castelo Branco",
      number: 1,
      complement: "Terceiro Andar",
      neighborhood: "Horto",
      city: "Ipatinga",
      state: "Minas Gerais",
      cep: "35162080",
      reference_point: "Em frente à praça",
    });

    expect(result).toMatchObject({
      id: 1,
      street: "Avenida Castelo Branco",
      number: 1,
      complement: "Terceiro Andar",
      neighborhood: "Horto",
      city: "Ipatinga",
      state: "Minas Gerais",
      cep: "35162080",
      reference_point: "Em frente à praça",
    });
  });

  it("Delete address by id", async () => {
    jest
      .spyOn(addressRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(addressDataWithId);
    jest.spyOn(addressRepository, "deleteAddress").mockResolvedValueOnce(1);

    const result = await addressService.deleteAddressById(2);

    expect(result).toBe(true);
  });
});

describe("Test errors of address service functions", () => {
  it("get all addres - no registered address", async () => {
    try {
      jest.spyOn(addressRepository, "index").mockResolvedValueOnce([]);

      await addressService.getAllAddresses();
    } catch (error) {
      expect(error).toMatchObject({
        message: "Error getting Addresses",
        status: 200,
      });
    }
  });

  it("Find address by id - address not resgistered", async () => {
    try {
      jest
        .spyOn(addressRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await addressService.findAddressById(1);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Address not Found",
        status: 200,
      });
    }
  });

  it("Find address by street - no registered address ", async () => {
    try {
      jest
        .spyOn(addressRepository, "selectByStreetWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await addressService.findAddressByStreet("Avenida Castelo Branco");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Address not Found",
        status: 200,
      });
    }
  });

  it("Update address by id - address not resgistered", async () => {
    try {
      jest
        .spyOn(addressRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await addressService.updateAddressById(2, {
        street: "Avenida Castelo Branco",
        number: 1,
        complement: "Terceiro Andar",
        neighborhood: "Horto",
        city: "Ipatinga",
        state: "Minas Gerais",
        cep: "35162080",
        reference_point: "Em frente à praça",
      });
    } catch (error) {
      expect(error).toMatchObject({
        message: "Address not Found",
        status: 200,
      });
    }
  });

  it("Delete address by id - address not resgistered", async () => {
    try {
      jest
        .spyOn(addressRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(undefined);

      await addressService.deleteAddressById(2);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Address not found",
        status: 200,
      });
    }
  });
});
