const transporterGmail = require("../email/gmail");
const usuariosDao = require("../daos/usuarios/index.js");
const dayjs = require("dayjs");
const config = require("../config/config");
const { generateAuthToken} = require("../utils/jwt.js");
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');
const bcrypt = require('bcrypt');
const parse_obj = obj => JSON.parse(JSON.stringify(obj))


// validar password
const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword)
}






const logIn = async (req, res) => {
  loggerTrace.trace("Ingreso a Login Usuario");
// chequeamos si el usuario existe en mongo
const user = await usuariosDao.getByName(req.body.username);

// si no existe
if (!user) {
    loggerWarn.warn('Usuario no existe!')
    res.status(404).json({ msg: 'Usuario no existe!' })  
}

// usuario existe pero esta mal la contraseña

if (!isValidPassword(user.password, req.body.password)) {
    loggerWarn.warn('Password incorrecto!')
     res.status(404).json({ msg: 'Password incorrecto!' })  
}
  loggerWarn.warn('Usuario loguin' + req.body.username)  
    const access_token = generateAuthToken(user)
 ;
    res.status(200).json({'user':(user.usuario), 'access_token' :(access_token) } );
   
  
};

const logOut = async (req, res) => {
  try {
    console.log("Ingresó a Logout");
    // creamos el usuario
    const usuario = req.session.passport.user.usuario ?? "";
    transporterGmail.sendMail({
      from: config.gmail.user,
      to: config.gmail.admin,
      subject:
        `${usuario}, logged out` +
        dayjs().format("[(]DD/MM/YYYY hh[:]mm[:]ss[)]"),
    });

    req.logout();
    return res.render("logout", { username: usuario });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    console.log("Ingresó a signUp");
    let username  = req.body.username;
    //valido el mail del usuario
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(username)) {
       return res.render("signUpResult", { msj: "Mail invalido" ,titulo : "sign Up Error"});
    }
    // buscar en mongo el usuario
    const usuario = await usuariosDao.getByName(username);

    if (usuario) {
      loggerWarn.warn("Usuario ya existe!");
      return res.render("signUpResult", { msj: 'Usuario ya existe',titulo : "sign Up Error" });
    }
     if (!req.file) {
       loggerWarn.warn("Faltó subir una foto de perfil");
       return res.render("signUpResult",{ msj: "Faltó subir una foto de perfil" ,titulo : "sign Up Error"});
     }
    // creamos el usuario
    const newUser = {
      usuario: req.body.username,
      password: createHash(req.body.password),
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono,
      foto: req.file.filename
    };
    const access_token = generateAuthToken(req.body.username);
    const creausuario = await usuariosDao.save(newUser);
    if (creausuario) {
      //aviso log con Gmail
      transporterGmail.sendMail(
        {
          from: config.gmail.user,
          to: config.gmail.admin,
          subject: "Nuevo Registro de Usuario",
          html: `
              <p>Email: ${newUser.usuario}</p>
              <p>Nombre: ${newUser.nombre}</p>
              <p>Dirección: ${newUser.direccion}</p>
              <p>Edad: ${newUser.edad}</p>
              <p>Teléfono: ${newUser.telefono}</p>
          `,
        },
        (err, info) => {
          if (err) {
            loggerError.error(err);
            err;
          }
          loggerInfo.info(info);
        }
      );
    }
    return res.render("signUpResult",{ access_token ,titulo : "sign Up ok"});

  } catch (error) {
    console.log(error);
  }
};

// hashear pass
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = {  logIn, logOut, signUp };
