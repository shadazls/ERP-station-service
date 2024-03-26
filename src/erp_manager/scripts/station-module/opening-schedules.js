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
            // Affichage du message de succès si le champ est rempli
            // Ajouter requête vers BDD ici, si erreur, afficher notif erreur
            iziToast.success({
                title: 'OK',
                message: 'La valeur "' + inputValue + '" a été enregistrée avec succès!',
            });
        }
    }
});

// Sélection de l'input pour l'heure de fin
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
            // Affichage du message de succès si le champ est rempli
            iziToast.success({
                title: 'OK',
                message: 'La valeur "' + inputValue + '" a été enregistrée avec succès!',
            });
        }
    }
});
