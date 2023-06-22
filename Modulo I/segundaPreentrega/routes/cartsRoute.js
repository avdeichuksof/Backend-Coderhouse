const express = require('express')
const {Router} = express
const router = new Router()
const CartController = require('../dao/mongoManagers/cartController')
const cartManager = new CartController()
const Cart = require('../dao/models/cartModel')

router.get('/', async(req, res) => {
    await cartManager.getCarts()
        .then(carts => {
            if(carts.length) return res.status(200).send({data: carts})
            return res.status(204).send({message: 'Data not found'})
        })
        .catch(err => res.status(500).send({err}))
})

router.post('/', (req, res) => {
    const cart = new Cart()
    cartManager.addCart(cart)
        .then(cart => 
            res.send({message: 'Cart created successfully', data: cart}
        ))
        .catch(err => res.status(500).send({err}))
})

router.get('/:cid', (req, res) => {
    const cid = req.params.cid
    const cart = cartManager.getCartById(cid)

    Cart.find().populate('products.product')
        .then(c => console.log(JSON.stringify(c, null, '\t')))
        .catch(err => console.log(err))

    if(cart) return res.status(200).send({data: cart})

    return res.status(204).send({message: 'Cart not found'})

})

router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const productAdd = cartManager.addToCart(cid, pid)
    return productAdd ? res.status(200).send({message:'Product added to cart'}) : res.status(500).send({err})
})

module.exports = router