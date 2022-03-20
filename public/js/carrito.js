fetch("/productos/listar")
  .then((resp) => resp.json())
  .then((productos) => {
    let html = "";
    productos.forEach((producto) => {
      let htmlSegment = `      
      <div class="card" >
      
      <img src="${producto.foto}" style="width: 100px height: 100px " class="card-img-top " alt="...">
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
    
    </div>`;
      // <input  type="number"  id="idCantidad" placeholder="Cantidad"   name="idCantidad"/>
      html += htmlSegment;
    });
    document.getElementById("productosCard").innerHTML = html;
  });

function AgregarProducto(id) {
  let idCarrito = document.getElementById("idCarrito").value;
  if (idCarrito != "") {
    fetch("/carritos/agregarProducto/" + idCarrito + "/" + id)
      .then((res) => res.text())
      .then((res) => {
        alert(res);
        location.reload();
        return false;
      });
  }
}

function agregarCarrito() {
  fetch("/carritos/agregar/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}

function getCarrito(id) {
  fetch("/carritos/listar/" + id, {
    method: "GET",
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}

fetch("/carritos/listar")
  .then((resp) => resp.json())
  .then((carritos) => {
    let htmlheader = "",
      htmlbody = "",
      htmlfooter = "",
      html = "";
    for (let i = 0; i < carritos.length; i++) {
      let total = 0;
      htmlheader = `<div class="rounded cart shadow p-3 mb-5 bg-body rounded">
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="product-details mr-2">
            <div class="d-flex flex-row align-items-center">
            <i class="fa fa-long-arrow-left"></i><span class="ml-2">Carrito ${carritos[i].id}</span></div>
            <hr>
            <h6 class="mb-0">Detalle Compra</h6>`;
      if (undefined !== carritos[i].productos && carritos[i].productos.length) {
        htmlbody = "";
        for (let e = 0; e < carritos[i].productos.length; e++) {
          total += parseInt(carritos[i].productos[e].precio);
          htmlbody =
            htmlbody +
            `<div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
						<div class="d-flex flex-row"><img class="rounded" src=" ${carritos[i].productos[e].foto}" width="40">
							<div class="ml-2"><span class="font-weight-bold d-block"> ${carritos[i].productos[e].nombre}</span>
              <span class="spec">${carritos[i].productos[e].detalle}</span></div>
						</div>
						<div class="d-flex flex-row align-items-center"><span class="d-block">2</span>
            <span class="d-block ml-5 font-weight-bold">$${carritos[i].productos[e].precio}</span>
            <i class="fa fa-trash ml-3 text-black-50" onclick="eliminarProductoCarrito(${carritos[i].productos[e].id},${carritos[i].id})"></i></div>
                    
            </div>`;
        }
      } else {
        htmlbody = `<span class="ml-2">Sin Productos</span>`;
      }
      htmlfooter = `</div>
          </div>
          <div class="col-md-4 summary">
            <div>
                <h5><b>Resumen de Compra</b></h5>
            </div>
            <hr>
            <div class="row">
                <div class="col" style="padding-left:0;">${carritos[i].productos.length}</div>
                <div class="col text-right">${total}</div>
            </div>            
            <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                <div class="col">TOTAL</div>
                <div class="col text-right">${total}</div>
            </div> <button class="btn btn-success">PAGAR</button>
        </div>
        </div>
        
        </div>
        
      </div>`;
      html = html + htmlheader + htmlbody + htmlfooter;
    }

    document.getElementById("carritos").innerHTML = html;
  });

function eliminarProductoCarrito(id, idc) {
  if (idc != "") {
    fetch("/carritos/eliminarProducto/" + parseInt(idc) + "/" + parseInt(id))
      .then((res) => res.text())
      .then((res) => {
        alert(res);
        location.reload();
        return false;
      });
  }
}

function login(){
  window.open ("popup.html","mywindow", "width=350,height=250");
}

window.addEventListener('message', function(e){
  username = document.querySelector("#username");
  password = document.querySelector("#password");
  username.innerText = e.data.username;
  password.innerText = e.data.password;
})