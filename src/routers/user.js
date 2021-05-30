const express = require('express')
const User = require('../models/users')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/api/users', async (req, res) => {
    const user = new User(req.body);
  
    try{
      await user.save()

      const token = await user.generateAuthToken()
      res.status(201).send({user, token})
    } catch(error){
      res.status(400).send(error)
    }
    
})

router.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(error) {
        res.status(400).send({error: 'Invalid Credentials'})
    }
})

router.post('/api/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

router.post('/api/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

router.get('/api/users/me', auth, async (req, res) => {
    res.send(req.user)

})

router.patch('/api/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if(!isValidOperation)
        return res.status(400).send({error: 'Invalid update!'})

    try {

        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()

        if(!req.user)
            return res.status(404).send()

        res.send(req.user)
    } catch(error)
    {
        res.status(400).send(error)
    }
})

router.delete('/api/users/me', auth, async (req, res) => {

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
