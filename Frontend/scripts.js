let url = 'http://localhost:3000';
let produtos = [];

getProdutos();

let form = document.querySelector('form');
form.addEventListener('submit', criarProduto);

function criarProduto(ev) {
    ev.preventDefault();

    let nome = document.querySelector('#txtNome');
    let preco = document.querySelector('#txtPreco');

    let produto = {
        nome,
        preco
    }

    fetch(url + '/produtos', {
        method: "POST",
        body: JSON.stringify(produto),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(resp => resp.json())
        .then(data => alert(data))
        .catch(erro => console.error(erro));
}

function getProdutos() {
    fetch(url + '/produtos')
        .then(resp => resp.json())
        .then(data => mostraProdutos(data))
        .catch(erro => console.error(erro));
}

function mostraProdutos(data) {
    produtos = data;

    let divLista = document.querySelector('#divLista')
    divLista.innerHTML = '';

    for (let prod of produtos){
        let html = `
            <div class="flex border px-3 py-1">
                <div class="w-10">${prod.id}</div>
                <div class="flex-grow">${prod.nome}</div>
                <div class="w-12 text-right">${prod.preco}</div>
            </div>
        `;
        divLista.insertAdjacentHTML('beforeend', html);
    }
}