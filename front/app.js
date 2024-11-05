const map = document.getElementById('map');
function initMap() {
  // Inicializa o mapa vazio ao carregar a página
  const googleMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: { lat: -29.760885924937735, lng: -51.145885574222895 }
  });

  // Isso permite que outros locais sejam adicionados posteriormente
  window.googleMap = googleMap;
  window.geocoder = new google.maps.Geocoder();
}

async function fetchLocais(event) {
  // Impede o comportamento padrão do evento
  event.preventDefault();

  // Captura o valor do input com ID "material"
  let materialTipo = document.getElementById("material").value;

  // Cria um objeto data com a chave materialTipo
  let data = { materialTipo };

  // Realiza a requisição POST
  const response = await fetch('http://localhost:3006/api/locais', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // Aguarda a resposta da API e a converte para JSON
  const results = await response.json();

  if (results.success) {
    console.log(results.data);
    const info = results.data;

    // Adiciona os locais no mapa usando a lista retornada
    info.forEach(location => {
      console.log('Location array: ', location)
      geocodeAddress(window.geocoder, window.googleMap, location);
    });

    // Atualiza a tabela com os locais retornados
    addTable.innerHTML = `
      <tr>
        <td>Endereço</td>
        <td>Local</td>
        <td>Material</td>
      </tr>
    `;
    info.forEach(location => {
      addTable.innerHTML += `
        <tr>
          <td>${location.endereco}</td>
          <td>${location.local}</td>
          <td>${location.material}</td>
        </tr>
      `;
    });
  }
}

function geocodeAddress(geocoder, map, location) {
  geocoder.geocode({ 'address': location.endereco }, function (results, status) {
    if (status === 'OK') {
      // Utiliza AdvancedMarkerElement para adicionar o marcador no mapa
      const markerOptions = {
        position: results[0].geometry.location,
        map: map,
        title: location.local
      };

      // Configuração para o conteúdo avançado do marcador (opcional)
      const content = document.createElement('div');
      content.classList.add('advanced-marker-content');
      content.textContent = location.local;

      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: markerOptions.position,
        title: markerOptions.title,
        content: content // Isso permite criar um marcador personalizado.
      });

      // Cria uma InfoWindow para exibir ao clicar no marcador
      const infoWindow = new google.maps.InfoWindow({
        content: `<h4>${location.local}</h4><p>${location.endereco}</p>`
      });

      // Adiciona um listener ao marcador para abrir a InfoWindow ao ser clicado
      google.maps.event.addListener(advancedMarker, 'gmp-click', function () {
        infoWindow.open(map, advancedMarker);
      });
    } else {
      console.error('Geocode falhou: ' + status);
    }
  });
}