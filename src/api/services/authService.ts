import usersRepository from "../repositories/usersRepository";
import farmRepository from "../repositories/farmRepository";
import { makeError } from "../middlewares/errorHandler";
import { UsersWhithIDsOfFKs, UsersWhithCnpjOfFKs } from "../../types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const mySecret = process.env.SECRET!;

const getAllUsers = async () => {
  const users = await usersRepository.index();

  if (!users) {
    throw makeError({
      message: "Error getting Users",
      status: 200,
    });
  }

  return users;
};

const registerUser = async (
  user: UsersWhithCnpjOfFKs
): Promise<{ newUser: UsersWhithCnpjOfFKs; token: string }> => {
  const saltRounds = Number(process.env.SALT) ?? 10;

  const existingUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    user.cpf_cnpj!
  );

  if (existingUser) {
    throw makeError({
      message: "User already registered",
      status: 200,
    });
  }

  const existingFarm = await farmRepository.selectByCnpjWithoutJoin(
    user.farm_cnpj!
  );

  if (!existingFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 200,
    });
  }

  const newUserData: UsersWhithIDsOfFKs = {
    cpf_cnpj: user.cpf_cnpj,
    name: user.name,
    celphone: user.celphone,
    email: user.email,
    password: await bcrypt.hash(user.password!, saltRounds),
    userType: user.userType,
    farm_id: existingFarm.id,
  };

  const newUser = await usersRepository.insertNewUser(newUserData);

  const token = jwt.sign(
    { id: newUser.id, userType: newUser.userType },
    mySecret,
    { expiresIn: "7d" }
  );

  return { newUser, token };
};

const validateToken = async (token: string) => {
  return jwt.verify(token, mySecret);
};

const authenticateUser = async (user: UsersWhithIDsOfFKs) => {
  const selectedUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    user.cpf_cnpj!
  );

  if (!selectedUser) {
    throw makeError({
      message: "User not Found",
      status: 200,
    });
  }

  const verifyPassword = await bcrypt.compare(
    user.password!,
    selectedUser.password!
  );

  if (!verifyPassword) {
    throw makeError({
      message: "Wrong Password",
      status: 200,
    });
  }

  const token = jwt.sign(
    { cpf_cnpj: selectedUser.cpf_cnpj, userType: selectedUser.userType },
    mySecret,
    { expiresIn: "7d" }
  );

  return token;
};

const findUserById = async (id: number) => {
  const findUser = await usersRepository.selectByIdWithoutJoin(id);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 200,
    });
  }

  return findUser;
};

const findUserByCpfOrCnpj = async (cpfOrCnpj: string) => {
  const findUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    cpfOrCnpj
  );

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 200,
    });
  }

  return findUser;
};

const findUserByName = async (name: string) => {
  const findUser = await usersRepository.selectByNameWithoutJoin(name);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 200,
    });
  }

  return findUser;
};

const updateUserById = async (userId: number, user: UsersWhithCnpjOfFKs) => {
  const saltRounds = Number(process.env.SALT) ?? 10;

  const existingUser = await usersRepository.selectByIdWithoutJoin(userId);

  const { farm_cnpj, password, ...newData }: any = user;

  if (!existingUser) {
    throw makeError({
      message: "User not Found",
      status: 200,
    });
  }

  if (farm_cnpj) {
    const existingFarm = await farmRepository.selectByCnpjWithoutJoin(
      farm_cnpj
    );

    if (!existingFarm) {
      throw makeError({
        message: "Farm not Found",
        status: 200,
      });
    }

    newData.farm_id = existingFarm.id;
  }

  if (password) {
    const newPassword = await bcrypt.hash(password, saltRounds);
    newData.password = newPassword;
  }

  await usersRepository.updateUser(newData, userId);
  const updatedUser = await usersRepository.selectByIdWithoutJoin(userId);

  return updatedUser;
};

const deleteUserById = async (id: number) => {
  const existingUser = await usersRepository.selectByIdWithoutJoin(id);

  if (!existingUser) {
    throw makeError({
      message: "User not found",
      status: 200,
    });
  }

  const isDeleted = await usersRepository.deleteUser(id);

  if (isDeleted) return true;

  return false;
};

export default {
  getAllUsers,
  registerUser,
  authenticateUser,
  validateToken,
  findUserById,
  findUserByCpfOrCnpj,
  findUserByName,
  updateUserById,
  deleteUserById,
};
