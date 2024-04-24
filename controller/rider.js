const Riders = require('../models/rider');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllRiders = async (req, res, next) => {
    const riders = await Riders.find({})
    res.status(StatusCodes.OK).json({ riders });
};

const createRiders = async (req, res, next) => {
    if(!Array.isArray(req.body)){
        throw new BadRequestError('Must be an array');
    }
    await Riders.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'Riders Created' });
};

const updateRiders = async (req, res, next) => {
    const { id: riderId } = req.params;
    if (riderId === '') {
        throw new BadRequestError('Rider id cannot be empty');
    }
    const rider = await Riders.findOneAndUpdate({ _id: riderId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!rider) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ rider });
};

const deleteRiders = async (req, res, next) => {
    const { id: riderId } = req.params;
    const rider = await Riders.findOneAndDelete({ _id: riderId })
    if (!rider) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllRiders, createRiders, updateRiders, deleteRiders };