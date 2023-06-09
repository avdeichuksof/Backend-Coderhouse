const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const http = require('http')

const PORT = 8080 || process.env.PORT
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Conexión a Mongo
const db = require('./dao/mongoManager/db')
const DB = new db('mongodb+srv://savdeichuk:KCQc4E3Hn13lmNdx@ecommerce.yjjbpjj.mongodb.net/ecommerce')

// models
const Product = require('./dao/models/productsModel')
const Message = require('./dao/models/messagesModel')

// dependencies
const ProductController = require('./dao/mongoManager/productsController')
const ChatController = require('./dao/mongoManager/chatController')

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
app.use('/realtimeproducts', RealTimeProductsRoute)
app.use('/api/products', ProductRoute)
app.use('/api/carts', CartRoute)
app.use('/chat', ChatRoute)
app.use('/', HomeRoute)

// sockets
io.on('connection', (socket) => {
    console.log('User connected')
    /* PRODUCTS */
    // mostramos productos
    socket.emit('products', ProductController.getProducts(Product))

    // agregar producto
    socket.on('newProduct', (data) => {
        ProductController.addProduct(data)
        io.sockets.emit('all-products', ProductController.getProducts(Product))
    })
    // borrar producto
    socket.on('deleteProduct', (data) => {
        ProductController.deleteProduct(data)
        io.sockets.emit('all-products', ProductController.getProducts(Product))
    })

    /* CHAT */
    socket.emit('chat', ChatController.getMessages(Message))
    socket.on('newMessage', (data) => {
        Message.create(data)
        io.sockets.emit('all-messages', ChatController.getMessages(Message))
    })
})


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    DB.connect()
})