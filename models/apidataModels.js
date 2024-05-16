const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apidataSchema = new Schema(
  {
    apitype: {
      type: String,
      required: true,
    },
    BaseURL: {
      type: String,
      required: true,
    },
    SubURL: {
      type: String,
      required: true,
    },
    RequestParameters: {
      type: String,
    },
    jsonbody: {
      type: String,
    },
    ExpectedResults0: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    headers: {
      type: String,
      required: true,
    },
  },
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("ApiData", apidataSchema);
