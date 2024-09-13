import addressRepository from "../repositories/addressRepository";
import { Address } from "../../types";
import { makeError } from "../middlewares/errorHandler";

const getAllAddresses = async () => {
  const addresses = await addressRepository.index();

  if (!addresses[0]) {
    throw makeError({
      message: "Error getting Addresses",
      status: 200,
    });
  }

  return addresses;
};

const registerAddress = async (address: Address): Promise<Address> => {
  const newAddress = await addressRepository.insertNewAddress(address);
  return newAddress;
};

const findAddressById = async (id: number) => {
  const findAddress = await addressRepository.selectByIdWithoutJoin(id);

  if (!findAddress) {
    throw makeError({
      message: "Address not Found",
      status: 200,
    });
  }

  return findAddress;
};

const findAddressByStreet = async (street: string) => {
  const findAddress = await addressRepository.selectByStreetWithoutJoin(street);

  if (!findAddress) {
    throw makeError({
      message: "Address not Found",
      status: 200,
    });
  }

  return findAddress;
};

const findAddressByCep = async (cep: string) => {
  const findAddress = await addressRepository.selectByCepWithoutJoin(cep);

  if (!findAddress) {
    throw makeError({
      message: "Address not Found",
      status: 200,
    });
  }

  return findAddress;
};

const updateAddressById = async (addressId: number, address: Address) => {
  const existingAddress = await addressRepository.selectByIdWithoutJoin(
    addressId
  );

  if (!existingAddress) {
    throw makeError({
      message: "Address not Found",
      status: 200,
    });
  }

  const newAddressData: Address = {
    street: address.street,
    number: address.number,
    complement: address.complement,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    cep: address.cep,
    reference_point: address.reference_point,
  };

  await addressRepository.updateAddress(newAddressData, addressId);
  const updatedAddress = await addressRepository.selectByIdWithoutJoin(
    addressId
  );

  return updatedAddress;
};

const deleteAddressById = async (id: number) => {
  const existingAddress = await addressRepository.selectByIdWithoutJoin(id);

  if (!existingAddress) {
    throw makeError({
      message: "Address not found",
      status: 200,
    });
  }

  const isDeleted = await addressRepository.deleteAddress(id);

  if (isDeleted) return true;

  return false;
};

export default {
  getAllAddresses,
  registerAddress,
  findAddressById,
  findAddressByStreet,
  findAddressByCep,
  updateAddressById,
  deleteAddressById,
};
