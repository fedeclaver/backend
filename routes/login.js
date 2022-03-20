const { Router } = require('express');
const router = Router();
const passport = require('../auth/passport');
const upload = require('../middleware/multer');
const {logIn, logOut, signUp,getUser} = require('../controllers/auth')



//login
router.post('/login', passport.authenticate('login',
    {
        successRedirect: '/productos',
        failureRedirect: '/failLogin'
        
    }
));
router.get('/login', logIn)

//signup
router.post('/signup', upload.single('foto'), passport.authenticate('signup',
    {
        failureRedirect: '/failSignup', 
        successRedirect: '/productos'
    }
));

router.get('/signup', signUp)
//getUser imagen
router.get('/getUser', getUser)


//logout

router.get('/logout', logOut)



module.exports = router;