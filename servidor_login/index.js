// 1 Instalar os pacotes express, cors, nodmeon
// 2 Criar o script do nodemon no package.json
// 3 Importar os pacotes e inicializá-los
// 4 Criar a Rota inicial
// 5 Iniciar a escuta do servidor em uma porta escohida

const express = require('express');  // Importando o express
const cors = require('cors');
const bd = require('./bd'); // Importando a conexão como BD

const app = express();  // Inicializando o servidor
const port = 3000;  // Porta dedicada ao servidor

// middleware
app.use(express.json());
app.use(cors());     // Liberando acesso de qualquer origem


app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.post('/usuarios', async (req, res) => {
    let {email, senha} = req.body;

    let usuario = await bd.query(
        `SELECT * FROM usuarios
        WHERE email = ?`,
        [email]
    );

    if (usuario) {
        return res.status(400).send({ erro: 'ERR_USER_EXISTS '});
    }

    usuario = await bd.query(
        `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
        [email, senha]
    );

    return res.send({ id: usuario.insertId });
})

app.post('/login', async (req, res) => {
    let {email, senha} = req.body;

    let usuario = await bd.query(
        `SELECT * FROM usuarios
        WHERE email = ?`,
        [email]
    );

    if (!usuario) {
        return res.status(400).send({ erro: 'ERR_USER_NOT_EXISTS' });
    }

    // CRIAR O TOKEN
    let token = {};

    // RETORNAR O TOKEN
    return res.send({token: token})
})


// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});