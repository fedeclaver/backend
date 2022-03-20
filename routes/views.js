const express = require("express");
const { Router } = express;
const router = new Router();

const { checkAuthentication } = require("../middleware/acceso");

const viewsController = require("../controllers/viewsControllers");

/*Vistas de chat */
router.get("/chat", checkAuthentication, viewsController.vistaMensajes);
router.get("/agregar", checkAuthentication, viewsController.vistaProductos);
//redirect al login
router.get("/", viewsController.vistaHome);
router.get("/failLogin", viewsController.failLogin);
router.get("/signUp", viewsController.signUp);
router.get("/signUpError", viewsController.signUpError);
module.exports = router;
