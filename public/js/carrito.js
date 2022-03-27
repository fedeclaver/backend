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

fetchGETJSON("/api/carrito/" + localStorage.getItem("user")).then((carrito) => {

  let htmlheader = "",
    htmlbody = "",
    htmlfooter = "",
    html = "";     
    let total = 0;
    htmlheader = `<div class="rounded cart shadow p-3 mb-5 bg-body rounded">
    <div class="row no-gutters">
      <div class="col-md-8">
        <div class="product-details mr-2">
          <div class="d-flex flex-row align-items-center">
          <i class="fa fa-long-arrow-left"></i><span class="ml-2">Carrito de ${carrito.id}</span></div>
          <hr>
          <h6 class="mb-0">Detalle Compra</h6>`;
    if (undefined !== carrito.productos && carrito.productos.length) {
      htmlbody = "";
      for (let e = 0; e < carrito.productos.length; e++) {
        total += parseInt(carrito.productos[e].precio);
        htmlbody =
          htmlbody +
          `<div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
          <div class="d-flex flex-row"><img class="rounded" src=" ${carrito.productos[e].foto}" width="40">
            <div class="ml-2"><span class="font-weight-bold d-block"> ${carrito.productos[e].nombre}</span>
            <span class="spec">${carrito.productos[e].detalle}</span></div>
          </div>
          <div class="d-flex flex-row align-items-center"><span class="d-block">2</span>
          <span class="d-block ml-5 font-weight-bold">$${carrito.productos[e].precio}</span>        
          <i class="bi bi-trash ml-3 text-black-50" onclick="eliminarProductoCarrito(${carrito.productos[e].id},${carrito.id})"></i></div>  
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
              <div class="col" style="padding-left:0;">${carrito.productos.length}</div>
              <div class="col text-right">${total}</div>
          </div>            
          <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
              <div class="col">TOTAL</div>
              <div class="col text-right">${total}</div>
          </div> <button class="btn btn-success" onclick="comprarCarrito('${carrito.id}')">PAGAR</button>
      </div>
      </div>
      
      </div>
      
    </div>`;
    html = html + htmlheader + htmlbody + htmlfooter;
  

  document.getElementById("carrito").innerHTML = html;
})



function eliminarProductoCarrito(id, idc) {
if (idc != "" || (localStorage.getItem("user")) != "") {
  fetchGETJSON("/api/carritos/eliminarProducto/" + (localStorage.getItem("user")) + "/"+ parseInt(id))
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}
}

function comprarCarrito(id, idc) {
  if (idc != "" || (localStorage.getItem("user")) != "") {
    fetchGETJSON("/api/compra/" + (localStorage.getItem("user")) )
      .then((res) => res.text())
      .then((res) => {
        alert(res);
        location.reload();
        return false;
      });
  }
  }
  
  