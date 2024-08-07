let carrito = JSON.parse(localStorage.getItem("carrito"))||[];

document.addEventListener('DOMContentLoaded', () => {
  mostrarCarritoCheckout(carrito);
  cargarDatosCliente();
});


const checkoutButton = document.getElementById('checkout-btn');
checkoutButton.addEventListener('click', () => {
  const form = document.querySelector('.needs-validation');
  const formIsValid = form.checkValidity();
  const saveInfoChecked = document.getElementById('save-info').checked;

  if (formIsValid) {
    if (saveInfoChecked) {
      guardarDatosCliente();
    }
  } else {
    form.classList.add('was-validated');
  };
});

const guardarDatosCliente = () => {
  const cliente = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    address2: document.getElementById('address2').value,
    country: document.getElementById('country').value,
    state: document.getElementById('state').value,
    zip: document.getElementById('codigoPostal').value
  };

  localStorage.setItem('cliente', JSON.stringify(cliente));
};

const cargarDatosCliente = () => {
  const cliente = JSON.parse(localStorage.getItem('cliente'));
  if (cliente) {
    document.getElementById('firstName').value = cliente.firstName;
    document.getElementById('lastName').value = cliente.lastName;
    document.getElementById('email').value = cliente.email;
    document.getElementById('address').value = cliente.address;
    document.getElementById('address2').value = cliente.address2;
    document.getElementById('country').value = cliente.country;
    document.getElementById('state').value = cliente.state;
    document.getElementById('codigoPostal').value = cliente.zip;
  };
};


const mostrarCarritoCheckout = (productos) => {
    const carritoContenedorCheckout = document.getElementById('cart');
  
    carritoContenedorCheckout.innerHTML = '';
    
    productos.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('carritoCheckout');
  
    div.innerHTML += `
            <img src=../${producto.imagen}>
            <div>
              <h6>${producto.nombre}</h6>
              <p>${producto.descripcion}</p>
              <p>Cantidad: ${producto.cantidad}</p>
            </div>
            <span>$${producto.precio}</span>    
    `
      carritoContenedorCheckout.appendChild(div);
    });
  };
  