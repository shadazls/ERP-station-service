"use strict";

function onLoad() {
	console.log( 'Processus de chargement du document terminé…')

	// prendre les boutons
	let addButton = document.getElementById("addButton")
	let validateButton = document.getElementById("validateButton")

	//ajouter les listeners
	addButton.addEventListener('click',addBasket)
	validateButton.addEventListener('click',addInProgress)
	setInterval(updateInProgress, 1000)

}

// faire en sorte de griser le bouton tant que les champs ne sont pas remplis


function addBasket(){

	let product = document.getElementById("productChoice")
	let quantity = document.getElementById("quantity")
	let supplier = document.getElementById("Supplier")
	

	// on verifie si tous les champs sont remplis
	if (product.value == "" || quantity.value == "") return

	// on verifie que quantity est un nombre
	if (isNaN(quantity.value)){
		quantity.style.background = "red"
		return
	} 
	else quantity.style.background = "white"

	// on creer l'element en question
	let newProductName = document.createTextNode(product.value+": ")
	newProductName.className = "productName"
	let newProductPrice = document.createTextNode(quantity.value * /*TODO prix du produit*/ 2+" €")
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
}

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

function addInProgress(){

	let basket = document.getElementById("basketItems")
	let inProgressItems = document.getElementById("inProgressItems")

	// on rajoute une duree a l'element
	let newProductTime = document.createTextNode(10/*TODO*/+"s")
	newProductTime.className = "productTime"
	basket.childNodes[0].appendChild(newProductTime)

	// on copy tous les elements dans le panier dans le inProgress
	inProgressItems.appendChild(basket.childNodes[0])
	if (basket.childNodes.length != 0) addInProgress()

	// TODO +, ranger tous les elements dans l'ordre decroissant du nombre de jours avant les livraisons
	

	// on update le total
	updateTotal()
}


function updateInProgress(){

	let inProgressItems = document.getElementById("inProgressItems")

	//actualiser le nombre de jours restant avant livraison
	for (const child of inProgressItems.childNodes){
		let textTime = child.lastChild.textContent.trim("s")

		let timeProduct = parseInt(textTime)

		child.lastChild.textContent = timeProduct-1+"s"

		if (timeProduct <= 0){
			child.lastChild.textContent = ""
			addToConfirm(child)
		} 
	}

}

function addToConfirm(node){
	let toConfirmItems = document.getElementById("toConfirmItems")

	toConfirmItems.appendChild(node)
	addButtonConfirm(node)
}

function addButtonConfirm(node){

	// on creer les deux boutons 
	let confirmButton = document.createElement("button")
	confirmButton.className = "confirmButton"
	confirmButton.textContent = "+"	// TODO changer par image

	let refuteButton = document.createElement("button")
	refuteButton.className = "refuteButton"
	refuteButton.textContent = "-"	// TODO changer par image

	// on rajoute les events
	confirmButton.addEventListener('click',confirmArrival)
	refuteButton.addEventListener('click',refuteArrival)

	// on les rajoute a la node
	node.appendChild(confirmButton)
	node.appendChild(refuteButton)
}

function confirmArrival(){ // TODO

}

function refuteArrival(){  // TODO

}


window.onLoad = onLoad();
