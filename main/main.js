const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";

function getDato() {
  fetch(URLMain)
    .then((response) => response.json())
    .then((res) => {
      // Aquí se llama la función para crear las cards
      createCards(res);
    })
    .catch((err) => {
      main.insertAdjacentHTML("beforeend",
        `<div class="alert alert-danger" role="alert">
          ${err.message}
        </div>`);
    });
}

function createCards(prods) {
  let i = 0; // Inicializamos el índice
  
  do {
    const producto = prods[i]; // Obtenemos el producto actual

    // Creamos una tarjeta (card) para cada producto
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "230px";
    card.style.margin = "20px";
    card.style.display = "inline-block"; // Esto coloca las cards en fila

    const btnId = `verMasBtn-${i}`; // Creamos un ID único para el botón

    card.innerHTML = `
      <img src="${producto.image}" class="card-img-top" alt="${producto.title}" style="height: 200px; object-fit: contain;">
      <div class="card-body">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text">$${producto.price}</p>
        <p class="card-text text-truncate">${producto.description}</p>
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Mas informacion
        </button>
      </div>
    `;

    // Insertamos la card dentro del main
    main.appendChild(card);

    // Agregamos el evento al botón para mostrar la descripción en el modal
    setTimeout(() => {
      const boton = document.getElementById(btnId);
      boton.addEventListener("click", () => {
        // Actualizamos el contenido del modal con la descripción y el título
        document.getElementById("modalDescripcionContenido").innerText = producto.description;
        document.getElementById("descripcionModalLabel").innerText = producto.title;
      });
    }, 0);

    i++; // Incrementamos el índice para ir al siguiente producto
  } while (i < prods.length); // El ciclo continuará mientras haya productos
}

// Llamamos la función para obtener los datos
getDato();