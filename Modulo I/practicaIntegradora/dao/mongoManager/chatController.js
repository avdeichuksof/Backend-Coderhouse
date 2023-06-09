const Message = require('../models/messagesModel')

const getMessages = async(req, res) => {
    try{
        const messages = await Message.find()
        res.send({messages: messages})
    }
    catch(err){
        res.status(500).send({error: err})
    }
}

const addMessage = async(req, res) => {
    const message = req.body
    try{
        const messages = await Message.create(message)
        res.status(201).send(messages)
    }catch(err){
        res.send({message: 'An error ocurred'})
    }
}

module.exports = {getMessages, addMessage}