const mongoose = require("mongoose");
const Schema = mongoose.Schema

const apidataSchema = new Schema({
    apitype: {
        type: String,
        required: true,
    },
    BaseURL: {
        type: String,
        required: true,
    },
    SubURL:{
        type: String,
        required: true,
    },
    RequestParameters: {
        type: String,
    },
    jsonbody: {
        type: String,
    },
    ExpectedResults0:{
        type: String,
    },
    url:{
        type: String,
        required: true,
    }
},{ strict: false})

module.exports = mongoose.model('ApiData',apidataSchema)