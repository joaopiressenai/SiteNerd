document.addEventListener("DOMContentLoaded", function() {
    let produtosNoCarrinho = localStorage.getItem("produtos-no-carrinho");
    produtosNoCarrinho = JSON.parse(produtosNoCarrinho);

    const contenedorCarrinhoVazio = document.querySelector("#carrinho-vazio");
    const contenedorCarrinhoProdutos = document.querySelector("#carrinho-produtos");
    const contenedorCarrinhoAcoes = document.querySelector("#carrinho-acoes");
    const contenedorCarrinhoComprado = document.querySelector("#carrinho-comprado");
    let botoesRemover = document.querySelectorAll(".carrinho-produto-remover");
    const botaoEsvaziar = document.querySelector("#carrinho-acoes-esvaziar");
    const contenedorTotal = document.querySelector("#total");
    const botaoComprar = document.querySelector("#carrinho-acoes-comprar");

    function carregarProdutosCarrinho() {
        if (produtosNoCarrinho && produtosNoCarrinho.length > 0) {
    
            contenedorCarrinhoVazio.classList.add("disabled");
            contenedorCarrinhoProdutos.classList.remove("disabled");
            contenedorCarrinhoAcoes.classList.remove("disabled");
            contenedorCarrinhoComprado.classList.add("disabled");
        
            contenedorCarrinhoProdutos.innerHTML = "";
        
            produtosNoCarrinho.forEach(produto => {
        
                const div = document.createElement("div");
                div.classList.add("carrinho-produto");
                div.innerHTML = `
                    <img class="carrinho-produto-imagem" src="${produto.imagem}" alt="${produto.titulo}">
                    <div class="carrinho-produto-titulo">
                        <small>Título</small>
                        <p>${produto.titulo}</p>
                    </div>
                    <div class="carrinho-produto-quantidade">
                        <small>Quantidade</small>
                        <p>${produto.quantidade}</p>
                    </div>
                    <div class="carrinho-produto-preco">
                        <small>Preço</small>
                        <p>R$${produto.preco}</p>
                    </div>
                    <div class="carrinho-produto-subtotal">
                        <small>Subtotal</small>
                        <p>R$${produto.preco * produto.quantidade}</p>
                    </div>
                    <button class="carrinho-produto-remover" id="${produto.id}"><i class="bi bi-trash-fill"></i></button>
                `;
        
                contenedorCarrinhoProdutos.append(div);
            })
        
            atualizarBotoesRemover();
            atualizarTotal();
        
        } else {
            contenedorCarrinhoVazio.classList.remove("disabled");
            contenedorCarrinhoProdutos.classList.add("disabled");
            contenedorCarrinhoAcoes.classList.add("disabled");
            contenedorCarrinhoComprado.classList.add("disabled");
        }
    }
    

    carregarProdutosCarrinho();

    function atualizarBotoesRemover() {
        botoesRemover = document.querySelectorAll(".carrinho-produto-remover");

        botoesRemover.forEach(boton => {
            boton.addEventListener("click", removerDoCarrinho);
        });
    }

    function removerDoCarrinho(e) {
        Toastify({
            text: "Produto removido",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ffff00 , #ff8c00 )",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: ".75rem",
              color: "black"
            },
            offset: {
                x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();

        const idBotao = e.currentTarget.id;
        const index = produtosNoCarrinho.findIndex(produto => produto.id === idBotao);
        
        produtosNoCarrinho.splice(index, 1);
        carregarProdutosCarrinho();

        localStorage.setItem("produtos-no-carrinho", JSON.stringify(produtosNoCarrinho));
    }

    botaoEsvaziar.addEventListener("click", esvaziarCarrinho);
    function esvaziarCarrinho() {

        Swal.fire({
            title: 'Tem certeza?',
            icon: 'question',
            html: `Você removerá do carrinho ${produtosNoCarrinho.reduce((acc, produto) => acc + produto.quantidade, 0)} produtos.`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                produtosNoCarrinho.length = 0;
                localStorage.setItem("produtos-no-carrinho", JSON.stringify(produtosNoCarrinho));
                carregarProdutosCarrinho();
            }
          })
    }


    function atualizarTotal() {
        const totalCalculado = produtosNoCarrinho.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
        contenedorTotal.innerText = `R$${totalCalculado.toFixed(2)}`;
    }

    botaoComprar.addEventListener("click", comprarCarrinho);
    function comprarCarrinho() {

        produtosNoCarrinho.length = 0;
        localStorage.setItem("produtos-no-carrinho", JSON.stringify(produtosNoCarrinho));
        
        contenedorCarrinhoVazio.classList.add("disabled");
        contenedorCarrinhoProdutos.classList.add("disabled");
        contenedorCarrinhoAcoes.classList.add("disabled");
        contenedorCarrinhoComprado.classList.remove("disabled");

    }
});
