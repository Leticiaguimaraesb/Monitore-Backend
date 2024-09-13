import {
  FarmWhithIDsOfFKs,
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
  PlotWhithIDsOfFKs,
  UsersWhithIDsOfFKs,
} from "../types";

export const mockedHarvestWithIds: HarvestWhithIDsOfFKs = {
  id: 2,
  date: new Date("2023-06-28"),
  bags: 40,
  plot_id: 1,
  user_id: 1,
  farm_id: 1,
};
export const mockedHarvestWithNames: HarvestWhithNamesOfFKs = {
  id: 2,
  date: new Date("2023-06-28"),
  bags: 40,
  plot_name: "Baixada Mineria",
  user_name: "Jose",
  farm_name: "Fazenda Rebel Alliance",
};

export const mockedUserWhithIds: UsersWhithIDsOfFKs = {
  id: 1,
  cpf_cnpj: "33333333333",
  name: "Jose",
  celphone: "3333333333",
  email: "jose@admin.com.br",
  password: "senha123",
  userType: "Administrador",
  farm_id: 1,
};

export const mockedPlotWhithIds: PlotWhithIDsOfFKs = {
  id: 1,
  name: "Baixada Mineria",
  farm_id: 1,
};

export const mockedFarmWhithIds: FarmWhithIDsOfFKs = {
  id: 1,
  cnpj: "00000000000000",
  name: "Fazenda Rebel Alliance",
  phone: "3333333333",
  address_id: 1,
};
