const mongoose =  require('mongoose')
const User = require('./user')
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sentFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content : {
        type : String,
        required : true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})
 
const Message = mongoose.model('Messages',messagesSchema)

module.exports=Message