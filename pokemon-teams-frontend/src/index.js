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

function postPokemon(url, data) {
    const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify(data)
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


// THIS IS WHAT NEEDS CHECKING     
    trainer.pokemons.forEach(pokemon => addToCard(pokemon))                                                                                                                                                                                                                                                                                                    

    divCard.append( trainerName, addButton, ul )
    main.append( divCard )

}  // end renderTrainers
 

function addAPokemon(trainer) {  
    if (trainer.pokemons.length < 6) {
        let data = {
            pokemon: { 
                // nickname: undefined,
                // species: undefined,
                trainer_id: parseInt(trainer.id)
            }
        }

        API.postPokemon(POKEMONS_URL, data).then((pokemon) => addToCard(pokemon))
              
    }   else {
        alert("you have enough pokemon")
        }
}

function addToCard(newPoke) {
    // let ul = localDetails.lastElementChild
    let ul = document.querySelector(`div[data-id="${newPoke.trainer_id}"]`)
    let li = document.createElement("li")
        li.innerText = `${newPoke.nickname} (${newPoke.species})`
        li.setAttribute("data-li-id", newPoke.id)
    let releaseButton = document.createElement("button")
        releaseButton.innerText = "Release"
        releaseButton.className = "release"
        releaseButton.setAttribute("data-pokemon-id", newPoke.id)
        releaseButton.addEventListener("click", () => releaseAPokemon(newPoke))
        li.append(releaseButton)
        ul.append(li)
}

function releaseAPokemon(goodbyePokemon) {
    API.deletePokemon(POKEMONS_URL, goodbyePokemon.id).then(pokemon => {
        let ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]>ul`)
        let li = document.querySelector(`li[data-li-id="${pokemon.id}"]`)
        li.remove()
        // let allUL = this.event.target.parentElement.parentElement
        // let thisLI = this.event.target.parentElement
        // allUL.removeChild(thisLI)
    })
    // as soon as I chained this onto a 'then' for the above it lost 'this' scope,
    // so rendered optimistically. any other way to do this? e.g. with 
    // response.ok ? (& how ??)
    
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