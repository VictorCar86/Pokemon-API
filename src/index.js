const POKEMON_V2_API = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species/";

const pokemonName = document.getElementById("pokemonName");
const pokemonImg = document.getElementById("pokemonImg");
const statBox_HP = document.getElementById("stat-hp");
const statBox_ATTACK = document.getElementById("stat-attack");
const statBox_DEFENSE = document.getElementById("stat-defense");
const statBox_SP_ATTACK = document.getElementById("stat-special-attack");
const statBox_SP_DEFENSE = document.getElementById("stat-special-defense");
const statBox_SPEED = document.getElementById("stat-speed");
const pokemonDescription = document.getElementById("pokemon-description");

const searcherIcon = document.getElementById("searcherIcon");
const searcherContainer = document.querySelector(".searcher-container");
const inputSearcher = document.getElementById("searcher-input");
const closeModalDiv = document.getElementById("closeModalDiv");

const pokemonsListContainer = document.getElementById("pokemonsListContainer");

closeModalDiv.onclick = closeModalSearcher
searcherIcon.onclick = openModalSearcher
window.addEventListener("DOMContentLoaded", closeModalSearcher, false)

async function pokemonFetch(info){
    try {
        const response = await fetch(info)
        const data = await response.json()
        return data;
    } catch (error){
        console.log(error)
    }
}

async function mainPokemon(pokemon = 1){
    try {
        const data = await pokemonFetch(POKEMON_V2_API + pokemon)
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
        const englishDescription = await pokemonFetch(POKEMON_SPECIES_API + pokemon);
        const englishText = englishDescription.flavor_text_entries.filter(object => object.language.name === "en")
        pokemonDescription.textContent = englishText[0].flavor_text.replace("\f"," ")

    } catch (error){
        console.log(error)
    }
}
mainPokemon()

let pokemonListCount = 490;
async function pokemonList(){
    const firstData = await pokemonFetch(POKEMON_V2_API + "?limit=10&offset=" + pokemonListCount);
    console.log(firstData)
    firstData.results.forEach(async (data_element) => {
        const dataPokemon = await pokemonFetch(data_element.url);

        const pokemonArticleContainer = document.createElement("article");
        const pokemonImg = document.createElement("img");
        pokemonImg.src = dataPokemon.sprites.front_default;
        pokemonImg.alt = "Image of " + dataPokemon.name;
        pokemonImg.classList.add("list-pokemon-img")
        pokemonArticleContainer.appendChild(pokemonImg);
        pokemonArticleContainer.classList.add("pokemon-list-container__info")

        const pokemonSpanId = document.createElement("span");
        pokemonSpanId.textContent = "#" + dataPokemon.id;
        pokemonSpanId.classList.add("list-pokemon-id")
        pokemonArticleContainer.appendChild(pokemonSpanId);

        const pokemonSpanName = document.createElement("span");
        pokemonSpanName.textContent = dataPokemon.name;
        pokemonSpanName.classList.add("list-pokemon-name")
        pokemonArticleContainer.appendChild(pokemonSpanName);

        const pokemonTypeContainer = document.createElement("div")
        dataPokemon.types.forEach(element => {
            const pokemonSpan = document.createElement("span");
            pokemonSpan.textContent = element.type.name;
            pokemonSpan.classList.add("list-pokemon-type");
            pokemonSpan.classList.add(element.type.name);
            pokemonTypeContainer.appendChild(pokemonSpan);
        })
        pokemonTypeContainer.style.textAlign = "center"
        pokemonArticleContainer.appendChild(pokemonTypeContainer);

        pokemonsListContainer.appendChild(pokemonArticleContainer)
    })
}
pokemonList()

// function newPagePokemonList(next = true){
//     if (!pokemonListCount < 0 || !pokemonListCount > 890){
//     next
//     } else {
//         alert("There's no pokémons to show 😢")
//     }
// }

function randomPokemon(){
    let random = 0;
    const rnd = () => random = Math.floor(Math.random() * 900)
    rnd()
    if (random > 898) rnd()
    else mainPokemon(random)
}

function searchPokemon(){
    const value = inputSearcher.value.toLowerCase()
    mainPokemon(value)
}

function openModalSearcher() {
    searcherContainer.classList.remove("no-display")
    searcherContainer.classList.add("display")
}

function closeModalSearcher() {
    searcherContainer.classList.remove("display")
    searcherContainer.classList.add("no-display")
    inputSearcher.value = "";
}