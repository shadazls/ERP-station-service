var addButton = document.querySelector('.divplus');
var displayPad = document.getElementById('display-pad');
var deleteButton = document.getElementById('delete-pad');
var okButton = document.getElementById('ok-pad');

var dotButton = document.getElementById('doat-pad');
var timesButton = document.getElementById('times-pad');
var minusButton = document.getElementById('minus-pad');

var isEnteringValue = false;

addButton.addEventListener('click', function() {
    if (!isEnteringValue) {
        addButton.innerHTML = 'Veuillez entrer une valeur';
        addButton.style.width = '200px';
        addButton.style.fontFamily = 'Balsamiq Sans';
        isEnteringValue = true;

        dotButton.disabled = true;
        timesButton.disabled = true;
        minusButton.disabled = true;
    }
});

deleteButton.addEventListener('click', function() {
    if (isEnteringValue) {
        addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addButton.style.width = '';
        isEnteringValue = false;

        dotButton.disabled = false;
        timesButton.disabled = false;
        minusButton.disabled = false;
    }
});

okButton.addEventListener('click', function() {
    var inputValue = displayPad.value;
    var ticketDiv = document.querySelector('.ticket > div');

    if (isEnteringValue && inputValue.trim() !== '') {
        var newParagraph = document.createElement('p');
        newParagraph.textContent = inputValue;

        ticketDiv.appendChild(newParagraph);

        displayPad.value = '';
        addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addButton.style.width = '';
        isEnteringValue = false;

        dotButton.disabled = false;
        timesButton.disabled = false;
        minusButton.disabled = false;
    }
});
