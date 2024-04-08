// Sélectionnez le bouton
const sendDayReportButton = document.getElementById('send-day-report-button');

// Ajoutez un écouteur d'événements au bouton pour détecter les clics
sendDayReportButton.addEventListener('click', function() {
    // Récupérez les valeurs des champs
    const nbTransaction = document.getElementById('nb-transaction-input').value.trim();
    const volumeTotalCarburant = document.getElementById('volume-total-carburant-input').value.trim();
    const montantTotalEuro = document.getElementById('montant-total-euro-input').value.trim();

    // Vérifiez si les champs sont remplis dans des if séparés
    if (nbTransaction === '') {
        Swal.fire({
            icon: "error",
            title: "Un des champs est vide",
            text: "Le champ 'Nombre de transactions' ne peut pas être vide !",
        });
        return;
    }

    if (volumeTotalCarburant === '') {
        Swal.fire({
            icon: 'error',
            title: "Un des champs est vide",
            text: "Le champ 'Volume total de carburant' ne peut pas être vide !",
        });
        return;
    }

    if (montantTotalEuro === '') {
        Swal.fire({
            icon: 'error',
            title: 'Un des champs est vide',
            text: "Le champ 'Montant total en €' ne peut pas être vide !",
            confirmButtonText: 'OK',
        });
        return; // Arrête l'exécution de la fonction
    }

    // Si tous les champs sont remplis, affichez la popup personnalisée Swal
    Swal.fire({
        icon: 'warning',
        title: 'Êtes-vous sûr ?',
        text: "Une fois le rapport quotidien envoyé, il n'est plus possible de revenir en arrière.",
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        // Vous pouvez ajouter d'autres options personnalisées ici
    }).then((result) => {
        if (result.isConfirmed) {
            // Effectuer la requête AJAX POST
            console.log(nbTransaction, volumeTotalCarburant, montantTotalEuro)
            $.ajax({
                type: 'POST',
                dataType: "text",
                url: 'https://api.fuelsync.hertinox.fr/daily_reports/publish.php',
                contentType: 'application/json',
                data: JSON.stringify({
                    "nbTransactions": nbTransaction,
                    "fuelAmount": volumeTotalCarburant,
                    "sales": montantTotalEuro
                }),
                success: function(response) {
                    console.log('Réponse du serveur:', response.status);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Rapport quotidien envoyé',
                            html: `Le rapport quotidien a été envoyé avec succès.<br>Nombre de transactions : ${nbTransaction}<br>Volume total de carburant : ${volumeTotalCarburant}<br>Montant total en € : ${montantTotalEuro}`
                        });
                    } else if (response.status === 405) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Rapport déjà publié',
                            text: 'Le rapport de la journée a déjà été publié.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur serveur',
                            text: 'Une erreur est survenue côté serveur. Veuillez réessayer plus tard.'
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Erreur lors de l\'envoi de la requête:', error);
                    console.log('Statut de la requête:', error.status);
                    if (error === "Method Not Allowed") {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Rapport déjà publié',
                            text: 'Le rapport de la journée a déjà été publié.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur réseau',
                            text: 'Une erreur est survenue lors de l\'envoi de la requête. Veuillez vérifier votre connexion internet et réessayer.'
                        });
                    }
                }
            });
        }
    });
});
