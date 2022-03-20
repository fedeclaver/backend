

const productosDao = require("../daos/productos/index.js");
const {loggerWarn,loggerTrace,loggerDefault,loggerError} = require("../utils/log4js");



const crearProducto = async (req, res) => {
    loggerTrace.trace("Ingreso a crearProducto");
    try {

        if 
           ( req.body.nombre || req.body.descripcion || req.body.codigo || req.body.foto || req.body.stock
        ) {
                const newItem = {                
                timestamp: Date.now(),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock
            };
            // Creamos nuestro producto
            let  producto = await productosDao.save(newItem);            
            if (producto) {                          
                res.status(201).redirect("/productos/agregar");
            } else {
                res.status(500).json({ msg: "Error al crearProducto" });
            }
        } else {         
            loggerWarn.warn(
                `El usuario no ingresó un campo de Producto requerido .`
              );
                throw new Error(`Error al insertar Productos campos requeridos`);       
        }
    } catch (error) {     
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}


const obtenerProductos = async (req, res) => {
    loggerTrace.trace("Ingreso a obtenerProductos");
    try {

        let productos = await productosDao.getAll();  
        productos= JSON.parse(JSON.stringify(productos))
        
        res.status(200).render("productos.hbs", {productos})
    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }

}

const actualizarProductos = async (req, res) => {
    loggerTrace.trace("Ingreso a actualizarProductos");
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let producto = await productosDao.getById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        producto.timestamp = Date.now();
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.codigo = codigo;
        producto.foto = foto;
        producto.precio = precio;
        producto.stock = stock;
        producto = await productosDao.update(producto)
        res.status(200).json({ msg: `Producto actualizado correctamente` });

    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}


const obtenerProducto = async (req, res) => {
    loggerTrace.trace("Ingreso a obtenerProducto");
    try {
        let producto = await productosDao.getById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(producto);

    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}

const eliminarProducto = async (req, res) => {
    loggerTrace.trace("Ingreso a eliminarProducto");
    try {
        let producto = await productosDao.getById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await productosDao.deleteById({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado correctamente' });

    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}
const agregarProducto = (req,res,next) =>{
    res.render('agregar.hbs')
}
const editarProductos = async (req,res,next) =>{
    loggerTrace.trace("Ingreso a editarProductos");
    try {
        let producto = await productosDao.getById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        producto= JSON.parse(JSON.stringify(producto))
        res.status(200).render('agregar.hbs',{producto})
      

    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
    
}

module.exports ={eliminarProducto,obtenerProducto,actualizarProductos,obtenerProductos,crearProducto,agregarProducto,editarProductos};