let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Adicionar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosCategoria = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria[0].categoria.nombre; // Atualiza o título com o nome da categoria
            cargarProductos(productosCategoria); // Carrega apenas os produtos da categoria clicada
        } else {
            tituloPrincipal.innerText = "Todos os produtos";
            cargarProductos(productos); // Carrega todos os produtos
        }

    })
});

const botonesCamisetas = document.querySelectorAll(".boton-menu.boton-categoria");

botonesCamisetas.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const categoriaSelecionada = e.currentTarget.id;
        const productosCategoria = productos.filter(producto => producto.categoria.id === categoriaSelecionada);
        tituloPrincipal.innerText = e.currentTarget.innerText; // Atualiza o título com o nome da categoria
        cargarProductos(productosCategoria); // Carrega apenas os produtos da categoria clicada
        aside.classList.remove("aside-visible"); // Fecha o aside após selecionar a categoria
    });
});

// Botão "Todos os produtos"
const botonTodos = document.querySelector("#todos");
botonTodos.addEventListener("click", () => {
    tituloPrincipal.innerText = "Todos os produtos";
    cargarProductos(productos); // Carrega todos os produtos
    aside.classList.remove("aside-visible"); // Fecha o aside após selecionar a categoria
});

// Botão "Pelúcias"
const botonPelucias = document.querySelector("#abrigos");
botonPelucias.addEventListener("click", () => {
    const productosPelucias = productos.filter(producto => producto.categoria.id === "pelucias");
    tituloPrincipal.innerText = "Pelúcias"; // Atualiza o título
    cargarProductos(productosPelucias); // Carrega apenas os produtos de pelúcias
    aside.classList.remove("aside-visible"); // Fecha o aside após selecionar a categoria
});

// Botão "Outros"
const botonOutros = document.querySelector("#pantalones");
botonOutros.addEventListener("click", () => {
    const productosOutros = productos.filter(producto => producto.categoria.id === "outros");
    tituloPrincipal.innerText = "Outros"; // Atualiza o título
    cargarProductos(productosOutros); // Carrega apenas os produtos de outros
    aside.classList.remove("aside-visible"); // Fecha o aside após selecionar a categoria
});



function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}