document.getElementById('createButton').addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien

    // Afficher la popup pour demander le nom de l'incident
    Swal.fire({
        title: 'Choisir un nom pour l\'incident',
        input: 'text',
        inputPlaceholder: 'Nom de l\'incident',
        showCancelButton: true,
        confirmButtonText: 'Créer',
        cancelButtonText: 'Annuler',
        allowOutsideClick: false, // Empêcher la fermeture de la popup en cliquant en dehors
        inputValidator: (value) => {
            if (!value) {
                return 'Vous devez saisir un nom pour l\'incident.';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Récupérer le nom de l'incident saisi par l'utilisateur
            var nameIncident = result.value.trim();

            // Récupérer les valeurs des autres champs
            var dateTime = document.getElementById('dateTime').value.trim();
            var incidentType = document.getElementById('incidentType').value.trim();
            var technicalDetail = document.getElementById('technicalDetail').value.trim();
            var remark = document.getElementById('remark').value.trim();

            // Convertir la date au format YYYY-MM-DD HH:MM
            var dateObj = new Date(dateTime);
            var year = dateObj.getFullYear();
            var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
            var day = ('0' + dateObj.getDate()).slice(-2);
            var hours = ('0' + dateObj.getHours()).slice(-2);
            var minutes = ('0' + dateObj.getMinutes()).slice(-2);
            var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

            // Effectuer la requête POST avec le nom de l'incident
            fetch("https://api.fuelsync.hertinox.fr/incidents/createincident.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nameIncident: nameIncident, // Utilisation du nom de l'incident
                    dateIncident: formattedDateTime, // Utilisation de la date formatée
                    typeIncident: incidentType,
                    details: technicalDetail,
                    notes: remark
                })
            })
            .then(response => response.json())
            .then(data => {
                // Vérifier si la requête s'est bien passée
                if (data.success) {
                    // Afficher la popup de succès
                    Swal.fire({
                        icon: "success",
                        title: "Incident créé avec succès",
                        text: "L'incident a été enregistré avec succès."
                    });
                } else {
                    // Afficher une popup d'erreur si la requête a échoué
                    Swal.fire({
                        icon: "success",
                        title: "Incident créé avec succès",
                        text: "L'incident a été enregistré avec succès."
                    });
                }
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'incident:", error);
                // Afficher une popup d'erreur si une erreur inattendue se produit
                Swal.fire({
                    icon: "error",
                    title: "Erreur inattendue",
                    text: "Une erreur inattendue s'est produite. Veuillez réessayer."
                });
            });
        }
    });
});
