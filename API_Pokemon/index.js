// 1 Instalar os pacotes (npm i express cors nodemon)
// 2 Criar o script do nodemon no package.json
// 3 Importar os pacotes e inicializá-los
// 4 Criar a rota inicial
// 5 Iniciar a escuta do servidor em uma porta

const express = require('express');
const cors = require('cors');
const bd = require('./bd');     // Importando a conexão com o DB
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Pag inicial
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Host
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

// Buscar do BD (async e await serve para esperar dar a resposta antes de sair da função)
app.get('/pokemon', async (req, res) => {
    let listaPoke = await bd.query("SELECT id, nome FROM pokemon");

    return res.status(200).json(listaPoke);
});

// http://localhost:3000/pokemon/busca/'nome'
app.get('/pokemon/busca/:nome', async (req, res) => {
    let nome = req.params.nome;
    let poke = await bd.query(
        `SELECT * FROM pokemon WHERE nome = ? `,    // SQL
        [nome]                                      // Lista de variáveis
    ); // Método usado para evitar SQL Injection

    return res.status(200).json(poke);
})