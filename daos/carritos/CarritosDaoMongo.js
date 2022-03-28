

const ContenedorMongo = require('../../contenedores/ContenedorMongo.js')

class CarritosDaoMongo extends ContenedorMongo {

    constructor() {
        super('carritos', {
            id: { type: String, required: true },           
            timestamp: {type: String, required: true },
            productos:[{
                id: { type: Number, required: true },               
                nombre: { type: String, required: true }, 
                precio: { type: Number, required: true }, 
                cantidad:{type: Number, required: true }              

            }  
        ],
        direccion: { type: String, require: true },
        total: { type: Number, required: true, default: 0 },
        timestamp: { type: String, require: true },
        })
    }

   
}

module.exports = CarritosDaoMongo;
