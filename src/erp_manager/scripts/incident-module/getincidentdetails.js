// Récupérer la div parente avec l'ID 'checkIncident'
var checkIncidentDiv = document.getElementById('checkIncident');

// Ajouter un gestionnaire d'événements au parent
checkIncidentDiv.addEventListener('click', function(event) {
    // Vérifier si l'élément cliqué est une div enfant avec la classe 'incident-list-box'
    if (event.target.classList.contains('incident-list-box')) {
        // Récupérer l'ID de la div cliquée
        var incidentId = event.target.id;

        // Effectuer la requête GET avec l'ID de la div
        fetch("https://api.fuelsync.hertinox.fr/incidents/getincident.php?idIncident=" + incidentId)
        .then(response => response.json())
        .then(data => {
            // Afficher les informations récupérées dans une popup
            Swal.fire({
                title: 'Informations sur l\'incident',
                html: `
                    <p><strong>ID de l'incident:</strong> ${data.idIncident}</p>
                    <p><strong>Nom de l'incident:</strong> ${data.nameIncident}</p>
                    <p><strong>Date de l'incident:</strong> ${data.dateIncident}</p>
                    <p><strong>Type de l'incident:</strong> ${data.typeIncident}</p>
                    <p><strong>Détails de l'incident:</strong> ${data.detailIncident}</p>
                    <p><strong>Notes sur l'incident:</strong> ${data.noteIncident}</p>
                `,
                showCancelButton: false,
                confirmButtonText: 'Fermer'
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des informations sur l'incident:", error);
            // Afficher une popup d'erreur si une erreur se produit
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur s'est produite lors de la récupération des informations sur l'incident. Veuillez réessayer."
            });
        });
    }
});
