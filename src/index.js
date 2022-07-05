const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/"
const pokemonImg = document.getElementById("pokemonImg");
const statBox_HP = document.getElementById("stat-hp")
const statBox_ATTACK = document.getElementById("stat-attack")
const statBox_DEFENSE = document.getElementById("stat-defense")
const statBox_SP_ATTACK = document.getElementById("stat-special-attack")
const statBox_SP_DEFENSE = document.getElementById("stat-special-defense")
const statBox_SPEED = document.getElementById("stat-speed")

async function pokemonFetch(pokemon = 1){
    try {
        const response = await fetch(POKEMON_API + pokemon)
        const data = await response.json()
        console.log(data)

        // Adding images and info to HTML
        pokemonImg.src = data.sprites.other["official-artwork"].front_default;
        pokemonImg.alt = `Picture of ${data.name}`;
        statBox_HP.textContent = data.stats[0].base_stat
        statBox_ATTACK.textContent = data.stats[1].base_stat
        statBox_DEFENSE.textContent = data.stats[2].base_stat
        statBox_SP_ATTACK.textContent = data.stats[3].base_stat
        statBox_SP_DEFENSE.textContent = data.stats[4].base_stat
        statBox_SPEED.textContent = data.stats[5].base_stat


    } catch (error){
        console.log(error)
    }
}
pokemonFetch()

function displayPokemon(){

}