"use strict";

function onLoad() {
	console.log( 'Processus de chargement du document terminé…')

	// prendre les boutons
	let addButton = document.getElementById("addButton")
	let validateButton = document.getElementById("validateButton")

	// les champs
	let productArea = document.getElementById("productChoice")
	let quantityArea = document.getElementById("quantity")

	//ajouter les listeners
	addButton.addEventListener('click',addBasket)
	validateButton.addEventListener('click',addInProgress)
	setInterval(updateInProgress, 100)
	productArea.addEventListener('keyup',verifyTextArea)
	quantityArea.addEventListener('keyup',verifyTextArea)

	verifyTextArea()

}


// faire en sorte de recuperer les fournisseur et les met en option
function getSupplier(){	// TODO

}


// faire en sorte de griser le bouton tant que les champs ne sont pas remplis
function verifyTextArea(){
	let addButton = document.getElementById("addButton")
	let productArea = document.getElementById("productChoice")

	// TODO later, verifier si le produit existe

	if (productArea.value != ""){
		addButton.disabled = false
	}
	else addButton.disabled = true
}


// on ajoute au panier quand on clique sur le bouton ajouter
function addBasket(){

	let product = document.getElementById("productChoice")
	let quantity = document.getElementById("quantity")
	
	let quantityInt = 1;

	// on verifie si tous les champs sont remplis
	if (product.value == "") return

	// on verifie que quantity est un nombre
	if (isNaN(quantity.value)){
		quantity.style.background = "red"
		return
	} 
	else quantity.style.background = "white"
	
	// on verifie si quantite est vide
	if (quantity.value != "") quantityInt = parseInt(quantity.value)

	// on creer l'element en question
	let newProductName = document.createElement("span")
	newProductName.innerHTML = product.value+" "
	newProductName.className = "productName"
	let newProductPrice = document.createElement("span")
	newProductPrice.innerText = quantityInt * /*TODO prix du produit*/ 2+" €"
	newProductPrice.className = "productPrice"

	let newProduct = document.createElement("div")
	newProduct.className = "product"
	newProduct.appendChild(newProductName)
	newProduct.appendChild(newProductPrice)

	// on l'ajoute dans le panier
	let basket = document.getElementById("basketItems")
	basket.appendChild(newProduct)

	// on clear les champs
	product.value = ""
	quantity.value = ""

	product.focus()

	updateTotal()
	verifyTextArea()
}

// faire en sorte d'actualiser le total a chaque element rajouter ou enlever
function updateTotal(){
	// prendre les elements du panier
	let basket = document.getElementById("basketItems")

	// on prend le total
	let total = document.getElementById("total")

	let somme = 0;

	// pour chaque elements
	for (const product of basket.childNodes){
		//on recupere sont prix
		let textPrice = product.lastChild.textContent.trim("€")
		let priceProduct = parseInt(textPrice)

		// on l'ajoute a la somme
		somme += priceProduct
	}

	// on update le total
	total.innerText = "Total: "+somme+" €"
}


// on ajoute a "En cours" a chaque fois fois qu'on appuis sur le bouton valider
function addInProgress(){

	let basket = document.getElementById("basketItems")
	let inProgressItems = document.getElementById("inProgressItems")


	let textPrice = basket.childNodes[0].lastChild.textContent.trim("€")
	let priceProduct = parseInt(textPrice)


	// une date dans le future
	let now = new Date()
	let time = now.getTime()+1000*priceProduct


	// on rajoute une duree a l'element
	let newProductTime = document.createTextNode( /*TODO*/+"s")
	newProductTime.className = "productTime"
	basket.childNodes[0].appendChild(newProductTime)
	basket.childNodes[0].classList.add(""+time)

	// on copy tous les elements dans le panier dans le inProgress
	inProgressItems.appendChild(basket.childNodes[0])
	if (basket.childNodes.length != 0) addInProgress()

	// TODO +, ranger tous les elements dans l'ordre decroissant du nombre de jours avant les livraisons
	

	// on update le total
	updateTotal()
}


// on actualise les temps restant des livraisons
function updateInProgress(){

	let inProgressItems = document.getElementById("inProgressItems")

	//actualiser le nombre de jours restant avant livraison
	for (const child of inProgressItems.childNodes){

		// doit calculer le temps restant avant date de livraison
		let time = child.classList[1]
		let now = new Date()

		let diff = parseInt(time) - now.getTime()

		if (diff >= 1000*60*60*24) child.lastChild.textContent = parseInt(diff / (1000 * 60 * 60 *24))+"j"
		else if (diff >= 1000*60*60)child.lastChild.textContent = parseInt(diff / (1000 * 60 * 60)) +"h"
		else if (diff >= 1000*60)child.lastChild.textContent = parseInt(diff / (1000 * 60)) +"min"
		else child.lastChild.textContent = parseInt(diff / (1000)) +"s"

		if (diff <= 0){
			child.lastChild.textContent = ""
			addToConfirm(child)
		} 
	}

}


// on ajoute a "A confirmer" une fois le temps ecoule
function addToConfirm(node){
	let toConfirmItems = document.getElementById("toConfirmItems")

	toConfirmItems.appendChild(node)
	addButtonConfirm(node)
}

// une fois transfere dans "A confirmer" on ajoute les bontons au produit pour confirmer
function addButtonConfirm(node){

	// on creer les deux boutons 
	let confirmButton = document.createElement("button")
	confirmButton.className = "confirmButton"
	confirmButton.textContent = "+"	// TODO changer par image

	let refuteButton = document.createElement("button")
	refuteButton.className = "refuteButton"
	refuteButton.textContent = "-"	// TODO changer par image

	// on rajoute les events
	confirmButton.addEventListener('click',() => {
		let parentDirect = confirmButton.parentNode
		let grandParent = parentDirect.parentNode
		grandParent.removeChild(parentDirect)
		console.log("confirmation de livraison du produit")
	})
	refuteButton.addEventListener('click',() => {
		let parentDirect = confirmButton.parentNode
		let grandParent = parentDirect.parentNode
		grandParent.removeChild(parentDirect)
		console.log("non confirmation de livraison du produit")
	})

	let divButton = document.createElement("div")

	// on les rajoute a l'element
	divButton.appendChild(confirmButton)
	divButton.appendChild(refuteButton)
	
	// on rajoute l'element a la node
	node.appendChild(divButton)

} 


window.onLoad = onLoad();
