const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const  {BadRequestError,UnauthenticatedError} = require('../errors');
const {StatusCodes} = require ('http-status-codes');

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email password');
    }
    const user = await Users.findOne({email:email});
    if(!user){
        throw new UnauthenticatedError('Un authorized');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Un authorized, Wrong password');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({msg:'Logged in', user:{name:user.name, email:user.email, avatarUrl : user.avtarUrl, accessLevel: user.accessLevel },token});
};

const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !password || !email){
        throw new BadRequestError('Please provide name, email and password');
    }

    const user = await Users.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({msg:'User Created',user:{name:user.name, email: user.email, avatarUrl : user.avtarUrl, accessLevel: user.accessLevel },token});
};

module.exports = {login,register};