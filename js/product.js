import { Observer } from "./Observer.js";
import { Product } from "./classPd.js"

const whiteBtn = document.getElementById("white-color");
const blackBtn = document.getElementById("black-color");
const productPhone = document.getElementById("phone-case");
const productPoster = document.getElementById("poster");
const productShirt = document.getElementById("t-shirt");
const productPillow = document.getElementById("pillow");


// Precio de los productos
const productPrices = {
  "t-shirt": {  black: 13 ,white: 10 },
  poster: { black: 5 , white: 3  },
  "phone-case": {  black: 7, white: 5 },
  pillow: {black: 15 , white: 12 },
};

// Producto seleccionado
let currentProduct = "t-shirt";
let currentColor = "black";
let currentJoke = "";


// elementos de la página
const productVisualization = document.getElementById("product-visualization");
const productTitle = document.getElementById("product-title");
const productPrice = document.getElementById("product-price");
const selectedJoke = document.getElementById("selected-joke");

// actualizar la visualización del producto
function updateProductVisualization() {
  const imageUrl = `./img/${currentProduct}-${currentColor}.jpg`;
  productVisualization.src = imageUrl;
}

// actualizar el título 
function updateTitle() {
  const productTitleText = `${capitalizeFirstLetter(currentProduct)} ${currentColor === "white" ? "Blanco" : "Negro"}`;
  productTitle.textContent = productTitleText;
  updatePrice();
}

// actualizar el precio 
function updatePrice() {
  const productPriceText = `$${productPrices[currentProduct][currentColor]}`;
  productPrice.textContent = productPriceText;
}

// actualizar el chiste
function updateJoke() {
  selectedJoke.textContent = `NewJoke: ${currentJoke}`;
}

// suscripciones a los observadores
const observer = new Observer();

observer.subscribe(updateProductVisualization);
observer.subscribe(updateTitle);
observer.subscribe(updatePrice);
observer.subscribe(updateJoke);

// evento boton
whiteBtn.addEventListener("click", function () {
  currentColor = "white";
  observer.notify();
});

// evento boton
blackBtn.addEventListener("click", function () {
  currentColor = "black";
  observer.notify();
});

// cambiar imagen
function changeImage(product, color) {
  const imageUrl = `../img/product-${product}-${color}.jpg`;
  productVisualization.querySelector("img").src = imageUrl;
}

// evento de clic para los productos
productPhone.addEventListener("click", function () {
  let product = "case";
  let color =  "black" || "white"
  currentProduct = "phone-case";
  changeImage(product, color);
  observer.notify();
});

productPoster.addEventListener("click", function () {
  let product = "poster";
  let color =  "black" || "white"
  currentProduct = "poster";
  changeImage(product, color)
  observer.notify();
});

productShirt.addEventListener("click", function () {
  let product = "shirt";
  let color =  "black" || "white"
  currentProduct = "t-shirt";
  changeImage(product, color)
  observer.notify();
});

productPillow.addEventListener("click", function () {
  let product = "pillow";
  let color =  "black" || "white"
  currentProduct = "pillow";
  changeImage(product, color)
  observer.notify();
});

//capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

updateProductVisualization();
updateTitle();
updatePrice();

//PARTE TRES. BOTONES

//agregar producto 
const addToCartButton = document.getElementById("add-to-cart-btn");
addToCartButton.addEventListener("click", function () {
const product = new Product(
  currentProduct,
  currentColor === "white" ? "Blanco" : "Negro",
  productPrices[currentProduct][currentColor],
  currentJoke
);

const cartProducts = document.getElementById("cart-products");
const productMarkup = product.createMarkup();
cartProducts.appendChild(productMarkup);
});

// remover producto
function removeProduct(event) {
const productElement = event.target.closest(".cart-product");
productElement.remove();
}

// evento remover
const cartProducts = document.getElementById("cart-products");
cartProducts.addEventListener("click", function (event) {
if (event.target.classList.contains("remove-button")) {
  removeProduct(event);
}
});

// evento remove all 
const removeAllButton = document.getElementById("remove-all-btn");
removeAllButton.addEventListener("click", function () {
cartProducts.innerHTML = "";
});

const cartOpenButton = document.getElementById("cart-open-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartCloseButton = document.getElementById("cart-close-btn");

// abrir carrito
function openCart() {
cartOverlay.classList.add("open");
}

//cerrar el carrito
function closeCart() {
cartOverlay.classList.remove("open");
}

// evento abrir carrito
cartOpenButton.addEventListener("click", openCart);

// evento cerrar carrito
cartCloseButton.addEventListener("click", closeCart);
