const express = require('express')
const {Router} = express
const router = new Router()
const Message = require('../dao/models/messagesModel')

router.get('/', (req, res) => {
    res.render('chat', {})
})

router.post('/', (req, res) => {
    const newMessage = req.body
    const message = new Message(newMessage)
    message.save()
    .then(message => {
        res.status(201).send({message: 'Message sent', data: message})
    })
    .catch(err => res.status(500).send({err}))
})

module.exports = router
