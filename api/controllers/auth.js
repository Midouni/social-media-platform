const User = require('../models/User')["user"]
const Person = require('../models/User')["person"]
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = await user.createJWT()
    //res.status(StatusCodes.CREATED).json({ token, user })
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

const test = async (req, res) => {
    const user = await User.findOne({ "_id": "63519e1059175041760a4fed" }).select("persons")
    let x = user.persons.map((e) => {
        if (e.id == "63519cf24e97cb65d0d6c08d") {

            return e
        }
    })
    res.send(x)
}

module.exports = {
    register,
    login,
    test
}


