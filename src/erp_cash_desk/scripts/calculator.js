let num_pad = document.getElementsByClassName("num-pad")

let display_pad = document.getElementById("display-pad")

let times_pad = document.getElementById("times-pad")
let times_pad_request = false
let save = 0

let ok_pad = document.getElementById("ok-pad")

let delete_pad = document.getElementById("delete-pad")

let doat_pad = document.getElementById("doat-pad")

Array.from(num_pad).forEach(element => {
  element.addEventListener("click", () => {
    display_pad.value += element.innerHTML
  })
})

times_pad.addEventListener("click", () => {
  save = display_pad.value
  display_pad.value = ""
})

delete_pad.addEventListener("click", () => {
  display_pad.value = ""
  save = 1;
})

doat_pad.addEventListener("click", () => {
  display_pad.value += "."
})