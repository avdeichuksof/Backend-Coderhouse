const express = require('express')
const {Router} = express
const router = new Router()

const {getProductById, getProducts, addProduct, updateProduct, deleteProduct} = require('../dao/mongoManager/productsController')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router