const Cart = require('../models/cartsModel')

class CartController{
    constructor(path){
        this.path = path
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
    
    deleteCart(id){
        const cartFound = this.getCartById(id)
        if(cartFound){
            return cartFound.deleteOne()
        }else{
            console.log('Cart not found')
        }
    }
    addToCart = async (cartId, prodId) => {
        try{
            let add = await this.getCartById(cartId)
            add.products.push({product: prodId})
    
            await Cart.updateOne({_id: cartId}, add)
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = CartController
