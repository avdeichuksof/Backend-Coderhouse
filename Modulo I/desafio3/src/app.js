/* ENTREGABLE 3 - Servidores con Express */

const express = require('express')

const ProductManager = require('./productManager')
let prodManager =  new ProductManager('./products.json')

const app = express()

app.get('/', (req, res) => {
    res.send('Entregable 3 - Servidores con Express')
})

app.get('/products', async (req, res) => {
    try{
        const products = await prodManager.getProducts()
        const limit = parseInt(req.query.limit)
        
        !limit ? res.send(products) : res.send(products.slice(0, limit))

    }catch(err){
        res.send('ERROR')
    }
})

app.get('/products/:pid', async (req, res) => {
    try{
        const id = parseInt(req.params.pid)
        const productFound = await prodManager.getProductById(id)

        !productFound ? res.send('ERROR: product ID not found') : res.send(productFound)
    }catch(err){
        res.send('ERROR')
    }
})


app.listen(8080, () => 
    console.log("Server running on port 8080")
)