const express = require('express');
const router = express.Router();

const { getAllRiders, createRiders, updateRiders, deleteRiders } = require('../controller/rider');

router.route('/').get(getAllRiders).post(createRiders);
router.route('/:id').patch(updateRiders).delete(deleteRiders);


module.exports = router;