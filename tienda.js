// Constructor de objetos

class Producto {
  constructor(nombre, precio, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }
}

const productos = [];

fetch("cerveza.json")
  .then((response) => {
    return response.json();
  })
  .then((bebidas) => {
    bebidas.forEach((cervezaObject) => {
      let aux = new Producto(
        cervezaObject.nombre,
        cervezaObject.precio,
        cervezaObject.img
      );
      productos.push(aux);
    });
    agregarProductosHtml(productos);
    agregarbutton();
  });
// AGREGA PRODUCTOS AL HTML CARRITO

// Agregamos productos al dom

function agregarProductosHtml() {
  updateLocalStorage();

  productos.forEach((producto) => {
    // estructura en html

    const divcontenedor = document.querySelector(".row");

    const div4 = document.createElement("div");
    div4.className = "tienda__galeria";

    const img = document.createElement("img");
    img.src = producto.img;
    img.className = "tienda__img";

    const div5 = document.createElement("div");
    div5.className = "tienda__texto";

    const h2 = document.createElement("h2");
    h2.className = "tienda__nombre";
    h2.innerText = producto.nombre;

    const p = document.createElement("p");
    p.className = "tienda__precio";
    p.innerText = producto.precio + "$";

    const button = document.createElement("button");
    button.className = "tienda__button";

    button.addEventListener("click", () => {
      agregarALocalStorage(producto);
    });

    button.innerText = "Agregar al carrito";

    divcontenedor.append(div4);
    div4.append(img, div5);
    div5.append(h2, p, button);
  });
}

// LOCAL STORAGE

function agregarALocalStorage(producto) {
  let productos = localStorage.getItem("productos");
  productos = JSON.parse(productos);
  let arrayProductos = [];

  if (productos !== null) {
    productos.forEach((e) => {
      arrayProductos.push(e);
    });
  }
  arrayProductos.push(producto);

  localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

// INICIO DE CARRITO EPICO

function agregarbutton() {
  const addcarritobutton = document.querySelectorAll(".tienda__button");

  addcarritobutton.forEach((agregarProductosCarrito) => {
    agregarProductosCarrito.addEventListener("click", addClick);
  });

  const comprarButton = document.querySelector(".btn__comprar");

  comprarButton.addEventListener("click", comprarButtonClicked);
}

function addClick(event) {
  const button = event.target;
  const item = button.closest(".tienda__galeria");

  let itemName = item.querySelector(".tienda__nombre");
  itemName = itemName.textContent;
  let itemPrice = item.querySelector(".tienda__precio");
  itemPrice = itemPrice.textContent;
  const itemImg = item.querySelector(".tienda__img").src;

  addItemToShoppingCart(itemName, itemPrice, itemImg);

  Toastify({
    text: "Agregado al carrito",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right,#21ad3c,#2f7813)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// agregar producto al carrito
function addItemToShoppingCart(itemName, itemPrice, itemImg) {
  const shoppingCartItemsContainer = document.querySelector(
    ".shoppingCartItemsContainer"
  );

  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemName) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;

      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");

  const shoppingCartContent = `
      <div class="shoppingCartItem">
    <div>
    <div class="container__producto">
      <img  src=${itemImg}  class="container__img"/>
      <h3 class= "shoppingCartItemTitle" >${itemName}</h3>
    </div>
    </div>

    <div>
    <div class="container__precio">
      <h3 class="shoppingCartItemPrice" >${itemPrice}</h3>
    </div>
    </div>

  <div>
    <div class="container__buttons">
      <input class="shoppingCartItemQuantity" type="number" value="1" />
      <button class="buttonDelete" >x</button>
    </div>
  </div>
    </div>
    `;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  // funcion para borrar el producto
  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  // funcion para modificar el input
  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}
// button actualizacion de precio
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;

  let productos = localStorage.getItem("productos");
  productos = JSON.parse(productos);
  console.log(productos);

  const item = buttonClicked.closest(".shoppingCartItem");

  let itemName = item.querySelector(".shoppingCartItemTitle");
  itemName = itemName.textContent;
  let itemPrice = item.querySelector(".shoppingCartItemPrice");
  itemPrice = itemPrice.textContent;
  const itemImg = item.querySelector(".container__img").src;

  console.log(itemName);
  console.log(itemPrice);
  console.log(itemImg);

  let index = productos
    .map((objeto, index) => (objeto.nombre == itemName ? index : ""))
    .filter(String)
    .reverse();

  console.log(index);

  let arrayProductos = [];

  if (productos !== null) {
    productos.forEach((e) => {
      arrayProductos.push(e);
    });
  }

  index.forEach((element) => {
    console.log(element);

    arrayProductos.splice(element, 1);
  });

  localStorage.setItem("productos", JSON.stringify(arrayProductos));

  buttonClicked.closest(".shoppingCartItem").remove();

  updateShoppingCartTotal();
}

function quantityChanged(event) {
  let quantity = document.querySelector(".shoppingCartItemQuantity");
  console.log(quantity);
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  const shoppingCartItemsContainer = document.querySelector(
    ".shoppingCartItemsContainer"
  );
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
  localStorage.clear();
  Swal.fire(
    "Su Compra se a realizado con exitos",
    "Muchas gracias por la compra",
    "success"
  );
}

const updateLocalStorage = () => {
  let productos = localStorage.getItem("productos");
  productos = JSON.parse(productos);
  if (productos != null) {
    productos.forEach((e) => {
      addItemToShoppingCart(e.nombre, e.precio, e.img);
      console.log(e);
    });
  }
};
