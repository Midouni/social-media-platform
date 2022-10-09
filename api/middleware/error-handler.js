const { StatusCodes } = require('http-status-codes')
const errorsHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "sameting wrong please try again later ..."
    }

    res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorsHandlerMiddleware