// Sélection de tous les éléments li de la liste
var items = document.querySelectorAll('#staff-list li');

// Boucle à travers chaque élément li pour ajouter un écouteur d'événements de clic
items.forEach(function(item) {
    item.addEventListener('click', function() {
        // Supprimer la bordure de tous les éléments
        items.forEach(function(item) {
            item.style.border = 'none'; // Supprimer la bordure
            item.style.color = '#767676'; // Couleur par défaut
        });

        // Appliquer la bordure et la couleur spécifiée à l'élément sélectionné
        item.style.border = 'solid black'; // Ajouter une bordure
        item.style.color = 'black'; // Couleur du texte
    });
});
