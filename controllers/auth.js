const transporterGmail = require('../email/gmail');
const dayjs = require('dayjs')
const config = require('../config/config');

const inicio = (req, res, next) => {
    res.render('index', { message: '' });
};

const getUser = (req, res,next) => {
    try {
        if (req.isAuthenticated()) {
            return res.json(req.user ?? res.render('index', { title: 'login', layout: false }))
            return 
        }
    } catch (error) {
        loggerWarn.warn(error.message);
    }
}


const logIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Usuario logueado");
        const loggedUsername = req.session.user;
        console.log(loggedUsername)
       
        return res.render('index', { title: 'login', layout: false })
        
    } else {
        console.log('Usuario no logueado')
       
        res.render('login', { title: 'login', layout: false })
        return
    }
}

const logOut = (req,res,next) => {
    try {
        console.log('Ingresó a Logout');
          // creamos el usuario
          const usuario = req.session.passport.user.usuario ?? '';
             transporterGmail.sendMail({
            from: config.gmail.user,
            to:  config.gmail.admin,
            subject: `${usuario}, logged out` + dayjs().format('[(]DD/MM/YYYY hh[:]mm[:]ss[)]')
           
        });
      
        req.logout();
        res.render('logout', { username: usuario });
    } catch (error) {
        console.log(error)
    }
}

const signUp = (req,res,next) =>{
    res.render('partials/signUp')
}




module.exports = {logIn,logOut,signUp,inicio,getUser};