const express = require("express");
const { Router } = express;
const router = new Router();

const upload = require("../middleware/multer");

const { logIn, logOut,  signUp} = require("../controllers/auth");


router.post('/login',logIn);
router.post('/signup',upload.single("foto"),signUp);

router.get("/logOut", logOut);




module.exports = router;
