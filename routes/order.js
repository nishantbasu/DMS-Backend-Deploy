const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { id: orderId } = req.params;
        const path = `./uploads/${orderId}`
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        const {prefix} = req.query;
        cb(null, prefix + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage});

const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, uploadPickUpImage } = require('../controller/orders');

router.route('/upload-image/:id').post(upload.single('image'), uploadPickUpImage);
router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrderById).patch(updateOrder).delete(deleteOrder);


module.exports = router;