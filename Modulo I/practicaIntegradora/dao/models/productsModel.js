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

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
