const mensajesDao = require("../daos/mensajes/index.js");
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require("../utils/log4js");
const parse_obj = (obj) => JSON.parse(JSON.stringify(obj));

// buscar Mensajes
const obtenerMensajes = () => {
  try {
    let mensajes = mensajesDao.getAll();
    return res.json(mensajes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtener Mensajes");
  }
};
// Agrega un Mensaje
const CrearMensaje = (mensaje) => {
  loggerTrace.trace("Ingreso a CrearMensaje");
  try {
    let mensajes = mensajesDao.guardar(mensaje);
    //console.log(mensaje)

    return res.json(mensajes);
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
};

// elimina un Mensaje
const eliminarMensajes = () => {
  loggerTrace.trace("Ingreso a CrearMensaje");
  try {
    let mensajes = mensajesDao.deleteAll();
    //console.log(mensaje)

    return res.json(mensajes);
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
};
module.exports = { obtenerMensajes, CrearMensaje, eliminarMensajes };
