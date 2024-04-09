document.getElementById('createButton').addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien

    // Récupérer les valeurs des champs
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

    // Effectuer la requête POST
    fetch("https://api.fuelsync.hertinox.fr/incidents/createincident.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dateIncident: formattedDateTime, // Utilisation de la date formatée
            typeIncident: incidentType,
            details: technicalDetail,
            notes: remark
        })
    })
    // .then(response => response.json())
    .then(data => {
        // Vérifier si la requête s'est bien passée
        if (data.success) {
            // Afficher la popup de succès
            Swal.fire({
                icon: "success",
                title: "Incident créé avec succès",
                text: "L'incident a été ajouté avec succès."
            });
        } else {
            // Afficher une popup d'erreur si la requête a échoué
            Swal.fire({
                icon: "error",
                title: "Erreur lors de la création de l'incident",
                text: "Une erreur s'est produite lors de la création de l'incident. Veuillez réessayer."
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
});
