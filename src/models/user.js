const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }}
    }, password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }, username: {
        type: String,
        required: true,
        trim: true
    }, gender: {
        type: String,
        trim: true
    }, isInterpreter: {
        type: Boolean,
        required: true
    }, isProvider: {
        type: Boolean,
        required: true
    }, isAdmin: {
        type: Boolean,
        required: true
    }
    //add profile pic
    //idk how this would stored
})

//checks that the user exists in database
userSchema.statics.findByCredentials = async(email, password) =>{
    const user = await User.findOne({ email })

    if (!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//has the plain text pw before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User