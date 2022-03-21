const express = require("express");
const { Router } = express;
const router = new Router();
//const requireAuth = require("../middleware/acceso.js");
const carritoController = require("../controllers/carritoController");
const {checkAuthentication} = require('../middlewares/acceso');
const {esAdmin} = require('../middlewares/acceso');


router.post("/agregar", esAdmin,checkAuthentication, carritoController.crearCarrito);

router.get("/listar", esAdmin,checkAuthentication, carritoController.obtenerCarritos);

router.get("/listar/:id", esAdmin,checkAuthentication, carritoController.obtenerCarrito);

router.get("/agregarProducto/:idCarrito/:id_prod",   checkAuthentication, esAdmin,  carritoController.agregarProducto);

router.get("/eliminarProducto/:idCarrito/:id_prod",checkAuthentication, esAdmin,checkAuthentication, carritoController.eliminarProducto);

router.delete("/borrar/:id",esAdmin,checkAuthentication, carritoController.eliminarCarrito);



module.exports = router;
