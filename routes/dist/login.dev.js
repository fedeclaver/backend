"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var passport = require("../auth/passport");

var upload = require("../middleware/multer");

var _require2 = require("../controllers/auth"),
    logIn = _require2.logIn,
    logOut = _require2.logOut,
    signUp = _require2.signUp,
    getUser = _require2.getUser; //login


router.post("/login", passport.authenticate("login", {
  successRedirect: "/productos",
  failureRedirect: "/failLogin"
}));
router.get("/login", logIn); //signup

router.post("/signup", upload.single("foto"), passport.authenticate("signup", {
  failureRedirect: "/failSignup",
  successRedirect: "/productos"
}));
router.get("/getUser", getUser); //logout

router.get("/logout", logOut);
module.exports = router;