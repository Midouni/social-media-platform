const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


//childSchema
const PeopleSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "please provide id of person"]
    },
    status: {
        type: String,
        enum: ["firend", "sendRequest", "receiveRequest", "blocked"],
        required: [true, "please provide status of person"]
    }
}, { timestamps: true })


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please provide first name'],
        maxlength: 100,
        minlength: 3
    },
    lastName: {
        type: String,
        required: [true, 'please provide last name'],
        maxlength: 100,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'please provide email adress'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: [true, `this ${this.email} exist`],
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 8
    },
    birthday: {
        type: Date,
        required: [true, 'please provide bithday date'],
        min: '01-01-1850',
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'please provide gender']
    },
    persons: [PeopleSchema],
    profilPicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    }
}, { timestamps: true })

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


UserSchema.methods.createJWT = async function () {
    const token = JWT.sign({ userID: this._id, firstName: this.firstName, lastName: this.lastName }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token
}
UserSchema.methods.comparePassword = async function (currentPassword) {
    const isMatch = await bcrypt.compare(currentPassword, this.password)
    return isMatch
}
module.exports = { "user": mongoose.model('users', UserSchema), "person": PeopleSchema }








