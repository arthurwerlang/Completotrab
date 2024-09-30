// Seleciona o elemento da tabela onde as linhas serão inseridas
const addTable = document.getElementById("addTable")

fetchLocais();

// Define a função assíncrona que busca dados de locais
async function fetchLocais(event) {
    // Impede o comportamento padrão do evento, como o envio de um formulário ao servidor
    event.preventDefault();

    // Captura o valor do input com ID "material"
    let materialTipo = document.getElementById("material").value;

    // Cria um objeto data com a chave materialTipo
    let data = { materialTipo };

    // Realiza uma requisição POST para a API passando o materialTipo no corpo da requisição
    const response = await fetch('http://localhost:3002/api/locais', {
        method: "POST", // Define o método como POST
        headers: {
            "Content-Type": "application/json" // Define que o corpo da requisição será JSON
        },
        body: JSON.stringify(data) // Converte o objeto data em uma string JSON e envia
    })

    // Aguarda a resposta da API e a converte para JSON
    const results = await response.json();

    // Se a API retornar sucesso
    if (results.success) {
        console.log(results.data); // Exibe os dados no console

        // Armazena os dados retornados da API na variável info
        const info = results.data;

        // Loop através do array de resultados
        for (let i = 0; i <= info.length; i++) { // i contador, identificar a lista, quantas vezes ta passando
            if (i == 0) {                        //começar a lista
                let rowTitle = `<tr>
                <td>Endereço</td>
                <td>Local</td>
                <td>Material</td>
                </tr>`;
                addTable.innerHTML += rowTitle; 
            }
            let row = `<tr>
            <td>${info[i].endereco}</td>
            <td>${info[i].local}</td>
            <td>${info[i].material}</td>
            </tr>`;
            addTable.innerHTML += row; // Adiciona a linha na tabela
        }
    }
}
