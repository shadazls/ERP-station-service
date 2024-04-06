// Variable pour stocker le moment de la dernière requête réussie
var lastRequestTime = 0;

// Fonction pour envoyer la requête AJAX
function sendRequest(openHour, closeHour) {
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
        openHour: openHour,
        closeHour: closeHour
    };

    // Envoi de la requête POST avec jQuery AJAX
    $.ajax({
        url: "https://api.fuelsync.hertinox.fr/settings/setsettings.php",
        dataType: "text",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(postData),
        success: function(data) {
            // Mettre à jour le moment de la dernière requête réussie
            lastRequestTime = currentTime;

            // Affichage du message de succès si la requête a réussi
            iziToast.success({
                title: 'OK',
                message: 'Les horaires d\'ouverture et de fermeture ont été enregistrés avec succès !',
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

// Sélection des inputs "schedule-start" et "schedule-end"
var scheduleStartInput = $("#schedule-start");
var scheduleEndInput = $("#schedule-end");

// Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur les inputs
scheduleStartInput.add(scheduleEndInput).on("keydown", function(event) {
    // Vérification si la touche appuyée est la touche "Entrée" (code 13)
    if (event.keyCode === 13) {
        // Empêcher le comportement par défaut de la touche "Entrée"
        event.preventDefault();

        // Récupération des valeurs des inputs
        var openHourValue = scheduleStartInput.val().trim();
        var closeHourValue = scheduleEndInput.val().trim();

        // Vérification si les champs sont vides
        if (openHourValue === '' || closeHourValue === '') {
            // Affichage du message d'avertissement si un des champs est vide
            iziToast.warning({
                title: 'Attention',
                message: 'Les champs "Horaire ouverture" et "Horaire fermeture" doivent être remplis. Veuillez entrer une valeur pour chaque champ.',
            });
        } else {
            // Envoi de la requête
            sendRequest(openHourValue, closeHourValue);
        }
    }
});
