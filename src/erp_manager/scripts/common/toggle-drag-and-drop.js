// Récupérer l'élément de commutation (toggle switch)
const toggleSwitch = document.getElementById('toggleSwitch');
const selectProductContainer = document.getElementById('divproduct');
const reStockingContainer = document.getElementById('reStockingContainer');
const alertContainer = document.getElementById('alertContainer');
const stationContainer = document.getElementById('stationContainer');
const staffContainer = document.getElementById('staffContainer');
const incidentContainer = document.getElementById('incident');
const pumpContainer = document.getElementById('employee-container-bottom-oil');
const cardsContainer = document.getElementById('cards');


// Fonction pour désactiver le drag and drop
function disableSortable() {
    Sortable.get(document.getElementById('manager-container-top')).destroy();
    Sortable.get(document.getElementById('manager-container-center')).destroy();
    Sortable.get(document.getElementById('manager-container-bottom')).destroy();

    selectProductContainer.classList.remove('shake-animation', 'sortable');
    reStockingContainer.classList.remove('shake-animation', 'sortable');
    alertContainer.classList.remove('shake-animation', 'sortable');
    stationContainer.classList.remove('shake-animation', 'sortable');
    staffContainer.classList.remove('shake-animation', 'sortable');
    incidentContainer.classList.remove('shake-animation', 'sortable');
    pumpContainer.classList.remove('shake-animation', 'sortable');
    cardsContainer.classList.remove('shake-animation', 'sortable');
}

function enableSortable() {
    Sortable.create(document.getElementById('manager-container-top'), { group: 'container-group', swap: true });
    Sortable.create(document.getElementById('manager-container-center'), { group: 'container-group', swap: true });
    Sortable.create(document.getElementById('manager-container-bottom'), { group: 'container-group', swap: true });

    
    selectProductContainer.classList.add('shake-animation', 'sortable');
    reStockingContainer.classList.add('shake-animation', 'sortable');
    alertContainer.classList.add('shake-animation', 'sortable');
    stationContainer.classList.add('shake-animation', 'sortable');
    staffContainer.classList.add('shake-animation', 'sortable');
    incidentContainer.classList.add('shake-animation', 'sortable');
    pumpContainer.classList.add('shake-animation', 'sortable');
    cardsContainer.classList.add('shake-animation', 'sortable');
}

// Écouter l'événement click sur le toggle switch
toggleSwitch.addEventListener('click', function() {
    // Vérifier si le toggle switch est activé
    if (this.checked) {
        // Désactiver le drag and drop
        enableSortable();
    } else {
        disableSortable();
    }
});
