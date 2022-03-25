const express = require('express');
const router = express.Router();
const productosRouter = require('./productos');
const carritosRouter = require('./carritos');
const auth = require('./auth');
const compraRouter = require('./compra');
const routesViews = require("./views");


router.use('/',routesViews)
router.use('/api',  auth,productosRouter,carritosRouter)







module.exports = router;
