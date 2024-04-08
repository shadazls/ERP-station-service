// Effectuer la requête GET
fetch("https://api.fuelsync.hertinox.fr/products/getallproducts.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données des produits.");
        }
        return response.json();
    })
    .then(data => {
        // Sélection du select
        const productSelect = document.getElementById('product-select');

        // Parcourir les données et créer les options dynamiquement
        data.forEach(product => {
            const option = document.createElement('option');
            option.value = product.idProduct;
            option.textContent = product.productName;
            productSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
    });