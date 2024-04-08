// Effectuer la requête GET
fetch("https://api.fuelsync.hertinox.fr/fuels/getallfuels.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données des carburants.");
        }
        return response.json();
    })
    .then(data => {
        // Sélection du select
        const fuelSelect = document.getElementById('fuel-select');

        // Parcourir les données et créer les options dynamiquement
        data.forEach(fuel => {
            const option = document.createElement('option');
            option.value = fuel.idFuel;
            option.textContent = fuel.name;
            fuelSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
    });