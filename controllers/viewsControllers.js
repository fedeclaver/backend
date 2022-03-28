const { loggerWarn, loggerTrace, loggerDefault, loggerError } = require("../utils/log4js");

const vistafailLogin = async (req, res) => {
  try {
    return res.render("failLogin");
  } catch (error) {
    loggerError.error(error);
  }
};

const vistaProductos = async (req, res) => {
  loggerTrace.trace("Ingreso a vistaProductos"); try {



    res.render("productos", { layout: "index" });
  } catch (error) {
    loggerError.error(error);
    res.status(500).send("Hubo un error");
  }
};

/*Vistas de chat */
const vistaMensajes = async (req, res) => {
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
  loggerTrace.trace("Ingreso a vista Home");
  try {
    return res.render("main");
  } catch (error) {
    loggerError.error(error);
    res.status(500).send("Hubo un error");
  }
};
/*Vistas de signUp */
const vistaSignUp = (req, res) => {
  loggerTrace.trace("Ingreso a vista signUp");
  return res.render("signUp");
};
/*Vistas de error en signUp */
const vistaSignUpError = (req, res) => {
  loggerTrace.trace("Ingreso a vista failSignUp");
  return res.render("failSignUp");
};
/*Vistas de login */
const vistaLogin = (req, res) => {
  loggerTrace.trace("Ingreso a vista Login");
  return res.render("login");
};
/*vistaCarrito*/
const vistaCarrito = (req, res) => {
  loggerTrace.trace("Ingreso a vista Carrito");
  res.render("carrito", { layout: "index" });
};

module.exports = { vistaMensajes, vistaProductos, vistaHome, vistafailLogin, vistaSignUp, vistaSignUpError ,vistaLogin,vistaCarrito};
