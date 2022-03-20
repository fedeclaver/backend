const express = require("express");
const { Router } = express;
const router = new Router();
const productoController = require("../controllers/productoController");
const {checkAuthentication} = require('../middleware/acceso');
const {esAdmin} = require('../middleware/acceso');
//api/productos
router.post("/agregar", checkAuthentication,esAdmin,productoController.crearProducto);
router.get("/agregar", checkAuthentication,esAdmin,productoController.agregarProducto);
router.get("/", checkAuthentication, productoController.obtenerProductos);
router.put(
  "/actualizar/:id",
  checkAuthentication,esAdmin,
  productoController.actualizarProductos
);
router.get(
  "/actualizar/:id",
  checkAuthentication,esAdmin,
  productoController.editarProductos
);
router.get(
  "/listar/:id",
  checkAuthentication,esAdmin,
  productoController.obtenerProducto
);
router.delete(
  "/borrar/:id",
  checkAuthentication,esAdmin,
  productoController.eliminarProducto
);
module.exports = router;
