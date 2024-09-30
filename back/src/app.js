// Definir e utilizar rotas que serão acessadas api/porta do servidor


const express = require('express'); // Importar o pacote express (servidor)

const cors = require('cors');// Responsável por lidar com requisições externas

const router = require('./routes/materialRouter');// Importar as rotas para serem executadas na aplicação

const dotenv = require('dotenv').config();// Importar o pacote dotenv, gerenciador de variáveis de ambiente


const app = express();


app.use(express.json());// Habilitar o recebimento de requests em formato JSON

app.use(cors())

app.use('/api', router);
// Setar a porta do servidor, a parir do arquivo .env
app.set('port', process.env.PORT || 1903);

module.exports = app;