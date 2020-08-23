require ('../src/db/mongoose.js')
const Task =require('../src/models/tasks.js')

// Task.findByIdAndDelete('5f33c3518a52872603526f74').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((value) =>{
//     console.log(value)
// }).catch((e) =>{
//     console.log(e)
// })

const deleteAndCount = async (id , completed) =>{
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })

    return({
        deletedTask,
        count
    })
}

deleteAndCount('5f351217b87ea01e54363f30' , false).then(({ deletedTask, count }) => {
    console.log(deletedTask)
    console.log(count)
}).catch((e) =>{
    console.log(e)
})
