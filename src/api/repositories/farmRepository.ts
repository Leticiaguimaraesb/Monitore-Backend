import knex from "knex";
import config from "../../../knexfile";
import { FarmWhithAddress, FarmWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const index = async (): Promise<FarmWhithAddress[]> => {
  const farms: FarmWhithAddress[] = await knexInstance("farm")
    .select("*", "address.id as addressId", "farm.id as id")
    .join("address", "farm.address_id", "=", "address.id");

  console.log({ farms });
  return farms;
};

const insertNewFarm = async (
  farmData: FarmWhithIDsOfFKs
): Promise<FarmWhithIDsOfFKs> => {
  const newFarm = await knexInstance("farm")
    .insert(farmData)
    .returning(["id", "cnpj", "name", "phone", "address_id"]);

  return newFarm[0];
};

const selectByCnpjWithoutJoin = async (
  farmCnpj: string
): Promise<FarmWhithIDsOfFKs | undefined> => {
  const farm: FarmWhithIDsOfFKs[] = await knexInstance("farm")
    .select("*")
    .where("cnpj", farmCnpj);

  return farm[0];
};

const selectByIdWithoutJoin = async (
  farmId: number
): Promise<FarmWhithIDsOfFKs | undefined> => {
  const farm: FarmWhithIDsOfFKs[] = await knexInstance("farm")
    .select("*")
    .where({ id: farmId });

  return farm[0];
};

const selectByNameWhithoutJoin = async (
  farmName: string
): Promise<FarmWhithIDsOfFKs | undefined> => {
  const farm: FarmWhithIDsOfFKs[] = await knexInstance("farm")
    .select("*")
    .where("name", "ilike", `%${farmName}%`);

  return farm[0];
};

const updateFarm = async (
  farmData: FarmWhithIDsOfFKs,
  farmId: number
): Promise<FarmWhithIDsOfFKs> => {
  const updatedFarm = await knexInstance("farm")
    .update(farmData)
    .where({ id: farmId })
    .returning(["id", "cnpj", "name", "phone", "address_id"]);

  return updatedFarm[0];
};

const deleteFarm = async (farmId: number) => {
  const deletedFarm = await knexInstance("farm").delete().where({ id: farmId });

  return deletedFarm;
};

export default {
  index,
  insertNewFarm,
  selectByCnpjWithoutJoin,
  selectByIdWithoutJoin,
  selectByNameWhithoutJoin,
  updateFarm,
  deleteFarm,
};
