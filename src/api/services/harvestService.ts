import harvestRepository from "../repositories/harvestRepository";
import usersRepository from "../repositories/usersRepository";
import plotRepository from "../repositories/plotRepository";
import farmRepository from "../repositories/farmRepository";
import { HarvestWhithNamesOfFKs, HarvestWhithIDsOfFKs } from "../../types";
import { makeError } from "../middlewares/errorHandler";
import plantingsRepository from "../repositories/plantingsRepository";

const registerNewHarvest = async (
  harvest: HarvestWhithIDsOfFKs
): Promise<HarvestWhithIDsOfFKs> => {
  const findUser = await usersRepository.selectByIdWithoutJoin(
    harvest.user_id!
  );
  const findFarm = await farmRepository.selectByIdWithoutJoin(harvest.farm_id!);
  const findPlating = await plantingsRepository.selectPlanting(
    harvest.planting_id!
  );

  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 200 });

  const findPlot = await plotRepository.selectPlotByIdAndFarmId(
    harvest.plot_id!,
    findFarm.id!
  );

  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 200 });

  if (!findUser) throw makeError({ message: "User Not Found", status: 200 });

  if (!findPlating.length)
    throw makeError({ message: "Planting Not Found", status: 200 });

  const newHarvestData: HarvestWhithIDsOfFKs = {
    date: harvest.date,
    bags: harvest.bags,
    plot_id: findPlot.id,
    user_id: findUser.id,
    farm_id: findFarm.id,
    planting_id: findPlating[0].id,
  };

  const newHarvest = await harvestRepository.insert(newHarvestData);

  return newHarvest;
};

const getAllHarvestsOfTheFarm = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const plots = await harvestRepository.selectAllOfTheFarmWithJoin(farmId);

  return plots;
};

const getHarvestsOfTheFarmByPlotId = async (
  farmID: number,
  plotId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 200 });

  const findPlot = await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 200 });

  if (findPlot.farm_id != findFarm.id)
    throw makeError({
      message: "Plot does not belong to the farm",
      status: 200,
    });

  const harvests = await harvestRepository.selectFromFarmByPlotIdWithJoin(
    farmID,
    plotId
  );

  return harvests;
};

const getHarvestByPlantingId = async (
  plantingId: number
): Promise<HarvestWhithIDsOfFKs[]> => {
  return await harvestRepository.selectHarvestsByPlatingId(plantingId);
};

const getHarvestsOfTheFarmByDate = async (
  farmID: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 200 });

  const harvests = await harvestRepository.selectFromFarmByDateWithJoin(
    farmID,
    harvestDate
  );

  return harvests;
};

const getHarvestOfTheFarmByDateAndPlot = async (
  farmID: number,
  plotId: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findPlot = await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 200 });

  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 200 });

  const harvests = await harvestRepository.selectFromFarmByDateAndPlotWithJoin(
    farmID,
    plotId,
    harvestDate
  );

  return harvests;
};

const updateHarvest = async (
  harvestID: number,
  harvestData: HarvestWhithNamesOfFKs
) => {
  const newData = await harvestRepository.selectFromAllByIdWithoutJoin(
    harvestID
  ); // pega os dados antigos e vai atualizando pra depois inserir

  if (!newData) throw makeError({ message: "Harvest Not Found", status: 200 });

  if (harvestData.plot_name) {
    const findNewPlot = await plotRepository.selectByNameWhithoutJoin(
      harvestData.plot_name
    );
    if (!findNewPlot)
      throw makeError({ message: "New Plot Not Found", status: 200 });

    newData.plot_id = findNewPlot.id;
  }
  if (harvestData.user_name) {
    const findNewUser = await usersRepository.selectByNameWithoutJoin(
      harvestData.user_name!
    );
    if (!findNewUser)
      throw makeError({ message: "New User Not Found", status: 200 });

    newData.user_id = findNewUser.id;
  }
  if (harvestData.farm_name) {
    const findNewFarm = await farmRepository.selectByNameWhithoutJoin(
      harvestData.farm_name
    );
    if (!findNewFarm)
      throw makeError({ message: "New Farm Not Found", status: 200 });

    newData.farm_id = findNewFarm.id;
  }

  //parte para verificar se o plot realmente pertence a fazenda por segurança

  const checkFarm = await farmRepository.selectByIdWithoutJoin(
    newData.farm_id!
  );
  const checkPlot = await plotRepository.selectByIdWhithoutJoin(
    newData.plot_id!
  );

  if (checkFarm?.id !== checkPlot?.id) {
    throw makeError({
      message: "Plot does not belong to the farm",
      status: 200,
    });
  }

  const newHarvestData = await harvestRepository.updateHarvest(
    harvestID,
    newData
  );

  return newHarvestData;
};

const deleteHarvest = async (harvestId: number) => {
  const isDeleted = await harvestRepository.deleteHarvest(harvestId);

  if (isDeleted) return { message: "Harvest deleted successfully" };
  return { message: "Harvest not deleted" };
};

export default {
  registerNewHarvest,
  getAllHarvestsOfTheFarm,
  getHarvestByPlantingId,
  getHarvestsOfTheFarmByPlotId,
  getHarvestsOfTheFarmByDate,
  getHarvestOfTheFarmByDateAndPlot,
  updateHarvest,
  deleteHarvest,
};
