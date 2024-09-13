import knex from "knex";
import config from "../../../knexfile";
import { StagesWithName } from "../../types/stagesTypes";

const knexInstance = knex(config);

const selectAllStages = (): Promise<StagesWithName[]> =>
  knexInstance("stages")
    .select(
      "stages.id",
      "stages.stage",
      "culture.name as culture",
      "stages.order"
    )
    .join("culture", "culture.id", "=", "stages.culture_id");

const selectAllStagesOfACulture = (id: number): Promise<StagesWithName[]> =>
  knexInstance("stages")
    .where({ "stages.culture_id": id })
    .select(
      "stages.id",
      "stages.stage",
      "culture.name as culture",
      "stages.order"
    )
    .join("culture", "culture.id", "=", "stages.culture_id");

export default { selectAllStages, selectAllStagesOfACulture };
