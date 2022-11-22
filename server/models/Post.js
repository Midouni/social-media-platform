const mongoose = require('mongoose')



const LikeShema = new mongoose.Schema({
    personId: {
        type: mongoose.Types.ObjectId,
        required: [true, "please provide person id who click like"]
    },
    type: {
        type: String,
        enum: ["like", "love", "care", "haha", "wow", "sad", "angry"],
        required: [true, 'please provide type of like']
    }
}, { timestamps: true })

const CommentSchema = new mongoose.Schema({
    personId: {
        type: mongoose.Types.ObjectId,
        required: [true, "please provide person id who write comment"]
    },
    text: {
        type: String,
        required: [true, "please provide comment"]
    }
}, { timestamps: true })



const PostSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    picture: {
        type: String
    },
    likes: {
        type: [LikeShema],
        default: []
    },
    comments: {
        type: [CommentSchema],
        default: []
    }
}, { timestamps: true })



const PostsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'please provide user id'],
        unique: true
    },
    userPosts: {
        type: [PostSchema],
        default: []
    }
})

module.exports = mongoose.model("Posts", PostsSchema)