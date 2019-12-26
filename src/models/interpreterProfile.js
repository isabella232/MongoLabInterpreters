const mongoose = require('mongoose')
const validator = require('validator')

const iProfile = new mongoose.Schema({
    location: {
        type: String,
        trim: true
    },
    // indigenous language fluency
    iLangFluency: {
        // should have an iLang Schema for diff languages
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 5
    },
    // english language fluency
    eLangFluency: {
        type: Number,
        trim: true,
        required: true,
        min: 1,
        max: 5
    },
    // certification
    certification: {
        type: Array
    },
    //which interpreter's profile this is
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const InterpreterProfile = mongoose.model('InterpreterProfile', iProfile)

module.exports = InterpreterProfile