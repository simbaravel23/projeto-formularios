const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do body-parser para obter dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do diretório para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'simba123',
    database: 'meubanco'  // Substitua pelo seu banco de dados
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Rota para renderizar o formulário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulairo.html'));
});

// Rota para processar o formulário
app.post('/submit', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).send('Nome e email são obrigatórios.');
  }

  const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
  db.query(query, [nome, email], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados.');
    }
    res.send('Dados inseridos com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
