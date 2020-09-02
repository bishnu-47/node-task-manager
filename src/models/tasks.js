const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
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
},{
    timestamps : true
})

// TASK MODEL
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
