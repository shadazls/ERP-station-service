// // Fonction de validation pour le champ de nom d'utilisateur
// function validateUsername() {
//     const usernameInput = document.getElementById('usernameInput');
//     const usernameError = document.getElementById('usernameError');
//     const usernameValue = usernameInput.value.trim(); // Trim pour supprimer les espaces blancs inutiles

//     // Vérifier si le champ est vide
//     if (usernameValue === '') {
//         usernameError.textContent = "Le champ nom d'utilisateur est obligatoire !";
//         usernameError.classList.remove('hidden');
//     } else {
//         usernameError.textContent = ""; // Effacer le message d'erreur s'il n'y a pas d'erreur
//         usernameError.classList.add('hidden');
//     }
// }

// // Écouter l'événement de saisie sur le champ de nom d'utilisateur
// document.getElementById('usernameInput').addEventListener('input', validateUsername);

// // Fonction de validation pour le champ de mot de passe
// function validatePassword() {
//     const passwordInput = document.getElementById('passwordInput');
//     const passwordError = document.getElementById('passwordError');
//     const passwordValue = passwordInput.value.trim(); // Trim pour supprimer les espaces blancs inutiles

//     // Vérifier si le champ est vide
//     if (passwordValue === '') {
//         passwordError.textContent = "Le champ mot de passe est obligatoire !";
//         passwordError.classList.remove('hidden');
//     } else {
//         passwordError.textContent = ""; // Effacer le message d'erreur s'il n'y a pas d'erreur
//         passwordError.classList.add('hidden');
//     }
// }

// // Écouter l'événement de saisie sur le champ de mot de passe
// document.getElementById('passwordInput').addEventListener('input', validatePassword);

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

function validateForm() {
    console.log("On est dans la fonction validateForm")
    // Définir l'URL de l'API
    const url = "https://api.fuelsync.hertinox.fr/auth/login.php"

    // Sélectionner le formulaire
    const loginForm = document.querySelector('#loginForm');

    // Récupérer les valeurs des champs du formulaire
    let usernameInputValue = document.querySelector('#usernameInput').value;
    let passwordInputValue = document.querySelector('#passwordInput').value;

    // Sélectionner les éléments pour afficher les messages d'erreur
    let usernameError = document.querySelector('#usernameError');
    let passwordError = document.querySelector('#passwordError');

    // Réinitialiser les messages d'erreur
    usernameError.textContent = "";
    passwordError.textContent = "";

    // Vérifier si le formulaire est valide
    if (!loginForm.checkValidity()) {
        
        // Vérifier si le champ nom d'utilisateur est rempli
        if (usernameInputValue.trim() === '') {
            // Nom d'utilisateur non rempli, afficher une erreur
            usernameError.textContent = "Le champ nom d'utilisateur est obligatoire !"
            usernameError.classList.remove('hidden');
        }

        // Vérifier si le champ mot de passe est rempli
        if (passwordInputValue.trim() === '') {
            // Mot de passe non rempli, afficher une erreur
            passwordError.textContent = "Le champ mot de passe est obligatoire !"
            passwordError.classList.remove('hidden');
        }

        event.preventDefault();
    } else {
        console.log("On est dans le else de validateForm()");

        // Réinitialiser les messages d'erreur
        usernameError.classList.add('hidden');
        passwordError.classList.add('hidden');

        // sha256(passwordInputValue).then(hash => {
        //     console.log("Mot de passe crypté (SHA-256) :", hash);

        //     loginRequest(usernameInputValue, hash);
        // });

        const body = {
            "username": usernameInputValue,
            "password": "GrosZizi"
        };

        event.preventDefault();

        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data:
            {
            "username": "LFarchetto",
            "password": "d1a9ae98922d4db65067badbf15a43d1084f9a245b6617447cd020e410d418a3"
            }, //JSON.stringify(body),
            success: function(response) {
                console.log("zizi")
                console.log(response);
                if (response.success) {
                    // Redirection vers la page appropriée
                    if (response.role === '0') {
                        window.location.href = '/erp_cash_desk/employee.html';
                    } else if (response.role === '1') {
                        window.location.href = '/erp_manager/manager.html';
                    }
                } else {
                    // Gestion des erreurs
                    if (response.error === 'Unauthorized') {
                        usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect";
                    } else {
                        console.log("Une erreur inattendue s'est produite");
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error("Erreur de requête: " + xhr.status);
            }
        });

        // console.log("Création de la requête");
        // var xhttp = new XMLHttpRequest();
        // console.log("Création de la requête x2");
        // xhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log(this.responseText)
        //         const response = JSON.parse(this.responseText);
        //         if (response.success) {
        //             // Redirection vers la page appropriée
        //             if (response.role === '0') {
        //                 window.location.href = '/erp_cash_desk/employee.html';
        //             } else if (response.role === '1') {
        //                 window.location.href = '/erp_manager/manager.html';
        //             }
        //         } else {
        //             // Gestion des erreurs
        //             if (response.error === 'Unauthorized') {
        //                 usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect";
        //             } else {
        //                 console.log("Une erreur inattendue s'est produite");
        //             }
        //         }
        //     } else {
        //         // La requête a échoué
        //         console.error("Erreur de requête: " + this.status);
        //     }
            
        // };
        // xhttp.open("POST", url, true);
        // xhttp.setRequestHeader("Content-type", "application/json");
        // xhttp.send(JSON.stringify(body));

        // xhttp.onerror = function(error) { // ne se déclenche que si la demande n'a pas pu être faite du tout
        //     console.log(error);
        // }
    }



    //         Une requête AJAX sera écrite ici plus tard

    //     Vérifier le pattern pour le champ de mot de passe
    //     var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    //     if (!passwordPattern.test(passwordInput)) {
    //         // Le mot de passe ne respecte pas le pattern, afficher une erreur
    //         return "Le mot de passe ne respecte pas les critères de sécurité.";
    //     }

    //     Si toutes les validations passent, le formulaire est valide

    //     return 0;
    // }

    // function loginRequest(username, hashedPassword) {
    //     const url = "https://api.fuelsync.hertinox.fr/auth/login.php";

    //     const body = {
    //         "username": username,
    //         "password": hashedPassword
    //     };

    //     console.log("Création de la requête");

    // $.ajax({
    //     url: url,
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(body),
    //     success: function(response) {
    //         console.log("zizi")
    //         console.log(response);
    //         if (response.success) {
    //             // Redirection vers la page appropriée
    //             if (response.role === '0') {
    //                 window.location.href = '/erp_cash_desk/employee.html';
    //             } else if (response.role === '1') {
    //                 window.location.href = '/erp_manager/manager.html';
    //             }
    //         } else {
    //             // Gestion des erreurs
    //             if (response.error === 'Unauthorized') {
    //                 usernameError.textContent = "Nom d'utilisateur ou mot de passe incorrect";
    //             } else {
    //                 console.log("Une erreur inattendue s'est produite");
    //             }
    //         }
    //     },
    //     error: function(xhr, status, error) {
    //         console.error("Erreur de requête: " + xhr.status);
    //     }
    // });
}


// Fonction pour gérer la soumission du formulaire
// function handleSubmit(event) {
//     console.log("On est dans la fonction handleSubmit");
//     event.preventDefault(); // Empêcher la soumission par défaut du formulaire


//     validateForm();
//     // Vérifier si le résultat de la validation est valide
//     if (validationResult !== 0) {
//         // Si des erreurs sont présentes, ne pas envoyer le formulaire
//         return;
//     }
// }

// Ajouter un écouteur d'événement pour la soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', validateForm);
