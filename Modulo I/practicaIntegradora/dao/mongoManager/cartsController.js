const Cart = require('../models/cartsModel')

function getCartById(req, res){
    let {id} = req.params.cid
    Cart.findById(id)
        .then(cart => {
            res.status(201).send({cart: cart})
        })
        .catch(err => res.status(404).send({err}))
}

function addCart(req, res){
    let cart = new Cart(req.body)
    cart.save()
        .then(cart =>{
            res.status(201).send({message: 'Cart created successfully', cart: cart})
        })
        .catch(err => res.status(500).send({err}))
}

function deleteCart(req, res){
    let {id} = req.params.cid
    Cart.findByIdAndDelete(id)
        .then(cart =>{
            res.status(201).send({message: 'Cart deleted successfully', cart: cart})
        })
        .catch(err => res.status(500).send({err}))
}

function updatedCart(Model, id, newData){
    let updateData
    Model.updateOne({_id: id}, newData)
        .then(data => {
            updateData = this.getCartById(Model, id)
        })
        .catch(err => res.status(500).send({err}))
    return updateData
}

function addToCart(req,res){
    let {cartId} = req.params.cid
    let {prodId} = req.params.pid

    let cartFound = Cart.find(cartId)

    if(cartFound){
        let productFound = Cart.products.findById(prodId)
        productFound 
            ? productFound.quantity++
            : Cart.products = [...Cart.products, {product: prodId, quantity: 1}]
        let newCart = this.updatedCart(Cart, cartId, {products: Cart.products})
        return {cart: newCart, message: 'Product added to cart'}
    }else{
        return false
    }
}

module.exports = {getCartById, addCart, addToCart, updatedCart, deleteCart}