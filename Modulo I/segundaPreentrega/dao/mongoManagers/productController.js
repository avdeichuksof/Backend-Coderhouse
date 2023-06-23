const Product = require('../models/productModel')

class ProductController{
    constructor(path){
        this.path = path
    }

    getProducts = async (filter, limit, page, sort) => {
        try{
            const options = {
                limit: limit || 6,
                page: page || 1,
                sort: sort|| {}
            }
            const query = {category: filter}
            const products = await Product.paginate(query, options)
            return products 
        }catch(err){
            console.log(err)
        }
    }
    
    getProductById(id) {
        try{
            const productFound = Product.findOne({_id: id})
            return productFound
        }catch(err){
            console.log(err, {message: 'Product not found'})
        }
    }
    
    addProduct(newProd) {
        try{
            let product = new Product(newProd)
            return product.save()
        }catch(err){
            console.log(err)
        }
    }
    
    updateProduct(id, newData) {
        const updateProduct = this.getProductById(id)
        if(updateProduct){
            return updateProduct.updateOne({_id: id}, {$set: newData})
        }else{
            console.log('Error updating product')
        }
    }
    
    deleteProduct = async (id) => {
        try{
            const deletedProd = await Product.deleteOne({_id: id})
            deletedProd ? console.log('Product deleted successfully') 
                        : console.log('Product not found')
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = ProductController