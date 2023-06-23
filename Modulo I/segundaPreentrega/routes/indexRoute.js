const express = require('express')
const { Router } = express
const router = new Router()
const ProductController = require('../dao/mongoManagers/productController')
const productManager = new ProductController()

router.get('/', async (req, res) => {
    const {filter, limit, page, asc, desc} = req.query
    const data = await productManager.getProducts(filter, page, limit, asc, desc)

    let products = data.docs.map((product) => {
        return { title: product.title,
                _id: product._id,
                price: product.price,
                description: product.description, 
                thumbnail: product.thumbnail, 
                code: product.code, 
                stock: product.stock, 
                status: product.status, 
                category: product.category 
        }
    })

    const {docs, ...rest} = data
    let links = []

    for(let i = 1; i < rest.totalPages + 1; i++){
        links.push({label: i, href: 'http://localhost:8080/?page=' + i})
    }

    return res.status(200).render('index', {products, pagination: rest, links})
})

module.exports = router