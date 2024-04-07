// Sélection de tous les éléments avec la classe 'manage-staff'
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
