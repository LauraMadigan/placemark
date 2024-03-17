import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(collectionId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.collectionid = collectionId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCollectionId(id) {
    await db.read();
    let foundPlacemarks = db.data.placemarks.filter((placemark) => placemark.collectionid === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getPlacemarkById(id) {
    await db.read();
    let foundPlacemark = db.data.placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async getCollectionPlacemarks(collectionId) {
    await db.read();
    let foundPlacemarks = placemarks.filter((placemark) => placemark.collectionid === collectionId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
    await db.write();
  },
};