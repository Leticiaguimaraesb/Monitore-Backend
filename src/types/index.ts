import {
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
} from "../types/harvestTypes";

import { UsersWhithIDsOfFKs, UsersWhithCnpjOfFKs } from "./usersTypes";
import { FarmWhithIDsOfFKs, FarmWhithAddress } from "./farmTypes";
import { Address } from "./addressTypes";
import { PlotWhithIDsOfFKs } from "./plotTypes";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export {
  ErrorType,
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
  UsersWhithIDsOfFKs,
  UsersWhithCnpjOfFKs,
  FarmWhithIDsOfFKs,
  FarmWhithAddress,
  Address,
  PlotWhithIDsOfFKs,
};
