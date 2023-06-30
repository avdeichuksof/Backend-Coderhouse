const express = require('express')
const {Router} = express
const router = new Router()

let User = require('../dao/models/userModel')
const { use } = require('passport')

function auth(req, res, next){
    if(req.session.email === 'adminCoder@coder.com' && req.session.password === 'admin1234'){
        return next()
    }
    return res.send('An error ocurred or you are not an admin ')
}

function isLogged(req, res, next){
    if(req.session.username){
        return next();
    }else{
        res.redirect('/login')
    }
}


router.post('/register', async (req, res) => {
    try{
        let newUser = req.body
        console.log(newUser)

        if(newUser.email === 'adminCoder@coder.com' && newUser.password === 'admin1234'){
            newUser.role = 'admin'
        }else{
            newUser.role = 'user'
        }

        await User.create(newUser)
        res.redirect('/user/login')
    }catch(err){
        res.status(500).send('Error registering user. Email might already be in use')
    }
})

router.post('/login', async (req, res) => {
    try{
        let userLogin = req.body
        let userFound = await User.findOne({
            username: userLogin.username,
            email: userLogin.email,
            password: userLogin.password
        }).lean().exec()
        
        if(!userFound){
            res.send('Incorrect user or password')
            return
        }
        
        if(userFound.email == 'adminCoder@coder.com' && userFound.password == 'admin1234'){
            req.session.email = userLogin.email
            req.session.admin = true
        }

        req.session.username = userLogin.username
        req.session.email = userLogin.email
        req.session.password = userLogin.password

        res.redirect('/index')
    }catch(err){
        console.log(err)
    }
})


// se puede entrar solo después de loggearse como admin
router.get('/privado', auth, (req, res) => {
    res.send('Bienvenido admin!')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Failed logout')
        res.redirect('/user/login')
    })
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find().lean().exec()
        res.send(users)
    }catch(err){
        console.log(err)
    }
})

module.exports = router