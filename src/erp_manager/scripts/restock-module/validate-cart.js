document.addEventListener('DOMContentLoaded', () => {
    const validateButton = document.querySelector('#validate-cart');
    const inProgressCommandsContainer = document.querySelector('#in-progress-commands-container');
    const shoppingCartContent = document.querySelector("#cart-container");

    validateButton.addEventListener('click', () => {
        if (!shoppingCartContent.querySelector('div')) {
            Swal.fire({
                icon: "warning",
                title: "Panier vide",
                text: "Votre panier est vide. Veuillez ajouter des produits avant de passer une commande.",
            });
            return;
        }

        Swal.fire({
            title: 'Voulez-vous donner un nom à votre commande ?',
            input: 'text',
            inputPlaceholder: 'Nom de la commande',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            denyButtonText: 'Annuler',
            preConfirm: (name) => {
                if (!name) {
                    Swal.showValidationMessage('Le nom de la commande ne peut pas être vide !');
                }
                return name;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const commandName = result.value;
                Swal.fire({
                    icon: "success",
                    title: "Nom de commande validée",
                    text: `Vous avez saisi "${commandName}" comme nom de commande.`,
                });

                createCommand(commandName);
                startCountdown();
                clearShoppingCart();
            } else if (result.isDenied) {
                Swal.fire({
                    icon: "error",
                    title: "Commande annulée",
                    text: "Votre commande n'a pas été envoyée au fournisseur !",
                });
            } else {
                const firstProductName = shoppingCartContent.firstElementChild.querySelector('.left-element').textContent;
                const defaultCommandName = firstProductName.split(' - ')[0]; // Récupère le nom du premier produit
                Swal.fire({
                    icon: "info",
                    title: "Nom de commande par défaut",
                    text: `Vous n'avez pas donné de nom à votre commande, le nom de la commande sera "${defaultCommandName}."`,
                });

                createCommand(defaultCommandName);
                startCountdown();
                clearShoppingCart();
            }
        });
    });

    function createCommand(commandName) {
        const newElement = document.createElement('div');
        newElement.classList.add('element-box', 'classic-box');

        const leftElement = document.createElement('p');
        leftElement.classList.add('left-element');
        leftElement.textContent = `${commandName} - X,X€`;

        const rightElement = document.createElement('div');
        rightElement.classList.add('right-element');
        const durationElement = document.createElement('p');
        durationElement.textContent = '6j';
        rightElement.appendChild(durationElement);

        newElement.appendChild(leftElement);
        newElement.appendChild(rightElement);

        inProgressCommandsContainer.appendChild(newElement);
    }

    function startCountdown() {
        const durationElements = document.querySelectorAll('#in-progress-commands-container .right-element p');
        
        const firstIcon = document.createElement('i');
        firstIcon.classList.add('green', 'cliquable', 'fa-solid', 'fa-circle-check', 'fa-lg');

        const secondIcon = document.createElement('i');
        secondIcon.classList.add('red', 'cliquable', 'fa-solid', 'fa-circle-xmark', 'fa-lg');

        durationElements.forEach((durationElement) => {
            // Extraire le nombre de la chaîne de caractères
            const durationText = durationElement.textContent.trim(); // Supprimer les espaces inutiles
            let duration = parseInt(durationText); // Convertir en nombre
    
            // Démarrer le décompte
            let countdown = setInterval(() => {
                if (duration <= 0) {
                    clearInterval(countdown);
                    // Déplacer l'élément vers une autre div
                    const toConfirmElementContainer = document.querySelector('#to-confirm-element-container');
                    let divRight = durationElement.parentElement;
                    divRight.style.display = 'flex';
                    divRight.style.gap = '10%';
                    divRight.style.marginRight = '5%';
                    divRight.removeChild(durationElement);
                    divRight.appendChild(firstIcon);
                    divRight.appendChild(secondIcon);
                    toConfirmElementContainer.appendChild(divRight.parentElement); // Déplacer l'élément
                } else {
                    duration -= 1; // Réduire le décompte de 1 seconde
                    // Mettre à jour le texte avec la nouvelle valeur
                    durationElement.textContent = `${duration}j`;
                }
            }, 1000); // Mettre à jour toutes les secondes (1000 ms)
        });
    }
    

    function clearShoppingCart() {
        while (shoppingCartContent.firstChild) {
            shoppingCartContent.removeChild(shoppingCartContent.firstChild);
        }
    }
});