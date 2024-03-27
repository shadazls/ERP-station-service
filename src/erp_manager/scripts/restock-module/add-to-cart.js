document.addEventListener("DOMContentLoaded", function () {
    // Sélection du bouton "Ajouter +"
    var addButton = document.querySelector("#add-to-cart-button");

    // Ajout d'un gestionnaire d'événements au clic sur le bouton "Ajouter +"
    addButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du lien

        console.log("Clic détecté sur le bouton 'Ajouter +'");

        // Récupération des valeurs des inputs
        var productOrEnergy = document.querySelector("#products-and-energy-input").value;
        var quantity = document.querySelector("#product-quantity-input").value;
        var supplier = document.querySelector("#supplier-input").value;

        // Vérification que chaque champ n'est pas vide
        if (productOrEnergy.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Un des champs est vide",
                text: "Le champ 'Produit ou énergie' ne peut pas être vide !",
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

        if (supplier.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Un des champs est vide",
                text: "Le champ 'Fournisseur' ne peut pas être vide !",
            });
            return;
        }

        console.log("Produit ou énergie:", productOrEnergy);
        console.log("Quantité:", quantity);
        console.log("Fournisseur:", supplier);

        // Création de l'élément à ajouter dynamiquement
        var newElement = document.createElement("div");
        newElement.id = productOrEnergy;
        newElement.classList.add("element-box", "classic-box", "hvr-buzz", "cliquable");

        var leftElement = document.createElement("p");
        leftElement.classList.add("left-element");
        leftElement.textContent = productOrEnergy + " - " + quantity;

        var rightElement = document.createElement("div");
        rightElement.classList.add("right-element");
        var priceElement = document.createElement("p");
        priceElement.textContent = "X,X€";
        rightElement.appendChild(priceElement);

        newElement.appendChild(leftElement);
        newElement.appendChild(rightElement);

        // Ajout de l'élément créé dans le panier
        var contentWrapper = document.querySelector("#shopping-cart .content-wrapper");
        contentWrapper.appendChild(newElement);

        Swal.fire({
            icon: "success",
            title: "Produit ajouté au panier avec succès",
            text: `Le produit "${productOrEnergy}" en ${quantity} exemplaire(s) par le fournisseur "${supplier}" a bien été ajouté au panier.`,
        });
    });
});
