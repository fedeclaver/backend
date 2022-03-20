const ContenedorFirebase = require('../../contenedores/ContenedorFirebase.js')
class UsuariosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('usuarios')
    }
}


module.exports = UsuariosDaoFirebase;