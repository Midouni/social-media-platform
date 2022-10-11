const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({ token, user: { firstName: user.firstName, lastName: user.lastName } })
}

const login = async (req, res) => {
    const { password, email } = req.body
    if (!email && !password) {
        throw new BadRequestError('please provide email adress and password')
    }
    if (!email) {
        throw new BadRequestError('please provide email adress')
    }
    if (!password) {
        throw new BadRequestError('please provide password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('password incorrect')
    }
    const token = await user.createJWT()

    res.status(StatusCodes.CREATED).json({ token, user: { firstName: user.firstName, lastName: user.lastName } })
}

module.exports = {
    register,
    login
}