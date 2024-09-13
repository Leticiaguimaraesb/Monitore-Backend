type UsersWhithIDsOfFKs = {
  id?: number;
  cpf_cnpj?: string;
  name?: string;
  celphone?: string;
  email?: string;
  password?: string;
  userType?: string;
  farm_id?: number;
};

type UsersWhithCnpjOfFKs = {
  id?: number;
  cpf_cnpj?: string;
  name?: string;
  celphone?: string;
  email?: string;
  password?: string;
  userType?: string;
  farm_cnpj?: string;
};

export { UsersWhithIDsOfFKs, UsersWhithCnpjOfFKs };
