// index.js
const express = require('express');  // Importando o express (criar servidor)
const cors = require('cors');
const app = express();  // Inicializando o servidor (chama a variável)
const port = 3000;  // Porta dedicada ao servidor

// Fazer o tratamento para json
// Middleware - Intermediário
app.use(express.json());
app.use(cors());    // Liberando acesso de qualquer origem

/*
GET: Pegar a informação
POST: Criar informação
PUT: Editar informação
DELETE: Remover informação
*/ 

// DADOS
let produtos = [
    {id: 1, nome: 'Mouse', preco: 20.00},
    {id: 2, nome: 'Teclado', preco: 49.99},
    {id: 3, nome: 'Headphone', preco: 79.90},
]

// ROTAS DE UMA API REST
// o / significa "página inicial"
app.get('/', (request, response) => {
    return response.send('Rota inicial');
})

// Retornar todos os produtos
app.get('/produtos', (req, res) => {
    return res.send(produtos);
})

// Retornar um produto em específico
app.get('/produto/:id', (req, res) => {
    let id = req.params.id;

    for (let produto of produtos){
        if (produto.id == id) {
            return res.send(produto);
        }
    }

    return res.send({msg: 'Produto não encontrado'});
})

// Criar um novo produto
app.post('/produtos', (req, res) => {
    let nome = req.body.nome;
    let preco = req.body.preco;

    let id = produtos.length + 1;

    let prod = {
        id,
        nome,
        preco
        // variável e propriedade têm o mesmo nome, então o JS reconhece isso
        // id: id, nome: nome, preco: preco
    }
    produtos.push(prod);

    return res.send(prod);
})

// Editar um produto
app.put('/produtos/:id', (req, res) => {
    let id = req.params.id;

    // Desestruturação
    let {nome, preco} = req.body;

    let index = produtos.findIndex(prod => prod.id == id);

    if (index == -1) {
        return res.status(400).send({msg: 'Produto não encontrado'});
    }

    produtos[index].nome = nome;
    produtos[index].preco = preco;

    return res.send(produtos[index]);
})

// Remove um produto
app.delete('/produtos/:id', (req, res) => {
    let id = req.params.id;

    // Tenta pegar o produto
    let index = produtos.findIndex(prod => prod.id == id);
    // Caso não exista, retorna um erro
    if (index == -1) {
        return res.status(400).send({msg: 'Produto não encontrado'});
    }

    // Retira o elemento da lista
    produtos = produtos.filter(prod => prod.id != id);

    res.send({id});
})


// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});