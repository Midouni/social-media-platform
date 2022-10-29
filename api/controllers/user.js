const User = require('../models/User')['user']
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


//get all user only for admin

const getAllUsers = async (req, res) => {
    const { filterUsers } = require('../middleware/user')
    const { queryOrder, queryObject } = filterUsers(req.query)
    const users = await User.find({ ...queryObject }).
        select(queryOrder.select)
        .limit(queryOrder.limit)
        .skip(queryOrder.skip)
        .sort(queryOrder.sort)
    res.status(StatusCodes.OK).json({ "numberOfUsers": users.length, "users": users })
}

//get user
const getUser = async (req, res) => {
    const userId = req.params['id']
    //select specific data
    let select = {}
    select = Object.keys(req.query)
    //get user data
    const user = await User.findOne({ '_id': userId }).select(...select)
    //check if user exist
    if (!user) {
        throw new NotFoundError(`user with id ${userId} does not exist`)
    }
    //response
    res.status(StatusCodes.OK).json(user)
}

//remove user 
const removeUser = async (req, res) => {
    const userId = req.params['id']
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
        throw new NotFoundError(`user with id ${userId} does not exist`)
    }
    res.status(StatusCodes.OK).json(user)
}

//update user info
const updateUser = async (req, res) => {
    const userId = req.params['id']
    const user = await User.findOneAndUpdate({ '_id': userId }, { ...req.body }, { runValidators: true, returnDocument: 'after' })
    if (!user) {
        throw new NotFoundError(`user with id ${userId} does not exist`)
    }
    res.status(StatusCodes.OK).json(user)
}


//export methodes
module.exports = {
    getAllUsers,
    getUser,
    removeUser,
    updateUser
}