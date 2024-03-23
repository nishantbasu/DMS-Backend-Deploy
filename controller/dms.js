const { StatusCodes } = require('http-status-codes');
const Users = require('../models/users');
const Content = require('../models/content');

const getInitialData = async (req, res, next) => {
    const userData = await Users.findById(req.user.userId).select('-password');
    const contentData = await Content.find({})
    res.status(StatusCodes.OK).json({ user: userData,content:contentData });
};

module.exports = { getInitialData };