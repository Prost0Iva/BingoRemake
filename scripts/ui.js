import { generateCard } from "./card.js"

const cells = document.querySelectorAll(".bingo_cell")
const buttonGenerate = document.getElementById("button_generate")

cells.forEach(cell => {
    cell.addEventListener('click', function(){
        if (cell.classList.contains("completed")) {
            cell.classList.remove("completed")
        } else 
            cell.classList.add("completed")
    })
})
buttonGenerate.addEventListener('click', generateCard)