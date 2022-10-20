// save the history of profil and cover pictures
const mongoose = require('mongoose')

// history of profile and cover pictures
const Pictures = mongoose.Schema({
    profilPictures: {
        type: [Picture]
    }
})


// child schema for Pictures
const Picture = new mongoose.Schema({
    url: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: [true, 'please provide date']
    },
    status: {
        type: String,
        enum: ["public", "private"]
    },
    for: {
        type: String,
        enum: ["profil", "cover"]
    }
})

module.exports = mongoose.model('PersonalPictures', Pictures)