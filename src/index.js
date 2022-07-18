const POKEMON_V2_API = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species/";

const mainPokemonName = document.getElementById("mainPokemonName");
const mainPokemonId = document.getElementById("mainPokemonId")
const mainPokemonImg = document.getElementById("mainPokemonImg");
const mainPokemonType = document.getElementById("mainPokemonType");
const mainPokemonDescription = document.getElementById("mainPokemonDescription");
const statBox_HP = document.getElementById("stat-hp");
const statBox_ATTACK = document.getElementById("stat-attack");
const statBox_DEFENSE = document.getElementById("stat-defense");
const statBox_SP_ATTACK = document.getElementById("stat-special-attack");
const statBox_SP_DEFENSE = document.getElementById("stat-special-defense");
const statBox_SPEED = document.getElementById("stat-speed");

const searcherIcon = document.getElementById("searcherIcon");
const searcherContainer = document.getElementById("searcherContainer");
const inputSearcher = document.getElementById("searcher-input");
const closeModalDiv = document.getElementById("closeModalDiv");

const pokemonsListContainer = document.getElementById("pokemonsListContainer");

closeModalDiv.onclick = closeModalSearcher
searcherIcon.onclick = openModalSearcher

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
        // console.log(data)

        mainPokemonName.textContent = data.name;
        mainPokemonId.textContent = "#" + data.id;
        mainPokemonImg.src = data.sprites.other["official-artwork"].front_default;
        mainPokemonImg.alt = `Picture of ${data.name}`;

        mainPokemonType.innerText = "";
        data.types.forEach(typePokemon => {
            const pokemonTypeSpan = document.createElement("span");
            pokemonTypeSpan.textContent = typePokemon.type.name
            pokemonTypeSpan.classList.add(typePokemon.type.name)
            pokemonTypeSpan.classList.add("pokemon-main-type")
            mainPokemonType.appendChild(pokemonTypeSpan)
        })

        statBox_HP.textContent = data.stats[0].base_stat;
        statBox_ATTACK.textContent = data.stats[1].base_stat;
        statBox_DEFENSE.textContent = data.stats[2].base_stat;
        statBox_SP_ATTACK.textContent = data.stats[3].base_stat;
        statBox_SP_DEFENSE.textContent = data.stats[4].base_stat;
        statBox_SPEED.textContent = data.stats[5].base_stat;

        const englishDescription = await pokemonFetch(POKEMON_SPECIES_API + pokemon);
        const englishText = englishDescription.flavor_text_entries.filter(object => object.language.name === "en")
        mainPokemonDescription.textContent = englishText[0].flavor_text.replace("\f"," ")

    } catch (error){
        console.log(error)
    }
}
mainPokemon()

let pokemonNextPagePosition = "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10";
let pokemonPrevPagePosition = null;

async function pokemonList(page = POKEMON_V2_API + "?limit=10&offset=0"){
    const firstData = await pokemonFetch(page);
    pokemonNextPagePosition = firstData.next
    pokemonPrevPagePosition = firstData.previous
    pokemonsListContainer.innerText = "";
    console.log("FD -> ", firstData)

    firstData.results.forEach(async (data_element) => {
        const dataPokemon = await pokemonFetch(data_element.url);
        console.log(data_element)

        const pokemonListImg = document.createElement("img");
        const pokemonArticleContainer = document.createElement("article");
        pokemonListImg.src = dataPokemon.sprites.front_default;
        pokemonListImg.alt = "Image of " + dataPokemon.name;
        pokemonListImg.classList.add("list-pokemon-img")
        pokemonArticleContainer.appendChild(pokemonListImg);
        pokemonArticleContainer.classList.add("pokemon-list-container__info")
        pokemonArticleContainer.onclick = () => {
            mainPokemon(dataPokemon.id)
            setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 400)
        }

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

function newPagePokemonList(next = true){
    if (next){
        if (!pokemonNextPagePosition.includes("offset=900")){
            pokemonList(pokemonNextPagePosition);
        } else {
            alert("This is the maximum amount of pokémons to show 😢");
        }
    } else {
        if (pokemonPrevPagePosition != null){
            pokemonList(pokemonPrevPagePosition);
        } else {
            alert("There's no pokémons to show 😢");
        }
    }
}
// "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10".includes("offset=10")

function randomPokemon(){
    let random = 0;
    const rnd = () => random = Math.floor(Math.random() * 900)
    rnd()
    if (random > 898){
        rnd()
    } else {
        mainPokemon(random)
    }
    setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 400)
}

function searchPokemon(){
    const value = inputSearcher.value.toLowerCase()
    mainPokemon(value)
}

inputSearcher.addEventListener("keydown", key => {
    if (key.code == "Enter") searchPokemon()
})

function openModalSearcher() {
    searcherContainer.style.animationName = "modal-on"
    searcherContainer.style.display = "block"
}

function closeModalSearcher() {
    searcherContainer.style.animationName = "modal-off"
    setTimeout(() => {
        searcherContainer.style.display = "none"
        inputSearcher.value = "";
    }, 500)
}