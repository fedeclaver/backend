const express = require("express");
const { Router } = express;
const router = new Router();
const productoController = require("../controllers/productoController");
const { authorization} = require("../utils/jwt.js");

//api/productos
router.post("/agregar", productoController.crearProducto);

router.get("/productos", authorization, productoController.obtenerProductos);

router.put(
  "/actualizar/:id",
  
  productoController.actualizarProductos
);
router.get(
  "/actualizar/:id",
  
  productoController.editarProductos
);
router.get(
  "/listar/:id",
  
  productoController.obtenerProducto
);
router.delete(
  "/borrar/:id",
  
  productoController.eliminarProducto
);
module.exports = router;
