const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const mainProds = document.getElementById("mainProds");

function getDato() {
  fetch(URLMain)
    .then((response) => response.json())
    .then((res) => {
      createModal();     // Crear el modal antes de mostrar los productos
      createCards(res);  // Luego creamos las tarjetas
    })
    .catch((err) => {
      main.insertAdjacentHTML("beforeend", `
        <div class="alert alert-danger" role="alert">
          ${err.message}
        </div>`);
    });
}

function createCards(prods) {
  let i = 0;
  
  do {
    const producto = prods[i];
    const btnId = `verMasBtn-${i}`; //Declaro mi id del boton para mas informacion (modal)

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "230px";
    card.style.margin = "20px";
    card.style.display = "inline-block";

   
    card.innerHTML = `
      <img src="${producto.image}" class="card-img-top" alt="${producto.title}" style="height: 200px; object-fit: contain;">
      <div class="card-body">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text">$${producto.price}</p>
        <p class="card-text text-truncate">${producto.description}</p>
        <button id="${btnId}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Más información
        </button>
      </div>
    `;

    main.appendChild(card);

    const boton = card.querySelector(`#${btnId}`);
    boton.addEventListener("click", () => {
      // Al hacer clic, actualizamos el modal
      document.getElementById("modalTituloProducto").innerText = producto.title;
      document.getElementById("modalDescripcionContenido").innerText = producto.description;
    });

    i++;
  } while (i < prods.length);
}

//  Se creael modal 
function createModal() {
  const modalHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="descripcionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="descripcionModalLabel">Detalles del producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <h5 id="modalTituloProducto"></h5>
            <p id="modalDescripcionContenido"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
}

/* //function para que filtre por categorias
function getCategories(){
  const options = {"method":"GET"};
fetch (URLMain+"categories/", options)
.then((response) => {
  response.json().then((res)=>{
     res.forEach((cat)=>{
      ulMenu.insertAdjacentHTML("afterbegin",
        `<li><a class="dropdown-item" onclick="getData(´category/${cat}´);"<${cat}<a/></li>`);      
  });
  });
}).catch((err)=>{
  main.insertAdjacentHTML("beforeend",
    `<div class="alert alert-danger" role="alert">
      ${err.message}
    </div>`);
});
}*/
//Segunda forma para filtrar por categorias
function getCategories() {
  const ulMenu = document.getElementById("ulMenu");

  fetch(URLMain + "categories/")
    .then((response) => response.json())
    .then((res) => {
      res.forEach((cat) => {
        ulMenu.insertAdjacentHTML("beforeend", `
          <li>
            <a class="dropdown-item" href="#" onclick="getDatoPorCategoria(&quot;${cat}&quot;)">${cat}</a>
          </li>
        `);
      });

      // Botón para mostrar todos los productos
      ulMenu.insertAdjacentHTML("beforeend", `
        <li><hr class="dropdown-divider"></li>
        <li>
          <a class="dropdown-item text-primary" href="#" onclick="getDato()">Todos</a>
        </li>
      `);
    })
    .catch((err) => {
      main.insertAdjacentHTML("beforeend", `
        <div class="alert alert-danger" role="alert">${err.message}</div>
      `);
    });
}
function getDatoPorCategoria(categoria) {
  fetch(URLMain + `category/${categoria}`)
    .then((response) => response.json())
    .then((res) => {
      main.innerHTML = ""; // Limpiar tarjetas anteriores
      main.innerHTML = `<h3 class="mb-3 text-capitalize">Categoría: ${categoria}</h3>`;//agregamos el titulo de la categoria segun la opcion.
createCards(res);
      createCards(res);    // Crear tarjetas con productos filtrados
    })
    .catch((err) => {
      main.insertAdjacentHTML("beforeend", `
        <div class="alert alert-danger" role="alert">${err.message}</div>
      `);
    });
}

getCategories();
getDato();

