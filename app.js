// MENU DE HAMBURGUESAS

const iconoMenu = document.querySelector(".icono-menu");
const headerNav = document.querySelector(".header__nav");

iconoMenu.addEventListener("click", () => {
  headerNav.classList.toggle("header__nav__visible");

  if (headerNav.classList.contains("header__nav__visible ")) {
    iconoMenu.setAttribute("aria-label", "Cerrar menú");
  } else {
    iconoMenu.setAttribute("aria-label", "Abrir menú");
  }
});
