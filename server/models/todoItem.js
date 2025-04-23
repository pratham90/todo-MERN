const  mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        requied: true
    }, 
    completed:{
        type: Boolean,
        default: false
    },
},
    {timeStamps:true}
)
module.exports = mongoose.model("todoItem",todoSchema)