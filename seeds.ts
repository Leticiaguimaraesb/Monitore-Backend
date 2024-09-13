import knex from "knex";
import config from "./knexfile";
import {
  Address,
  FarmWhithIDsOfFKs,
  PlotWhithIDsOfFKs,
  UsersWhithCnpjOfFKs,
} from "./src/types";
import { PlantingsWithIds } from "./src/types/plantingTypes";
import authService from "./src/api/services/authService";

const knexInstance = knex(config);

const insertOnTableAddress = async () => {
  const adresses: Address[] = [
    {
      id: 1,
      street: "Rua Carvalho",
      number: 40,
      complement: "3º e 4º andar",
      neighborhood: "Horto",
      city: "Ipatinga",
      state: "Minas Gerais",
      cep: "35160-293",
      reference_point: "Próximo a faculdade Pitágoras",
    },
    {
      id: 2,
      street: "Rua Ouro Fino",
      number: 395,
      complement: "Conjuntos 5 e 6",
      neighborhood: "Cruzeiro",
      city: "Belo Horizonte",
      state: "Minas Gerais",
      cep: "30310-110",
      reference_point: "Em frente ao Mercado Cruzeiro",
    },
    {
      id: 3,
      street: "Av. Afonso Pena",
      number: 1316,
      complement: "7º andar sala 721",
      neighborhood: "Centro",
      city: "Belo Horizonte",
      state: "Minas Gerais",
      cep: "30130-009",
      reference_point: "Em Belo Horizonte",
    },
  ];

  await knexInstance("address").insert(adresses);
};

const insertOnTableFarm = async () => {
  const farms: FarmWhithIDsOfFKs[] = [
    {
      id: 1,
      name: "Fazenda Ipatinga",
      phone: "315203630",
      cnpj: "26746932000171",
      address_id: 1,
    },
    {
      id: 2,
      name: "Fazenda Belo Horizonte",
      phone: "315203630",
      cnpj: "026746932000171",
      address_id: 2,
    },
    {
      id: 3,
      name: "Ministerio da fazenda",
      phone: "(31) 3218-6720",
      cnpj: "00000000000000",
      address_id: 3,
    },
  ];

  await knexInstance("farm").insert(farms);
};

const users: UsersWhithCnpjOfFKs[] = [
  {
    id: 1,
    cpf_cnpj: "11111111111",
    name: "Thiago Firsen",
    celphone: "3100000000",
    email: "thiago.firsen@rethink.dev",
    password: "thiago1234",
    userType: "Administrador",
    farm_cnpj: "026746932000171",
  },
  {
    id: 2,
    cpf_cnpj: "22222222222",
    name: "José Geraldo",
    celphone: "3100000000",
    email: "jose.duarte@rethink.dev",
    password: "jose1234",
    userType: "Administrador",
    farm_cnpj: "26746932000171",
  },
  {
    id: 3,
    cpf_cnpj: "00000000000",
    name: "Admin",
    celphone: "999999999",
    email: "admin@admin.com",
    password: "admin123",
    userType: "Administrador",
    farm_cnpj: "00000000000000",
  },
];

const insertOnTablePlot = async () => {
  const plots: PlotWhithIDsOfFKs[] = [
    { id: 1, name: "Bom Retiro", farm_id: 1 },
    { id: 2, name: "Vagalume", farm_id: 1 },
    { id: 3, name: "Boa Vista", farm_id: 2 },
  ];

  await knexInstance("plot").insert(plots);
};

const insertOnTableCulture = async () => {
  await knexInstance("culture").insert({ name: "café" });
};

const insertOnTableStages = async () => {
  const stages = [
    { id: 1, stage: "Plantio", culture_id: 1, order: 1 },
    { id: 2, stage: "Pré-florada", culture_id: 1, order: 2 },
    { id: 3, stage: "Florada", culture_id: 1, order: 3 },
    { id: 4, stage: "Chumbinho", culture_id: 1, order: 4 },
    { id: 5, stage: "Expansão", culture_id: 1, order: 5 },
    { id: 6, stage: "Granação", culture_id: 1, order: 6 },
    { id: 7, stage: "Colheita", culture_id: 1, order: 7 },
    { id: 8, stage: "Pós-colheita", culture_id: 1, order: 8 },
  ];
  await knexInstance("stages").insert(stages);
};

const insertOnTablePlantings = async () => {
  const plantings: PlantingsWithIds[] = [
    {
      id: 1,
      date: "2023-07-24",
      saplings: 100,
      plot_id: 1,
      stages_id: 1,
      user_id: 2,
      farm_id: 1,
      active: true,
    },
    {
      id: 2,
      date: "2023-07-21",
      saplings: 100,
      plot_id: 2,
      stages_id: 1,
      user_id: 2,
      farm_id: 1,
      active: true,
    },
    {
      id: 3,
      date: "2023-07-24",
      saplings: 100,
      plot_id: 3,
      stages_id: 1,
      user_id: 1,
      farm_id: 2,
      active: true,
    },
  ];

  await knexInstance("planting").insert(plantings);
};

const populateDataBase = async () => {
  await insertOnTableAddress();
  await insertOnTableFarm();
  // insert USERS
  await authService.registerUser(users[0]);
  await authService.registerUser(users[1]);
  await authService.registerUser(users[2]);
  await insertOnTablePlot();
  await insertOnTableCulture();
  await insertOnTableStages();
  await insertOnTablePlantings();
};

populateDataBase()
  .then(() => console.log("Success!"))
  .then(() => process.exit())
  .catch(console.log);
