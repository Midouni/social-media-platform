const express = require('express')
const Router = express.Router()
const { register, login,test } = require('../controllers/auth')

Router.route('/login').post(login)
Router.route('/register').post(register)
Router.route('/test').post(test)


module.exports = Router