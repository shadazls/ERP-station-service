// Récupérer l'élément de commutation (toggle switch)
const toggleSwitch = document.getElementById('toggleSwitch');
const selectProductContainer = document.getElementById('selectProductContainer');
const reStockingContainer = document.getElementById('reStockingContainer');
const alertContainer = document.getElementById('alertContainer');
const stationContainer = document.getElementById('stationContainer');
const staffContainer = document.getElementById('staffContainer');
const incidentContainer = document.getElementById('incident');
const pumpContainer = document.getElementById('employee-container-bottom-oil');
const cardsContainer = document.getElementsByClassName('cards');


// Fonction pour désactiver le drag and drop
function disableSortable() {
    Sortable.get(document.getElementById('manager-container-top')).destroy();
    Sortable.get(document.getElementById('manager-container-center')).destroy();
    Sortable.get(document.getElementById('manager-container-bottom')).destroy();

    selectProductContainer.classList.remove('shake-animation');
    reStockingContainer.classList.remove('shake-animation');
    alertContainer.classList.remove('shake-animation');
    stationContainer.classList.remove('shake-animation');
    staffContainer.classList.remove('shake-animation');
    incidentContainer.classList.remove('shake-animation');
    pumpContainer.classList.remove('shake-animation');
    cardsContainer.classList.remove('shake-animation');
}

function enableSortable() {
    Sortable.create(document.getElementById('manager-container-top'), { group: 'container-group', swap: true });
    Sortable.create(document.getElementById('manager-container-center'), { group: 'container-group', swap: true });
    Sortable.create(document.getElementById('manager-container-bottom'), { group: 'container-group', swap: true });

    
    selectProductContainer.classList.add('shake-animation');
    reStockingContainer.classList.add('shake-animation');
    alertContainer.classList.add('shake-animation');
    stationContainer.classList.add('shake-animation');
    staffContainer.classList.add('shake-animation');
    incidentContainer.classList.add('shake-animation');
    pumpContainer.classList.add('shake-animation');
    cardsContainer.classList.add('shake-animation');
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
