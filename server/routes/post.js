const router = require('express').Router()

//autherization middleware
const authorizationMiddleware = require('../middleware/authentication')

const {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    removePost,
    likePost,
    removeLike,
    createComment,
    removeComment,
    updateComment
} = require('../controllers/post')

router.route('/:id')
    .get(authorizationMiddleware, getAllPosts)
    .post(authorizationMiddleware, createPost)

router.route('/:id/:postId')
    .get(authorizationMiddleware, getPost)
    .patch(authorizationMiddleware, updatePost)
    .delete(authorizationMiddleware, removePost)

router.route('/like/:id/:postOwnerId&:postId')
    .post(authorizationMiddleware, likePost)
router.route('/dislike/:id/:postOwnerId&:postId')
    .post(authorizationMiddleware, removeLike)

router.route('/comment/:id/:postOwnerId&:postId')
    .post(authorizationMiddleware, createComment)
    .delete(removeComment)
    .patch(updateComment)

module.exports = router