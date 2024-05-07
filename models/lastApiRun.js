const mongoose = require("mongoose");
const Schema = mongoose.Schema

const lastApiRunSchema = new Schema({
    date:{
        type: String,
        required: true,
    },
},{ strict: false})

module.exports = mongoose.model('ApiDataRun',lastApiRunSchema)