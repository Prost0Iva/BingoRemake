import {filter} from './settings.js'

const cells = document.querySelectorAll(".bingo_cell")

const response = await fetch('data/pokemon_list.json');
const pokemonList = await response.json();

export let card = []

function getRandomInt(max) {return Math.floor(Math.random() * max)}

export function cleanCells() {
    cells.forEach(cell => {
        cell.classList.remove("completed")
        cell.querySelector(".pokemon_img").src = "assets/img/pokemon/0000_substitute.png"
        cell.querySelector(".cell_tooltip p").textContent = "Substitute"
        const typeImg = cell.querySelector(".cell_tooltip .tooltip_types").querySelectorAll("img")
        typeImg[0].src = "assets/img/types/unown.png"
        typeImg[1].src = "assets/img/types/unown.png"
    })
}

export function generateCard() {
    card = []
    const allowedPokemons = []
    Object.entries(filter).forEach(([category, status]) => {
        if(status){
            allowedPokemons.push(...pokemonList[category])
        }
    })
    for (let i = 0; i < 25; i++) {
        let index = getRandomInt(allowedPokemons.length)
        card.push(allowedPokemons[index])
        allowedPokemons.splice(index, 1)
    }
    fillCard()
}

function fillCard() {
    let i = 0
    cells.forEach(cell => {
        const img = cell.querySelector(".pokemon_img")
        const name = cell.querySelector(".cell_tooltip p")
        const typeImg = cell.querySelector(".cell_tooltip .tooltip_types").querySelectorAll("img")
        if(card[i] !== undefined) {
            img.src = card[i].img
            name.textContent = card[i].name
            if(card[i].type.length == 2){
                typeImg[0].src = `assets/img/types/${card[i].type[0]}.png`
                typeImg[1].src = `assets/img/types/${card[i].type[1]}.png`
            } else {
                typeImg[0].src = `assets/img/types/${card[i].type[0]}.png`
                typeImg[1].src = ""
            }
        }
        i++
    })
}

export function exportCard() {
    const blob = new Blob([JSON.stringify(card, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cbcard.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export async function importCard(file) {
    card = []
    const text = await file.text()
    card = JSON.parse(text)
    fillCard()
}