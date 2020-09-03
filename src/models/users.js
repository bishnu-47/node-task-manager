const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./tasks.js')

// USER Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
        trim: true
    },
    age: {
        type: Number,
        // requried : true,
        default: 18,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    email: {
        type: String,
        requried: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email')
            }
        }
    },
    password: {
        type: String,
        requried: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain word password')
            }
        }
    },
    avatar: {
        type: Buffer,
    },
    tokens: [{
        token: {
            type: String,
            requried: true
        }
    }]
}, {
    timestamps: true
})

// a virtual field to setup a relation between entities
// its not stored in actual db
userSchema.virtual('tasks', {
    ref: 'Task', // model
    localField: '_id',
    foreignField: 'owner' // how fields are related btwen 2 tables
})

// function to filter out sensetive data
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// creating a method for instance of User
// methods  are accessable on the instances (instance methods)
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({
        token
    })
    await user.save()

    return token
}

// custom function to check for Login
// static methods are accessable on the model (model methods)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new Error('Unable to Login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to Login')
    }

    return user
}

// Middleware to hash password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Middleware to remove all tasks related to user
// when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({
        owner: user._id
    })

    next()
})

// USER MODEL
const User = mongoose.model('User', userSchema)

module.exports = User
