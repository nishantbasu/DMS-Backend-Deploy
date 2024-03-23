const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || 'Something went wrong, Try again later.'
    }
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if(err.code && err.code === 1100){
        customError.msg = `Duplicate key entered for ${Object.keys(err.keyValue)} field, Please choose another value.`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if(err.name === 'CastError'){
        customError.msg = `No Item found with id ${err.value}.`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    return res.status(customError.statusCode).json({msg:customError.msg});
}

module.exports = errorHandlerMiddleware