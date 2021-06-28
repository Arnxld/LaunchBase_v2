const cards = document.querySelectorAll('.card')
const modalOverlay = document.querySelector('.modal-overlay')

for(let card of cards) {
    card.addEventListener("click", function() {
        const cardId = card.getAttribute("id")
        console.log(cardId);
        modalOverlay.classList.add("active")
        modalOverlay.querySelector(".modal").innerHTML = card.innerHTML + '<a class="close-modal" href="">Fechar modal</a>'
    })
}

modalOverlay.querySelector('a').addEventListener("click", function() {
    modalOverlay.classList.remove("active")
})

