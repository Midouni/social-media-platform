const User = require('../models/User')['user']
const { NotFoundError, UnauthenticatedError } = require('../errors')
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

module.exports = {
    getAllUsers
}