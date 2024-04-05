// Sélection de tous les éléments li de la liste
var items = document.querySelectorAll('#staff-list li');

// Boucle à travers chaque élément li pour ajouter un écouteur d'événements de clic
items.forEach(function(item) {
    item.addEventListener('click', function() {
        // Supprimer la bordure de tous les éléments et cacher toutes les icônes
        items.forEach(function(item) {
            item.style.border = 'none'; // Supprimer la bordure
            var icon = item.querySelector('.fa-bars');
            if (icon) {
                icon.classList.add("hidden"); // Cacher l'icône
            }
            item.style.color = '#767676'; // Couleur par défaut
        });

        // Appliquer la bordure et la couleur spécifiée à l'élément sélectionné et afficher son icône
        item.style.border = 'solid black'; // Ajouter une bordure
        var selectedIcon = item.querySelector('.fa-bars');
        if (selectedIcon) {
            selectedIcon.classList.remove("hidden"); // Afficher l'icône
        }
        item.style.color = 'black'; // Couleur du texte
    });
});
