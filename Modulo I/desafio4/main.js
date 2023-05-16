// create server
const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT

// views engine require
const handlebars = require('express-handlebars')

// http import
const http = require('http')
const server = http.createServer(app)

// socket import
const {Server} = require('socket.io')
const io = new Server(server)

// routes
const realTimeProductsRouter = require('./routes/realTimeProducts_routes')
const productsRouter = require('./routes/index_routes')

// public
app.use(express.static(__dirname  + '/public'))

// acceso a productos
const ProductManager = require('./managers/productManager')
const prodManager = new ProductManager('./public/products.json')

// data
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/', productsRouter)
app.use('/realtimeproducts', realTimeProductsRouter)


// sockets
io.on('connection', (socket) => {
    console.log('User connected')
    socket.emit('products', prodManager.getProducts())

    socket.on('newProduct', (data) => {
        prodManager.addProduct(data)
        io.sockets.emit('all-products', prodManager.getProducts())
    })
    socket.on('deleteProduct', (data) => {
        prodManager.deleteProduct(data)
        io.sockets.emit('all-products', prodManager.getProducts())
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})