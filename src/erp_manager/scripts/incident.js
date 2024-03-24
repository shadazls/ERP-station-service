document.getElementById('createButton').addEventListener('click', function() {
    var dateTime = document.getElementById('dateTime').value.trim();
    var incidentType = document.getElementById('incidentType').value.trim();
    var technicalDetail = document.getElementById('technicalDetail').value.trim();
    var remark = document.getElementById('remark').value.trim();
  
    if (dateTime && incidentType && technicalDetail && remark) {
        var incidentInfo = document.createElement('div');
        incidentInfo.classList.add('incident-info');
  
        var incidentContent = dateTime + ' ' + incidentType + ' ' + technicalDetail + ' ' + remark;
        incidentInfo.innerHTML = '<p>' + incidentContent + '</p>';
  
        var checkIncident = document.getElementById('checkIncident');
        if (checkIncident.firstChild) {
            checkIncident.insertBefore(incidentInfo, checkIncident.firstChild);
        } else {
            checkIncident.appendChild(incidentInfo);
        }
  
        // Réinitialiser les champs de saisie
        document.getElementById('dateTime').value = '';
        document.getElementById('incidentType').value = '';
        document.getElementById('technicalDetail').value = '';
        document.getElementById('remark').value = '';
    }
});
