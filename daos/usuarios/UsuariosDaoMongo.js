const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");

class UsuariosDaoMongo extends ContenedorMongo {
  constructor() {
    super("usuarios", {
      usuario: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      direccion: {
        type: String,
        required: true,
      },
      edad: {
        type: String,
        required: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      // foto: {
      //   type: String,
      //   required: true,
      // },

      date_registered: {
        type: Date,
        default: Date.now,
      },
    });
  }
}

module.exports = UsuariosDaoMongo;
