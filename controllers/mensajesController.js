const mensajesDao = require("../daos/mensajes/index.js");

const parse_obj = (obj) => JSON.parse(JSON.stringify(obj));

// logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require("../utils/log4js");


// buscar Mensajes
const obtenerMensajes = () => {
  try {    
    return  mensajesDao.getAll();
  } catch (error) {
    console.log(error);
    return "Error obtener Mensajes";
  }
};
// Agrega un Mensaje
const CrearMensaje = async(mensaje) => {
  loggerTrace.trace("Ingreso a CrearMensaje");
  try {
    return await mensajesDao.save(mensaje);
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
};

// elimina un Mensaje
const eliminarMensajes = () => {
  loggerTrace.trace("Ingreso a CrearMensaje");
  try {
    return   mensajesDao.deleteAll();    
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
};
module.exports = { obtenerMensajes, CrearMensaje, eliminarMensajes };
