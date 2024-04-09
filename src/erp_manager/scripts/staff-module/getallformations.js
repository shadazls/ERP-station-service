// Effectuer une requête GET pour récupérer les données JSON des formations
fetch("https://api.fuelsync.hertinox.fr/formations/getallformations.php")
  .then(response => response.json())
  .then(data => {
    // Sélectionner la div parent où les éléments seront ajoutés
    const listeFormationDiv = document.getElementById('liste_formation');

    // Parcourir les données JSON et créer les éléments correspondants
    data.forEach(formation => {
      // Créer un élément div pour chaque formation
      const formationBox = document.createElement('div');
      formationBox.classList.add('staff-formation-box', 'classic-box', 'hvr-shrink', 'cliquable');

      // Créer un paragraphe pour le nom de la formation
      const formationName = document.createElement('p');
      formationName.classList.add('left-element');
      formationName.textContent = formation.name + ' - ' + formation.dateFormation;

      // Ajouter le paragraphe à la div de la formation
      formationBox.appendChild(formationName);

      // Ajouter l'élément de formation à la div parent
      listeFormationDiv.appendChild(formationBox);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données des formations:', error);
    // Gérer l'erreur, par exemple afficher un message à l'utilisateur
    // alert('Une erreur s\'est produite lors de la récupération des données des formations. Veuillez réessayer.');
  });
