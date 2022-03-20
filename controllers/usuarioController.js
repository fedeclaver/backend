const bcrypt = require("bcrypt");
const usuariosDao = require("../daos/usuarios/index");
const { loggerWarn, loggerTrace, loggerDefault, loggerError } = require("../utils/log4js");

const login = async (username, password, done) => {
  loggerTrace.trace("Ingreso a login usuario");

  const user = await usuariosDao.getById({ usuario: username });

  // si no existe
  if (!user.usuario) {
    loggerWarn.warn("Usuario no existe!");
    return done(null, false, { msg: "Usuario no existe!" });
  }

  // usuario existe pero esta mal la contraseña
  if (!isValidPassword(user.password, password)) {
    loggerWarn.warn("Password incorrecto!");
    return done(null, false, { msg: "Password incorrecto!" });
  }

  // Si todo OK
  return done(null, user);
};

// validar password
const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};

// hashear pass
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = { login };
