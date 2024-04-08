for(let i = 1; i < 7; i++) {
    let pump = document.getElementsByClassName("hvr-outline-out")
    url = "https://api.fuelsync.hertinox.fr/pumps/getpump.php?idPump=" + i

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200) {
                const response = JSON.parse(this.responseText);
                console.log(response.isClose)
                if(response.isClose == false) {
                    pump[i-1].getElementsByClassName("status")[0].classList.add("status-close")
                    pump[i-1].getElementsByClassName("status")[0].innerHTML = "Fermée"
                    pump[i-1].getElementsByClassName("status")[0].style.color = "red"
                } else {
                    pump[i-1].getElementsByClassName("status")[0].classList.add("status-open")
                    pump[i-1].getElementsByClassName("status")[0].innerHTML = "Ouverte"
                    pump[i-1].getElementsByClassName("status")[0].style.color = "green"
                }
            }
        }
    }
    xhr.open("GET", url, true)
    xhr.send()
}




