document.addEventListener("DOMContentLoaded", function () {
    // Sélection du bouton "Ajouter +"
    var addButton = document.querySelector("#add-to-cart-button");

    // Ajout d'un gestionnaire d'événements au clic sur le bouton "Ajouter +"
    addButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        console.log("Clic détecté sur le bouton 'Ajouter +'");

        // Récupération des valeurs des inputs
        // Sélection de l'élément select
        var productsEnergySelect = document.getElementById("products-and-energy-select");
        var productsEnergySelectValue = productsEnergySelect.value;

        // Récupération de l'option sélectionnée
        var selectedOption = productsEnergySelect.options[productsEnergySelect.selectedIndex];

        // Récupération du texte de l'option sélectionnée
        var selectedText = selectedOption.text;

        // Affichage du texte de l'option sélectionnée
        console.log(selectedText);
        var quantity = document.querySelector("#product-quantity-input").value;
        // var supplier = document.querySelector("#supplier-input").value;
        var supplierSelect = document.getElementById("supplier-select");
        var supplierSelectValue = supplierSelect.value;
        var supplierSelectedOption = supplierSelect.options[supplierSelect.selectedIndex];
        var supplierSelectedText = supplierSelectedOption.text;

        // Vérification que chaque champ n'est pas vide
        if (productsEnergySelectValue === '0') {
            Swal.fire({
                icon: "error",
                title: "Un des champs est vide",
                text: "Le champ 'Produit ou énergie' doit avoir un produit selectionné!",
            });
            return;
        }

        if (quantity.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Un des champs est vide",
                text: "Le champ 'Quantité' ne peut pas être vide !",
            });
            return;
        }

        if (supplierSelectValue === '0') {
            Swal.fire({
                icon: "error",
                title: "Un des champs est vide",
                text: "Le champ 'Fournisseur' doit avoir un fournisseur selectionné!",
            });
            return;
        }

        // Création de l'élément à ajouter dynamiquement
        var newElement = document.createElement("div");
        newElement.id = productsEnergySelectValue;
        newElement.classList.add("element-box", "classic-box", "hvr-shrink", "cliquable");

        var leftElement = document.createElement("p");
        leftElement.classList.add("left-element");
        leftElement.textContent = selectedText + " - " + quantity;

        //avant


        // Création de l'élément div
        var rightElement = document.createElement("div");
        rightElement.classList.add("right-element");

        // Création de l'élément paragraphe pour le prix
        var priceElement = document.createElement("p");

        // Requête GET à l'API
        fetch("https://api.fuelsync.hertinox.fr/products/getproduct.php?idProduct=" + productsEnergySelectValue, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()) // Convertit la réponse en JSON
            .then(data => {
                // Récupération du prix du produit
                var price = data.purshasePrice;

                // Mise à jour du texte de l'élément priceElement avec le prix récupéré
                priceElement.textContent = price.toFixed(2) + "€";

                // Ajout de l'élément priceElement à l'élément rightElement
                rightElement.appendChild(priceElement);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du prix du produit :", error);
            });

        //après

        newElement.appendChild(leftElement);
        newElement.appendChild(rightElement);

        // Ajout de l'élément créé dans le panier
        var contentWrapper = document.querySelector("#shopping-cart .content-wrapper");
        contentWrapper.appendChild(newElement);

        Swal.fire({
            icon: "success",
            title: "Produit ajouté au panier avec succès",
            text: `Le produit "${selectedText}" en ${quantity} exemplaire(s) par le fournisseur "${supplierSelectedText}" a bien été ajouté au panier.`,
        });
    });
});
