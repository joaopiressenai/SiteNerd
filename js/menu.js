const abrirMenu = document.querySelector("#abrir-menu");
const fecharMenu = document.querySelector("#fechar-menu");
const aside = document.querySelector("aside");

abrirMenu.addEventListener("click", () => {
    aside.classList.add("aside-visivel");
});

fecharMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visivel");
});
