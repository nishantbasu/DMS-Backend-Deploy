const express = require('express');
const router = express.Router();

const { getInitialData, getAllUsers, updateUser, deleteUser, getUserById } = require('../controller/dms');

router.route('/').get(getInitialData)
router.route('/getAllUsers').get(getAllUsers)
router.route('/user/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;