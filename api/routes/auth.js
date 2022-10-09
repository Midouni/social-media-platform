const express = require('express')
const Router = express.Router()
const { register, login } = require('../controllers/auth')

Router.route('/login').post(login)
Router.route('/register').post(register)

module.exports = Router