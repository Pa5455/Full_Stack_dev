import { v4 } from "uuid";

let farms = [];

export const farmMemStore = {
  async getAllFarms() {
    return farms;
  },

  async addFarm(placemarkId, farm) {
    farm._id = v4();
    farm.placemarkid = placemarkId;
    farms.push(farm);
    return farm;
  },

  async getFarmsByPlacemarkId(id) {
    return farms.filter((farm) => farm.placemarkid === id);
  },

  async getFarmById(id) {
    return farms.find((farm) => farm._id === id);
  },

  async getPlacemarkFarms(placemarkId) {
    return farms.filter((farm) => farm.placemarkid === placemarkId);
  },

  async deleteFarm(id) {
    const index = farms.findIndex((farm) => farm._id === id);
    farms.splice(index, 1);
  },

  async deleteAllFarms() {
    farms = [];
  },

  async updateFarm(farm, updatedFarm) {
    farm.farmername = updatedFarm.farmername;
    farm.address = updatedFarm.address;
    farm.enterprise = updatedFarm.enterprise;
  },
};