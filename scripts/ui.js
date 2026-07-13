import { card, generateCard, importCard, exportCard, cleanCells } from "./card.js"

const cells = document.querySelectorAll(".bingo_cell")
const buttonGenerate = document.getElementById("button_generate")
const buttonExport = document.getElementById("button_export")
const buttonImport = document.getElementById("card_import")

cells.forEach(cell => {
    cell.addEventListener('click', function(){
        if (cell.classList.contains("completed")) {
            cell.classList.remove("completed")
        } else 
            cell.classList.add("completed")
    })
    cell.addEventListener('mouseenter', function(){
        cell.querySelector(".cell_tooltip").classList.remove("hidden")
    })
    cell.addEventListener('mouseleave', function(){
        cell.querySelector(".cell_tooltip").classList.add("hidden")
    })
})

buttonGenerate.addEventListener('click', function(){
    cleanCells()
    generateCard()
})

buttonExport.addEventListener('click', function(){
    exportCard()
})

buttonImport.addEventListener('change', (event) => {
    const file = event.target.files[0]
    importCard(file)
    cleanCells()
    event.target.value = ''
})