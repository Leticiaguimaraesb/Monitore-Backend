type HarvestWhithIDsOfFKs = {
  id?: number;
  date?: Date;
  bags?: number;
  plot_id?: number;
  user_id?: number;
  farm_id?: number;
  planting_id?: number;
};

type HarvestWhithNamesOfFKs = {
  id?: number;
  date?: Date;
  bags?: number;
  plot_name?: string;
  user_name?: string;
  farm_name?: string;
  planting_id?: number;
};

export { HarvestWhithIDsOfFKs, HarvestWhithNamesOfFKs };
