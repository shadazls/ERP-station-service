document.addEventListener("DOMContentLoaded", function () {
    // Sélection des champs d'entrée
    var nameInput = document.getElementById("inscription-name");
    var firstNameInput = document.getElementById("inscription-first-name");
    var phoneInput = document.getElementById("inscription-phone");

    // Fonction pour vérifier si les trois champs sont remplis
    function checkInputs() {
        return nameInput.value.trim() !== '' && firstNameInput.value.trim() !== '' && phoneInput.value.trim() !== '';
    }

    // Fonction pour afficher une notification
    function showNotification(message) {
        iziToast.warning({
            title: 'Attention',
            message: message,
        });
    }

    // Fonction pour afficher le message de succès
    function showSuccessMessage() {
        iziToast.success({
            title: 'OK',
            message: 'L\'inscription a bien été prise en compte.',
        });
    }

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur le champ "inscription-name"
    nameInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();

            // Vérifier si tous les champs sont remplis
            if (checkInputs()) {
                // Afficher le message de succès
                showSuccessMessage();
            } else {
                // Afficher une notification indiquant que tous les champs doivent être remplis
                showNotification('Veuillez remplir tous les champs pour valider votre inscription.');
            }
        }
    });

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur le champ "inscription-first-name"
    firstNameInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();

            // Vérifier si tous les champs sont remplis
            if (checkInputs()) {
                // Afficher le message de succès
                showSuccessMessage();
            } else {
                // Afficher une notification indiquant que tous les champs doivent être remplis
                showNotification('Veuillez remplir tous les champs pour valider votre inscription.');
            }
        }
    });

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur le champ "inscription-phone"
    phoneInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();

            // Vérifier si tous les champs sont remplis
            if (checkInputs()) {
                // Afficher le message de succès
                showSuccessMessage();
            } else {
                // Afficher une notification indiquant que tous les champs doivent être remplis
                showNotification('Veuillez remplir tous les champs pour valider votre inscription.');
            }
        }
    });
});
