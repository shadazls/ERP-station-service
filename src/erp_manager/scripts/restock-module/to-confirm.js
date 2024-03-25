// Sélectionnez un conteneur parent existant qui contient tous les éléments <i> ou un conteneur qui ne change pas
const toConfirmElementContainer = document.querySelector('#to-confirm-element-container');

// Ajoutez un écouteur d'événements au conteneur parent pour capturer les clics sur les éléments <i>
toConfirmElementContainer.addEventListener('click', function(event) {
    // Vérifiez si l'élément cliqué est un élément <i> avec la classe 'cliquable'
    if (event.target.matches('i.cliquable')) {
        // Vérifiez la classe de l'icône pour déterminer quelle fonction déclencher
        if (event.target.classList.contains('green')) {
            // Action à effectuer pour l'icône verte
            fonctionPourIconeVerte(event.target);
        } else if (event.target.classList.contains('red')) {
            // Action à effectuer pour l'icône rouge
            fonctionPourIconeRouge(event.target);
        }
    }
});

// Fonction à exécuter lorsque l'icône verte est cliquée
function fonctionPourIconeVerte(element) {
    console.log("L'icône verte a été cliquée !");

    Swal.fire({
        icon: "warning",
        title: "Êtes-vous sûr ?",
        text: "Une fois la reception de la commande confirmée, il ne sera plus possible de retourner en arrière.",
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
    }).then((result) => {
        if (result.isConfirmed) {
            element.parentElement.parentElement.remove();
            Swal.fire({
                icon: "success",
                title: "Réception de la commande confirmée",
                text: `Vous avez confirmé la réception de la commande.`,
            });
        }
    });
}

// Fonction à exécuter lorsque l'icône rouge est cliquée
function fonctionPourIconeRouge(element) {
    console.log("L'icône rouge a été cliquée !");

    Swal.fire({
        icon: "warning",
        title: "Êtes-vous sûr ?",
        text: "Une fois la non-reception de la commande confirmée, il ne sera plus possible de retourner en arrière.",
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
    }).then((result) => {
        if (result.isConfirmed) {
            element.parentElement.parentElement.remove();
            Swal.fire({
                icon: "success",
                title: "Non-réception de la commande confirmée",
                text: `Un e-mail automatique a été envoyé au fournisseur pour l'informer du problème.`,
            });
        }
    });
}
