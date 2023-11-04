const CustomAPIError = require('./customApiError');
const {StatusCodes} =  require('http-status-codes')

class UnAuthenticated extends CustomAPIError{
    constructor(messsage){
        super(messsage);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthenticated;