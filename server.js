/**
 * Required modules.
 */
//logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require("./utils/log4js.js");
/*create server */
const express = require("express");
const http = require("http");

//database 
const {mongodb} = require("./config/config.js");
// module express Hbs
const handlebars = require("express-handlebars");
//socket
const { Server: Socket } = require("socket.io");
//session express
const session = require("express-session");
const MongoStore = require("connect-mongo");

//passport
const passport = require("passport");
//cors 
const cors = require("cors");

const path = require("path");


//routes
const mainRoutes = require("./routes/index");


// Dotenv initialization.

// SOCKETS 
const webSocket = require('./services/sockets');


// Create the express app.
const app = express();

const httpServer = http.createServer(app);


const io = new Socket(httpServer);

app.use(cors());


// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(express.static(process.cwd() + "/public"));

// Init Session

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongodb.cnxStr,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "secreto",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1600000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
//configuracion Hbs
//establecemos la configuración de handlebars
app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "hbs"); // registra el motor de plantillas

const onConnection = (socket) => {
      webSocket(io, socket);
}
io.on('connection', onConnection);



app.use("/", mainRoutes);

//Error de app
app.use((err, req, res, next) => {
//loggerError.("err.message");
  //return res.status(500).send("Se rompió todo");
});

// Catch 404 errors and forward them to the error handler.
app.use((req, res, next) => {
  //loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no implementado`)
  // res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementado` });
  next();
});

module.exports = httpServer;
