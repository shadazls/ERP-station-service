const toggleSwitch = document.getElementById('toggleSwitch');
const divproduct = document.getElementById('divproduct');
const delivery = document.getElementById('delivery');
const incident = document.getElementById('incident');
const employeeContainerBottomOil = document.getElementById('employee-container-bottom-oil');
const employeeContainerCenterFormation = document.getElementById('employee-container-center-formation');
const cards = document.getElementById('cards');

function disableSortable() {
    Sortable.get(document.getElementById('employee-container-center')).destroy();
    Sortable.get(document.getElementById('employee-container-bottom')).destroy();

    divproduct.classList.remove('shake-animation', 'sortable');
    delivery.classList.remove('shake-animation', 'sortable');
    incident.classList.remove('shake-animation', 'sortable');
    employeeContainerBottomOil.classList.remove('shake-animation', 'sortable');
    employeeContainerCenterFormation.classList.remove('shake-animation', 'sortable');
    cards.classList.remove('shake-animation', 'sortable');
}

function enableSortable() {
    Sortable.create(document.getElementById('employee-container-center'), { group: 'container-employee-group', swap: true });
    Sortable.create(document.getElementById('employee-container-bottom'), { group: 'container-employee-group', swap: true });

    
    divproduct.classList.add('shake-animation', 'sortable');
    delivery.classList.add('shake-animation', 'sortable');
    incident.classList.add('shake-animation', 'sortable');
    employeeContainerBottomOil.classList.add('shake-animation', 'sortable');
    employeeContainerCenterFormation.classList.add('shake-animation', 'sortable');
    cards.classList.add('shake-animation', 'sortable');
}

toggleSwitch.addEventListener('click', function() {
    if (this.checked) {
        enableSortable();
    } else {
        disableSortable();
    }
});
