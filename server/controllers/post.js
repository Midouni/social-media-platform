const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
//=========================================================================
const getAllPosts = async (req, res) => {
    const userId = req.params.id
    let post = await Post.find({ "userId": userId })
    if (post.length === 0) {
        post = await Post.create({ "userId": userId })
    }
    res.status(StatusCodes.OK).json({ "posts": post })
}
//=========================================================================
const getPost = async (req, res) => {

    const userId = req.params['id']
    const postId = req.params['postId']

    const userPosts = await Post.findOne({ "userId": userId }).select('userPosts')
    const posts = userPosts["userPosts"]
    const post = posts.find((item) => item._id == postId)
    if (!post) {
        throw new BadRequestError(`bad post Id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ "post": post })
}

const createPost = async (req, res) => {
    const userId = req.params.id
    const { text, picture } = req.body
    if (!text && !picture) {
        throw new BadRequestError('please provide text or image at least one of them')
    }
    const posts = await Post.findOneAndUpdate(
        { "userId": userId },
        { "userId": userId, $push: { userPosts: { ...req.body } } },
        { runValidators: true, returnDocument: 'after', upsert: true })
    const post = posts['userPosts'][posts.userPosts.length - 1]
    res.status(StatusCodes.CREATED).json({ "post": post })
}
//=========================================================================
const updatePost = async (req, res) => {

    const userId = req.params['id']
    const postId = req.params['postId']

    let userPosts = await Post.findOne({ "userId": userId })
    userPosts = userPosts['userPosts']

    let postIndex = -1
    for (let i = 0; i < userPosts.length; i++) {
        if (userPosts[i]._id == postId) {
            postIndex = i
            break
        }
    }
    if (postIndex == -1) {
        throw new NotFoundError('post not found')
    }


    const { text, picture } = req.body

    let posts
    if (text) {
        let textIndex = `userPosts.${postIndex}.text`
        let newText = { [textIndex]: text }
        console.log(newText);
        posts = await Post.findOneAndUpdate(
            { "userId": userId },
            {
                $set: {
                    ...newText
                }
            },
            { runValidators: true, returnDocument: 'after', upsert: true }
        )
    }
    if (picture) {
        let pictureIndex = `userPosts.${postIndex}.picture`
        let newPicture = { [pictureIndex]: picture }
        posts = await Post.findOneAndUpdate(
            { "userId": userId },
            {
                $set: {
                    ...newPicture
                }
            },
            { runValidators: true, returnDocument: 'after', upsert: true }
        )
    }
    res.send({ "post": posts.userPosts[postIndex] })

}
//=========================================================================
const removePost = async (req, res) => {
    const userId = req.params['id']
    const postId = req.params['postId']
    const post = await Post.findOneAndUpdate(
        { "userId": userId },
        { $pull: { "userPosts": { '_id': postId } } },
        { returnDocument: 'after' })
    res.status(StatusCodes.OK).json({ "status": "removed" })
}

//=========================================================================
const likePost = async (req, res) => {
    //
    const userId = req.params['id']
    const postId = req.params['postId']
    const postOwnerId = req.params['postOwnerId']
    const type = req.body.type

    if (!type) {
        throw new BadRequestError('please provide type of reaction')
    }

    let postsOwner = await Post.findOne({ "userId": postOwnerId })
    if (!postsOwner) {
        throw new BadRequestError('wrong post owner id')
    }
    postsOwner = postsOwner["userPosts"]


    //here check if owner have the post 
    let postIndex = -1
    for (let i = 0; i < postsOwner.length; i++) {
        if (postsOwner[i]._id == postId) {
            postIndex = i
            break
        }
    }
    if (postIndex == -1) {
        throw new NotFoundError(`user ${postOwnerId} dont have post ${postId}`)
    }
    //check if person alerady like the post
    let listOfPerosnsLikeThePost = postsOwner[postIndex].likes
    let likeIndex = -1
    for (let i = 0; i < listOfPerosnsLikeThePost.length; i++) {
        if (listOfPerosnsLikeThePost[i].personId == userId) {
            likeIndex = i
            break
        }
    }

    let post
    if (likeIndex == -1) {
        let path = `userPosts.${postIndex}.likes`
        let newLike = { "personId": userId, "type": type }
        post = await Post.findOneAndUpdate(
            { "userId": postOwnerId },
            { $push: { [path]: { ...newLike } } },
            { runValidators: true, returnDocument: 'after' })
    } else {
        let path = `userPosts.${postIndex}.likes.${likeIndex}.type`
        let newLike = { [path]: type }
        post = await Post.findOneAndUpdate(
            { "userId": postOwnerId },
            { $set: { ...newLike } },
            { runValidators: true, returnDocument: 'after' })
    }

    res.status(StatusCodes.OK).json({ "post": post.userPosts[postIndex] })

}
//=========================================================================
const removeLike = async (req, res) => {
    const userId = req.params['id']
    const postId = req.params['postId']
    const postOwnerId = req.params['postOwnerId']

    let postsOwner = await Post.findOne({ "userId": postOwnerId })
    if (!postsOwner) {
        throw new BadRequestError('wrong post owner id')
    }
    postsOwner = postsOwner["userPosts"]


    //here check if owner have the post 
    let postIndex = -1
    for (let i = 0; i < postsOwner.length; i++) {
        if (postsOwner[i]._id == postId) {
            postIndex = i
            break
        }
    }
    if (postIndex == -1) {
        throw new NotFoundError(`user ${postOwnerId} dont have post ${postId}`)
    }

    let path = `userPosts.${postIndex}.likes`
    let post = await Post.findOneAndUpdate(
        { "userId": postOwnerId },
        { $pull: { [path]: { "personId": userId } } },
        { runValidators: true, returnDocument: "after" })
    res.status(StatusCodes.OK).json({ "post": post.userPosts[postIndex] })
}
//=========================================================================
const createComment = async (req, res) => {
    const { id, postOwnerId, postId } = req.params
    const comment = req.body.comment

    let postsOwner = await Post.findOne({ "userId": postOwnerId })
    if (!postsOwner) {
        throw new BadRequestError('wrong post owner id')
    }
    postsOwner = postsOwner["userPosts"]
    //here check if owner have the post 
    let postIndex = -1
    for (let i = 0; i < postsOwner.length; i++) {
        if (postsOwner[i]._id == postId) {
            postIndex = i
            break
        }
    }
    if (postIndex == -1) {
        throw new NotFoundError(`user ${postOwnerId} dont have post ${postId}`)
    }

    let path = `userPosts.${postIndex}.comments`
    let posts = await Post.findOneAndUpdate(
        { "userId": postOwnerId },
        { $push: { [path]: { "personId": id, "text": comment } } },
        { runValidators: true, returnDocument: "after" })
    res.status(StatusCodes.OK).json({ "post": posts.userPosts[postIndex] })
}

const removeComment = async (req, res) => {
    res.send('comment post ')
}
const updateComment = async (req, res) => {
    res.send('comment post ')
}




module.exports = {
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
}