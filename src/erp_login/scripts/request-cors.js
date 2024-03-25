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

// Fonction pour valider le formulaire de connexion
function validateForm(event) {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire

    // Définir l'URL de l'API
    const url = "https://api.fuelsync.hertinox.fr/auth/login.php";

    // Récupérer les valeurs des champs du formulaire
    const usernameInputValue = document.querySelector('#usernameInput').value.trim();
    const passwordInputValue = document.querySelector('#passwordInput').value.trim();

    // Sélectionner les éléments pour afficher les messages d'erreur
    const usernameError = document.querySelector('#usernameError');
    const passwordError = document.querySelector('#passwordError');

    // Réinitialiser les messages d'erreur
    usernameError.textContent = "";
    passwordError.textContent = "";

    // Vérifier si le formulaire est valide
    if (!event.target.checkValidity()) {
        // Vérifier si le champ nom d'utilisateur est rempli
        if (usernameInputValue === '') {
            // Nom d'utilisateur non rempli, afficher une erreur
            usernameError.textContent = "Le champ nom d'utilisateur est obligatoire !";
            usernameError.classList.remove('hidden');
        }

        // Vérifier si le champ mot de passe est rempli
        if (passwordInputValue === '') {
            // Mot de passe non rempli, afficher une erreur
            passwordError.textContent = "Le champ mot de passe est obligatoire !";
            passwordError.classList.remove('hidden');
        }
    } else {
        // Réinitialiser les messages d'erreur
        usernameError.classList.add('hidden');
        passwordError.classList.add('hidden');

        // Hasher le mot de passe
        sha256(passwordInputValue)
            .then(hash => {
                // Envoyer la requête AJAX avec le nom d'utilisateur et le mot de passe hashé
                $.ajax({
                    url: url,
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
                                window.location.href = '/erp_cash_desk/employee.html';
                            } else if (response.role === 1) {
                                window.location.href = '/erp_manager/manager.html';
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
}

// Ajouter un écouteur d'événement pour la soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', validateForm);
