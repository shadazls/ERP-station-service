// Définir une fonction pour récupérer les données des pompes
function getPumpData() {
    $.ajax({
        url: "https://api.fuelsync.hertinox.fr/pumps/getallpumps.php",
        type: "GET",
        contentType: "application/json",
        success: function(response, status, xhr) {
            console.log(response);
            // Vérifier le code de statut HTTP
            if (xhr.status === 200) {
                let pumpsInfo = response;

                // Parcourir les données de chaque pompe
                pumpsInfo.forEach(function(pump) {
                    let pumpElement = $('.line-pump:nth-child(' + pump.idPump + ')');

                    // Déterminer le texte et la couleur en fonction de l'état
                    let statusText, color;
                    if (pump.state === 1) {
                        statusText = 'PAYÉE';
                        color = 'green';
                    } else {
                        statusText = 'À ENCAISSER';
                        color = 'red';
                    }

                    if (pump.state === 0) {
                        pumpElement.addClass('to-encash');
                    }

                    // Mettre à jour le HTML avec les informations de la pompe
                    pumpElement.empty(); // Supprimer le contenu existant pour éviter la duplication
                    pumpElement.append('<p>POMPE ' + pump.idPump + ' : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + pump.name + ' - ' + pump.lastQuantity.toFixed(2) + 'L - ' + pump.lastPrice.toFixed(2) + '€ - <span style="color:' + color + '">' + statusText + '</span></p>');
                });
            }
        }
    });
}

// Appeler la fonction pour la première fois et démarrer l'intervalle
getPumpData();
setInterval(getPumpData, 2500); // Appeler la fonction toutes les 5 secondes (5000 ms)

let pumpChoosen = null;

$(document).on('click', '.line-pump:contains("À ENCAISSER")', function() {
    let pumpInfo = $(this).text().trim().split(' - ');
    pumpID = pumpInfo[0].split(":")[0].trim()
    pumpName = pumpInfo[0].split(":")[1].trim();
    let pumpPrice = parseFloat(pumpInfo[2].split('€')[0]);

    if(pumpChoosen == null) {
        pumpChoosen = pumpID;
    
        let newProduct = $('<div class="product-info"></div>');
        newProduct.text(pumpName + " - " + pumpInfo[2]);

        removeProduct = false
    
        $('#ticket-items').append(newProduct);
        updateTotal(pumpPrice);
    } else {
        if(removeProduct == true && pumpID === pumpChoosen) {
            pumpChoosen = null;
        
            let newProduct = $('<div class="product-info"></div>');
            newProduct.text(pumpName + " - -" + pumpInfo[2]);

            $('#ticket-items').append(newProduct);
            updateTotal(pumpPrice);
            removeProduct = false
        }
    }
});

