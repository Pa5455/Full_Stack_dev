import { Farm } from "./farm.js";

export const farmMongoStore = {
  async getAllFarms() {
    const farms = await Farm.find().lean();
    return farms;
  },

  async addFarm(placemarkId, farm) {
    farm.placemarkid = placemarkId;
    const newFarm = new Farm(farm);
    const farmObj = await newFarm.save();
    return this.getFarmById(farmObj._id);
  },

  async getFarmsByPlacemarkId(id) {
    const farms = await Farm.find({ placemarkid: id }).lean();
    return farms;
  },

  async getFarmById(id) {
    if (id) {
      const farm = await Farm.findOne({ _id: id }).lean();
      return farm;
    }
    return null;
  },

  async deleteFarm(id) {
    try {
      await Farm.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllFarms() {
    await Farm.deleteMany({});
  },

  async updateFarm(farm, updatedFarm) {
    farm.farmername = updatedFarm.farmername;
    farm.address = updatedFarm.address;
    farm.enterprise = updatedFarm.enterprise;
    await farm.save();
  },
};