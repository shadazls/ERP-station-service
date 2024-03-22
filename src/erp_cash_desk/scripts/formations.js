let liste_formation = document.getElementById("liste_formation")

let inputName = document.getElementById("nom")
inputName.setAttribute("placeholder", "Nom")
let inputFirstname = document.getElementById("prenom")
inputFirstname.setAttribute("placeholder", "Prénom")
let inputPhone = document.getElementById("tel")
inputPhone.setAttribute("placeholder", "Téléphone")

let subscribeFormation = document.getElementById("subscribeFormation")

let xhr = new XMLHttpRequest()
let response_formation

// -------------------------------------------------

// ICI Je devrai récupérer les valeurs des formations (nom, date) avec AJAX pour les utiliser (JSON)
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        console.log("Récupération formations réussie...")
        response_formation = this.response;
    } else {
        console.log("Récupération formations échouée...");
    }
}

xhr.open("POST", "https://url.fr/formations.php", true);
xhr.responseType = "json";
xhr.send();

/*for(let formation of response_formation.formations) {
    // TODO
}*/

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

subscribeFormation.addEventListener("click", () => {
    console.log("Envoi des données d'inscription...")
    // TODO
})