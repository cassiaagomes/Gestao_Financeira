const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = 'dados.json';

// Middleware para permitir JSON e CORS
app.use(cors());
app.use(express.json());

// Rota para obter os dados
app.get('/dados', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const dados = fs.readFileSync(DATA_FILE);
        res.json(JSON.parse(dados));
    } else {
        res.json([]);
    }
});

// Rota para adicionar uma nova entrada/saída
app.post('/dados', (req, res) => {
    const novaEntrada = req.body;
    
    let dados = [];
    if (fs.existsSync(DATA_FILE)) {
        dados = JSON.parse(fs.readFileSync(DATA_FILE));
    }
    
    dados.push(novaEntrada);
    fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));
    
    res.json({ message: 'Registro salvo com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
