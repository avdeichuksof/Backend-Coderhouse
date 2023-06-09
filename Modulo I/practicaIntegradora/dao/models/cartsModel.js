const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'users',
        unique: true,
        required: true
    },
    products: {
        id: {
            type: String,
            unique: true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }
})

const Cart = mongoose.model('cart', CartSchema)
module.exports = Cart