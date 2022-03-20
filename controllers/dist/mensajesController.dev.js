"use strict";

var mensajesDao = require("../daos/mensajes/index.js");

var _require = require("../utils/log4js"),
    loggerTrace = _require.loggerTrace,
    loggerInfo = _require.loggerInfo,
    loggerWarn = _require.loggerWarn,
    loggerError = _require.loggerError;

var parse_obj = function parse_obj(obj) {
  return JSON.parse(JSON.stringify(obj));
}; // buscar Mensajes


var obtenerMensajes = function obtenerMensajes() {
  try {
    var mensajes = mensajesDao.getAll();
    return res.json(mensajes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtener Mensajes");
  }
}; // Agrega un Mensaje


var CrearMensaje = function CrearMensaje(mensaje) {
  loggerTrace.trace("Ingreso a CrearMensaje");

  try {
    var mensajes = mensajesDao.guardar(mensaje); //console.log(mensaje)

    return res.json(mensajes);
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
}; // elimina un Mensaje


var eliminarMensajes = function eliminarMensajes() {
  loggerTrace.trace("Ingreso a CrearMensaje");

  try {
    var mensajes = mensajesDao.deleteAll(); //console.log(mensaje)

    return res.json(mensajes);
  } catch (error) {
    console.log("Error en guardar mensaje", error);
  }
};

module.exports = {
  obtenerMensajes: obtenerMensajes,
  CrearMensaje: CrearMensaje,
  eliminarMensajes: eliminarMensajes
};