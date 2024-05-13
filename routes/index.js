const express = require('express');
const router = express.Router();
const apiData = require('../controllers/apidataController')

router.post('/addApidata',apiData.addApidata);
router.get('/getApidata',apiData.getAllAPIData);
router.post('/lastApiRunOn',apiData.setLatsApiRunon)
router.get('/getLastApiRun',apiData.getLastApiRun)
router.get('/totalNumberofApis',apiData.getTotalAPis)
router.put('/updateTestCses',apiData.editTestCases)
router.post('/saveResponseData',apiData.saveReponseData)
router.get('/getResponseData',apiData.getResponseData)
router.post('/addExcelApiData',apiData.addExcelApidata)


module.exports = router;
