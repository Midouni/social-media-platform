const router = require('express').Router()
const authorizationMiddleware = require('../middleware/authentication')

const { getUser, removeUser, updateUser } = require('../controllers/user')

router.route('/:id')
    .get(authorizationMiddleware, getUser)
    .delete(authorizationMiddleware, removeUser)
    .patch(authorizationMiddleware, updateUser)

module.exports = router