/* ENTREGABLE 2 - MANEJO DE ARCHIVOS */

let nextId = 1
const fs = require('fs')

class ProductManager {
    constructor(path, id, title, description, price, thumbnail, code, stock){
        this.path = path
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

    async addProducts(newProduct, id) {
        try{
            // primero leo el archivo
            let readProducts = await fs.promises.readFile(this.path, 'utf-8')
            // creo un array con la info leída
            let array = JSON.parse(readProducts)

            const productId = array.find(product => product.code === newProduct.code)
            if(productId){
                console.log('ERROR: Ya existe un producto con este código')
            }else{
                const productId = () => {
                    array.find(product => product.id !== 0) ? id++ : id = 1
                    return id
                }

                const product = {...newProduct, id:productId()}
                // pusheo el producto nuevo
                array.push(product)
                // escribo el producto en el array sin que sobreescriba los productos anteriores
                let agregar = await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2), 'utf-8')
                console.log('Producto agregado correctamente')
            }
        }catch(err){
            console.log('Error al agregar producto, puede que el producto ya exista')
        }
    }

    async getProducts(){
        try{
            // leo el .json y devuelvo lo que encontró
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(data)
            console.log(products)
        }catch(err){
            console.log('Error al leer el archivo')
        }
    }

    async getProductById(id) {
        let readProducts = await fs.promises.readFile(this.path, 'utf-8')
        let array = JSON.parse(readProducts)

        const productById = array.find(product => product.id === id)

        productById ? console.log('Producto encontrado:\n', productById) : console.log('ERROR no se encontró un producto con ese ID')
    }

    async updateProduct(id, modifiedProd){
            let readProducts = await fs.promises.readFile(this.path, 'utf-8')
            let array = JSON.parse(readProducts)

            const productById = array.find(product => product.id === id)

            if(productById){
                modifiedProd = [{...modifiedProd, id}]
                fs.writeFile(this.path, JSON.stringify(modifiedProd, null, 2), 'utf-8', (err) => {
                    if(err){
                        console.log('Error al modificar el producto')
                    }else{
                        console.log('Producto modificado exitosamente')
                    }
                })
            }else{
                console.log('No se ha encontrado el producto a modificar')
            }
    }

    async deleteProduct(id){
            let readProducts = await fs.promises.readFile(this.path, 'utf-8')
            let array = JSON.parse(readProducts)

            const productById = array.find(product => product.id === id)
            if(!readProducts){
                console.log('ERROR: no se pudo Leer el archivo')
            }else if(!productById){
                console.log('ERROR: el producto no existe')
            }
            else{
                let deletedProduct = array.filter(product => {
                    return product.id != id
                })

                await fs.promises.writeFile(this.path, JSON.stringify(deletedProduct, null, 2), 'utf-8')
                console.log('Producto eliminado exitosamente')
            }
    }
}

/* TESTING */
let product1 = new ProductManager('./products.json')

// se llama a getProducts() y devuelve []
product1.getProducts()

// llamo a addProducts()
product1.addProducts({title:'producto prueba', description:'esto es un producto prueba', price: 200, thumbnail:'sin imagen', code:'abc123', stock: 25})

// vuelvo a llamar a getProducts
product1.getProducts()

// llamo a getProductById con un Id existente
product1.getProductById(1)

// llamo a getProductById con un Id inexistente
product1.getProductById(2)

// llamo a updateProduct() 
product1.updateProduct(1, {title:'producto modificado', description:'esto es un producto modificado', price:200, thumbnail:'sin imagen', code:'abc123', stock:'10'})

// llamo a deleteProduct()
product1.deleteProduct(1)

// llamo a deleteProduct() con un producto inexistente 
product1.deleteProduct(2)