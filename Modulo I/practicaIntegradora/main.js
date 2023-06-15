// create server
const express = require('express')
const app = express()
const PORT = 8080 || process.env.PORT

// views engine require
const handlebars = require('express-handlebars')

// http y socket import
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

// Conexión a Mongo
const db = require('./dao/mongoManager/db')
const DB = new db('mongodb+srv://savdeichuk:KCQc4E3Hn13lmNdx@ecommerce.yjjbpjj.mongodb.net/ecommerce')

// models
const Message = require('./dao/models/messagesModel')
const Product = require('./dao/models/productsModel')

// dependencies
const ProductController = require('./dao/mongoManager/productsController')

// routes
const RealTimeProductsRoute = require('./routes/realTimeProductsRoutes')
const ProductRoute = require('./routes/productsRoute')
const ChatRoute = require('./routes/chatRoute')
const CartRoute = require('./routes/cartsRoute')
const HomeRoute = require('./routes/indexRoute')

// data y public
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname  + '/public'))

// views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// routes
app.use('/', HomeRoute)
app.use('/chat', ChatRoute)
app.use('/api/carts', CartRoute)
app.use('/api/products', ProductRoute)
app.use('/realtimeproducts', RealTimeProductsRoute)

// sockets
io.on('connection', async (socket) => {
    console.log('User connected')
    //PRODUCTS
    // mostramos productos
    const products = await ProductController.getProducts()
    socket.emit('products', products)

    // agregar producto
    socket.on('newProduct', async (data) => {
        const newProduct = new Product(data)
        await newProduct.save(data)
        io.sockets.emit('all-products', products)
    })
    // borrar producto
    socket.on('deleteProduct', (data) => {
        ProductController.deleteProduct(data)
        io.sockets.emit('all-products', products)
    })

    // CHAT
    socket.emit('all-messages', await Message.find())
    socket.on('newMessage', async (data) => {
        const message = new Message(data)
        await message.save(data)
        io.sockets.emit('all-messages', message)
    })
})


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    DB.connect()
})
