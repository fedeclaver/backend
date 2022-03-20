"use strict";

var mensajesController = require("../controllers/mensajesController"); // logger


var _require = require("../utils/log4js"),
    loggerTrace = _require.loggerTrace,
    loggerInfo = _require.loggerInfo,
    loggerWarn = _require.loggerWarn,
    loggerError = _require.loggerError;

module.exports = function (io, socket) {
  try {
    (function _callee() {
      var resultado;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(mensajesController.getAll());

            case 2:
              resultado = _context.sent;
              socket.emit("mensaje", resultado);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    })();

    socket.on("nuevoMensaje", function (mensaje) {
      mensaje.fyh = new Date().toLocaleString();
      var id = mensajesController.CrearMensaje(mensaje);

      if (id) {
        io.sockets.emit("mensaje", mensajesController.getAll());
      }
    });
    socket.on("deleteMensajes", function _callee2(data) {
      var id;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(mensajesController.eliminarMensajes());

            case 2:
              id = _context2.sent;

              if (id) {
                io.sockets.emit("mensaje", id);
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  } catch (error) {
    socket.emit("error", {
      error: error.message
    });
  }
};