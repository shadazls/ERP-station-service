// cards.js

document.addEventListener('DOMContentLoaded', function () {
    getCardData();
});

function updateCardInfo(card) {
    var idCardInput = document.getElementById('divIdCard').querySelector('input');
    var nameInput = document.getElementById('divName').querySelector('input');
    var birthDateParagraph = document.getElementById('divDate').querySelector('p:last-of-type');
    var balanceParagraph = document.getElementById('divSolde').querySelector('p:last-of-type');
    var creationDateParagraph = document.getElementById('divCreation').querySelector('p:last-of-type');
    var photoImage = document.getElementById('divPhoto').querySelector('img');

    idCardInput.value = card.idCard;
    nameInput.value = card.lastName + ' ' + card.firstName;
    birthDateParagraph.textContent = card.birthDate;
    balanceParagraph.textContent = card.balance;
    creationDateParagraph.textContent = card.creationDate;
    photoImage.src = card.profileImageURL;
}

function getCardData() {
    fetch("https://api.fuelsync.hertinox.fr/cards/getallcards.php")
        .then(response => response.json())
        .then(data => {
            var allCards = data.energy.concat(data.member);
            updateCardOptions(allCards);
            // Supposons que vous voulez afficher les informations de la première carte par défaut
            if (allCards.length > 0) {
                updateCardInfo(allCards[0]);
            }
        })
        .catch(error => console.error('Error fetching card data:', error));
}

function updateCardOptions(cards) {
    var dataList = document.getElementById('card-options');
    dataList.innerHTML = ''; // Nettoyer les options précédentes
    cards.forEach(function (card) {
        var option = document.createElement('option');
        option.value = card.idCard;
        dataList.appendChild(option);
    });
}

var searchInputCards = document.getElementById('search-input');
searchInputCards.addEventListener('input', function () {
    var searchKeyword = searchInput.value.trim().toLowerCase();
    var cards = document.getElementById('card-options').querySelectorAll('option');
    cards.forEach(function (card) {
        if (!card.value.toLowerCase().includes(searchKeyword)) {
            card.hidden = true;
        } else {
            card.hidden = false;
        }
    });
});

searchInputCards.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        var selectedCardId = searchInputCards.value.trim();
        fetch(`https://api.fuelsync.hertinox.fr/cards/getcard.php?idCard=${selectedCardId}`)
            .then(response => response.json())
            .then(data => {
                updateCardInfo(data);
            })
            .catch(error => console.error('Error fetching card data:', error));
    }
});
