const produtos = [
    { id: 1, nome: "Headset Gamer", preco: 150, estoque: 5, emoji: "🎧" },
    { id: 2, nome: "Teclado Mecânico", preco: 250, estoque: 3, emoji: "⌨️" },
    { id: 3, nome: "Mouse Gamer", preco: 100, estoque: 10, emoji: "🖱️" },
    { id: 4, nome: "Controle Gamer", preco: 200, estoque: 0, emoji: "🎮" },
    { id: 5, nome: "Monitor Gamer", preco: 1200, estoque: 2, emoji: "🖥️" },
    { id: 6, nome: "Notebook", preco: 3500, estoque: 4, emoji: "💻" }
];

let carrinho = [];

function exibirProdutos() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="card-produto">
                <div class="produto-imagem">${produto.emoji}</div>
                <h3>${produto.nome}</h3>
                <p class="preco">${formatarPreco(produto.preco)}</p>
                <p class="estoque">Estoque: ${produto.estoque} unidades</p>
                <button class="btn-adicionar" onclick="adicionarItemCarrinho(${produto.id})" ${produto.estoque === 0 ? "disabled" : ""}>
                    ${produto.estoque === 0 ? "ESGOTADO" : "ADICIONAR"}
                </button>
            </div>
        `;
    });
}

function formatarPreco(valor) {
    return valor.toLocaleString("en", { style: "currency", currency: "USD" });
}

function adicionarItemCarrinho(id) {
    const produto = produtos.filter(produto => produto.id === id)[0];

    if (!produto) return;

    const item = carrinho.filter(item => item.id === id)[0];

    if (item === undefined) {
        carrinho.push({ id: produto.id, quantidade: 1 });
    } else {
        if (item.quantidade >= produto.estoque) {
            alert("Estoque insuficiente!");
            return;
        }

        item.quantidade++;
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div class="carrinho-vazio">
                <p></p>
                <p>Seu carrinho está vazio!</p>
            </div>
        `;
    }

    let total = 0;
    let quantidade = 0;

    carrinho.forEach(item => {
        const produto = produtos.filter(produto => produto.id === item.id)[0];
        const subtotal = item.quantidade * produto.preco;

        total += subtotal;
        quantidade += item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">
                <div class="item-info">
                    <h4>${produto.emoji} ${produto.nome}</h4>
                    <p>${formatarPreco(subtotal)}</p>

                    <div class="controles">
                        <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn-remover" onclick="removerItem(${item.id})">🗑️</button>
            </div>
        `;
    });

    document.getElementById("contador-carrinho").textContent = quantidade;
    document.getElementById("total-carrinho").textContent = formatarPreco(total);
}

function alterarQuantidade(id, valor) {
    const item = carrinho.filter(item => item.id === id)[0];
    const produto = produtos.filter(produto => produto.id === id)[0];

    if (!item) return;

    if (valor === 1 && item.quantidade >= produto.estoque) {
        alert("Estoque insuficiente!");
        return;
    }

    item.quantidade += valor;

    if (item.quantidade === 0) {
        removerItem(id);
        return;
    }

    atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }


    let valor = confirm("Deseja finalizar a compra?");


    if (valor === true) {
        carrinho.forEach(item => {
            const produto = produtos.find(produto => produto.id === item.id);


            if (produto) {
                produto.estoque -= item.quantidade;
            }
        });

        carrinho = [];

        exibirProdutos();
        atualizarCarrinho();


        alert("Compra realizada com sucesso!");
    }
}

/* for(item of carrinho){
    const produto = carrinho.filter(produto => preoduto.id === item.id)[0];

    produto.estoque -= item.quantidade;

}

carrinho = [];

exibirProdutos()
atualizarCarrinho()

alert("Compra realizada com sucesso!"); */

        

/* function atualizar(id, quantidade){
    const item = carrinho.filter(item => item.id === id)[0];
    const produto = produtos.filter(produto => produto.id == id)[0]

    const novaQuantidade = item.quantidade +(-1)
    if(novaQuantidade <= 0){
        removerItem(id)
        return;
    }

    if(novaQuantidade > produto.estoque){
        alert("Estoque insuficiente!");
        return;
    }

    item.quantidade = novaQuantidade;
    atualizarCarrinho();
} */

exibirProdutos();
atualizarCarrinho();