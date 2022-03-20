const { loggerWarn } = require("../utils/log4js");
const { admin } = require('../config/config');

// middleware de authentication
const checkAuthentication = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            req.session.touch();
            next();
        } else {
            return res.render('login.hbs', { msj: 'No está autenticado.' })
           

        }
    } catch (error) {
        loggerWarn.warn(error);
    }
}





const esAdmin = (req, res, next) => {
    try {
        if (admin) {
            next();
        } else {
            loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no autorizada`);
            res.json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })
        }
    } catch (error) {
        loggerWarn.warn(error);
    }
}


module.exports =  {esAdmin,checkAuthentication};
