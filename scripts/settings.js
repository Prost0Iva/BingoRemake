export let filter = {
    basic: true,
    fossil: true,
    pseudo_legendary: true,
    regional: true,
    legendary: true,
    legendary_regional: true,
    ultra_beasts: true,
    paradox: true
}

const settingsButtons = document.querySelectorAll('.button_settings')

settingsButtons.forEach(b => {
    b.addEventListener('click', function(){
        if(b.classList.contains('black_list')){
            b.classList.remove('black_list')
            filter[b.id] = true
        } else {
            b.classList.add('black_list')
            filter[b.id] = false
        }
    })
})