//logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require("./utils/log4js.js");
const express = require("express");
const http = require("http");
const { mongodb, template } = require("./config/config.js");

const handlebars = require("express-handlebars");

const app = express();
const httpServer = http.createServer(app);

//socket
const { Server: Socket } = require("socket.io");
const io = new Socket(httpServer);

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
//routes
const mainRoutes = require("./routes/index");
//passport
const passport = require("passport");
// Init Session
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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

app.use(express.static(process.cwd() + "/public"));
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

// SOCKETS
const webSocket = require("./routes/sockets");
const onConnection = (socket) => {
  webSocket(io, socket);
};
io.on("connection", onConnection);

app.use("/", mainRoutes);

//Error de app
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Se rompió todo");
});

app.use((req, res, next) => {
  //loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no implementado`)
  // res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementado` });
  next();
});

module.exports = httpServer;
