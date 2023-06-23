const Cart = require('../models/cartModel')

class CartController{
    constructor(path){
        this.path = path
    }

    async getCarts(req, res){
        try{
            return (
                await Cart.find({})
            )
        }catch(err){
            console.log(err)
        }
    }

    async getCartById(id){
        try{
            const cartFound = await Cart.findOne({_id: id})
            console.log(cartFound)
            if(cartFound){
                return cartFound
            }else{
                console.log({message: 'Cart not found'})
                return null
            }
        }catch(err){
            console.log(err)
        }
    }
    
    addCart(){
        let cart = new Cart()
        return cart.save()
    }
    
    addToCart = async (cartId, prodId) => {
        try{
            let cart = await this.getCartById(cartId)
            
            const productFound = cart.products.find(product => product._id === prodId)

            if(productFound){
                cart.products[productFound].quantity = quantity++
                await cart.save()
                return ({message:'Product added to cart'}, productFound)
            }else{
                cart.products.push({product: prodId, quantity: 1})
                await cart.save()
                return ({message:'Product added to cart'}, productFound)
            }
        }catch(err){
            console.log(err)
        }
    }

    updateQuantity = async (cartId, prodId, newQuantity) => {
        try{
            const cartFound = await this.getCartById(cartId)

            if(cartFound){
                const productFound = cartFound.products.find((product) => product.product.toString() === prodId)

                if(productFound){
                    productFound.quantity = newQuantity
                    await cartFound.save()
                    return productFound
                }else{
                    console.log('Product not found')
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    deleteFromCart = async (cartId, prodId) => {
        try{
            const cartFound = await this.getCartById(cartId)
            if(cartFound){
                const productFound = cartFound.products.findIndex(product => product._id === prodId)
                
                if(productFound){
                    cartFound.products.splice(productFound, 1)
                    await cartFound.save()
                    return cartFound
                }else{
                    return false
                }
            }else{
                console.log('Cart not found')
            }
        }catch(err){
            console.log(err)
        }
    }

    emptyCart = async (cartId) => {
        try{
            const cartFound = await this.getCartById(cartId)
            if(cartFound){
                cartFound.products = []
                await cartFound.save()
                return cartFound
            }else{
                return false
            }
        }catch(err){
            console.log(err)
        }
    }

}


module.exports = CartController