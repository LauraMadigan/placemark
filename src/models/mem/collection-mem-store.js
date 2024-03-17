import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let collections = [];

export const collectionMemStore = {
  async getAllCollections() {
    return collections;
  },

  async addCollection(collection) {
    collection._id = v4();
    collections.push(collection);
    return collection;
  },

  async getCollectionById(id) {
    const list = collections.find((collection) => collection._id === id);
    list.placemarks = await placemarkMemStore.getPlacemarksByCollectionId(list._id);
    return list;
  },

  async deleteCollectionById(id) {
    const index = collections.findIndex((collection) => collection._id === id);
    collections.splice(index, 1);
  },

  async deleteAllCollections() {
    collections = [];
  },

  async getUserCollections(userid) {
    return collections.filter((collection) => collection.userid === userid);
  },
};
