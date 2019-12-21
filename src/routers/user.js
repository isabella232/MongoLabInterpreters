const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// creating a user
router.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

// getting users by their credentials
router.post('/login', async(req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e){
        res.status(400).send()
    }
})

// gets multiple users (this is for the search page)
router.get('/users', async (req, res)=>{
    try{

        //change this to use different search criteria
        const users = await User.find({ isInterpreter: true})

        //gotta let users down more easily when no matches are found

        res.send(users)
    }catch(e){
        res.status(500).send()
    }
})

// user can update their own profiles
router.patch('/users/:id',  async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'username', 'password', 'gender']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save() // where middleware gets executed

        if (!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router