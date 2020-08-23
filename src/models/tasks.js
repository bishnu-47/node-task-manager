const mongoose = require('mongoose');

// TASK MODEL
const Task = mongoose.model('Task',{
    description : {
        type : String,
        requried : true,
        trim : true
    },
    completed :{
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        requried : true,
        ref : 'User'
    }
})

module.exports = Task
