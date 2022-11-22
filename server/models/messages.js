const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    user: {
        id: {
            type: mongoose.Types.ObjectId,
            unique: [true, 'id deja exist'],
            required: [true, 'please provide id ']
        },
        persons: {
            type: [PersonSchema]
        }
    }
})

const PersonSchema = mongoose.Schema({
    personId:{
        type:mongoose.Types.ObjectId,
        messages:[
            {
                text:String,
                date:Date
            }
        ]
    }
})

module.exports = mongoose.Model('test',MessageSchema)