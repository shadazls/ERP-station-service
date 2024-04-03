// Sélection de l'élément datalist
var dataList = document.getElementById('products-and-energy');

// Requête vers l'API pour récupérer les produits
fetch('https://api.fuelsync.hertinox.fr/products/getallproducts.php')
  .then(response => response.json())
  .then(data => {
    // Parcourir les données et créer les options
    data.forEach(product => {
      var option = document.createElement('option');
      option.value = product.productName;
      dataList.appendChild(option);
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des produits :', error));