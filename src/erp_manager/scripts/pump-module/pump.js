let status_open = document.querySelectorAll(".status-open")
let status_close = document.querySelectorAll(".status-close")

for (let elem of status_open) {
    elem.style.color = "green";
    elem.innerHTML = "Ouverte"
}

for (let elem of status_close) {
    elem.style.color = "red";
    elem.innerHTML = "Fermée"
}