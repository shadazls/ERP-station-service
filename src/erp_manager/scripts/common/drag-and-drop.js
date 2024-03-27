document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.draggable');
    console.log("test1")
    containers.forEach(container => {
        new Draggable.Droppable(container, {
            draggable: '.draggable',
            delay: 200, // Facultatif : délai avant de commencer le déplacement
            mirror: {
                constrainDimensions: true // Facultatif : limiter la dimension du miroir à celle du conteneur
            }
        });
        console.log("test2")
    });
});