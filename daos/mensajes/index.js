let mensajesDao;

require("dotenv").config({ path: "variables.env" });

switch (process.env.BASE) {
  case "mongodb":
    const MensajesDaoMongo = require("./MensajesDaoMongo.js");
    mensajesDao = new MensajesDaoMongo();
    break;
  case "firebase":
    const MensajesDaoFirebase = require("./MensajesDaoFirebase.js");
    mensajesDao = new MensajesDaoFirebase();
    break;
}
module.exports = mensajesDao;
