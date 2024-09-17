const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Endpoint para listar arquivos JSON na pasta 'data'
app.get('/list-json-files', (req, res) => {
    const dataPath = path.join(__dirname, 'public', 'data');
    fs.readdir(dataPath, (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao listar arquivos.');
        }
        // Filtrar apenas arquivos JSON
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        res.json(jsonFiles);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
