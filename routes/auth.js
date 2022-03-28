const express = require("express");
const { Router } = express;
const router = new Router();



const { logIn, logOut,  signUp} = require("../controllers/auth");


router.post('/login',logIn);
router.post('/signup',signUp);

router.get("/logOut", logOut);




module.exports = router;
