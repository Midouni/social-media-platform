const Router = require('express').Router()

const { getUser, removeUser, getAllUsers, updateUser } = require('../controllers/user')

Router.route('/').get(getAllUsers)
Router.route('/:id').get(getUser).delete(removeUser).patch(updateUser)

module.exports = Router