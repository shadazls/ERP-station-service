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
            if (phoneInput.value.trim() === '') {
                iziToast.warning({
                    title: 'Attention',
                    message: 'Le champ "Téléphone" est vide. Veuillez entrer une valeur.',
                });
            } else {
                iziToast.success({
                    title: 'OK',
                    message: 'La valeur "' + inputValue + '" a été enregistrée avec succès!',
                });
            }
        }
    });
});
