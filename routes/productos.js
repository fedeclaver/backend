const express = require("express");
const { Router } = express;
const router = new Router();
const productoController = require("../controllers/productoController");
const { authorization} = require("../utils/jwt.js");

//api/productos
router.post("/productos/agregar", authorization,productoController.crearProducto);

router.get("/productos", authorization, productoController.obtenerProductos);

router.put(
  "/productos/actualizar/:id",authorization, productoController.actualizarProductos
);
router.get("/productos/actualizar/:id",authorization,productoController.editarProductos
);
router.get(
  "/productos/:id",authorization,productoController.obtenerProducto
);
router.delete(
  "/productos/borrar/:id",authorization,productoController.eliminarProducto
);
module.exports = router;
