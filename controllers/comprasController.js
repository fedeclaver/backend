const comprasDao =require("../daos/compras/index.js");
const { loggerTrace,loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');
const transporterGmail = require('../email/gmail');
const carritosDao = require("../daos/carritos/index.js");
const config = require('../config/config');
// twilio
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 


const parse_obj = obj => JSON.parse(JSON.stringify(obj))
var http = require("http");

const crearCompra = async (req, res) => {

  loggerTrace.trace("Ingreso a crearcompra");
  try {
    let carrito = await carritosDao.getById(req.params.id);
    if (!carrito) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    } ;
    
    if (carrito.productos.length < 1) {
      return res.status(404).json({ msg: "Carrito sin productos" });
    } ;

    let carritocount = await carritosDao.count();
    let objeto = {
        timestamp: Date.now(),
        user: carrito.id,
        id: carritocount++,
        productos: parse_obj(carrito.productos)   ,
        estado: 'Generado',
        total: carrito.total,
        direccion: carrito.direccion

  }
 

    const idcompra = await comprasDao.save(objeto);
    //borro el carrito anterior
    if (idcompra) {
      let carrito = await carritosDao.deleteById(req.params.id);   
   
      const productosList = objeto.productos.map(
        (product) =>
          `
      <li>codigo:${product.id}--producto:${product.nombre}</li>
      `
      )
      .join("\n");
              // envio de email al admin
              transporterGmail.sendMail({
                from: config.gmail.user,
                to: config.gmail.admin,
                subject: `Nuevo Pedido de ${req.user.nombre} - ${req.user.usuario}`,
                html: `<div><h4>Productos:</h4></br><ul> ${productosList}</ul></div>`
            }, (err, info) => {
                if (err) {
                    loggerWarn.warn(err.message)
                    return err
                }
                loggerInfo.info(info);
            });
         
            //envio whassap
            client.messages.create({
              body: `Nuevo Pedido de ${req.user.nombre} - ${req.user.usuario}`,
              from: `whatsapp:${config.TWILIO_NUM_WHATSAPP}`,
              to: `whatsapp:${config.ADMIN_WHATSAPP}`
          })
          .then(message => loggerInfo.info(`WhatsApp_id: ${message.sid} - Enviado a: ${message.to}`))
          .catch(err => loggerWarn.warn(err.message))

          //envio sms
          // mensaje de texto al cliente
          client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso.',
            from: config.TWILIO_NUM_SMS,
            to: req.user.telefono
        })
            .then(message => loggerInfo.info(`SMS_id: ${message.sid} - Enviado a: ${message.to}`))
            .catch(err => loggerWarn.warn(err.message))   
            
            


            return  res.status(200).json({ msg: `Compra insertado correctamente id:${idcompra}` });          
          
    } else {
      return  res.status(500).json({ msg: "Error al crearCompra" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear Compra" });
  }
};

const obtenerCompras = async (req, res) => {
  loggerTrace.trace("Ingreso a obtener Compras");
  try {
    let compras = await comprasDao.getAll();    
    res.json(compras)
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtener Compras");
  }
};

const  obtenerCompra = async (req, res) => {
  loggerTrace.trace("Ingreso a obtenerCompra");
  try {
    let carrito = await comprasDao.getById(req.params.id);
    if (!carrito) {
      res.status(404).json({ msg: "Compra no encontrado" });
    }
    res.json(carrito);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerCompra");
  }
};


module.exports = {obtenerCompra,obtenerCompras,crearCompra};