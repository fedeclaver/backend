const express = require("express");
const { Router } = express;
const router = new Router();
//const requireAuth = require("../middleware/acceso.js");
const carritoController = require("../controllers/carritoController");

const { authorization} = require("../utils/jwt.js");



router.post("/carrito/agregar", authorization, carritoController.crearCarrito);

router.get("/carrito/", authorization, carritoController.obtenerCarritos);

router.get("/carrito/:id", authorization, carritoController.obtenerCarrito);

router.get("/carrito/agregar/:idCarrito/:id_prod",authorization,carritoController.agregarProducto);

router.get("/carrito/eliminar/:idCarrito/:id_prod",authorization, carritoController.eliminarProducto);

router.delete("/carrito/:id",authorization, carritoController.eliminarCarrito);



module.exports = router;
