import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, curranFarms, testFarms, taylorFarms } from "../fixtures.js";

suite("Farm API tests", () => {
  let user = null;
  let smithFarms = null;

  setup(async () => {
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllFarms();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    curranFarms.userid = user._id;
    smithFarms = await placemarkService.createPlacemark(curranFarms);
  });

  teardown(async () => {});

  test("create farm", async () => {
    const returnedFarm = await placemarkService.createFarm(smithFarms._id, taylorFarms);
    assertSubset(taylorFarms, returnedFarm);
  });

  

  test("create Multiple farms", async () => {
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFarm(smithFarms._id, testFarms[i]);
    }
    const returnedFarms = await placemarkService.getAllFarms();
    assert.equal(returnedFarms.length, testFarms.length);
    for (let i = 0; i < returnedFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const farm = await placemarkService.getFarm(returnedFarms[i]._id);
      assertSubset(farm, returnedFarms[i]);
    }
  });

  test("Delete FarmApi", async () => {
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFarm(smithFarms._id, testFarms[i]);
    }
    let returnedFarms = await placemarkService.getAllFarms();
    assert.equal(returnedFarms.length, testFarms.length);
    for (let i = 0; i < returnedFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const farm = await placemarkService.deleteFarm(returnedFarms[i]._id);
    }
    returnedFarms = await placemarkService.getAllFarms();
    assert.equal(returnedFarms.length, 0);
  });

  test("denormalised placemark", async () => {
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFarm(smithFarms._id, testFarms[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(smithFarms._id);
    assert.equal(returnedPlacemark.farms.length, testFarms.length);
    for (let i = 0; i < testFarms.length; i += 1) {
      assertSubset(testFarms[i], returnedPlacemark.farms[i]);
    }
  });
});