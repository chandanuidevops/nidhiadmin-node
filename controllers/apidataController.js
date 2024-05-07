const { json } = require("body-parser");
const ApiData = require("../models/apidataModels");
const ApiDataRun = require("../models/lastApiRun");
const mongoose = require("mongoose");

async function addApidata(req, res) {
  console.log("called");
  const newApiData = req.body;
  console.log(newApiData);
  try {
    const apiData = new ApiData(newApiData);
    const postResult = await apiData.save();
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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    res.status(500).send({
      status: "Internal Server Error",
      msg: "error while getting API Data",
    });
  }
}
async function setLatsApiRunon(req, res) {
  let date = req.body;
  console.log(date);
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
  console.log(putData);
  let data = JSON.parse(putData.data);
  console.log(data);
  console.log(typeof data);
  const query = { _id: putData.id };

  try {
    let dataObj = [];
    Object.entries(data).forEach(async ([key, value], index) => {
      const varaibleName = `ExpectedResults${index}`;
      const variablValue = JSON.stringify({ [key]: value });
      dataObj[varaibleName] = variablValue;
    });

    console.log(dataObj, "dataObj");
    // const functionResponse = await feedDataToDb(query,dataObj)

    // await dataObj.forEach(async(element)=>{
    //     console.log(element)
    //     await ApiData.updateOne(query,element,function(err, res) {
    //         if (err) throw err;
    //         console.log("1 document updated");
    //         console.log(res)
    //       });
    // })

    for (data in dataObj) {
      let key = data;
      var newvalues = { $set: { [key]: dataObj[data] } };
      await ApiData.updateOne(query, newvalues);
    }
    return res.status(200).send({
      status: "Ok",
      msg: "API Test Cases Updated",
    });
    // for (let index = 0; index < data.length; index++) {
    //     //d["ExpectedResults{0}".format(x)] = data[index]
    //     let key = "ExpectedResults"+index
    //     var newvalues = { $set: ${key} : data[index] };
    //     console.log(newvalues)
    //     await ApiData.updateOne(query,newvalues);
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "Internal Server Error",
      msg: "error while posting APIData",
    });
  }
}

async function feedDataToDb(query, dataObj) {
  try {
    dataObj.forEach(async (element) => {
      console.log(element);
      let res = await ApiData.updateOne(query, element, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
      console.log(res);
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}
module.exports = {
  addApidata,
  getAllAPIData,
  setLatsApiRunon,
  getLastApiRun,
  getTotalAPis,
  editTestCases,
};
