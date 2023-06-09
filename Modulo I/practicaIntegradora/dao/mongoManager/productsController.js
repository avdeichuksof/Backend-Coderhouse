const Product = require('../models/productsModel')

function getProducts(req, res) {
    try{
        const products = Product.find()
        if(products.lenght){
            res.status(200).send(products)
            return products
        }else{
            res.status(204).send({message: 'No content'})
        }
    }catch(err){
        return {message: 'Not found'}
    }
}

function getProductById(req, res) {
    let {id} = req.params.id
    Product.findById(id)
        .then(product => {
            res.status(201).send({product: product})
        })
        .catch(err => res.status(404).send({err}))
}

function addProduct(req, res) {
    let product = new Product(req.body)
    product.save()
        .then(product =>{
            res.status(201).send({message: 'Product created successfully', product: product})
        })
        .catch(err => res.status(500).send({err}))
}

function updateProduct(req, res) {
    let updateData
    Model.updateOne({_id: id}, newData)
        .then(data => {
            updateData = this.getProductById(Model, id)
        })
        .catch(err => res.status(500).send({err}))
    return updateData
}

function deleteProduct(Model, id) {
    id = req.params.id
    Model.findByIdAndDelete(id)
        .then(product =>{
            res.status(201).send({message: 'Product deleted successfully', product: product})
        })
        .catch(err => res.status(500).send({err}))
}

module.exports = {getProductById, getProducts, addProduct, updateProduct, deleteProduct}