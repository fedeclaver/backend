const { loggerWarn, loggerTrace, loggerDefault, loggerError } = require("../utils/log4js");

const vistafailLogin = async (req, res, next) => {
  try {
    return res.render("failLogin");
  } catch (error) {
    loggerError.error(error);
  }
};

const vistaProductos = async (req, res, next) => {
  loggerTrace.trace("Ingreso a vistaAgregarProductos");
  try {
    res.render("agregar", { layout: "index" });
  } catch (error) {
    loggerError.error(error);
    res.status(500).send("Hubo un error");
  }
};

/*Vistas de chat */
const vistaMensajes = async (req, res, next) => {
  loggerTrace.trace("Ingreso a vistaMensajes");
  try {
    res.render("chat", { layout: "index" });
  } catch (error) {
    loggerError.error(error);
    res.status(500).send("Hubo un error");
  }
};

/*Vistas de login */
const vistaHome = async (req, res) => {
  loggerTrace.trace("Ingreso a vistalogin");
  try {
    return res.render("productos");
  } catch (error) {
    loggerError.error(error);
    res.status(500).send("Hubo un error");
  }
};
/*Vistas de signUp */
const vistaSignUp = (req, res, next) => {
  loggerTrace.trace("Ingreso a vista signUp");
  return res.render("signUp");
};
/*Vistas de error en signUp */
const vistaSignUpError = (req, res, next) => {
  return res.render("/signUpError");
};
/*Vistas de login */
const vistaLogin = (req, res, next) => {
  return res.render("/login");
};


module.exports = { vistaMensajes, vistaProductos, vistaHome, vistafailLogin, vistaSignUp, vistaSignUpError ,vistaLogin};
