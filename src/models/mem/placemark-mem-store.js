import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(collectionId, placemark) {
    placemark._id = v4();
    placemark.collectionid = collectionId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCollectionId(id) {
    return placemarks.filter((placemark) => placemark.collectionid === id);
  },

  async getPlacemarkById(id) {
    let foundPlacemark = placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemark) {
      foundPlacemark = null;
    }
    return foundPlacemark;
  },

  async getCollectionPlacemarks(collectionId) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.collectionid === collectionId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.title = updatedPlacemark.title;
    placemark.artist = updatedPlacemark.artist;
    placemark.duration = updatedPlacemark.duration;
  },
};