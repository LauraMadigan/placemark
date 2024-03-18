import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(collectionId, placemark) {
    placemark.collectionid = collectionId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByCollectionId(id) {
    const placemarks = await Placemark.find({ collectionid: id }).lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: placemark._id });
    placemarkDoc.name = updatedPlacemark.name;
    placemarkDoc.county = updatedPlacemark.county;
    placemarkDoc.locality = updatedPlacemark.locality;
    placemarkDoc.latitude = updatedPlacemark.latitude;
    placemarkDoc.longitude = updatedPlacemark.longitude;
    placemarkDoc.description = updatedPlacemark.description;
    placemarkDoc.monument_class = updatedPlacemark.monument_class;
    await placemarkDoc.save();
  },
};