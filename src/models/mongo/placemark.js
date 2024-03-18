import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  county: String,
  locality: String,
  latitude: Number,
  longitude: Number,
  description: String,
  monument_class: String,
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);