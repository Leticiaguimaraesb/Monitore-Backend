import knex from "knex";
import config from "../../../knexfile";
import { Address } from "../../types";

const knexInstance = knex(config);

const index = async (): Promise<Address[]> => {
  const addresses: Address[] = await knexInstance("address").select("*");

  return addresses;
};

const insertNewAddress = async (addressData: Address): Promise<Address> => {
  const newAddress = await knexInstance("address")
    .insert(addressData)
    .returning([
      "id",
      "street",
      "number",
      "complement",
      "neighborhood",
      "city",
      "state",
      "cep",
      "reference_point",
    ]);
  return newAddress[0];
};

const selectByIdWithoutJoin = async (
  addressId: number
): Promise<Address | undefined> => {
  const address: Address[] = await knexInstance("address")
    .select("*")
    .where({ id: addressId });

  return address[0];
};

const selectByStreetWithoutJoin = async (
  addressStreet: string
): Promise<Address | undefined> => {
  const address: Address[] = await knexInstance("address")
    .select("*")
    .where("street", "like", `%${addressStreet}%`);

  return address[0];
};

const selectByCepWithoutJoin = async (
  addressCep: string
): Promise<Address | undefined> => {
  const address: Address[] = await knexInstance("address")
    .select("*")
    .where("cep", addressCep);

  return address[0];
};

const updateAddress = async (addressData: Address, addressId: number) => {
  const updatedAddress = await knexInstance("address")
    .update(addressData)
    .where({ id: addressId });

  return updatedAddress;
};

const deleteAddress = async (addressId: number) => {
  const deleteAddress = await knexInstance("address")
    .delete()
    .where({ id: addressId });

  return deleteAddress;
};

export default {
  index,
  insertNewAddress,
  selectByIdWithoutJoin,
  selectByStreetWithoutJoin,
  selectByCepWithoutJoin,
  updateAddress,
  deleteAddress,
};
