






function borrarProducto(id) {
  //alert(id);
  fetch("/productos/borrar/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}

function editarProducto(id) {
  //alert(id);
  fetch("/productos/actualizar/" + id)
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
      return false;
    });
}
