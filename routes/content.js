const express = require('express');
const router = express.Router();

const { getAllContent, createContent, updateContent } = require('../controller/content');

router.route('/').get(getAllContent).post(createContent);
router.route('/:id').patch(updateContent);


module.exports = router;