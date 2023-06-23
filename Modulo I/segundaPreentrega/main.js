// server
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

// mongo y dependencies
const db = require('./dao/mongoManagers/db')
const Product = require('./dao/models/productModel')
const Message = require('./dao/models/messageModel')
const ProductManager = require('./dao/mongoManagers/productController')
const PM = new ProductManager()

// routes
const chatRoute = require('./routes/chatRoute')
const cartsRoute = require('./routes/cartsRoute')
const indexRoute = require('./routes/indexRoute')
const productsRoute = require('./routes/productsRoute')
const realTimeRoute = require('./routes/realTimeRoute')

// data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// views
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use('/', indexRoute)
app.use('/chat', chatRoute)
app.use('/api/carts', cartsRoute)
app.use('/api/products', productsRoute)
app.use('/realtimeproducts', realTimeRoute)


// sockets
io.on('connection', async (socket) => {
    console.log('User connected')

    // PRODUCTS
    // mostramos todos los productos
    const products = await PM.getProducts()
    socket.emit('products', products)

    socket.on('newProduct', async (data) => {
        console.log(data)
        const newProduct = new Product(data)
        PM.addProduct(newProduct)
        const products = await PM.getProducts()
        io.sockets.emit('all-products', products)
    })

    socket.on('deleteProduct', async (data) => {
        await PM.deleteProduct(data)
        const products = await PM.getProducts()
        io.sockets.emit('all-products', products)
    })

    // CHAT
    const messages = await Message.find()
    socket.on('newMessage', async (data) => {
        const message = new Message(data)
        await message.save(data)
        io.sockets.emit('all-messages', messages)
    })
})


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    db.connect()
})