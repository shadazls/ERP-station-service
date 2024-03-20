var createButton = document.getElementById('createButton');

createButton.addEventListener('click', function() {
    var dateTime = document.getElementById('dateTime').value;
    var incidentType = document.getElementById('incidentType').value;
    var technicalDetail = document.getElementById('technicalDetail').value;
    var remark = document.getElementById('remark').value;

    // Création d'un nouvel élément div pour l'incident
    var newIncident = document.createElement('div');
    newIncident.classList.add('incident-item');

    // Ajout des informations de l'incident dans le nouvel élément div
    newIncident.innerHTML = `
        <p>Date Heure: ${dateTime}</p>
        <p>Type: ${incidentType}</p>
        <p>Détail technique: ${technicalDetail}</p>
        <p>Remarque: ${remark}</p>
    `;

    // Ajout du nouvel incident à la div checkIncident
    var checkIncident = document.getElementById('checkIncident');
    checkIncident.appendChild(newIncident);
});
