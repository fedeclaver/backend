const express = require("express");
const { Router } = express;
const router = new Router();
const productoController = require("../controllers/productoController");
const { authorization} = require("../utils/jwt.js");

//api/productos
router.post("/agregar", productoController.crearProducto);

router.get("/productos", authorization, productoController.obtenerProductos);

router.put(
  "/productos/actualizar/:id",
  
  productoController.actualizarProductos
);
router.get(
  "/productos/actualizar/:id",
  
  productoController.editarProductos
);
router.get(
  "/productos/:id",
  
  productoController.obtenerProducto
);
router.delete(
  "productos/borrar/:id",
  
  productoController.eliminarProducto
);
module.exports = router;
