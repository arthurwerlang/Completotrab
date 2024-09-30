const connection = require('../config/db');

async function getLocais(request, response) {
// Captura o valor de 'materialTipo' enviado no corpo da requisição e armazena em um array(multiplos valores)
    let params = Array(
        request.body.materialTipo
    ) 

    const query = "select m.nome as material, ld.nome as local, ld.endereco " +
        "from materiais m " +
        "left join materiais_locais ml on m.id = ml.material_id " +
        // Faz um LEFT JOIN com a tabela 'materiais_locais', ligando a tabela 'materiais' através de 'material_id'
        "left join locais_descarte ld on ld.id = ml.local_id " +
        "WHERE ld.endereco LIKE '%São Leopoldo%' And m.nome = ? " +
        "group by ld.nome, m.nome, ld.endereco " +
        // Agrupa os resultados por nome do local, evitar duplicação de nomes
        "order by m.nome;";
    
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
