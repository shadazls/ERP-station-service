document.addEventListener("DOMContentLoaded", function() {
    var phoneInput = document.getElementById("phone-input");

    phoneInput.addEventListener("input", function(event) {
        event.target.value = event.target.value.replace(/\D/g, ''); // Supprimer tous les caractères non numériques
        // var formattedValue = inputValue.match(/.{1,2}/g).join(" "); // Insérer un espace après chaque paire de chiffres
        // event.target.value = formattedValue;
    });
});