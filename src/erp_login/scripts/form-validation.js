// Fonction pour hasher le mot de passe avec SHA-256
function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest('SHA-256', data)
        .then(buffer => {
            const hashArray = Array.from(new Uint8Array(buffer));
            const hashHex = hashArray.map(byte => ('00' + byte.toString(16)).slice(-2)).join('');
            return hashHex;
        });
}

// Fonction pour afficher les erreurs de champ
function displayError(inputElement, errorElement, errorMessage) {
    if (inputElement.value.trim() === '') {
        errorElement.textContent = errorMessage;
        errorElement.classList.remove('hidden');
        inputElement.setAttribute('aria-invalid', 'true'); // Champ invalide
    } else {
        errorElement.classList.add('hidden');
        inputElement.setAttribute('aria-invalid', 'false'); // Champ valide
    }
}

// Fonction pour valider le formulaire de connexion
function validateForm(event) {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire

    // Récupérer les valeurs des champs du formulaire
    const usernameInputValue = document.querySelector('#username-input').value.trim();
    const passwordInputValue = document.querySelector('#password-input').value.trim();

    // Sélectionner les éléments pour afficher les messages d'erreur
    const usernameError = document.querySelector('#username-error');
    const passwordError = document.querySelector('#password-error');

    // Réinitialiser les messages d'erreur
    usernameError.textContent = "";
    passwordError.textContent = "";

    // Afficher les erreurs de champ
    displayError(document.querySelector('#username-input'), usernameError, "Le champ nom d'utilisateur est obligatoire !");
    displayError(document.querySelector('#password-input'), passwordError, "Le champ mot de passe est obligatoire !");

    // Si l'un des champs est vide, sortir de la fonction
    if (usernameInputValue === '' || passwordInputValue === '') {
        return;
    }

    // Hasher le mot de passe
    sha256(passwordInputValue)
        .then(hash => {
            // Envoyer la requête AJAX avec le nom d'utilisateur et le mot de passe hashé
            $.ajax({
                url: "https://api.fuelsync.hertinox.fr/auth/login.php",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "username": usernameInputValue,
                    "password": hash
                }),
                success: function(response, status, xhr) {
                    console.log(response);
                    // Vérifier le code de statut HTTP
                    if (xhr.status === 200) {
                        // La connexion a réussi
                        if (response.role === 0) {
                            window.location.href = '/src/erp_cash_desk/employee.html';
                        } else if (response.role === 1) {
                            window.location.href = '/src/erp_manager/manager.html';
                        }
                    } else {
                        // La connexion a échoué
                        usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect";
                        usernameError.classList.remove('hidden');
                    }
                },
                error: function(xhr, status, error) {
                    // Vérifier le code de statut HTTP
                    if (xhr.status === 401) {
                        // Nom d'utilisateur ou mot de passe incorrect
                        usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect";
                        usernameError.classList.remove('hidden');
                    } else {
                        console.error("Erreur de requête: " + xhr.status);
                    }
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors du hachage du mot de passe:", error);
        });
}

// Ajouter un écouteur d'événement pour la soumission du formulaire
document.getElementById('login-form').addEventListener('submit', validateForm);
