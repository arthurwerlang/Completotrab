const express = require('express');
const cors = require('cors');
const path = require('path');
const materialRouter = require('./routes/materialRouter');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', materialRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
