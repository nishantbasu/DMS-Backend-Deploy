const express = require('express');
const router = express.Router();

const { getInitialData, getAllUsers } = require('../controller/dms');

router.route('/').get(getInitialData)
router.route('/getAllUsers').get(getAllUsers)

module.exports = router;