const express = require("express");
const { Router } = express;
const router = new Router();
const comprasController = require("../controllers/comprasController");
const {checkAuthentication} = require('../middlewares/acceso');
const {esAdmin} = require('../middlewares/acceso');



router.get("/agregar/:id", esAdmin,checkAuthentication,  comprasController.crearCompra);

router.get("/listar", esAdmin,checkAuthentication, comprasController.obtenerCompras);

router.get("/listar/:id", esAdmin,checkAuthentication, comprasController.obtenerCompra);


module.exports = router;
