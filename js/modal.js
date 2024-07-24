const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');
const btnToast = document.getElementsByClassName('.card-content');


abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active')
});

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('boton-eliminar')) {
        eliminarProductoCarrito(event.target.value);
    };
});

btnToast.addEventListener("click", () => {
    Toastify({
      text: "Probando toast!",
      duration: 2000,
      gravity: 'bottom',
      position: 'center',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c92d)'
      }
    }).showToast();
  });
