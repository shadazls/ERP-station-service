// Sélectionnez l'icône de bascule de mot de passe
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('password-input');

// Ajouter un gestionnaire d'événement de clic sur l'icône de bascule de mot de passe
passwordToggle.addEventListener('click', function() {
    // Vérifiez si le type du champ de saisie de mot de passe est "password"
    if (passwordInput.type === 'password') {
        // Si oui, changez-le en "text" pour rendre le mot de passe visible
        passwordInput.type = 'text';
        // Changez l'icône de l'oeil ouvert en icône de l'oeil barré
        passwordToggle.innerHTML = '<i class="far fa-eye-slash"></i>';
        // Mettez à jour l'attribut aria-pressed pour indiquer que le mot de passe est visible
        passwordToggle.setAttribute('aria-pressed', 'true');
    } else {
        // Si non, changez-le en "password" pour masquer le mot de passe
        passwordInput.type = 'password';
        // Changez l'icône de l'oeil barré en icône de l'oeil ouvert
        passwordToggle.innerHTML = '<i class="far fa-eye"></i>';
        // Mettez à jour l'attribut aria-pressed pour indiquer que le mot de passe est masqué
        passwordToggle.setAttribute('aria-pressed', 'false');
    }
});
