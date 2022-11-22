const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authorizationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('no token provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = { ...decode }
        if (req.params.id !== req.user.userID) {
            throw new UnauthenticatedError('Not authorized to acces this route')
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to acces this route')
    }
}

module.exports = authorizationMiddleware