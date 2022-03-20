  
  
  const {loggerWarn,loggerTrace,loggerDefault,loggerError} = require("../utils/log4js");

 

    const failLogin = async (req, res, next) => {
    try {
        res.status(400).render('partial/failLogin');
    } catch (error) {
        loggerError.error(error)
    }
}

  const vistaProductos = async (req, res, next) => {
    loggerTrace.trace("Ingreso a vistaAgregarProductos");
    try {
        res.render("agregar", { layout: "index" });
  
    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}

  /*Vistas de chat */
const vistaMensajes = async (req, res, next) => {
  loggerTrace.trace("Ingreso a vistaMensajes");
  try {
      res.render("chat", { layout: "index" });

  } catch (error) {
      loggerError.error(error);
      res.status(500).send('Hubo un error');
  }
}


    /*Vistas de login */
    const vistaHome= async (req, res) => {
      loggerTrace.trace("Ingreso a vistalogin");
      try {
        return res.render('login')
    
      } catch (error) {
          loggerError.error(error);
          res.status(500).send('Hubo un error');
      }
    }
  module.exports = {vistaMensajes,vistaProductos,vistaHome,failLogin}