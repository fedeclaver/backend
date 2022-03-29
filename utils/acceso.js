
const {admin} = require("../config/config");
 
const esAdmin = (req, res, next) => {
  if (req.user.nombre == admin) {
    return next();
  }
  return res.status(401).json({
    msg: "Acceso Denegado",
    descripcion: `error: -1 ,descripcion: ruta ${req.url} método ${req.method} no autorizada`,
  });
};



module.exports = {
esAdmin
}