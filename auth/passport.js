
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarioController = require('../controllers/usuarioController');
const config = require('../config/config');
const transporterGmail = require('../email/gmail');
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');





// LocalStrategy de "login"
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        
        usuarioController.login(username, password, done)
    }
))
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {

        findOrCreateUser = async () => {
            // buscar en mongo el usuario
            const user = await usuariosDao.getById({ 'usuario': username });

            // usuario ya existe
            if (user) {
                loggerWarn.warn('Usuario ya existe!')
                return done(null, false, { msg: 'Usuario ya existe!' });
            }

            if (!req.file) {
                loggerWarn.warn('Faltó subir una foto de perfil')
                return done(null, false, { msg: 'Faltó subir una foto de perfil' });
            }

            // creamos el usuario
            const newUser = {
                usuario: username,
                password: createHash(password),
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                foto: req.file.filename
            }

            const creausuario =await  usuariosDao.save(newUser);
            if (creausuario) {
                //aviso log con Gmail
                transporterGmail.sendMail({
                    from: config.GMAIL_USER,
                    to: config.ADMIN_EMAIL,
                    subject: 'Nuevo Registro de Usuario',
                    html: `
                        <p>Email: ${newUser.username}</p>
                        <p>Nombre: ${newUser.nombre}</p>
                        <p>Dirección: ${newUser.direccion}</p>
                        <p>Edad: ${newUser.edad}</p>
                        <p>Teléfono: ${newUser.telefono}</p>
                    `
                }, (err, info) => {
                    if (err) {
                        loggerError.error(err)
                        return err
                    }
                    loggerInfo.info(info);
                });
            }
            return done(null, newUser);

        }

        process.nextTick(findOrCreateUser);

    }
));




// serializar
passport.serializeUser((user, done) => {
    done(null, user);
});
// deserializar
passport.deserializeUser((user, done) => {
    done(null, user)
});

module.exports = passport;