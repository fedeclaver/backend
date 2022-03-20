"use strict";

var _require = require("../utils/log4js"),
    loggerWarn = _require.loggerWarn,
    loggerTrace = _require.loggerTrace,
    loggerDefault = _require.loggerDefault,
    loggerError = _require.loggerError;

var failLogin = function failLogin(req, res, next) {
  return regeneratorRuntime.async(function failLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            res.status(400).render("partial/failLogin");
          } catch (error) {
            loggerError.error(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var vistaProductos = function vistaProductos(req, res, next) {
  return regeneratorRuntime.async(function vistaProductos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loggerTrace.trace("Ingreso a vistaAgregarProductos");

          try {
            res.render("agregar", {
              layout: "index"
            });
          } catch (error) {
            loggerError.error(error);
            res.status(500).send("Hubo un error");
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/*Vistas de chat */


var vistaMensajes = function vistaMensajes(req, res, next) {
  return regeneratorRuntime.async(function vistaMensajes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          loggerTrace.trace("Ingreso a vistaMensajes");

          try {
            res.render("chat", {
              layout: "index"
            });
          } catch (error) {
            loggerError.error(error);
            res.status(500).send("Hubo un error");
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/*Vistas de login */


var vistaHome = function vistaHome(req, res) {
  return regeneratorRuntime.async(function vistaHome$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          loggerTrace.trace("Ingreso a vistalogin");
          _context4.prev = 1;
          return _context4.abrupt("return", res.render("login"));

        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4["catch"](1);
          loggerError.error(_context4.t0);
          res.status(500).send("Hubo un error");

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 5]]);
};
/*Vistas de signUp */


var signUp = function signUp(req, res, next) {
  loggerTrace.trace("Ingreso a vista signUp");
  return res.render("signUp");
};
/*Vistas de error en signUp */


var signUpError = function signUpError(req, res, next) {
  res.render("/signUpError");
};

module.exports = {
  vistaMensajes: vistaMensajes,
  vistaProductos: vistaProductos,
  vistaHome: vistaHome,
  failLogin: failLogin,
  signUp: signUp,
  signUpError: signUpError
};