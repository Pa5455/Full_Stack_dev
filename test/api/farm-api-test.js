import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, curranFarms, testPlacemarks, testFarms, taylorFarms} from "../fixtures.js";

suite("Farm API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllFarms();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    curranFarms.userid = user._id;
    beethovenSonatas = await placemarkService.createPlacemark(curranFarms);
  });

  teardown(async () => {});

  test("create farm", async () => {
    const returnedFarm = await placemarkService.createFarm(beethovenSonatas._id, taylorFarms);
    assertSubset(taylorFarms, returnedFarm);
  });

  test("create Multiple farms", async () => {
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFarm(beethovenSonatas._id, testFarms[i]);
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
      await placemarkService.createFarm(beethovenSonatas._id, testFarms[i]);
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

  test("denormalised playlist", async () => {
    for (let i = 0; i < testFarms.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFarm(beethovenSonatas._id, testFarms[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(beethovenSonatas._id);
    assert.equal(returnedPlacemark.farms.length, testFarms.length);
    for (let i = 0; i < testFarms.length; i += 1) {
      assertSubset(testFarms[i], returnedPlacemark.farms[i]);
    }
  });
});