const Orders = require('../models/order');
const  {NotFoundError,BadRequestError} = require('../errors');
const {StatusCodes} = require ('http-status-codes');

const getAllOrders = async (req, res, next) => {
    const {createdByMe} = req.query;
    if(createdByMe){
        getAllOrdersCreatedByUser(req, res, next);
    }else{
        const order = await Orders.find({})
        res.status(StatusCodes.OK).json({ order, count : order.length });
    }
};

const getAllOrdersCreatedByUser = async (req, res, next) => {
    const order = await Orders.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({ order, count:order.length });
};

const getOrderById = async (req, res, next) => {
    const {user : {userId}, params:{id:orderId}}= req;

    const {createdByMe} = req.query;
    if(createdByMe){
        getOrderByIdCreatedByMe(req, res, next);
    }else{
        const order = await Orders.findOne({ _id: orderId })
        if (!order) {
            throw new NotFoundError('Not Found')
        }
        res.status(StatusCodes.OK).json({ order });
    }
};

const getOrderByIdCreatedByMe = async (req, res, next) => {
    const {user : {userId}, params:{id:orderId}}= req;
    const order = await Orders.findOne({ _id: orderId , createdBy: userId})
    if (!order) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ order });
};

const createOrder = async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const order = await Orders.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:'Order Created', orderId : order._id});
};

const updateOrder = async (req, res, next) => {
    const {userId} = req.user;
    const { id: orderId } = req.params;
    const order = await Orders.findOneAndUpdate({ _id: orderId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!order) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({order});
};

const deleteOrder = async (req, res, next) => {
    const {userId} = req.user;
    const { id: orderId } = req.params;
    const order = await Orders.findOneAndDelete({ _id:orderId })
    if (!order) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).send();
};

const uploadPickUpImage = async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, uploadPickUpImage };