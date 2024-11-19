const connection = require('../config/db');

async function getLocais(request, response) {
// Captura o valor de 'materialTipo' enviado no corpo da requisição e armazena em um array(multiplos valores)
    let params = Array(
        request.body.materialTipo
    ) 

    const query = `
        SELECT 
            m.nome AS material, 
            ld.nome AS local, 
            ld.endereco, 
            ld.horario, 
            ld.imagem
        FROM materiais m
        LEFT JOIN materiais_locais ml ON m.id = ml.material_id
        LEFT JOIN locais_descarte ld ON ld.id = ml.local_id
        WHERE ld.endereco LIKE '%São Leopoldo%' AND m.nome = ?
        GROUP BY ld.nome, m.nome, ld.endereco, ld.horario, ld.imagem
        ORDER BY m.nome;
    `;
    
    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,  
                message: "Erro!",
                sql: err
            });
        }
    });
}

module.exports = {
    getLocais
};
