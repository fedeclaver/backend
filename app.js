//logger
const { loggerTrace,loggerInfo, loggerWarn, loggerError } = require('./utils/log4js.js');
const httpServer = require('./server.js');
//librerias implementación de cluster
const cluster = require('cluster');
const numCPUs = require("os").cpus().length;

// pongo a escuchar el servidor en el puerto indicado
// definir puerto por linea de comandos
let port = 0
if (process.argv[2] && !isNaN(process.argv[2])) {
    puerto = process.argv[2]
} else if (isNaN(process.argv[2])) {
    console.log('No se ingresó un puerto válido, se usará el 8080');
    loggerTrace.trace('No se ingresó un puerto válido, se usará el 8080')
    puerto = (process.env.PORT || 8080)
}
if (process.argv[3] && isNaN(process.argv[3])) {
  modo = process.argv[3] 
} else if  (isNaN(process.argv[3])){
  loggerTrace.trace('No se ingresó modo valido, se usará el modo fork');
  console.log('No se ingresó modo valido, se usará el modo fork');
  modo = "fork"
}

process.on('unhandledRejection', (reason, promise) => {
 
  loggerWarn.warn(`Unhandled Rejection at:`, reason.stack || reason) 
})




if(modo == "cluster"){
  console.log('modo cluster');

  if (cluster.isMaster) {

  
    loggerTrace.trace('num CPUs', numCPUs);
    loggerTrace.trace(`PID MASTER ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        loggerTrace.trace(`Worker ${worker.process.pid} died`);
        cluster.fork();
})

} else{
  console.log(`Worker PID ${process.pid}`)
  const conexserver = httpServer.listen(puerto, () => {
    console.log(process.argv)
    console.log(`Servidor http escuchando en el puerto ${conexserver.address().port} - PID ${process.pid} - ${ new Date() }`)
  });
  conexserver.on("error", (error) =>  loggerWarn.warn(`Error en servidor ${error}`) );
  }

}
else{ // fork
console.log('modo fork')
// Start the server.
const conexserver = httpServer.listen(puerto, function () {
  console.log(`Servidor express en ${conexserver.address().port} - PID ${process.pid} - ${ new Date() }`)
})
conexserver.on("error", (error) => loggerWarn.warn(`Error en servidor ${error}`));
}


