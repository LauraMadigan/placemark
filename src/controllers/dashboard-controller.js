import { db } from "../models/db.js";
import { CollectionSpec, } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const collections = await db.collectionStore.getUserCollections(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        collections: collections,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCollection: {
    validate: {
      payload: CollectionSpec,
      options: {abortEarly: false},
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Error adding collection", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCollection = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.collectionStore.addCollection(newCollection);
      return h.redirect("/dashboard");
    },
  },
  
  deleteCollection: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      console.log("collection", collection);
      await db.collectionStore.deleteCollectionById(request.params.id);
      console.log("deleted collection", collection);
      return h.redirect("/dashboard");
    },
  },
};