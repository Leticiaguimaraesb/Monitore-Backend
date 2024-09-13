import knex from "knex";
import config from "../../../knexfile";
import { UsersWhithIDsOfFKs } from "../../types";

const knexInstance = knex(config);

const index = async (): Promise<UsersWhithIDsOfFKs[]> => {
  const users: UsersWhithIDsOfFKs[] = await knexInstance("users").select("*");

  return users;
};

const insertNewUser = async (
  userData: UsersWhithIDsOfFKs
): Promise<UsersWhithIDsOfFKs> => {
  const newUser = await knexInstance("users")
    .insert(userData)
    .returning([
      "id",
      "cpf_cnpj",
      "name",
      "celphone",
      "email",
      "password",
      "userType",
      "farm_id",
    ]);
  return newUser[0];
};

const selectByIdWithoutJoin = async (
  userId: number
): Promise<UsersWhithIDsOfFKs | undefined> => {
  const user: UsersWhithIDsOfFKs[] = await knexInstance("users")
    .select("*")
    .where({ id: userId });

  return user[0];
};

const selectByCpfOrCnpjWithoutJoin = async (
  userCpfOrCnpj: string
): Promise<UsersWhithIDsOfFKs | undefined> => {
  const user: UsersWhithIDsOfFKs[] = await knexInstance("users")
    .select("*")
    .where("cpf_cnpj", userCpfOrCnpj);

  return user[0];
};

const selectByNameWithoutJoin = async (
  userName: string
): Promise<UsersWhithIDsOfFKs | undefined> => {
  const user: UsersWhithIDsOfFKs[] = await knexInstance("users")
    .select("*")
    .where("name", "like", `%${userName}%`);

  return user[0];
};

const updateUser = async (
  userData: Partial<UsersWhithIDsOfFKs>,
  userId: number
) => {
  const updatedUser = await knexInstance("users")
    .update(userData)
    .where("id", userId);

  return updatedUser;
};

const deleteUser = async (userId: number) => {
  const deletedUser = await knexInstance("users").delete().where("id", userId);

  return deletedUser;
};

export default {
  index,
  insertNewUser,
  selectByCpfOrCnpjWithoutJoin,
  selectByIdWithoutJoin,
  selectByNameWithoutJoin,
  updateUser,
  deleteUser,
};
