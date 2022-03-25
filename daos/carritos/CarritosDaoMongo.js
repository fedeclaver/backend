

const ContenedorMongo = require('../../contenedores/ContenedorMongo.js')

class CarritosDaoMongo extends ContenedorMongo {

    constructor() {
        super('carritos', {
            id: { type: String, required: true },           
            timestamp: {type: String, required: true },
            productos:[{
                id: { type: Number, required: true },
                timestamp: { type: String, required: true },
                nombre: { type: String, required: true },
                descripcion: { type: String, required: true },
                codigo: { type: Number, required: true },
                foto: { type: String, required: true },
                precio: { type: Number, required: true }, 
                cantidad:{type: Number, required: true },
                stock: { type: Number, required: true }
            }]
        })
    }

   
}

module.exports = CarritosDaoMongo;
