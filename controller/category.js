const Category = require('../models/category');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllCategories = async (req, res, next) => {
    const categories = await Category.find({})
    res.status(StatusCodes.OK).json({ categories });
};

const createCategories = async (req, res, next) => {
    if(!Array.isArray(req.body)){
        throw new BadRequestError('Must be an array');
    }
    await Category.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'Categories Created' });
};

const updateCategories = async (req, res, next) => {
    const { id: categoryId } = req.params;
    if (categoryId === '') {
        throw new BadRequestError('Category id cannot be empty');
    }
    const category = await Category.findOneAndUpdate({ _id: categoryId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!category) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ category });
};

const deleteCategory = async (req, res, next) => {
    const { id: categoryId } = req.params;
    const category = await Category.findOneAndDelete({ _id:categoryId })
    if (!category) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllCategories, createCategories, updateCategories, deleteCategory };