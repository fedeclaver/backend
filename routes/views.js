const express = require("express");
const { Router } = express;
const router = new Router();


const { authorization} = require("../utils/jwt.js");
const viewsController = require("../controllers/viewsControllers");

/*Vistas de chat */
//router.get("/chat",  viewsController.vistaMensajes);
//router.get("/agregar",  viewsController.vistaProductos);


router.get("/auth", authorization);
router.get("/", viewsController.vistaHome);


//redirect al login
router.get("/productos", viewsController.vistaProductos);
router.get("/login", viewsController.vistaLogin);
router.get("/failLogin", viewsController.vistafailLogin);
router.get("/signUp", viewsController.vistaSignUp);
router.get("/signUpError", viewsController.vistaSignUpError);
router.get("/carrito", viewsController.vistaCarrito);
module.exports = router;
