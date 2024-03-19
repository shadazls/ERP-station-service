let liste_personnel = document.getElementById("liste_personnel")
let liste_formation = document.getElementById("liste_formation")

let inputName = document.getElementById("nom")
inputName.setAttribute("placeholder", "Nom")
let inputFirstname = document.getElementById("prenom")
inputFirstname.setAttribute("placeholder", "Prénom")
let inputPhone = document.getElementById("tel")
inputPhone.setAttribute("placeholder", "Téléphone")

let subscribeFormation = document.getElementById("subscribeFormation")

let xhr = new XMLHttpRequest()
let response_personnel
let response_formation

// -------------------------------------------------

// ICI Je devrai récupérer les valeurs du personnel (prénom, nom, phone, études et exp pro) avec AJAX pour les utiliser (JSON)
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        console.log("Récupération employés réussie...")
        response_personnel = this.response;
    } else {
        console.log("Récupération employés échouée...");
    }
}

xhr.open("POST", "https://url.fr/personnel.php", true);
xhr.responseType = "json";
xhr.send();

/*for(let employee of response_personnel.employees) {
    // TODO
}*/

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

// -------------------------------------------------

// Evenement du click pour avoir les informations de l'employé et pour pré-remplir les champs pour l'inscription aux formations
for(let node of liste_personnel.childNodes) {
    node.addEventListener("click", () => {
        console.log("Nouvelle selection de personnel...")
        if(document.querySelector(".personnel-selected") != null) {
            document.querySelector(".personnel-selected").classList.remove("personnel-selected")
        }
        node.classList.add("personnel-selected")
        inputFirstname.value = node.childNodes.item(0).textContent
        inputName.value = node.childNodes.item(2).textContent
    })
}

// -------------------------------------------------

// Où ajouter et remove des employés ?