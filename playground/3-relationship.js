const Task = require('../src/models/tasks.js')
const User = require('../src/models/users.js')
require('../src/db/mongoose.js')


const main = async () =>{

    // finding user with help of task
    // const task = await Task.findById('5f3f58fbf9726a163bccef89')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // finding tasks of user
    const user = await User.findById('5f3f58caf9726a163bccef86')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
