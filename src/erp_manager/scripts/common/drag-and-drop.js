// drag-and-drop.js

// Fonction pour sauvegarder l'ordre des éléments dans le stockage local
function saveSortOrder(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.sortable');
    const order = Array.from(items).map(item => item.id);
    localStorage.setItem(containerId, JSON.stringify(order));
}

// Fonction pour restaurer l'ordre des éléments depuis le stockage local
function restoreSortOrder(containerId) {
    const container = document.getElementById(containerId);
    const savedOrder = JSON.parse(localStorage.getItem(containerId));
    if (savedOrder) {
        savedOrder.forEach(itemId => {
            const item = document.getElementById(itemId);
            container.appendChild(item);
        });
    }
}

// Initialiser SortableJS pour chaque container avec swap: true
Sortable.create(document.getElementById('manager-container-top'), {
    group: 'container-manager-group',
    swap: true,
});
Sortable.create(document.getElementById('manager-container-center'), {
    group: 'container-manager-group',
    swap: true,
});
Sortable.create(document.getElementById('manager-container-bottom'), {
    group: 'container-manager-group',
    swap: true,
});
Sortable.create(document.getElementById('employee-container-center'), {
    group: 'container-employee-group',
    swap: true,
});
Sortable.create(document.getElementById('employee-container-bottom'), {
    group: 'container-employee-group',
    swap: true,
});

// Ajouter un événement onEnd pour sauvegarder l'ordre des éléments après le glisser-déposer
[document.getElementById('manager-container-top'), document.getElementById('manager-container-center'), document.getElementById('manager-container-bottom')].forEach(container => {
    container.addEventListener('sortupdate', function (evt) {
        saveSortOrder(container.id);
    });
});

// Restaurer l'ordre des éléments après le chargement de tous les éléments dans le DOM
window.addEventListener('load', function () {
    restoreSortOrder('manager-container-top');
    restoreSortOrder('manager-container-center');
    restoreSortOrder('manager-container-bottom');
});
