const app = require('./app');
const port = 3002;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
