const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['artist', 'cinema', 'classic', 'flowers', 'geometric', 'hobbies', 'oneline', 'realista', 'varios']
    }
})

const Product = mongoose.model('product', ProductSchema)
module.exports = Product