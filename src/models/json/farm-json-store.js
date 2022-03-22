import { v4 } from "uuid";
    // eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
    
const db = new Low(new JSONFile("./src/models/json/farms.json"));
db.data = { farms: [] };
    
export const farmJsonStore = {
    async getAllFarms() {
    await db.read();
    return db.data.farms;
    },
    
async addFarm(placemarkId, farm) {
    await db.read();
    farm._id = v4();
    farm.placemarkid = placemarkId;
    db.data.farms.push(farm);
    await db.write();
    return farm;
    },
    
async getFarmsByPlacemarkId(id) {
    await db.read();
    return db.data.farms.filter((farm) => farm.placemarkid === id);
    },
    
async getFarmById(id) {
    await db.read();
    return db.data.farms.find((farm) => farm._id === id);
    },
    
async deleteFarm(id) {
    await db.read();
    const index = db.data.farms.findIndex((farm) => farm._id === id);
    db.data.farms.splice(index, 1);
    await db.write();
    },
    
async deleteAllFarms() {
    db.data.farms = [];
    await db.write();
    },
    
async updateFarm(farm, updatedFarm) {
    farm.farmername = updatedFarm.farmername;
    farm.address = updatedFarm.address;
    farm.enterprise = updatedFarm.enterprise;
    await db.write();
    },
};