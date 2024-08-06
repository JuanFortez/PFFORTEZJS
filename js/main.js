document.addEventListener('DOMContentLoaded', () => {
  displayProductos(productos);
  pintarCarrito(carrito);
  actualizarTotalCarrito(carrito);
});
  
const shopContent = document.getElementById('producto-contenedor');
const inputBuscar = document.getElementById('buscador');
const sinResultados = document.getElementById('alerta-nada');

const displayProductos = (productos) => {
  shopContent.innerHTML = '';

  if (productos.length === 0) {
    sinResultados.style.display = 'block';
  }else{
    productos.forEach((producto) => {
      const content = document.createElement('div');
      content.className = 'card';
  
      content.innerHTML = `
        <div class="card-image">
          <img src="${producto.imagen}">
          <span class="card-title">${producto.nombre}</span>
        </div>
        <div class="card-content">
          <p>$${producto.precio}</p>
          <a id="btn-toast" class="btn-floating halfway-fab wabes-effect waves-light blue"><i id=${producto.id} class="fas fa-cart-plus agregar"></i></a>
        </div>     
      `;

      shopContent.append(content);
    });

    sinResultados.style.display = 'none';
  }
};

const handleSearch = () => {
  const searchTerm = inputBuscar.value.toLowerCase();
  const filteredProducts = productos.filter((producto) => producto.nombre.toLocaleLowerCase().startsWith(searchTerm));

  displayProductos(filteredProducts);
};

fetch('./stock.json')
  .then((response) => response.json())
  .then((productos) => {
    productos = data;
    displayProductos(productos);
  });

inputBuscar.addEventListener('input', handleSearch);

//----------------------------------------------------------------------

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (event) => {
  if (event.target.classList.contains('agregar')) {
    validarProductoCarrito(event.target.id);
  }
});

const validarProductoCarrito = (productoId) => {
  const estaRepetido = carrito.some((producto) => producto.id == productoId);

  if (estaRepetido) {
    const producto = carrito.find((producto) => producto.id == productoId);
    producto.cantidad++;
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    actualizarTotalCarrito(carrito);
  } else {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);
    pintarProductoCarrito(producto);
    actualizarTotalCarrito(carrito);
  }
};


const pintarProductoCarrito = (producto) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML += `
    <img src="${producto.imagen}" alt="">
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `
  carritoContenedor.appendChild(div);
};


const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex((producto) => producto.id == productoId);

  carrito[productoIndex].cantidad === 1
    ? carrito.splice(productoIndex, 1)
    : carrito[productoIndex].cantidad--

  pintarCarrito(carrito);
  actualizarTotalCarrito(carrito);
};


const pintarCarrito = (carrito) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  carritoContenedor.innerHTML = '';

  carrito.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');

    div.innerHTML += `
      <img src="${producto.imagen}" alt="">
      <div class="info-producto-carrito">
        <p>${producto.nombre}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      </div>
        <span>$ ${producto.precio}</span>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    carritoContenedor.appendChild(div);
  });
};

const actualizarTotalCarrito = (carrito) => {
  const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const compraTotal = carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

  pintarTotalesCarrito(cantidadTotal, compraTotal);
  guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (cantidadTotal, compraTotal) => {
  const contadorCarrito = document.getElementById('contador-carrito');
  const precioTotal = document.getElementById('precioTotal');

  contadorCarrito.innerText = cantidadTotal;
  precioTotal.innerText = compraTotal;
};

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

//----------------------------------------------------------------------
//CARRITO
const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');


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

//FORMULARIO
const formContenedor = document.querySelector('.signupForm');
const abrirForm = document.getElementById('login');
const cerrarForm = document.getElementById('btn-cerrar-form');
const modalForm = document.querySelector('.form');

abrirForm.addEventListener('click', () => {
  formContenedor.classList.toggle('form-active')
});

cerrarForm.addEventListener('click', () => {
  formContenedor.classList.toggle('form-active')
});

formContenedor.addEventListener('click', () => {
  cerrarForm.click()
});

modalForm.addEventListener('click', (event) => {
  event.stopPropagation();
});


//FORMULARIO
const signupForm =document.getElementsByClassName('signupForm')[0];

signupForm.addEventListener('submit', function(event){
  event.preventDefault();

  const form = event.target;
  
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  const contrasenaConfirmar = document.getElementById('contrasenaConfirmar').value;

  const userData = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    contrasena: contrasena,
    contrasenaConfirmar: contrasenaConfirmar
  };

  const userDataJSON = JSON.stringify(userData);
  localStorage.setItem('userData', userDataJSON);
  
  form.reset();

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Usuario creado con exito",
    showConfirmButton: false,
    timer: 1500
  });
})



