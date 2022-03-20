"use strict";

var express = require("express");

var Router = express.Router;
var router = new Router();

var _require = require("../middleware/acceso"),
    checkAuthentication = _require.checkAuthentication;

var viewsController = require("../controllers/viewsControllers");
/*Vistas de chat */


router.get("/chat", checkAuthentication, viewsController.vistaMensajes);
router.get("/agregar", checkAuthentication, viewsController.vistaProductos); //redirect al login

router.get("/", viewsController.vistaHome);
router.get("/failLogin", viewsController.failLogin);
router.get("/signUp", viewsController.signUp);
router.get("/signUpError", viewsController.signUpError);
module.exports = router;