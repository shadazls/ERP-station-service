// Fonction pour attacher un gestionnaire d'événements à chaque élément de la liste staff-list
function attachClickEventListeners() {
    // Sélectionner tous les éléments li de la liste
    var items = document.querySelectorAll('#staff-list li');

    // Boucle à travers chaque élément li pour ajouter un écouteur d'événements de clic
    items.forEach(function(item) {
        item.addEventListener('click', function() {
            // Supprimer la bordure de tous les éléments et cacher toutes les icônes
            items.forEach(function(item) {
                item.style.border = 'none'; // Supprimer la bordure
                var icon = item.querySelector('.fa-bars');
                if (icon) {
                    icon.classList.add("hidden"); // Cacher l'icône
                }
                item.style.color = '#767676'; // Couleur par défaut
            });

            // Appliquer la bordure et la couleur spécifiée à l'élément sélectionné et afficher son icône
            item.style.border = 'solid black'; // Ajouter une bordure
            var selectedIcon = item.querySelector('.fa-bars');
            if (selectedIcon) {
                selectedIcon.classList.remove("hidden"); // Afficher l'icône
            }
            item.style.color = 'black'; // Couleur du texte

            // Récupérer l'ID du <li> sélectionné
            var liId = item.id;

            // Effectuer la requête GET à l'URL avec l'ID récupéré
            fetch(`https://api.fuelsync.hertinox.fr/staff/getstaff.php?idStaff=${liId}`)
                .then(response => response.json())
                .then(data => {
                    // Mettre à jour les informations de formation
                    updateFormationInformation(data.formation);
                    updateExperienceInformation(data.experience);

                    // Remplir les champs d'inscription
                    document.getElementById('inscription-name').value = data.lastName;
                    document.getElementById('inscription-first-name').value = data.firstName;
                    document.getElementById('inscription-phone').value = data.phone;
                })
                .catch(error => {
                    console.error('Error fetching staff data:', error);
                    // Gérer les erreurs ici
                });
        });
    });
}

// Fonction pour mettre à jour les informations de formation
function updateFormationInformation(formationData) {
    var formationContent = document.getElementById('formationContent');
    formationContent.innerHTML = ''; // Vide le contenu existant

    // Convertir la chaîne JSON en tableau d'objets JavaScript
    var formations = JSON.parse(formationData);

    // Ajouter les nouvelles données de formation
    formations.forEach(entry => {
        var pElement = document.createElement('p');
        pElement.classList.add('staff-right-div-secondary-p');
        pElement.textContent = entry;
        formationContent.appendChild(pElement);
    });
}

// Fonction pour mettre à jour les informations d'expérience
function updateExperienceInformation(experienceData) {
    var experienceContent = document.getElementById('experienceContent');
    experienceContent.innerHTML = ''; // Vide le contenu existant

    // Convertir la chaîne JSON en tableau d'objets JavaScript
    var experiences = JSON.parse(experienceData);

    // Ajouter les nouvelles données d'expérience
    experiences.forEach(entry => {
        var pElement = document.createElement('p');
        pElement.classList.add('staff-right-div-secondary-p');
        pElement.textContent = entry;
        experienceContent.appendChild(pElement);
    });
}

// Fonction pour attacher un gestionnaire d'événements à chaque icône de gestion du personnel
function attachIconEventListeners() {
    // Sélectionner tous les éléments avec la classe 'manage-staff'
    var icons = document.querySelectorAll('.manage-staff');

    // Ajout d'un gestionnaire d'événements de clic à chaque icône
    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            // Récupérer l'ID du <li> parent
            var liId = icon.closest('li').id;

            // Effectuer la requête GET à l'URL avec l'ID récupéré
            fetch(`https://api.fuelsync.hertinox.fr/staff/getstaff.php?idStaff=${liId}`)
                .then(response => response.json())
                .then(data => {
                    // Affichage de la popup avec les données reçues
                    Swal.fire({
                        title: 'Gestion du personnel',
                        html:
                            `<label for="name">Nom</label><br>` +
                            `<input id="name" class="swal2-input" value="${data.lastName}"><br>` +

                            `<br><label for="firstname">Prénom</label><br>` +
                            `<input id="firstname" class="swal2-input" value="${data.firstName}"><br>` +

                            `<br><label for="birthdate">Date de naissance</label><br>` +
                            `<input type="date" id="birthdate" name="birthdate" class="swal2-input" value="${data.birthDate}"><br>` +

                            `<br><label for="phone">Numéro de téléphone</label><br>` +
                            `<input type="tel" id="phone" name="phone" class="swal2-input" value="${data.phone}"><br>` +

                            `<br><label for="education">Formation</label><br>` +
                            `<textarea id="education" name="education" class="swal2-textarea">${data.formation}</textarea><br>` +

                            `<br><label for="experience">Expérience professionnelle</label><br>` +
                            `<textarea id="experience" name="experience" class="swal2-textarea">${data.experience}</textarea><br>`,
                        icon: 'info',
                        showCancelButton: true,
                        showDenyButton: true,
                        confirmButtonText: 'Valider',
                        cancelButtonText: 'Annuler',
                        denyButtonText: 'Supprimer',
                        preConfirm: () => {
                            return {
                                birthdate: document.getElementById('birthdate').value,
                                phone: document.getElementById('phone').value,
                                education: document.getElementById('education').value,
                                experience: document.getElementById('experience').value
                            };
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Effectuer une requête POST pour mettre à jour les informations du personnel
                            fetch(`https://api.fuelsync.hertinox.fr/staff/updatestaff.php`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    idStaff: data.idStaff, // Assurez-vous de récupérer l'idStaff depuis les données reçues
                                    lastName: document.getElementById('name').value,
                                    firstName: document.getElementById('firstname').value,
                                    birthDate: document.getElementById('birthdate').value,
                                    phone: document.getElementById('phone').value,
                                    formation: document.getElementById('education').value,
                                    experience: document.getElementById('experience').value
                                })
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erreur lors de la mise à jour des informations du personnel');
                                }
                                // Gérer la réponse ici
                                console.log('Informations du personnel mises à jour avec succès');
                                window.location.reload();
                            })
                            .catch(error => {
                                console.error('Error updating staff data:', error);
                                // Gérer les erreurs ici
                            });
                        } else if (result.isDenied) {
                            Swal.fire({
                                icon: "warning",
                                title: "Êtes-vous sûr ?",
                                text: "Une fois un membre du personnel supprimé, vous ne pourrez pas le récupérer !",
                                showCancelButton: true,
                                confirmButtonText: 'Supprimer',
                                cancelButtonText: 'Annuler',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Effectuer une requête POST pour supprimer le personnel
                                    fetch(`https://api.fuelsync.hertinox.fr/staff/deletestaff.php`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            idStaff: data.idStaff
                                        })
                                    })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Erreur lors de la suppression du personnel');
                                        }
                                        // Gérer la réponse ici
                                        console.log('Personnel supprimé avec succès');
                                        
                                        // Recharger la page pour refléter les changements après la suppression du personnel
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        console.error('Error deleting staff:', error);
                                        // Gérer les erreurs ici
                                    });
                                }
                            });
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching staff data:', error);
                    // Gérer les erreurs ici
                });
        });
    });
}

// Fonction pour formater les données de formation
function formatFormation(formation) {
    // Vérifier si la formation est une chaîne de caractères (plutôt qu'un tableau)
    if (typeof formation === 'string') {
        // Si c'est une chaîne de caractères, la parser en tant que JSON
        formation = JSON.parse(formation);
    }

    let formattedFormation = '';
    // Vérifier si la formation est un tableau
    if (Array.isArray(formation)) {
        formation.forEach(entry => {
            formattedFormation += `- ${entry.year}: ${entry.field} à ${entry.institution}\n`;
        });
    } else {
        // Si ce n'est pas un tableau, afficher un message d'erreur
        formattedFormation = 'Erreur: Format de données de formation incorrect.';
    }
    return formattedFormation;
}

// Fonction pour formater les données d'expérience professionnelle
function formatExperience(experience) {
    let formattedExperience = '';
    experience.forEach(entry => {
        formattedExperience += `- ${entry.date}: ${entry.position} à ${entry.organization}\n`;
    });
    return formattedExperience;
}

// Fonction pour créer la liste de personnel dynamiquement
function createStaffList(staffData) {
    var staffList = document.getElementById("staff-list");
    staffData.forEach(function(staff) {
        var li = document.createElement("li");
        li.textContent = staff.firstName + " " + staff.lastName;
        li.id = staff.idStaff;
        var icon = document.createElement("i");
        icon.className = "manage-staff fa-solid fa-bars cliquable hidden";
        li.appendChild(icon);
        staffList.appendChild(li);
    });
    // Attacher les gestionnaires d'événements après avoir créé la liste
    attachClickEventListeners();
    attachIconEventListeners();
}

// URL de l'API
var apiUrl = "https://api.fuelsync.hertinox.fr/staff/getallstaffs.php";

// Fonction pour effectuer une requête GET AJAX
function httpGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
    };
    xhr.open("GET", url, true);
    xhr.send();
}

// Faire une requête GET pour récupérer les données du personnel
httpGet(apiUrl, function(response) {
    var staffData = JSON.parse(response);
    createStaffList(staffData);
});
