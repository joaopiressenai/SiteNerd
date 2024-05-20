let produtos = [];

fetch("./js/produtos.json")
    .then(response => response.json())
    .then(data => {
        produtos = data;
        carregarProdutos(produtos);
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));

const contenedorProdutos = document.querySelector("#contenedor-productos");
const botoesCategorias = document.querySelectorAll("#filterNav .nav-link");
const numerito = document.querySelector("#numerito");

botoesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botoesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaSelecionada = e.currentTarget.id;
        let produtosCategoria = [];

        if (categoriaSelecionada !== "todos") {
            produtosCategoria = produtos.filter(produto => produto.categoria.id === categoriaSelecionada);
        } else {
            produtosCategoria = produtos; // Carrega todos os produtos
        }

        carregarProdutos(produtosCategoria); // Carrega os produtos da categoria clicada
    });
});

function carregarProdutos(produtosEscolhidos) {
    contenedorProdutos.innerHTML = "";

    produtosEscolhidos.forEach(produto => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
            <img class="produto-imagem" src="${produto.imagem}" alt="${produto.titulo}">
            <div class="produto-detalhes">
                <h3 class="produto-titulo">${produto.titulo}</h3>
                <p class="produto-preco">R$${produto.preco.toFixed(2)}</p>
                <button class="produto-adicionar" id="${produto.id}">Adicionar ao carrrinho</button>
            </div>
        `;
        contenedorProdutos.append(div);
    });

    atualizarBotoesAdicionar();
}

function atualizarBotoesAdicionar() {
    const botoesAdicionar = document.querySelectorAll(".produto-adicionar");

    botoesAdicionar.forEach(boton => {
        boton.addEventListener("click", adicionarAoCarrinho);
    });
}

let produtosNoCarrinho;

let produtosNoCarrinhoLS = localStorage.getItem("produtos-no-carrinho");

if (produtosNoCarrinhoLS) {
    produtosNoCarrinho = JSON.parse(produtosNoCarrinhoLS);
    atualizarNumerito();
} else {
    produtosNoCarrinho = [];
}

function adicionarAoCarrinho(e) {
    const idBotao = e.currentTarget.id;
    const produtoAdicionado = produtos.find(produto => produto.id === idBotao);

    if (produtosNoCarrinho.some(produto => produto.id === idBotao)) {
        const index = produtosNoCarrinho.findIndex(produto => produto.id === idBotao);
        produtosNoCarrinho[index].quantidade++;
    } else {
        produtoAdicionado.quantidade = 1;
        produtosNoCarrinho.push(produtoAdicionado);
    }

    atualizarNumerito();

    localStorage.setItem("produtos-no-carrinho", JSON.stringify(produtosNoCarrinho));
}

function atualizarNumerito() {
    let novoNumerito = produtosNoCarrinho.reduce((acc, produto) => acc + produto.quantidade, 0);
    numerito.innerText = novoNumerito;
}
