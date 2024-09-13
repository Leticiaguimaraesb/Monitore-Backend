import farmRepository from "../repositories/farmRepository";
import { Address, FarmWhithAddress, FarmWhithIDsOfFKs } from "../../types";
import { makeError } from "../middlewares/errorHandler";
import addressRepository from "../repositories/addressRepository";

const getAllFarms = async () => {
  const farms = await farmRepository.index();

  if (!farms) {
    throw makeError({
      message: "Error getting Farms",
      status: 200,
    });
  }

  const result = farms.map((farm: any) => {
    const address = {
      street: farm.street,
      number: farm.number,
      complement: farm.complement,
      neighborhood: farm.neighborhood,
      city: farm.city,
      state: farm.state,
      cep: farm.cep,
      reference_point: farm.reference_point,
    };

    return {
      id: farm.id,
      cnpj: farm.cnpj,
      name: farm.name,
      phone: farm.phone,
      address,
    };
  });

  return result;
};

const registerFarm = async (
  farm: FarmWhithAddress
): Promise<FarmWhithIDsOfFKs> => {
  //registra a fazenda junto do endereço
  const existingFarm = await farmRepository.selectByCnpjWithoutJoin(farm.cnpj!);

  if (existingFarm) {
    throw makeError({
      message: "Farm already registered",
      status: 200,
    });
  }

  const newAddressData: Address = {
    street: farm.address!.street,
    number: farm.address!.number,
    complement: farm.address!.complement,
    neighborhood: farm.address!.neighborhood,
    city: farm.address!.city,
    state: farm.address!.state,
    cep: farm.address!.cep,
    reference_point: farm.address!.reference_point,
  };

  const newAddress = await addressRepository.insertNewAddress(newAddressData);

  const newFarmData: FarmWhithIDsOfFKs = {
    cnpj: farm.cnpj,
    name: farm.name,
    phone: farm.phone,
    address_id: newAddress.id,
  };

  const newFarm = await farmRepository.insertNewFarm(newFarmData);

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(newFarm.address_id!);

  const result = {
    id: newFarm.id,
    cnpj: newFarm.cnpj,
    name: newFarm.name,
    phone: newFarm.phone,
    address: address,
  };

  return result;
};

const findFarmById = async (id: number) => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(id);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cnpj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const findFarmByCnpj = async (cnpj: string) => {
  const findFarm = await farmRepository.selectByCnpjWithoutJoin(cnpj);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cnpj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const findFarmByName = async (name: string) => {
  const findFarm = await farmRepository.selectByNameWhithoutJoin(name);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cnpj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const updateFarmByCnpj = async (farm: FarmWhithAddress, farmCnpj: string) => {
  //Atualiza a fazenda junto do endereço
  const existingFarm = await farmRepository.selectByCnpjWithoutJoin(farmCnpj);

  const newFarmData = farm;

  if (!existingFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  if (newFarmData.address) {
    addressRepository.updateAddress(
      newFarmData.address,
      existingFarm.address_id!
    );
    delete newFarmData.address;
  }

  const updatedFarm = await farmRepository.updateFarm(
    newFarmData,
    existingFarm.id!
  );

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(updatedFarm.address_id!);

  const result = {
    id: updatedFarm.id,
    cnpj: updatedFarm.cnpj,
    name: updatedFarm.name,
    phone: updatedFarm.phone,
    address: address,
  };

  return result;
};

const deleteFarmById = async (id: number) => {
  const existingFarm = await farmRepository.selectByIdWithoutJoin(id);

  if (!existingFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  const isDeleted = await farmRepository.deleteFarm(id);

  if (isDeleted) return true;

  return false;
};

export default {
  getAllFarms,
  registerFarm,
  findFarmById,
  findFarmByCnpj,
  findFarmByName,
  updateFarmByCnpj,
  deleteFarmById,
};
