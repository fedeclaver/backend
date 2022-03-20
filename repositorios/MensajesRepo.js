const { asDto, asModels }  = require("../mappers/mensajesMapper.js");
const getMensajesDao  = require("../daos/mensajes/index.js");

const parse_obj = obj => JSON.parse(JSON.stringify(obj))

let instance = null

class MensajesRepo {
    #mensajesDao

    constructor() {
        this.#mensajesDao = getMensajesDao()
        this.value = Math.random(100) // para verificación patrón singleton
    }

    async getAll() {
        let dtos = await this.#mensajesDao.getAll()
        dtos=parse_obj(dtos)
        const mensajes = asModels(dtos)
        return mensajes
    }

    async save(mensaje) {
        const dto = asDto(mensaje)
        return await this.#mensajesDao.save(dto)
    }
    async deleteAll(mensaje) {
        const dto = asDto(mensaje)
        return await this.#mensajesDao.deleteAll(dto)
    }
    /*-----------------------------------------------------------------------*/
    // para verificación patrón singleton
    /*-----------------------------------------------------------------------*/
    printValue(){ 
        console.log(this.value)
    }
    static getInstance(){ 
        if(!instance){
            instance = new MensajesRepo()
        }
        return instance
    }
}



module.exports = MensajesRepo;