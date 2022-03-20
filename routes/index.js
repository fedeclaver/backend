const express = require('express');


const router = express.Router();


const productosRouter = require('./productos');
const carritosRouter = require('./carritos');
const loginRouter = require('./login');
const compraRouter = require('./compra');
const routesViews = require("./views");
router.use('/auth', loginRouter)
router.use("/productos", productosRouter);
router.use("/compra", compraRouter);
router.use("/carritos", carritosRouter);
router.use("/", routesViews);




module.exports = router;
