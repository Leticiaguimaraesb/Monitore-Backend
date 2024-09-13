import { describe, expect, jest } from "@jest/globals";
import usersRepository from "../api/repositories/usersRepository";
import authService from "../api/services/authService";
import {
  mockedUser,
  mockedUserWithoutPassword,
  mockedUserWithCryptoPassword,
} from "./mockUsers";
import { mockedFarmWhithIds } from "./harvestMock";
import farmRepository from "../api/repositories/farmRepository";

describe("Users Tests", () => {
  it("Get all users", async () => {
    jest.spyOn(usersRepository, "index").mockResolvedValueOnce([mockedUser]);
    const result = await authService.getAllUsers();
    expect(result).toMatchObject([mockedUser]);
  });
  it("Error getting Users", async () => {
    jest.spyOn(usersRepository, "index").mockResolvedValueOnce([]);
    try {
      await authService.getAllUsers();
    } catch (error) {
      expect(error).toMatchObject({
        message: "Error getting Users",
        status: 200,
      });
    }
  });

  it("Register user", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(usersRepository, "insertNewUser")
      .mockResolvedValueOnce(mockedUser);

    let result = await authService.registerUser(mockedUser);

    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2ODg3NTk4NDIsImV4cCI6MTY4ODg0NjI0Mn0.i6-o1mu10jiBr5FtjfTbuKH4i-tFI73tgI-gyjbY8QQ";

    result = { ...result, token };

    expect(result).toMatchObject(result);
  });
  it("User already registered", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedUser);
    try {
      await authService.registerUser(mockedUser);
    } catch (error) {
      expect(error).toMatchObject({
        message: "User already registered",
        status: 200,
      });
    }
  });
  it("Farm not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.registerUser(mockedUser);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not Found",
        status: 200,
      });
    }
  });
  it("Authenticate  User", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    const result = await authService.authenticateUser({
      name: "Thiago",
      password: "thiago10",
    });
    expect(result).toBeDefined();
  });
  it("Authenticate  User -User not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.authenticateUser(mockedUser);
    } catch (error) {
      expect(error).toMatchObject({
        message: "User not Found",
        status: 200,
      });
    }
  });
  it("Wrong Password", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    try {
      await authService.authenticateUser(mockedUser);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Wrong Password",
        status: 200,
      });
    }
  });
  it("Find User By Id", async () => {
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    const result = await authService.findUserById(7);
    expect(result).toBe(mockedUserWithCryptoPassword);
  });
  it("Find User By Id - User not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.findUserById(0);
    } catch (error) {
      expect(error).toMatchObject({
        message: "User not Found",
        status: 200,
      });
    }
  });
  it("Find User By Cpf Or Cnpj", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    const result = await authService.findUserByCpfOrCnpj("04312312316");
    expect(result).toBe(mockedUserWithCryptoPassword);
  });
  it("Find User By Cpf Or Cnpj - User not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.findUserByCpfOrCnpj("0000");
    } catch (error) {
      expect(error).toMatchObject({
        message: "User not Found",
        status: 200,
      });
    }
  });
  it("Find User By Name", async () => {
    jest
      .spyOn(usersRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    const result = await authService.findUserByName("Leticia 2");
    expect(result).toBe(mockedUserWithCryptoPassword);
  });
  it("Find User By Name - User not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.findUserByName("Erro");
    } catch (error) {
      expect(error).toMatchObject({
        message: "User not Found",
        status: 200,
      });
    }
  });
  it("Update User By Id", async () => {
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest.spyOn(usersRepository, "updateUser").mockResolvedValueOnce(1);
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    const result = await authService.updateUserById(
      1,
      mockedUserWithCryptoPassword
    );
    expect(result).toBe(mockedUserWithCryptoPassword);
  });
  it("Delete user", async () => {
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedUserWithCryptoPassword);
    jest.spyOn(usersRepository, "deleteUser").mockResolvedValueOnce(1);
    const result = await authService.deleteUserById(7);
    expect(result).toBe(true);
  });
  it("Delete user - User not Found", async () => {
    jest
      .spyOn(usersRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);
    try {
      await authService.deleteUserById(100);
    } catch (error) {
      expect(error).toMatchObject({
        message: "User not found",
        status: 200,
      });
    }
  });
});
