const router = require('express').Router()

const { getAllUsers } = require('../controllers/admin')

router.route('/').get(getAllUsers)

module.exports = router