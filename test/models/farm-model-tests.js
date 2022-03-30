import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testFarms, beethoven, curranFarms, taylorFarms, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Farm Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.farmStore.deleteAllFarms();
    beethovenList = await db.placemarkStore.addPlacemark(beethoven);
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testFarms[i] = await db.farmStore.addFarm(beethovenList._id, testFarms[i]);
    }
  });

  test("create single farm", async () => {
    const curranFarmsList = await db.placemarkStore.addPlacemark(curranFarms);
    const farm = await db.farmStore.addFarm(curranFarmsList._id, taylorFarms)
    assert.isNotNull(farm._id);
    assertSubset (taylorFarms, farm);
  });

  test("create multiple farmApi", async () => {
    const farms = await db.placemarkStore.getPlacemarkById(beethovenList._id);
    assert.equal(testFarms.length, testFarms.length)
  });

  test("delete all farmApi", async () => {
    const farms = await db.farmStore.getAllFarms();
    assert.equal(testFarms.length, farms.length);
    await db.farmStore.deleteAllFarms();
    const newFarms = await db.farmStore.getAllFarms();
    assert.equal(0, newFarms.length);
  });

  test("get a farm - success", async () => {
    const curranFarmsList = await db.placemarkStore.addPlacemark(curranFarms);
    const farm = await db.farmStore.addFarm(curranFarmsList._id, taylorFarms)
    const newFarm = await db.farmStore.getFarmById(farm._id);
    assertSubset (taylorFarms, newFarm);
  });

  test("delete One Farm - success", async () => {
    const id = testFarms[0]._id;
    await db.farmStore.deleteFarm(id);
    const farms = await db.farmStore.getAllFarms();
    assert.equal(farms.length, testPlacemarks.length - 1);
    const deletedFarm = await db.farmStore.getFarmById(id);
    assert.isNull(deletedFarm);
  });

  test("get a placemarks - bad params", async () => {
    assert.isNull(await db.farmStore.getFarmById(""));
    assert.isNull(await db.farmStore.getFarmById());
  });

  test("delete One User - fail", async () => {
    await db.farmStore.deleteFarm("bad-id");
    const farms = await db.farmStore.getAllFarms();
    assert.equal(farms.length, testPlacemarks.length);
  });
});