import {filter} from './settings.js'

const cells = document.querySelectorAll(".bingo_cell")

const response = await fetch('data/pokemon_list.json');
const pokemonList = await response.json();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export function generateCard() {
    const allowedPokemons = []
    Object.entries(filter).forEach(([category, status]) => {
        if(status){
            allowedPokemons.push(...pokemonList[category])
        }
    })
    let card = []
    for (let i = 0; i < 25; i++) {
        let index = getRandomInt(allowedPokemons.length)
        card.push(allowedPokemons[index])
        allowedPokemons.splice(index, 1)
    }
    fillCard(card)
}

function fillCard(card) {
    let i = 0
    cells.forEach(cell => {
        const img = cell.querySelector(".pokemon_img")
        if(card[i] !== undefined) {
            img.src = card[i].img
        }
        i++
    })
}

generateCard()