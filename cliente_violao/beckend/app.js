const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão ao banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // substitua pelo seu usuário MySQL
  password: 'simba123', // substitua pela sua senha MySQL
  database: 'form_violao'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Rota para receber os dados do formulário e salvar no banco de dados
app.post('/submit-form', (req, res) => {
  const { nome, instrumento, contato } = req.body;
  const query = 'INSERT INTO cliente_violao (nome, instrumento, contato) VALUES (?, ?, ?)';
  db.query(query, [nome, instrumento, contato], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ error: 'Failed to insert data into database' });
      return;
    }
    db.commit()
    res.json({ message: 'Form data received and saved successfully', data: req.body });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
