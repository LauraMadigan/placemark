import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  title: String,
  artist: String,
  duration: Number,
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);