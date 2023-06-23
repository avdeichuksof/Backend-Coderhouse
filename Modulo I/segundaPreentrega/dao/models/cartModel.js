const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }]
    }
})

CartSchema.pre('save', function(next){
    for(let i = 0; i < this.products.length; i++){
        const product = this.products[i].product
        
        if(!product._id){
            product._id = new mongoose.Types.ObjectId()
        }
    }
    next()
})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart