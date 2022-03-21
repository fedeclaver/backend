const transporterGmail = require("../email/gmail");
const usuariosDao = require("../daos/usuarios/index.js");
const dayjs = require("dayjs");
const config = require("../config/config");
const { generateAuthToken } = require("../utils/jwt.js");
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');
const bcrypt = require('bcrypt');

const getUser = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.json(
        req.user ?? res.render("index", { title: "login", layout: false })
      );
    }
  } catch (error) {
    loggerWarn.warn(error.message);
  }
};

const logIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Usuario logueado");
    const loggedUsername = req.session.user;
    console.log(loggedUsername);

    return res.render("index", { title: "login", layout: false });
  } else {
    console.log("Usuario no logueado");

    res.render("login", { title: "login", layout: false });
    return;
  }
};

const logOut = async (req, res, next) => {
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
    res.render("logout", { username: usuario });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    console.log("Ingresó a signUp");
    let email  = req.body.email;
    //valido el mail del usuario
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(email)) {
      res.json({ msj: "Mail invalido" });
    }
    // buscar en mongo el usuario
    const usuario = await usuariosDao.getByName(email);

    if (usuario) {
      loggerWarn.warn("Usuario ya existe!");
      res.json({ msj: "el nombre de usuario ya existe" });
    }
    // if (!req.file) {
    //   loggerWarn.warn("Faltó subir una foto de perfil");
    //   res.json({ msj: "Faltó subir una foto de perfil" });
    // }
    // creamos el usuario
    const newUser = {
      usuario: req.body.email,
      password: createHash(req.body.password),
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono,
    };
    const access_token = generateAuthToken(req.body.email);
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

    res.json({ access_token });
  } catch (error) {
    console.log(error);
  }
};

// hashear pass
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = { getUser, logIn, logOut, signUp };
