let liste_formation = document.getElementById("liste_formation")

let inputName = document.getElementById("inscription-name")
let inputFirstname = document.getElementById("prenom")
let inputPhone = document.getElementById("inscription-phone")

let subscribeFormation = document.getElementById("subscribeFormation")

let xhr = new XMLHttpRequest()
let response_formation
let dateLocale
let formation

// -------------------------------------------------

// ICI Je devrai récupérer les valeurs des formations (nom, date) avec AJAX pour les utiliser (JSON)
xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
        if(this.status == 200) {
            console.log("Récupération formations réussie...")
            response_formation = this.response;

            console.log(response_formation)

            for(formation of response_formation) {
                dateLocale = formation.dateFormation.toLocaleString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'long'
                })
                liste_formation.innerHTML += "<div class='formation'><p><span class='name'>"+ formation.name +"</span> - <span class='date'>" + dateLocale + "</span></p></div>"
            }
            onClickFormation();
        } else {
            console.log("Récupération formations échouée...");
        }
    } 
}

xhr.open("GET", "https://api.fuelsync.hertinox.fr/formations/getallformations.php", true);
xhr.responseType = "json";
xhr.send();

// ---------------------------------------------------------

function onClickFormation() {
    for(let node of liste_formation.childNodes) {
        node.addEventListener("click", () => {
            console.log("Nouvelle selection de formation...")
            if(node.classList.contains("formation-selected")) {
                node.classList.remove("formation-selected")
            } else {
                node.classList.add("formation-selected")
            }
        })
    }
}

subscribeFormation.addEventListener("click", () => {
    console.log("Envoi des données d'inscription...")
    // TODO
})