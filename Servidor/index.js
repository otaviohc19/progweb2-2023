// index.js
const express = require('express');  // Importando o express (criar servidor)
const app = express();  // Inicializando o servidor (chama a variável)
const port = 3000;  // Porta dedicada ao servidor

/*
GET: Pegar a informação
POST: 
PUT: 
DELETE: 
*/ 

// DADOS
let produtos = [
    {id: 1, nome: 'Mouse', preco: 20.00},
    {id: 2, nome: 'Teclado', preco: 49.99},
    {id: 3, nome: 'Headphone', preco: 79.90},
]

// ROTAS
// o / significa "página inicial"
app.get('/', (request, response) => {
    response.send('Rota inicial');
})

// Retornar todos os produtos
app.get('/produtos', (req, res) => {
    res.send(produtos);
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


// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});