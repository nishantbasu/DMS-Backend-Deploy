const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name']
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
    },
    avtarUrl: {
        type: String,
        required:false
    },
    accessLevel: {
        type: String,
        required:true,
        enum : {
            values :['Super_Admin', 'Admin', 'User'],
            message : '{VALUE} is not supported'
        },
        default: 'Super_Admin'
    },
    mappedHub : {
        type: [String],
        required:false
    },
    mappedCategories : {
        type: [String],
        required:false
    },
});

UsersSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UsersSchema.methods.createJWT = function (){
    return jwt.sign({userId : this._id, name : this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

UsersSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('Users', UsersSchema)