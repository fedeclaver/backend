"use strict";

var bcrypt = require("bcrypt");

var usuariosDao = require("../daos/usuarios/index");

var _require = require("../utils/log4js"),
    loggerWarn = _require.loggerWarn,
    loggerTrace = _require.loggerTrace,
    loggerDefault = _require.loggerDefault,
    loggerError = _require.loggerError;

var login = function login(username, password, done) {
  var user;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          loggerTrace.trace("Ingreso a login usuario");
          _context.next = 3;
          return regeneratorRuntime.awrap(usuariosDao.getById({
            usuario: username
          }));

        case 3:
          user = _context.sent;

          if (user.usuario) {
            _context.next = 7;
            break;
          }

          loggerWarn.warn("Usuario no existe!");
          return _context.abrupt("return", done(null, false, {
            msg: "Usuario no existe!"
          }));

        case 7:
          if (isValidPassword(user.password, password)) {
            _context.next = 10;
            break;
          }

          loggerWarn.warn("Password incorrecto!");
          return _context.abrupt("return", done(null, false, {
            msg: "Password incorrecto!"
          }));

        case 10:
          return _context.abrupt("return", done(null, user));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}; // validar password


var isValidPassword = function isValidPassword(userPassword, password) {
  return bcrypt.compareSync(password, userPassword);
}; // hashear pass


var createHash = function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = {
  login: login
};