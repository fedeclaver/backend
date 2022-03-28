async function fetchGETJSON(url) {
  let response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  let respuesta = await response.json();
  return respuesta;
}
fetchGETJSON("/api/productos").then((productos) => {
  let html = '<div class="Container"><div class="row"> ';
  if (!productos) {
    html = `<h3 class="alert alert-warning">No se encontraron productos</h3>`;
  }
  productos.forEach((producto) => {
    let htmlSegment = `  
      <div class="col-lg 3 col-md-3 col-sm-12 col-xs-12">
            <div class="card mx-auto m-2" style="width:18rem;" >

                  <div class="card">
                  
                            <img src="${producto.foto}"  class="card-img-top " alt="...">
                            <div class="card-body">
                              <h5 class="card-title"> ${producto.nombre}</h5>
                              <p>Producto Id: ${producto.id}</p>
                              <p>Timestamp: ${producto.timestamp}</p> 
                              <p class="card-text">Descripcion: ${producto.descripcion}</p> 
                              <p class="card-text">Cantidad: ${producto.cantidad}</p> 
                              <p class="card-text">Precio: ${producto.precio}</p> 
                              <p class="card-text">Stock: ${producto.stock}</p>         
                              <p></p>   
                              <button class="btn btn-primary" onclick="AgregarProducto('${producto.id}')">Agregar a carrito</button>        
                            </div>
                  </div>
          </div>
    </div>`;

    // <input  type="number"  id="idCantidad" placeholder="Cantidad"   name="idCantidad"/>
    html += htmlSegment ;
  });
  document.getElementById("productosCard").innerHTML = html + `</div></div>`;
});


function AgregarProducto(id) {
 let user= localStorage.getItem("user");
 if (user)
   fetchGETJSON("/api/carrito/agregar/" + user + "/" + id)    
      .then((res) => {
        alert(res.msg);
        location.reload();
        return false;
      });


  }



   