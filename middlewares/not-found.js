const { StatusCodes } = require('http-status-codes');

const notFound = (req, res, next) => {
        res.status(StatusCodes.NOT_FOUND).send('Route does not exists');

}

module.exports = notFound;