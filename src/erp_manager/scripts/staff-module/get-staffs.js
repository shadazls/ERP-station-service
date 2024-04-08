// Fonction pour attacher un gestionnaire d'événements à chaque élément de la liste
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
        });
    });
}

// Fonction pour attacher un gestionnaire d'événements à chaque icône de gestion du personnel
function attachIconEventListeners() {
    // Sélectionner tous les éléments avec la classe 'manage-staff'
    var icons = document.querySelectorAll('.manage-staff');

    // Ajout d'un gestionnaire d'événements de clic à chaque icône
    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            // Affichage de la popup
            Swal.fire({
                title: 'Gestion du personnel',
                html:
                    '<label for="name">Nom</label><br>' +
                    '<input id="name" class="swal2-input" value="Azuelos"><br>' +

                    '<br><label for="firstname">Prénom</label><br>' +
                    '<input id="firstname" class="swal2-input" value="Shad"><br>' +

                    '<br><label for="birthdate">Date de naissance</label><br>' +
                    '<input type="date" id="birthdate" name="birthdate" class="swal2-input" value="2003-09-15"><br>' +

                    '<br><label for="phone">Numéro de téléphone</label><br>' +
                    '<input type="tel" id="phone" name="phone" class="swal2-input" value="07 82 41 46 61"><br>' +

                    '<br><label for="education">Formation</label><br>' +
                    `<textarea id="education" name="education" class="swal2-textarea">Polytechnique 2021 - 2022 - Ingénieur informatique | Harvard 2021-2022 - Médecine (Neurochirurgien) | HEC 2021-2022 - Commercial
                    </textarea><br>` +

                    '<br><label for="experience">Expérience professionnelle</label><br>' +
                    '<textarea id="experience" name="experience" class="swal2-textarea">NASA - Cosmonaute (été 2023) | États Unis - Président (hiver 2022) | Armée de terre - Général (temps partiel)</textarea><br>',
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
            });
        });
    });
}

// Fonction pour créer la liste de personnel dynamiquement
function createStaffList(staffData) {
    var staffList = document.getElementById("staff-list");
    staffData.forEach(function(staff) {
        var li = document.createElement("li");
        li.textContent = staff.firstName + " " + staff.lastName;
        li.id = "staff-" + staff.idStaff;
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
