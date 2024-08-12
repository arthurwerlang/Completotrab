//fetch em javascript
const connection = require('./config/db');

async function getLocais(request,response) {
    const query = "SELECT * FROM materiais_locais"
    
    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else{
            response.status(400).json({
                sucess: false,
                message:"Erro!"
                sql: err
            })
        }
    })
}

module.exports = {
    getLocais
}


