const express = require("express");
const { Router } = express;
const router = new Router();
const productoController = require("../controllers/productoController");
const { authorization} = require("../utils/jwt.js");
const { esAdmin} = require("../utils/acceso");
//api/productos
router.post("/productos/agregar", authorization,esAdmin,productoController.crearProducto);

router.get("/productos", authorization, productoController.obtenerProductos);

router.put(
  "/productos/actualizar/:id",authorization,esAdmin ,productoController.actualizarProductos
);

router.get(
  "/productos/:id",authorization,productoController.obtenerProducto
);
router.delete(
  "/productos/borrar/:id",authorization,esAdmin,productoController.eliminarProducto
);
module.exports = router;
