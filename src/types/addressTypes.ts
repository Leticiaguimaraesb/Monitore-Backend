import { number } from "yup";

type Address = {
  id?: number;
  street?: string;
  number?: number;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  cep?: string;
  reference_point?: string;
};

export { Address };
