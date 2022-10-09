const mongoose = require('mongoose')
mongoose.Schema({
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
        unique: true,
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
    }
}, { timestamps: true })