document.addEventListener("DOMContentLoaded", function () {
    // Sélection de l'input "fuel-amount-input"
    var fuelAmountInput = document.getElementById("fuel-amount-input");

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur l'input "fuel-amount-input"
    fuelAmountInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();
            
            // Code à exécuter lorsque la touche "Entrée" est pressée
            if (fuelAmountInput.value.trim() === '') {
                iziToast.warning({
                    title: 'Attention',
                    message: 'Le champ "Seuil carburant" est vide. Veuillez entrer une valeur.',
                });
            } else {
                iziToast.success({
                    title: 'OK',
                    message: 'La valeur "' + fuelAmountInput.value + '" a été enregistrée avec succès!',
                });
            }
        }
    });

    // Sélection de l'input "product-amount-bar"
    var productAmountInput = document.getElementById("product-amount-input");

    // Ajout d'un gestionnaire d'événement pour l'événement "keydown" sur l'input "product-amount-bar"
    productAmountInput.addEventListener("keydown", function(event) {
        // Vérification si la touche appuyée est la touche "Entrée" (code 13)
        if (event.keyCode === 13) {
            // Empêcher le comportement par défaut de la touche "Entrée"
            event.preventDefault();
            
            // Code à exécuter lorsque la touche "Entrée" est pressée
            if (productAmountInput.value.trim() === '') {
                iziToast.warning({
                    title: 'Attention',
                    message: 'The product amount bar input is empty!',
                });
            } else {
                iziToast.success({
                    title: 'OK',
                    message: 'La valeur "' + productAmountInput.value + '" a été enregistrée avec succès!',
                });
            }
        }
    });
});
