// Sélection du menu déroulant
var select = document.getElementById('slct');

// Ajout d'un gestionnaire d'événements pour l'événement de changement du menu déroulant
select.addEventListener('change', function() {
    // Récupérer la valeur sélectionnée dans le menu déroulant
    var selectedValue = select.value;
    
    // Rediriger en fonction de la valeur sélectionnée
    if (selectedValue === '0') {
        // Redirection vers le lien ERP
        window.location.href = '/src/erp_manager/manager.html';
    } else if (selectedValue === '1') {
        // Redirection vers le lien Caisse
        window.location.href = '/src/erp_cash_desk/employee.html';
    }
});