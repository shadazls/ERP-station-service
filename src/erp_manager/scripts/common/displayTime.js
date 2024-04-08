function displayTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  
  const heureFormat = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  
  const timeContainer = document.querySelector('#time');
  timeContainer.textContent = heureFormat;

  // Mettre à jour la largeur du conteneur de l'heure pour éviter le déplacement du select
  const timeWidth = timeContainer.offsetWidth;
  timeContainer.style.width = timeWidth + 'px';
}

// Mettre à jour l'heure toutes les secondes
setInterval(displayTime, 1000);

// Afficher l'heure au chargement de la page
displayTime();
