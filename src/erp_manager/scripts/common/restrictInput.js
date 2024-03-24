// Sélection de tous les éléments avec la classe 'restrict-input'
const inputs = document.querySelectorAll('.restrict-input');

// Ajout d'un gestionnaire d'événements pour chaque champ input
inputs.forEach(input => {
    input.addEventListener('input', function(event) {
        // Remplace tout ce qui n'est pas un chiffre, un signe plus, un point, une virgule ou un espace par une chaîne vide
        event.target.value = event.target.value.replace(/[^0-9+.,\s]/g, '');
    });
});
