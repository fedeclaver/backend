const express = require("express");
const { Router } = express;
const router = new Router();
const comprasController = require("../controllers/comprasController");
const { authorization} = require("../utils/jwt.js");




router.get("/compra/:id", authorization,  comprasController.crearCompra);

router.get("/compra/listar", authorization, comprasController.obtenerCompras);

router.get("/compra/listar/:id", authorization, comprasController.obtenerCompra);


module.exports = router;
