const express = require('express');

const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
require('./db/mongoose.js')

const router = new express.Router()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)







app.listen( port , () =>{
    console.log("Server has started at port",port)
})






// 
// const Task = require('../src/models/tasks.js')
//
// const main = async () =>{
//     const task = await Task.findById('5f3f58fbf9726a163bccef89')
//     console.log(task)
// }
//
// main()
// console.log("end");
