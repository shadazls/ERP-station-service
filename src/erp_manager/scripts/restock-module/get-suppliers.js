// Fonction pour créer les options du select avec les données fournies
function populateSupplierOptions() {
    // Sélection de l'élément select
    var supplierSelect = document.getElementById("supplier-select");

    // Requête GET à l'API
    fetch("https://api.fuelsync.hertinox.fr/suppliers/getallsuppliers.php")
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            // Pour chaque fournisseur dans les données
            data.forEach(supplier => {
                // Création d'une option
                var option = document.createElement("option");
                // Définition de la valeur de l'option
                option.value = supplier.idSupplier;
                // Définition du texte de l'option
                option.textContent = supplier.supplierName;
                // Ajout de l'option au select
                supplierSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des fournisseurs :", error);
        });
}

// Appel de la fonction pour créer les options du select au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    populateSupplierOptions();
});
