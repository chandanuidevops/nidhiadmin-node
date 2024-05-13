const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responsedataModelSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    datestr: {
      type: String,
      required: true,
    },
    responsedata: {
      type: Array,
      required: true,
    },
    APIpassed: {
      type: Number,
      required: true,
    },
    APIfailed: {
      type: Number,
      required: true,
    },
    numberOfAPIs: {
      type: Number,
      required: true,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("responsedata", responsedataModelSchema);
