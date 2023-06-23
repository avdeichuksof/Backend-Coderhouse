const express = require('express')
const {Router} = express
const router = new Router()
const ProductController = require('../dao/mongoManagers/productController')
const productManager = new ProductController()
const Product = require('../dao/models/productModel')


router.get('/', async(req, res) => {

    const filter = req.query.filter
    const limit = req.query.limit
    const page = req.query.page
    const sort = req.query.sort

    try{
        const data = await productManager.getProducts(filter, limit, page, sort)

        return res.status(200).json({
            status: 'success',
            payload: data.docs,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.hasPrevPage ? `http://localhost:8080/api/products/?page=${data.prevPage}` : null,
            nextLink: data.hasNestPage ? `http://localhost:8080/api/products/?page=${data.nextPage}` : null,
        })
    }catch(err){
        console.log(err)
    }
    /* await productManager.getProducts()
        .then(products => {
            if(products.length) return res.status(200).send({data: products})
            return res.status(204).send({message: 'Data not found'})
        })
        .catch(err => res.status(500).send({err})) */
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const product = productManager.getProductById(id)

    if(product) return res.status(200).send({data: product})
    return res.status(204).send({message: 'Product not found'})
})

router.post('/', (req, res) => {
    const newProd = req.body
    const product = new Product(newProd)
    productManager.addProduct(product)
        .then(product => {
            res.status(201).send({message: "Product created successfully", data: product})
        })
        .catch(err => res.status(500).send({err}))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const newData = req.body
    productManager.updateProduct(id, newData)
        .then(product => {
            res.status(201).send({message: 'Product updated successfully', data: product})
        })
        .catch(err => res.status(500).send({err}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const product = productManager.deleteProduct(id)
    if(product) return res.status(200).send({message: 'Product deleted successfully', data: product})
    return res.status(204).send({message: 'Error deleting product'})
})

module.exports = router