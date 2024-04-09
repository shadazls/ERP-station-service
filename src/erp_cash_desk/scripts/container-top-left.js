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

    if (isEnteringValue && inputValue.trim() !== '' && /^\d{13}$/.test(inputValue)) {
        addProductToTicket(inputValue);
        displayPad.value = '';
        addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        addButton.style.width = '';
        isEnteringValue = false;

        dotButton.disabled = false;
        timesButton.disabled = false;
        minusButton.disabled = false;
    }
});
var productsData = {};

function getProductsData() {
    $.ajax({
        url: "https://api.fuelsync.hertinox.fr/products/getallproducts.php",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            response.forEach(function(fuelsync_product) {
                productsData[fuelsync_product.idProduct] = {
                    productName: fuelsync_product.productName,
                    sellPrice: fuelsync_product.sellPrice
                };
            });
        }
    });
}

function addProductToTicket(code) {
    var fuelsync_product = productsData[code];
    if (fuelsync_product) {
        if(removeProduct) {
            var newParagraph = document.createElement('p');
                newParagraph.textContent = fuelsync_product.productName + ' - -' + fuelsync_product.sellPrice + '€';
                
                var ticketDiv = document.querySelector('.ticket > div');
                ticketDiv.appendChild(newParagraph);

                removeProduct = false;
        } else {
            for(let i = 0; i < save; i++) {
                var newParagraph = document.createElement('p');
                newParagraph.textContent = fuelsync_product.productName + ' - ' + fuelsync_product.sellPrice + '€';
                
                var ticketDiv = document.querySelector('.ticket > div');
                ticketDiv.appendChild(newParagraph);
            }
        }
        
        save = 1;
        updateTotal();
    }
}

function updateTotal() {
    var totalPrice = 0;

    // Ajouter les prix des produits du ticket
    var ticketItems = document.querySelectorAll('.ticket > div > p');
    ticketItems.forEach(function(item) {
        var priceText = item.textContent.split(' - ')[1]; // Récupérer le texte du prix
        var itemPrice = parseFloat(priceText);
        if (!isNaN(itemPrice)) { // Vérifier si le prix est un nombre valide
            totalPrice += itemPrice;
        }
    });

    // Ajouter les prix des produits de la pompe
    var pumpProducts = document.querySelectorAll('.product-info');
    pumpProducts.forEach(function(product) {
        var priceText = product.textContent.split(' - ')[1]; // Récupérer le texte du prix
        var productPrice = parseFloat(priceText);
        if (!isNaN(productPrice)) { // Vérifier si le prix est un nombre valide
            totalPrice += productPrice;
        }
    });

    // Mettre à jour le prix total
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

getProductsData();
updateTotal();
