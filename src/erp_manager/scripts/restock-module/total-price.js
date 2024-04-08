// Fonction pour mettre à jour le total du panier
function updateTotal() {
    // Sélection de l'élément qui affiche le total
    console.log("updateTotal");
    var totalElement = document.getElementById("shopping-cart-final-p");

    // Sélection de tous les éléments contenant les prix des produits
    var productElements = document.querySelectorAll("#cart-container .element-box");

    // Initialisation du total
    var total = 0;

    // Boucle à travers tous les éléments de produits et calcule le total en tenant compte de la quantité
    productElements.forEach(function(productElement) {
        var quantityText = productElement.querySelector(".left-element").textContent.trim().split("-")[1].trim();
        var quantity = parseInt(quantityText); // Récupération de la quantité du produit
        var priceText = productElement.querySelector(".right-element p").textContent; // Récupération du texte du prix
        var price = parseFloat(priceText.replace("€", "").replace(",", ".")); // Conversion du texte en nombre
        total += price * quantity; // Multiplication du prix par la quantité et ajout au total
    });

    // Mise à jour du contenu de l'élément affichant le total
    totalElement.textContent = "Total : " + total.toFixed(2) + "€";
}

// Sélection de l'élément contenant le panier
var cartContainer = document.getElementById("cart-container");

// Création d'un observateur de mutations
var observer = new MutationObserver(function(mutations) {
    // Lorsqu'une mutation est détectée, mettre à jour le total
    console.log("test")
    updateTotal();
});

// Configuration de l'observateur de mutations pour surveiller les changements dans les sous-arbres et les attributs
var config = { subtree: true, attributes: true, childList: true };

// Démarrage de l'observateur de mutations avec la configuration spécifiée
observer.observe(cartContainer, config);