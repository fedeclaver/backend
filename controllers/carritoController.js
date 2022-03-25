const carritosDao = require("../daos/carritos/index.js");

const productosDao = require("../daos/productos/index.js");
const {loggerWarn,loggerTrace,loggerDefault,loggerError} = require("../utils/log4js");

const parse_obj = obj => JSON.parse(JSON.stringify(obj))
var http = require("http");

const crearCarrito = async (req, res) => {
  loggerTrace.trace("Ingreso a crearCarrito");
  try {
    let objeto = {productos: []}
       objeto = Object.assign({ timestamp: Date.now() , objeto });
       
    const idCarrito = await carritosDao.save(objeto);
    if (idCarrito) {
      res
        .status(200)        
        .json({ msg: `Carrito insertado correctamente id:${idCarrito}` });
    } else {
      res.status(500).json({ msg: "Error al crearCarrito" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crearCarrito" });
  }
};

const agregarProducto = async (req, res) => {
  loggerTrace.trace("Ingreso a agregarProducto");
  try {
    let carrito = await carritosDao.getById(req.params.idCarrito);
    if (!carrito) {
      let objeto = {productos: []}
        objeto = Object.assign({ id:req.params.idCarrito,timestamp: Date.now() , objeto });      
         const idCarrito = await carritosDao.save(objeto);
    }
    let producto = await productosDao.getById(req.params.id_prod);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
    carrito.productos.push(producto)
    let carritoact = await carritosDao.update(carrito);
    if (carritoact) {
      res
        .status(200)
       // .redirect("/index.html")
        .json({ msg: `El Producto se agregó correctamente` });
        
    } else {
      res.status(500).json({ msg: "Error al agregando el Producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error  al agregar Productos");
  }
};

 const obtenerCarritos = async (req, res) => {
  loggerTrace.trace("Ingreso a obtenerCarritos");
  try {
    let carritos = await carritosDao.getAll();   
    carritos= JSON.parse(JSON.stringify(carritos)) 
    res.status(200).render("carritos.hbs", {carritos})
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtenerCarritos");
  }
};
const  obtenerCarrito = async (req, res) => {
  loggerTrace.trace("Ingreso a obtenerCarrito");
  try {
    let carrito = await carritosDao.getById(req.params.id);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    }
    res.json(carrito);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerCarrito");
  }
};

const  eliminarCarrito = async (req, res) => {
  loggerTrace.trace("Ingreso a eliminarCarrito");
  try {
    let carrito = await carritosDao.deleteById(req.params.id);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    } else {
      res.json({ msg: "Carrito eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerProductos");
  }
};

const eliminarProducto = async (req, res) => {
  loggerTrace.trace("Ingreso a eliminarProducto de Carrito");
  try {
    let carrito = await carritosDao.getById(req.params.idCarrito);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    }
    let producto = await productosDao.getById(req.params.id_prod);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
    }


    let resultado = carrito.productos.filter((e) => e.id !== parseInt(req.params.id_prod));
    carrito.productos = parse_obj(resultado);
    let carritoact = await carritosDao.update(carrito);     
    if (carritoact) {
      res.status(200).json({ msg: `El Producto se elimino correctamente` });
    } else {
      res.status(500).json({ msg: "Error al eliminando el Producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error  al agregar Productos");
  }
};

module.exports = {eliminarProducto,eliminarCarrito,obtenerCarrito,obtenerCarritos,agregarProducto,crearCarrito};