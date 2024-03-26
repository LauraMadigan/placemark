import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCollections, testPlacemarks, otherMonuments, monuments, abbey, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Placemark Model tests", () => {

  let otherMonumentCollection = null;

  setup(async () => {
    db.init("json");
    await db.collectionStore.deleteAllCollections();
    await db.placemarkStore.deleteAllPlacemarks();
    otherMonumentCollection = await db.collectionStore.addCollection(otherMonuments);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(otherMonumentCollection._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const monumentCollection = await db.collectionStore.addCollection(monuments);
    const placemark = await db.placemarkStore.addPlacemark(monumentCollection._id, abbey)
    assert.isNotNull(placemark._id);
    assert.isNotEmpty(placemark.name);
    assert.isNotEmpty(placemark.county);
    assert.isNotEmpty(placemark.locality);
    assert.isNumber(placemark.longitude);
    assert.isNumber(placemark.latitude);
    assert.isNotEmpty(placemark.monument_class);
    assertSubset (abbey, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCollectionId(otherMonumentCollection._id);
    assert.equal(placemarks.length, testPlacemarks.length)
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const monumentCollection = await db.collectionStore.addCollection(monuments);
    const placemark = await db.placemarkStore.addPlacemark(monumentCollection._id, abbey)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (abbey, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCollections.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCollections.length);
  });
});