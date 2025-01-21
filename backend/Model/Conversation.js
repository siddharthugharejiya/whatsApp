const mongoose = require('mongoose')

const Con = mongoose.Schema({
    members : {
        type : Array
    },
    message : {
        type : String
    }
},
{

    timestamps : true 
}
)
const converstionModel = mongoose.model("Conversation",Con)
module.exports = converstionModel