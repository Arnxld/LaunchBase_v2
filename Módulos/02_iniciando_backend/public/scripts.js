const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    console.log(card)
    card.addEventListener("click", function() {
        const videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`
    })
}