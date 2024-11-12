// Definir e utilizar rotas que serão acessadas api/porta do servidor


const express = require('express'); // Importar o pacote express (servidor)

const cors = require('cors');// Responsável por lidar com requisições externas

const router = require('./routes/materialRouter');// Importar as rotas para serem executadas na aplicação

const dotenv = require('dotenv').config();// Importar o pacote dotenv, gerenciador de variáveis de ambiente
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API Reeco",
        version: "1.0.0",
        description: "API CRUD para gerenciar rotas de dados de endereços",
      },
      servers: [{ url: "http://localhost:3006" }],
    },
    apis: [`${__dirname}/routes/*.js`],
  };

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(express.json());// Habilitar o recebimento de requests em formato JSON

app.use(cors())

app.use('/api', router);
// Setar a porta do servidor, a parir do arquivo .env
app.set('port', process.env.PORT || 1903);

module.exports = app;