// Sélection de l'input
var scheduleStartInput = document.getElementById("schedule-start");

// Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur l'input
scheduleStartInput.addEventListener("keydown", function(event) {
    // Vérification si la touche appuyée est la touche "Entrée" (code 13)
    if (event.keyCode === 13) {
        // Empêcher le comportement par défaut de la touche "Entrée"
        event.preventDefault();
        
        // Récupération de la valeur de l'input
        var inputValue = scheduleStartInput.value.trim();
        
        // Vérification si le champ est vide
        if (inputValue === '') {
            // Affichage du message d'avertissement si le champ est vide
            iziToast.warning({
                title: 'Attention',
                message: 'Le champ "Horaire ouverture" vide. Veuillez entrer une valeur.',
            });
        } else {
            // Création d'un objet contenant les données à envoyer
            var postData = {
                openHour: inputValue
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
                    message: 'La valeur "' + inputValue + '" a été enregistrée avec succès!',
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

// Sélection de l'input de l'heure de fin
var scheduleEndInput = document.getElementById("schedule-end");

// Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur l'input de l'heure de fin
scheduleEndInput.addEventListener("keydown", function(event) {
    // Vérification si la touche appuyée est la touche "Entrée" (code 13)
    if (event.keyCode === 13) {
        // Empêcher le comportement par défaut de la touche "Entrée"
        event.preventDefault();
        
        // Récupération de la valeur de l'input
        var inputValue = scheduleEndInput.value.trim();
        
        // Vérification si le champ est vide
        if (inputValue === '') {
            // Affichage du message d'avertissement si le champ est vide
            iziToast.warning({
                title: 'Attention',
                message: 'Le champ "Horaire fermeture" est vide. Veuillez entrer une valeur.',
            });
        } else {
            // Création d'un objet contenant les données à envoyer
            var postData = {
                closeHour: inputValue
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
                    message: 'La valeur "' + inputValue + '" a été enregistrée avec succès!',
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
