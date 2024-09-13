import { Address } from "./addressTypes";

type FarmWhithIDsOfFKs = {
  id?: number;
  cnpj?: string;
  name?: string;
  phone?: string;
  address_id?: number;
};

type FarmWhithAddress = {
  id?: number;
  cnpj?: string;
  name?: string;
  phone?: string;
  address?: Address;
};

export { FarmWhithIDsOfFKs, FarmWhithAddress };
