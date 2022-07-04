const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/"
const pokemonImg = document.getElementById("pokemonImg");

async function pokemonFetch(pokemon = 1){
    try {
        const response = await fetch(POKEMON_API + pokemon)
        const data = await response.json()
        console.log(data)
    } catch (error){
        console.log(error)
    }
}

function displayPokemon(){

}