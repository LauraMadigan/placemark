import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
      };
      return h.view("collection-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: {abortEarly: false},
      failAction: function (request, h, error) {
        return h.view("collection-view", { title: "Error adding placemark", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newPlacemark = {
        name: request.payload.name,
        county: request.payload.county,
        locality: request.payload.locality,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        description: request.payload.description,
        monument_class: request.payload.monument_class
      };
      await db.placemarkStore.addPlacemark(collection._id, newPlacemark);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  removePlacemark: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.collectionId);
      await db.placemarkStore.deletePlacemark(request.params.placemarkId);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};