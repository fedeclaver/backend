const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");

class MensajesDaoMongo extends ContenedorMongo {
  constructor() {
    super('mensajes', {
        id: { type: Number, required: true },
        author: {   
          email: { type: String, required: true },    
           nombre: { type: String, required: true },
           apellido: { type: String, required: true },
           edad: { type: Number, required: true }, 
           alias: { type: String, required: true }, 
           avatar: { type: String, required: true }
        },
        fyh: { type: String, required: true },
        text: { type: String, required: true }
        
    })
}
}



module.exports = MensajesDaoMongo;
