const express = require('express');
const router = express.Router();

const { getInitialData } = require('../controller/dms');

router.route('/').get(getInitialData)


module.exports = router;