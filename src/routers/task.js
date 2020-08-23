const express = require('express')
const Task = require('../models/tasks.js')
const auth = require('../middleware/auth.js')
const router = express.Router()


// -------------  TASK Routes -----------
// CREATE Route Task
router.post('/tasks', auth, async (req, res) => {
    try{
        // const task = new Task(req.body)
        const task = new Task({
            ...req.body,
            owner : req.user._id
        })
        task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).send(e)
    }
})

// READ Route Task(ALL)
 router.get('/tasks', auth, async (req, res) =>{
     try{
         // const tasks = await Task.find({ owner: req.user._id })
         await req.user.populate('tasks').execPopulate()
         res.send(req.user.tasks)
     }catch(e) {
         res.status(500).send()
     }
 })

 // READ Route Task(ONE)
 router.get('/tasks/:id', auth, async (req, res) =>{
     const _id = req.params.id

     try{
         const task = await Task.findOne({ _id , owner: req.user._id })
         if(!task){
             return res.status(404).send()
         }

         res.send(task)
     }catch {
         res.status(500).send()
     }
 })

// UPDATE Route TASK
router.patch('/tasks/:id', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const validUpdates = ['description','completed']
    const isValidUpdate = updates.every( (update) => validUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send({ error: 'Invalid updates made' })
    }

    try{
        const updatedTask = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        // const updatedTask = await Task.findByIdAndUpdate(req.params.id , req.body , { new:true, runValidators:true})
        if(!updatedTask){
            return res.status(404).send()
        }

        updates.forEach( (update) => updatedTask[update] = req.body[update] )
        await updatedTask.save()

        res.send(updatedTask)
    }catch(e) {
        res.status(500).send(e)
    }
})

// DELETE Route Task
router.delete('/tasks/:id', auth, async (req, res) =>{
    try{
        // const deletedTask = await Task.findByIdAndDelete(req.params.id)
        const deletedTask = await Task.findOneAndDelete({ _id :req.params.id, owner : req.user._id })

        if(!deletedTask){
            return res.status(404).send()
        }

        res.send(deletedTask)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router
