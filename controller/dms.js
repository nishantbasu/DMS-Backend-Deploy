const { StatusCodes } = require('http-status-codes');
const Users = require('../models/users');
const Content = require('../models/content');

const getInitialData = async (req, res, next) => {
    const userData = await Users.findById(req.user.userId).select('-password');
    const contentData = await Content.find({})
    res.status(StatusCodes.OK).json({ user: userData,content:contentData });
};

const getAllUsers = async (req, res, next) => {
    const users = await Users.find({})
    res.status(StatusCodes.OK).json({ users: users });
};

const updateUser = async (req, res, next) => {
    const { id: userId } = req.params;
    if (userId === '') {
        throw new BadRequestError('User id cannot be empty');
    }
    const user = await Users.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!user) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res, next) => {
    const { id: userId } = req.params;
    if (userId === '') {
        throw new BadRequestError('User id cannot be empty');
    }
    const user = await Users.findOneAndDelete({ _id:userId })
    if (!user) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).send();
};

const getUserById = async (req, res, next) => {
    const {params:{id:userId}}= req;

    const user = await Users.findOne({ _id: userId })
    if (!user) {
        throw new NotFoundError('Not Found')
    }
    res.status(StatusCodes.OK).json({ user });
};


module.exports = { getInitialData, getAllUsers, updateUser, deleteUser, getUserById };