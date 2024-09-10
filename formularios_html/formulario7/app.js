const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Banco de Dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'simba123',
    database: 'meubanco'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// Rota para processar o formulário
app.post('/submit', (req, res) => {
    const { nome, email } = req.body;
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(query, [nome, email], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir dados');
            throw err;
        }
        res.send('Dados inseridos com sucesso');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

