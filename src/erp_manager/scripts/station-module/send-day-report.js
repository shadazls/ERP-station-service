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
            Swal.fire({
                icon: "success",
                title: "Rapport quotidien envoyé",
                html: `Le rapport quotidien a été envoyé avec succès.<br>Nombre de transactions : ${nbTransaction}<br>Volume total de carburant : ${volumeTotalCarburant}<br>Montant total en € : ${montantTotalEuro}`,
            });
        }
    });
});
