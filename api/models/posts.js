const mongoose = require('mongoose')

const Posts = mongoose.Schema({
    user: {
        id: {
            type: mongoose.Types.ObjectId,
            required: [true, 'please provide user id'],
            unique: [true, 'id must be unique']
        },
        userPosts: {
            type: [Post]
        }
    }
})

const Post = mongoose.Schema({
    text: {
        type: String,
    },
    picture: {
        type: String
    },
    likes: {
        type: [Like],
        required: [true, 'please provide like']
    },
    comments: {
        type: [PersonComment]
    }
})

const Like = mongoose.Schema({
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

const PersonComment = mongoose.Schema({
    personId: {
        type: mongoose.Types.ObjectId,
        required: [true, "please provide person id who write comment"]
    },
    text: {
        type: String,
        required: [true, "please provide comment"]
    }
}, { timestamps: true })