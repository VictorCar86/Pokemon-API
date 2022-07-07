const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/"

const pokemonName = document.getElementById("pokemonName")
const pokemonImg = document.getElementById("pokemonImg");
const statBox_HP = document.getElementById("stat-hp")
const statBox_ATTACK = document.getElementById("stat-attack")
const statBox_DEFENSE = document.getElementById("stat-defense")
const statBox_SP_ATTACK = document.getElementById("stat-special-attack")
const statBox_SP_DEFENSE = document.getElementById("stat-special-defense")
const statBox_SPEED = document.getElementById("stat-speed")
const pokemonDescription = document.getElementById("pokemon-description")

async function pokemonFetch(pokemon = 1){
    try {
        const response = await fetch(POKEMON_API + pokemon)
        const data = await response.json()
        console.log(data)

        // Adding images and info to HTML
        pokemonName.textContent = data.name
        pokemonImg.src = data.sprites.other["official-artwork"].front_default
        pokemonImg.alt = `Picture of ${data.name}`
        statBox_HP.textContent = data.stats[0].base_stat
        statBox_ATTACK.textContent = data.stats[1].base_stat
        statBox_DEFENSE.textContent = data.stats[2].base_stat
        statBox_SP_ATTACK.textContent = data.stats[3].base_stat
        statBox_SP_DEFENSE.textContent = data.stats[4].base_stat
        statBox_SPEED.textContent = data.stats[5].base_stat
        pokemonDescription.textContent = await descriptionPokemon(pokemon)

    } catch (error){
        console.log(error)
    }
}
pokemonFetch()

async function descriptionPokemon(pokemon = 1){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon)
        const data = await response.json()
        const englishText = data.flavor_text_entries.filter(object => object.language.name === "en")
        return englishText[0].flavor_text.replace("\f"," ")
    } catch (error) {
        console.log(error)
    }
}

function randomPokemon(){
    let random = 0;
    const rnd = () => random = Math.floor(Math.random() * 900)
    rnd()
    if (random > 898) rnd()
    else pokemonFetch(random)
}