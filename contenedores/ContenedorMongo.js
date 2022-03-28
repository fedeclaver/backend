const mongoose = require('mongoose');

const Conexion = require('../config/config.js');

mongoose.connect(Conexion.mongodb.cnxStr, Conexion.mongodb.options);
const parse_obj = obj => JSON.parse(JSON.stringify(obj))

class ContenedorMongo {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async guardar(objeto) {
        try {
            const cantidad = await this.coleccion.find({}).count()
            if (cantidad == 0) {
                objeto.id = 1;
            } else {
                let max = await this.coleccion.find().sort({ id: -1 }).limit(1) //max id

                max = JSON.parse(max[0].id);
                objeto.id = max + 1;
            }
            let doc = await this.coleccion.create(JSON.parse(objeto));
            doc = parse_obj(doc)
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    async save(object) {
        //Recibe un objeto, lo inserta en la tabla.   
        let doc = await this.coleccion.create(object);
        doc = parse_obj(doc)
        return doc
    }
    
   //buscar 
   async getByName(usuario) {
    let doc = await this.coleccion.findOne({ 'usuario': usuario })
    doc = parse_obj(doc)
    return doc
    
}
  
 //buscar todos los registros.
 async count() {
    return  await this.coleccion.find({}).count()
}

    //buscar todos los registros.
    async getAll() {

        return  await this.coleccion.find({})
    }
    //buscar un id 
    async getById(id) {
        return await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
    }
    //borrar un id 
    async deleteById(id) {
        //console.log(id)
        return await this.coleccion.deleteOne({ id: id })
    }
    //borrar todo 
    async deleteAll() {
        return await this.coleccion.deleteMany({})
    }
    //Actualizar según id.
    async update(object) {
        const id = object.id
        return await this.coleccion.replaceOne({ id: id }, object)
    }
    //cerrar conexion
    async close() {
        mongoose.connection.close()
    }
}

module.exports = ContenedorMongo;