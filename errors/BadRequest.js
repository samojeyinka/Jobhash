const CustomAPIError = require('./customApiError');
const { StatusCodes } = require('http-status-codes')

class BadRequest extends CustomAPIError {
    constructor(messsage) {
        super(messsage);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;