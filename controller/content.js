const Content = require('../models/content');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllContent = async (req, res, next) => {
    const content = await Content.find({})
    res.status(StatusCodes.OK).json({ content });
};

const createContent = async (req, res, next) => {
    if(!Array.isArray(req.body)){
        throw new BadRequestError('Must be an array');
    }
    await Content.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'Content Created' });
};

const updateContent = async (req, res, next) => {
    const { id: contentId } = req.params;
    if (contentId === '') {
        throw new BadRequestError('Content id cannot be empty');
    }
    const content = await Content.findOneAndUpdate({ _id: contentId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!content) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ content });
};

module.exports = { getAllContent, createContent, updateContent };