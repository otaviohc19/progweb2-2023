// 1 Instalar os pacotes express, cors, nodmeon
// 2 Criar o script do nodemon no package.json
// 3 Importar os pacotes e inicializá-los
// 4 Criar a Rota inicial
// 5 Iniciar a escuta do servidor em uma porta escohida

const express = require('express');  // Importando o express
const cors = require('cors');
const bd = require('./bd'); // Importando a conexão como BD

const bcrypt = require('bcryptjs'); // para criptografar as senhas
const jwt = require('jsonwebtoken'); // Criar os tokens de autenticação

const app = express();  // Inicializando o servidor
const port = 3000;  // Porta dedicada ao servidor

const SEGREDO = "IFTMCC";

// middleware
app.use(express.json());
app.use(cors());     // Liberando acesso de qualquer origem


app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

// Cadastrar um novo usuário
app.post('/usuarios', async (req, res) => {
    let {email, senha} = req.body;

    let usuario = await bd.query(
        `SELECT * FROM usuarios
        WHERE email = ?`,
        [email]
    );

    if (usuario.lenght > 0) {
        return res.status(400).send({ erro: 'ERR_USER_EXISTS '});
    }

    // Criptografar a senha
    let crypto = await bcrypt.hash(senha, 10);

    usuario = await bd.query(
        `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
        [email, crypto]
    );

    console.log('Inseriu', usuario.insertId);

    return res.send({ id: usuario.insertId });
})

// logar um usuário
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

    usuario = usuario[0];

    // bcrypt.compare(senha enciada pelo form, senha armazenada no BD)
    let compara = await bcrypt.compare(senha, usuario.senha);

    // Senha incorreta, sai da função
    if(compara == false) {
        return res.status(401).send({erro: 'ERR_PASS_INCORRECT'});
    }

    // Senha correta, cria o token
    let info = {
        id: usuario.id,
        acesso: 'user' // user, admin, moderator
    }

    let config = {
        expiresIn: 60 * 60 * 24     // Vai durar 1 dia (em segundos)
    }

    // CRIAR O TOKEN
    let token = jwt.sign(info, SEGREDO, config);

    // RETORNAR O TOKEN
    return res.send({token: token})
})

app.post('/token', async (req, res) => {
    let {token} = req.body;

    try {
        let verifica = jwt.verify(token, SEGREDO);
        
        return res.send({valido: true});
    } catch (err) {
        return res.send({valido: false});
    }
});

// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});