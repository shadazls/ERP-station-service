document.addEventListener("DOMContentLoaded", function () {
    // Variable pour stocker le moment de la dernière requête réussie
    var lastRequestTime = 0;

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
                // Vérification du délai écoulé depuis la dernière requête réussie
                var currentTime = new Date().getTime();
                var timeElapsed = currentTime - lastRequestTime;
                var timeRemaining = 5000 - timeElapsed; // Temps restant à attendre
                if (timeElapsed < 5000) { // Limite de 5 secondes
                    iziToast.info({
                        title: 'Info',
                        message: 'Veuillez patienter ' + (timeRemaining / 1000) + ' secondes avant d\'essayer de changer à nouveau les horaires.',
                    });
                    return; // Sortir de la fonction sans effectuer de requête supplémentaire
                }

                // Création d'un objet contenant les données à envoyer
                var postData = {
                    phone: phoneValue
                };
                
                // Envoi de la requête POST avec jQuery ajax
                $.ajax({
                    url: "https://api.fuelsync.hertinox.fr/settings/setsettings.php",
                    method: "POST",
                    dataType: "text",
                    contentType: "application/json",
                    data: JSON.stringify(postData),
                    success: function(data) {
                        // Mettre à jour le moment de la dernière requête réussie
                        lastRequestTime = currentTime;

                        // Affichage du message de succès si la requête a réussi
                        iziToast.success({
                            title: 'OK',
                            message: 'La valeur "' + phoneValue + '" a été enregistrée avec succès!',
                        });
                    },
                    error: function(xhr, status, error) {
                        // Affichage du message d'erreur en cas d'échec de la requête
                        console.log(error);
                        iziToast.error({
                            title: 'Erreur',
                            message: "Veuillez transmettre l'erreur suivante au développeur technique de votre application web: " + error.message,
                        });
                    }
                });
            }
        }
    });
});
