function updateProductInput() {
    var range = document.getElementById('product-amount-bar');
    var input = document.getElementById('product-amount-input');
    input.value = range.value;
}

function updateProductRange() {
    var range = document.getElementById('product-amount-bar');
    var input = document.getElementById('product-amount-input');
    // Récupérer la valeur saisie dans l'élément input
    var inputValue = input.value.trim();
    // Retirer le "L" à la fin de la valeur si présent
    inputValue = inputValue.replace(/L$/, '');
    // Convertir la valeur en nombre
    var numericValue = parseFloat(inputValue);
    // S'assurer que la valeur est valide
    if (!isNaN(numericValue)) {
        // Mettre à jour la valeur de la barre de défilement
        range.value = numericValue;
    }
}
