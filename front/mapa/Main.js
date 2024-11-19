let googleMap; // variável para armazenar o mapa do google
let geocoder; // variável para fazer a conversão de endereço em coordenadas
let markers = []; // array para guardar os marcadores que são adicionados no mapa(metal, plastico...)

// funcao para iniciar o mapa
function initMap(list = []) {
  // cria um novo mapa na div com id 'map' e define o zoom e o centro do mapa
  googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: { lat: -29.760885924937735, lng: -51.145885574222895 }
  });

  // inicializa o geocoder para fazer a conversão de endereços para coordenadas
  geocoder = new google.maps.Geocoder();

  // adiciona pinos no mapa para cada local da lista
  list.forEach(location => {
    geocodeAddress(geocoder, googleMap, location);
  });

  // atualiza a tabela com os locais da lista
  updateTable(list);
}

// funcao que faz a geocodificação e adiciona o pin no mapa
function geocodeAddress(geocoder, map, location) {
  // converte o endereço em coordenadas
  geocoder.geocode({ 'address': location.endereco }, function (results, status) {
    if (status === 'OK') {
      // cria um novo marcador (pin) no mapa nas coordenadas do endereço
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: location.local
      });

      // armazena o marcador no array para poder remover depois
      markers.push(marker);
      console.log(location.imagem);
      // cria uma infoWindow (janela de informações) para exibir ao clicar no marcador
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${location.local}</h4>
            <p>${location.endereco}</p>
            <p>Horário de funcionamento: ${location.horario}</p>
            <img src="${location.imagem}" alt="${location.local}" style="width: 10vw; height: auto; margin-top: 10px;">
          </div>
      `})

      // exibe a infoWindow quando o marcador é clicado(!!aqui da pra adicionar mais informacoes!!)
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    } else {
      console.error('Geocode falhou: ' + status); 
    }
  });
}

// funcao q limpar todos os marcadores do mapa
function clearMarkers() {
  // percorre todos os marcadores e remove cada um do mapa
  markers.forEach(marker => marker.setMap(null));
  markers = []; // limpa o array de marcadores
}

// funcao para atualizar a tabela de locais
function updateTable(list) {
  // cria o cabeçalho da tabela
  addTable.innerHTML = `
    <tr>
      <td>Endereço</td>
      <td>Local</td>
      <td>Horário</td>
      <td>Material</td>
    </tr>
  `;
  // adiciona uma linha na tabela para cada local na lista
  list.forEach(location => {
    addTable.innerHTML += `
      <tr>
        <td>${location.endereco}</td>
        <td>${location.local}</td>
        <td>${location.horario}</td>
        <td>${location.material}</td>
      </tr>
    `;
  });
}

// funcao para buscar locais do servidor
async function fetchLocais(event) {
  event.preventDefault(); // previne o comportamento padrão do formulário

  // pega o tipo de material selecionado no campo 'material'
  let materialTipo = document.getElementById("material").value;
  let data = { materialTipo }; // cria um objeto com o tipo de material

  // faz  requisição POST para o servidor com o tipo de material
  const response = await fetch('http://localhost:3007/api/locais', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const results = await response.json();

  if (results.success) { 
    const info = results.data; // armazena os dados retornados
    
    console.log(info)
    // limpa os marcadores atuais antes de adicionar novos
    clearMarkers();

    // adiciona novos locais no mapa e na tabela
    info.forEach(location => {
      geocodeAddress(geocoder, googleMap, location);
    });

    updateTable(info); // atualiza a tabela com os novos locais
  }
}
