const Hubs = require('../models/hub');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllHubs = async (req, res, next) => {
    const hubs = await Hubs.find({})
    res.status(StatusCodes.OK).json({ hubs });
};

const createHubs = async (req, res, next) => {
    if(!Array.isArray(req.body)){
        throw new BadRequestError('Must be an array');
    }
    await Hubs.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'Hubs Created' });
};

const updateHubs = async (req, res, next) => {
    const { id: hubId } = req.params;
    if (hubId === '') {
        throw new BadRequestError('Hub id cannot be empty');
    }
    const hub = await Hubs.findOneAndUpdate({ _id: hubId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!hub) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ hub });
};

const deleteHubs = async (req, res, next) => {
    const { id: hubId } = req.params;
    const hub = await Hubs.findOneAndDelete({ _id: hubId })
    if (!hub) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllHubs, createHubs, updateHubs, deleteHubs };