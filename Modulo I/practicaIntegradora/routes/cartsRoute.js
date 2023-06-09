const express = require('express')
const {Router} = express
const router = new Router()

const {getCartById, addCart, addToCart} = require('../dao/mongoManager/cartsController')

router.post('/', addCart)
router.get('/:cid', getCartById)
router.post('/:cid/product/:pid', addToCart)

module.exports = router