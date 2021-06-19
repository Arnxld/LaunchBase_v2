const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".card")
const modal = document.querySelector(".modal")

for (let card of cards) {
    const pageId = card.getAttribute("id")
    card.addEventListener("click", function() {
        console.log(pageId)
        modalOverlay.classList.add("active")
        modalOverlay.querySelector("iframe").src = `https://blog.rocketseat.com.br/${pageId}`
    })
}

modalOverlay.querySelector(".close-button").addEventListener("click", function() {
    modalOverlay.classList.remove("active")
    modal.querySelector("iframe").src = ''
    modal.classList.remove("maximize")
})

modalOverlay.querySelector(".fullscreen").addEventListener("click", function() {
    if(modal.classList.contains("maximize")) {
        modal.classList.remove("maximize")
    } else {
        modal.classList.add("maximize")
    }
})