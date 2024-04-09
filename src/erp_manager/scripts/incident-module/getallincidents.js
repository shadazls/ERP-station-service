// fetchIncidents.js

// Faire une requête GET à l'URL spécifiée
fetch("https://api.fuelsync.hertinox.fr/incidents/getallincidents.php")
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        // Parcourir les données JSON pour créer dynamiquement les incidents
        data.forEach(incident => {
            // Créer un élément div pour chaque incident
            var incidentDiv = document.createElement("div");
            incidentDiv.className = "incident-list-box classic-box hvr-shrink cliquable";
            incidentDiv.id = incident.idIncident; // Utiliser l'attribut idIncident comme id d'élément

            // Créer un élément p pour le nom de l'incident et lui attribuer le texte approprié
            var nameParagraph = document.createElement("p");
            nameParagraph.textContent = incident.nameIncident; // Utiliser l'attribut nameIncident comme texte

            // Ajouter le paragraphe au div de l'incident
            incidentDiv.appendChild(nameParagraph);

            // Ajouter le div de l'incident à la div principale
            document.getElementById("checkIncident").appendChild(incidentDiv);
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des incidents:", error));
