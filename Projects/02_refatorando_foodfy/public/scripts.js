const cards = document.querySelectorAll('.card')

for(let card of cards) {
    card.addEventListener("click", function() {
        const cardId = card.getAttribute("id")
        console.log(cardId);
        window.location.href = `/recipes/${cardId}`
    })
}

const textDivs = document.querySelectorAll('.text')
const toggleButtons = document.querySelectorAll('.toggleButton')

let toggleButtonsArray = Array.prototype.slice.call(toggleButtons)


toggleButtons.forEach(function(button) {
    const index = toggleButtonsArray.indexOf(button)
    
    button.addEventListener("click", function() {
        const chosenDiv = textDivs.item(index)

        if(chosenDiv.classList.contains('hidden')) {
            chosenDiv.classList.remove('hidden')
            button.innerHTML = "Esconder"
        } else {
            chosenDiv.classList.add('hidden')
            button.innerHTML = "Mostrar"
        }
        
        // transition found in https://velhobit.com.br/tutoriais/css-como-usar-transition-com-displayblock.html



        // if(chosenDiv.style.display !== "none") {
        //     chosenDiv.style.display = "none"
        //     button.innerHTML = "Mostrar"
        // } else {
        //     chosenDiv.style.display = "block"
        //     button.innerHTML = "Esconder"
        // }
    }, false)
})