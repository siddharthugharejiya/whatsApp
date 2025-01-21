const mongoose = require('mongoose')

const Usermessage = mongoose.Schema({
    conversationId : { type : String},
    receiverId : {type : String},
    senderId : {type : String},
    text : {type : String},
    type : {type : String}
},
{

    timestamps : true 
})
const MessageModel = mongoose.model('Message',Usermessage)
module.exports = MessageModel