// Fonction pour effectuer la requête HTTP
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Fonction pour créer les éléments HTML dynamiquement à partir des données JSON des carburants
function createFuelElements(data) {
  const container = document.getElementById("employee-container-bottom-oil-remaining");

  data.forEach(fuel => {
    const div = document.createElement("div");
    const spanName = document.createElement("span");
    const spanRemaining = document.createElement("span");

    spanName.classList.add("oil-name");
    spanName.textContent = fuel.name;
    spanRemaining.classList.add("oil-remaining");
    spanRemaining.textContent = fuel.amount + ", " + fuel.price;

    div.appendChild(spanName);
    div.appendChild(spanRemaining);

    container.appendChild(div);
  });
}

// Fonction pour créer les éléments HTML dynamiquement à partir des données JSON des pompes
function createPumpElements(data, fuelsData) {
  const container = document.getElementById("employee-container-bottom-pump-status");

  data.forEach(pump => {
    const div = document.createElement("div");
    const innerDiv = document.createElement("div");
    const pumpName = document.createElement("p");
    const pumpStatus = document.createElement("p");
    const pumpOilNames = document.createElement("p");

    div.id = "pump" + pump.idPump;
    div.classList.add("hvr-outline-out");

    pumpName.classList.add("pump-name");
    pumpName.innerHTML = '<i class="fas fa-gas-pump"></i> Pompe n°' + pump.idPump;

    pumpStatus.classList.add("status-" + (pump.state === 1 ? "open" : "close"));
    pumpStatus.textContent = pump.state === 1 ? "Ouvert" : "Fermé";

    const pumpFuelsNames = fuelsData.map(fuel => {
      return `<span class="pump-oil-name">${fuel.name}</span>`;
    }).join(" ");

    pumpOilNames.innerHTML = pumpFuelsNames;

    innerDiv.appendChild(pumpName);
    innerDiv.appendChild(pumpStatus);
    div.appendChild(innerDiv);
    div.appendChild(pumpOilNames);

    container.appendChild(div);
  });
}

// URL des API
const fuelApiUrl = "https://api.fuelsync.hertinox.fr/fuels/getallfuels.php";
const pumpApiUrl = "https://api.fuelsync.hertinox.fr/pumps/getallpumps.php";

// Appel de la fonction fetchData pour récupérer les données JSON des carburants
fetchData(fuelApiUrl)
  .then(fuelsData => {
    // Créer les éléments HTML pour les carburants une fois les données récupérées
    createFuelElements(fuelsData);

    // Appel de la fonction fetchData pour récupérer les données JSON des pompes
    fetchData(pumpApiUrl)
      .then(pumpsData => {
        // Créer les éléments HTML pour les pompes une fois les données récupérées
        createPumpElements(pumpsData, fuelsData);
      });
  });