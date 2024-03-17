import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { collectionMongoStore } from "./mongo/collection-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.placemarkStore = placemarkJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.collectionStore = collectionMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.placemarkStore = placemarkMemStore;
    }
  },
};