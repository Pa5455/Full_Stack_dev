import Mongoose from "mongoose";

const { Schema } = Mongoose;

const farmSchema = new Schema({
  farmername: String,
  address: String,
  enterprise: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Farm = Mongoose.model("Farm", farmSchema);