const express = require("express");
const { Router } = express;
const router = new Router();

const { checkAuthentication } = require("../middlewares/acceso");

const viewsController = require("../controllers/viewsControllers");

/*Vistas de chat */
router.get("/chat",  viewsController.vistaMensajes);
router.get("/agregar",  viewsController.vistaProductos);
//redirect al login
router.get("/", viewsController.vistaHome);
router.get("/login", viewsController.vistaLogin);
router.get("/failLogin", viewsController.vistafailLogin);
router.get("/signUp", viewsController.vistaSignUp);
router.get("/signUpError", viewsController.vistaSignUpError);
module.exports = router;
