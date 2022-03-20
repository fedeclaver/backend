"use strict";

//logger
var _require = require("./utils/log4js.js"),
    loggerTrace = _require.loggerTrace,
    loggerInfo = _require.loggerInfo,
    loggerWarn = _require.loggerWarn,
    loggerError = _require.loggerError;

var express = require("express");

var http = require("http");

var _require2 = require("./config/config.js"),
    mongodb = _require2.mongodb,
    template = _require2.template;

var handlebars = require("express-handlebars");

var app = express();
var httpServer = http.createServer(app); //socket

var _require3 = require("socket.io"),
    Socket = _require3.Server;

var io = new Socket(httpServer);

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var MongoStore = require("connect-mongo");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var path = require("path"); //routes


var mainRoutes = require("./routes/index"); //passport


var passport = require("passport"); // Init Session


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongodb.cnxStr,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  secret: "secreto",
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 1600000
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express["static"](process.cwd() + "/public"));
app.engine("hbs", handlebars({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials"
})); //configuracion Hbs
//establecemos la configuración de handlebars

app.set("views", "./views"); // especifica el directorio de vistas

app.set("view engine", "hbs"); // registra el motor de plantillas
// SOCKETS

var webSocket = require("./routes/sockets");

var onConnection = function onConnection(socket) {
  webSocket(io, socket);
};

io.on("connection", onConnection);
app.use("/", mainRoutes); //Error de app

app.use(function (err, req, res, next) {
  console.error(err.message);
  return res.status(500).send("Se rompió todo");
});
app.use(function (req, res, next) {
  //loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no implementado`)
  // res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementado` });
  next();
});
module.exports = httpServer;