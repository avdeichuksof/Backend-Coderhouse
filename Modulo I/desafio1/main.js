/* DESAFIO ENTREGABLE - CLASES CON ECMAScript y ECMAScript avanzado */

let nextId = 1
let products = []

class ProductManager{
    constructor(title, description, price, thumbnail, code, stock, id){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = id
    }

    

    addProduct(title, description, price, thumbnail, code, stock, id) {
        const productId = products.find(product => product.code === code)

        if(productId){
            console.error("ERROR: Ya existe un producto con este código")
        }
        else if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error("ERROR: ingrese la información en todos los campos")
        }
        else{
            const productId = () => {
                if(products.find(product => product.id !== 0)){
                    id++
                }else{
                    id = 1
                }
                return id
            }

            const product = new ProductManager(title, description, price, thumbnail, code, stock, productId())

            products.push(product)
            console.log("Producto agregado")
        }
    }

    getProducts() {
        return products
    }
    
    getProductsById(id) {
        const productById = products.find(product => product.id === id)
        productById ? console.log(productById) : console.log("ERROR: ID not found")
    }
    
}
/* TESTING */
let product1 = new ProductManager('')

// llamo a getProducts() y devuelve []
console.log(product1.getProducts())

// llamo a addProduct()
console.log(product1.addProduct("producto prueba", "este es un producto prueba", 200, "no image", "abc123", 25))

// llamo nuevamente a getProducts()
console.log(product1.getProducts())

// llamo a addProduct() con la misma info
console.log(product1.addProduct("producto prueba", "este es un producto prueba", 200, "no image", "abc123", 25))

// llamo a getProductById con un Id existente
console.log(product1.getProductsById(1))

// llamo a getProductById con un Id inexistente
console.log(product1.getProductsById(2))