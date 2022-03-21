const mensajesDao = require("../daos/mensajes/index");
// logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');


module.exports = (io, socket) => {
    

    try {
        (async () => {
            console.log('Nuevo cliente conectado!');
           let resultado = await mensajesDao.getAll()
            socket.emit('mensaje',resultado );
        })();
        socket.on('nuevoMensaje', (mensaje) => {
            mensaje.fyh = new Date().toLocaleString()
            let id = mensajesDao.save(mensaje);    
            if (id) {
                io.sockets.emit('mensaje', mensajesDao.getAll());
                }    
            }) 
       
        socket.on('deleteMensajes', async (data) => {
            let id = await mensajesDao.deleteAll();
            if (id) {
            io.sockets.emit('mensaje', id);          
            }
            
        });

    } catch (error) {
        socket.emit('error', { error: error.message })
    }

}