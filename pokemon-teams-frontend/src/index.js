// API

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers(url) {
    return fetch(url).then(response=> response.json())
}

function getPokemons(url) {
    return fetch(url).then(response=> response.json())
}

function postPokemon(url, newPokemon) {
    const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newPokemon)
    } 
    return fetch(url, configObj).then(response => response.json())
}

function deletePokemon(url, id) {
    const configObj = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
          },
    }
    return fetch(`${url}/${id}`, configObj).then(response => response.json())
}


API = { getTrainers, getPokemons, postPokemon, deletePokemon }

// CONSTANTS
const main = document.querySelector("main")


// FUNCTIONS

function getAndRenderTrainers() {
    API.getTrainers(TRAINERS_URL).then(trainersList => trainersList.forEach(renderTrainers));
}

function renderTrainers(trainer) {
    let divCard = document.createElement("div")
    divCard.setAttribute("data-id", trainer.id)
    divCard.className = "card"

    let trainerName = document.createElement("p")
    trainerName.innerText = trainer.name

    let addButton = document.createElement("button")
    addButton.innerText = "Add Pokemon"
    addButton.setAttribute("data-trainer-id", trainer.id)
    addButton.addEventListener("click", () => addAPokemon(trainer))
    
    let ul = document.createElement("ul")

    // originally I wanted to do this:
    // listPokemonsES6(trainer)
    // thinking I could call the function, pass in the trainer object, and then iterate over it
    // it does pass the object and the iteration works but can't figure out what it's returning
    // in order to append everything to the parent node UL, defined in a different scope 

    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement("li")
        li.innerText = `${pokemon.nickname} (${pokemon.species})`
        let releaseButton = document.createElement("button")
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)
        releaseButton.addEventListener("click", () => releaseAPokemon(pokemon))
        li.append(releaseButton)
        ul.append(li)
    })                                                                                                                                                                                                                                                                                                                                                       

    divCard.append( trainerName, addButton, ul )
    main.append( divCard )

}  // end renderTrainers
 

function addAPokemon(trainer) {
    console.log("add a pokemon button clicked")
    API.postPokemon(POKEMONS_URL)
}

function releaseAPokemon(goodbyePokemon) {
    //console.log(goodbyePokemon)
    API.deletePokemon(POKEMONS_URL, goodbyePokemon.id)
    let allUL = this.event.target.parentElement.parentElement
    let thisLI = this.event.target.parentElement
    allUL.removeChild(thisLI)
}

// function removePokemon(sadPokemon) {
//     //let pokemonList = document.querySelector()
// }


// listPokemonsES6 = (trainer) => {
//     for (let i=0; i<trainer.pokemons.length; i++ ) {
//         let ul = document.createElement("ul")
//         let li = document.createElement("li")
//         li.innerText = `${trainer.pokemons[i].nickname} (${trainer.pokemons[i].species})`
//         let releaseButton = document.createElement("button")
//         releaseButton.innerText = "Release"
//         releaseButton.className = "release"
//         releaseButton.setAttribute("data-pokemon-id", trainer.pokemons[i].id)
//         ul.append(li)
//     }
// }



// START IT UP
document.body.onload = getAndRenderTrainers