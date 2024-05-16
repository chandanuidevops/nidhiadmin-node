const ApiData = require("../models/apidataModels");
const axios = require("axios");
const ApiDataRun = require("../models/lastApiRun");
const mongoose = require("mongoose");
const ResponseData = require("../models/responsedataModel");
async function addApidata(req, res) {
  const newApiData = req.body;

  try {
    const apiData = new ApiData(newApiData);
    const postResult = await addOrUpdate(apiData);
    return res.status(200).send({
      status: "Ok",
      msg: "Data Saved",
    });
  } catch (err) {
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}

async function getAllAPIData(req, res) {
  const data = await ApiData.find();
  try {
    if (data) {
      res.status(200).send({
        status: "ok",
        data: data,
      });
    } else {
      res.status(422).send({
        status: "Unprocessable Entity",
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error",
      msg: "error while getting API Data",
    });
  }
}

async function getTotalAPis(req, res) {
  const data = await ApiData.find();
  try {
    if (data) {
      res.status(200).send({
        status: "ok",
        data: data.length,
      });
    } else {
      res.status(422).send({
        status: "Unprocessable Entity",
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error",
      msg: "error while getting API Data",
    });
  }
}

async function getLastApiRun(req, res) {
  const data = await ApiDataRun.find();
  try {
    if (data) {
      res.status(200).send({
        status: "ok",
        data: data[data.length - 1],
      });
    } else {
      res.status(422).send({
        status: "Unprocessable Entity",
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error",
      msg: "error while getting API Data",
    });
  }
}
async function setLatsApiRunon(req, res) {
  let date = req.body;

  try {
    const apiData = new ApiDataRun(date);
    const postResult = await apiData.save();
    return res.status(200).send({
      status: "Ok",
    });
  } catch (err) {
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}

async function editTestCases(req, res) {
  let putData = req.body;

  let data = JSON.parse(putData.data);

  const query = { _id: putData.id };

  try {
    let dataObj = [];
    Object.entries(data).forEach(async ([key, value], index) => {
      const varaibleName = `ExpectedResults${index}`;
      const variablValue = JSON.stringify({ [key]: value });
      dataObj[varaibleName] = variablValue;
    });

    for (data in dataObj) {
      let key = data;
      var newvalues = { $set: { [key]: dataObj[data] } };
      await ApiData.updateOne(query, newvalues);
    }
    return res.status(200).send({
      status: "Ok",
      msg: "API Test Cases Updated",
    });
  } catch (err) {
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}

async function saveReponseData(req, res) {
  const newResponseData = req.body;

  try {
    const data = new ResponseData(newResponseData);
    await data.save();
    return res.status(200).send({
      status: "Ok",
      msg: "Data Saved",
    });
  } catch (err) {
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}
async function getResponseData(req, res) {
  const data = await ResponseData.find();
  try {
    if (data) {
      res.status(200).send({
        status: "ok",
        data: data,
      });
    } else {
      res.status(422).send({
        status: "Unprocessable Entity",
        msg: "No data found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Internal Server Error",
      msg: "error while getting API Data",
    });
  }
}
async function addExcelApidata(req, res) {
  const newApiData = req.body;

  try {
    for (let i = 0; i < newApiData.length; i++) {
      await addOrUpdate(newApiData[i]);
    }
    return res.status(200).send({
      status: "Ok",
      msg: "Data Saved",
    });
  } catch (err) {
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}
const addOrUpdate = async (req) => {
  const data = await ApiData.findOne({ SubURL: req.SubURL });

  if (data) {
    await ApiData.findByIdAndUpdate(data._id, req, {
      new: true,
    });
  } else {
    await ApiData.create(req);
  }
};
async function getRequestHistory(req, res) {
  const data = await ApiData.find({ module: req.query.module });

  let result = [];
  let error = [];

  const headers = {
    Authorization: `Bearer ${req.query.token}`,
  };

  for (let i = 0; i < data.length; i++) {
    const header = JSON.parse(data[i].headers);
    if (header.deviceId) {
      headers.deviceId = header.deviceId;
    }
    if (header.ipAddress) {
      headers.ipAddress = header.ipAddress;
    }
    const request = {
      BaseURL: data[i].BaseURL,
      SubURL: data[i].SubURL,
      apitype: data[i].apitype,
      jsonbody: data[i].jsonbody,
    };
    if (data[i].apitype.toLowerCase() === "get") {
      await axios
        .get(`${data[i].BaseURL}${data[i].SubURL}`, { headers })
        .then((response) => {
          result.push({ request: request, response: response.data });
        })
        .catch((err) => {
          error.push({ request: request, error: err });
        });
    }
    if (data[i].apitype.toLowerCase() === "post") {
      await axios
        .post(
          `${data[i].BaseURL}${data[i].SubURL}`,
          data[i].jsonbody ? JSON.parse(data[i].jsonbody) : {},
          { headers }
        )
        .then((response) => {
          result.push({ request: request, response: response.data });
        })
        .catch((err) => {
          error.push({ request: request, error: err });
        });
    }
    if (data[i].apitype.toLowerCase() === "put") {
      await axios
        .put(
          `${data[i].BaseURL}${data[i].SubURL}`,
          data[i].jsonbody ? JSON.parse(data[i].jsonbody) : {},
          { headers }
        )
        .then((response) => {
          result.push({ request: request, response: response.data });
        })
        .catch((err) => {
          error.push({ request: request, error: err });
        });
    }
    if (data[i].apitype.toLowerCase() === "delete") {
      await axios
        .delete(
          `${data[i].BaseURL}${data[i].SubURL}`,

          {
            data: data[i].jsonbody ? JSON.parse(data[i].jsonbody) : {},
            headers,
          }
        )
        .then((response) => {
          result.push({ request: request, response: response.data });
        })
        .catch((err) => {
          error.push({ request: request, error: err });
        });
    }
  }

  res.status(200).json({
    status: "ok",
    data: { success: result, error: error },
  });
}
module.exports = {
  addApidata,
  getAllAPIData,
  setLatsApiRunon,
  getLastApiRun,
  getTotalAPis,
  editTestCases,
  saveReponseData,
  getResponseData,
  addExcelApidata,
  getRequestHistory,
};
