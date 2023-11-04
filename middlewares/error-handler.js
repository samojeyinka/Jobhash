const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || `Something went wrong,try again later`
    }

    //HANDLE SPECIFIC ERROR CASES
    if (err.name === 'ValidationError') {
        customError = handleValidationError(err);
    } else if (err.code && err.code === 11000) {
        customError = handleDuplicateKey(err)
    } else if (err.name && err.name === 'CastError') {
        customError = handleCastError(err)
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });

}

//HANDLE VALIDATION ERROR
const handleValidationError = (err) => {
    return {
        msg: Object.values(err.errors).map(item => item.message).join(' and '),
        statusCode: 400
    }
}

//HANDLE DUPLICATE ERROR:PREVENT USER FROM REGISTERING MORE THAN ONE ACCOUNT WITH ONE EMAIL ETC.
const handleDuplicateKey = (err) => {
    return {
        msg: `The ${Object.keys(err.keyValue)} you provided is beign used by another user`,
        statusCode: 400
    }
}

//HANDLE CASTERROR - ITEMS THAT DOESN'T EXIST
const handleCastError = (err) => {
    return {
        msg: `No job found with the id ${err.value ? err.value._id || err.value : ''}`, //IF THERE IS ERROR VALUE,GET THE ERROR ID OR GET THE VALUE ONLY ,IF NON,RETURN NULL
        statusCode: 404
    }
}


module.exports = errorHandlerMiddleware;