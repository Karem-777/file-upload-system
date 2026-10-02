const express = require('express');
const filleController = require('../controller/fileController');
const router = express.Router();

router.route('/retrieveFiles').get(filleController.retrieveFiles)
router.route('/upload').post(filleController.uploadFile)
router.route('/delete/:filename').post(filleController.deleteFile)
router.route('/open/:filename').get(filleController.openFile)


module.exports = router;