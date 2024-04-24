const express = require('express');
const router = express.Router();

const { getAllCategories, createCategories, updateCategories, deleteCategory } = require('../controller/category');

router.route('/').get(getAllCategories).post(createCategories);
router.route('/:id').patch(updateCategories).delete(deleteCategory);


module.exports = router;