

// inicializamos la conexion ws
const socket = io.connect();


// renderiza template con nuevos mensajes
function render(mensajes) {
    if (mensajes.length > 0) {
        var html = mensajes.map((elem) => {
            return (`
                <div class="mb-2">
                    <img src="${elem.author.avatar}" width="30px">
                    <strong style="color: blue;">${elem.author.email}</strong> <span style="color: maroon;">[${elem.fyh}]</span>:
                    <em style="color: green;">${elem.text}</em>
                </div>
            `)
        }).join(" ");
        document.getElementById('mensajes').innerHTML = html;
    } else {
        // si no hay mensajes renderiza un aviso
        var html = `
                <div>
                    <strong style="color: red;">Ups! Aún no hay mensajes..</strong>
                </div>`;
        document.getElementById('mensajes').innerHTML = html;
    }
  }
  
  
  
  
  
  
  // se ejecuta cuando enviamos un nuevo mensaje
  function addMessage(e) {
    e.preventDefault()
    let mensajes = {
        author: {
            email: document.getElementById('email').value,
            nombre: document.getElementById('msjnombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value
    };
    socket.emit('nuevoMensaje', mensajes);
    document.getElementById('mensajes').value = "";
    return false;
  }
  
  // recibimos los mensajes del servidor y renderizamos
  
  socket.on('mensaje', mensajes => {
    console.log(mensajes);
  
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
  })
  
  
  
  
  function makeHtmlList(mensajes) {
     if (mensajes.length > 0) {
      return mensajes.map(mensaje => {
        return (`
            <div>
            <img src="${mensaje.author.avatar}" width="30px">
              
                <strong style="color: blue;">${mensaje.author.email}</strong>            
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `)
    }).join(" ");
  
  }else {
    return ('<div><strong style="color: red;">Ups! Aún no hay mensajes..</strong> </div>')
  }
  }

  function deleteMensajes() {
    socket.emit('deleteMensajes', 'Todos los mensajes se han eliminado');
  }
  
  
  