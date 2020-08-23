const express = require('express')
const User = require('../models/users.js')
const auth = require('../middleware/auth.js')

const router = new express.Router()

// --------- USER Routes -----------
// CREATE Route User
router.post('/users',async (req, res) =>{
    const user = new User(req.body)

    try{
        const token = await user.generateAuthToken()
        await user.save()

        res.status(201).send({ user, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

// Login Route
router.post('/users/login', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

// Logout Route(Single Device)
router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;  // (token property on user.tokens array)
        })
        await req.user.save()
        res.send({message:'Logout Successful'});
    }catch(e) {
        res.status(500).send()
    }
})

// Logout Route(All devices)
router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        // req.user.tokens.splice(0, req.user.tokens.length)
        req.user.tokens = []

        await req.user.save()
        res.send({ message:'Logged Out from all devices' })
    }catch(e) {
        res.status(500).send()
    }
})

// READ Route USER(ONE) now (profile)
router.get('/users/me', auth, async (req, res) =>{
    res.send(req.user)
})

// Update Route USER
router.patch('/users/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const validUpdates = ['name','age','email','password']
    const isValidUpdate = updates.every( (update) => validUpdates.includes(update) )

    if(!isValidUpdate){
        return res.status(400).send( {error :' Invalid Updates'} )
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update] );
        await req.user.save()

        res.status(201).send(req.user)
    }catch(e) {
        res.status(400).send(e)
    }
})

// DELETE Route User
router.delete('/users/:id', auth, async (req, res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router
