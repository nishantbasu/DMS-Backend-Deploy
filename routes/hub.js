const express = require('express');
const router = express.Router();

const { getAllHubs, createHubs, updateHubs } = require('../controller/hub');

router.route('/').get(getAllHubs).post(createHubs);
router.route('/:id').patch(updateHubs);


module.exports = router;