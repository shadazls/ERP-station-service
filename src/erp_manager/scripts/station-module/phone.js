document.addEventListener("DOMContentLoaded", function () {
    // Sélection de l'input "phone-input"
    var phoneInput = document.getElementById("phone-input");

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur l'input "phone-input"
    phoneInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();
            
            // Code à exécuter lorsque la touche "Entrée" est pressée
            var phoneValue = phoneInput.value.replace(/\D/g, ''); // Supprimer tous les caractères non numériques
            
            // Vérification si le champ est vide
            if (phoneValue === '') {
                iziToast.warning({
                    title: 'Attention',
                    message: 'Le champ "Téléphone" est vide. Veuillez entrer une valeur.',
                });
            } else {
                // Création d'un objet contenant les données à envoyer
                var postData = {
                    phone: phoneValue
                };
                
                // Envoi de la requête POST
                fetch("https://api.fuelsync.hertinox.fr/settings/setsettings.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(postData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur de réseau lors de l'envoi de la requête.");
                    }
                    return response.json();
                })
                .then(data => {
                    // Affichage du message de succès si la requête a réussi
                    iziToast.success({
                        title: 'OK',
                        message: 'La valeur "' + phoneValue + '" a été enregistrée avec succès!',
                    });
                })
                .catch(error => {
                    // Affichage du message d'erreur en cas d'échec de la requête
                    iziToast.error({
                        title: 'Erreur',
                        message: error.message,
                    });
                });
            }
        }
    });
});