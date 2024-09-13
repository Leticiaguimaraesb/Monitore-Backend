export const mockFarmWithAddress = {
  id: 1,
  cnpj: "00000000000000",
  name: "Fazenda Rebel Alliance",
  phone: "3333333333",
  street: "Minerva",
  number: 709,
  complement: "apartamento 202",
  neighborhood: "Caiçara",
  city: "Belo Horizonte",
  state: "Minas Gerais",
  cep: "30720580",
  reference_point: "Praça do sol",
};

export const mockFarmWithAddressResult = {
  id: 1,
  cnpj: "00000000000000",
  name: "Fazenda Rebel Alliance",
  phone: "3333333333",
  address: {
    street: "Minerva",
    number: 709,
    complement: "apartamento 202",
    neighborhood: "Caiçara",
    city: "Belo Horizonte",
    state: "Minas Gerais",
    cep: "30720580",
    reference_point: "Praça do sol",
  },
};

export const mockAddress = {
  street: "Minerva",
  number: 709,
  complement: "apartamento 202",
  neighborhood: "Caiçara",
  city: "Belo Horizonte",
  state: "Minas Gerais",
  cep: "30720580",
  reference_point: "Praça do sol",
};

export const mockFarmWithAddressId = {
  id: 1,
  cnpj: "00000000000000",
  name: "Fazenda Rebel Alliance",
  phone: "3333333333",
  address: 1,
};
