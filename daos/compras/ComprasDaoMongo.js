

const ContenedorMongo = require('../../contenedores/ContenedorMongo.js')

class ComprasDaoMongo extends ContenedorMongo {

    constructor() {
        super('compras',  
                              
            ({
                
                id: {
                    type: Number,
                    required: true,
                },
                user: {
                    type: String,
                    required: true,
                },
                productos: [
                    {
                        id: {
                            type: String,
                            required: true,
                        },
                        nombre: {
                            type: String,
                            required: true,
                        },
                        cantidad: {
                            type: Number,
                            required: true,
                        },
                        precio: {
                            type: Number,
                            required: true,
                        },
                    },
                ],
                estado: {
                    type: String,
                    required: true,
                },               
                timestamp: {
                    type: String,
                    required: true,
                },
                direccion: { type: String, require: true },
                total: {
                    type: Number,
                    required: true,
                },
            })
  
        )}
}    

module.exports = ComprasDaoMongo;
