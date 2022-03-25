const express = require("express");
const { Router } = express;
const router = new Router();
const comprasController = require("../controllers/comprasController");
const { authorization} = require("../utils/jwt.js");




router.get("/agregar/:id", authorization,  comprasController.crearCompra);

router.get("/listar", authorization, comprasController.obtenerCompras);

router.get("/listar/:id", authorization, comprasController.obtenerCompra);


module.exports = router;
