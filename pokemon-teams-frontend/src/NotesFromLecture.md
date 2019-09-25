##Top Tips

*Routes*
- check your routes, resources, only: [:etc, :etc]
- check your controller

```
 def index
    @trainers = Trainer.all
    render json: @trainers, include: [:pokemons]
 end
 ```


 ```
 render json: @pokemons
 ```

 *Template*
 - add to page
 - editing on page
 - remove something from page

*API Calls*
- `api call.then` - make sure you always get a promise back

*Your functions*

```
    get = url => fetch(url).then(response=>respose.json())
    
    post = (url, data) => {
        *return* fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "applicatin/json"
            }, 
            body: JSON.stringify(data)
        }).then(response=>respose.json())
    }

    *destroy* = (url, id) => {
        *return* fetch(`${url}/${id}`, {
            method: "DELETE",
        }).then(response=>respose.json())
    }
```

`div.dataset.id = trainer.id` => gives you a `setAttribute` of just `data-id`. Anything more complicated need to use `setAttribute`

# when you were trying to extract the forEach 

```
ul.append(...createTrainersPokemon(trainer.pokemons))

createTrainersPokemon = pokemons => {
    return pokemons.map(createPokemon)
}

createPokemon = pokemon => {
    _make your lis, buttons, etc_
    *return li*
}
```

# when you wanted to extract handle Add Click

```
handleAddClick = event => {
    let trainerId = event.target.dataset.trainerId
}
```
# Searching Top Tip
- You can call querySelector on any HTML node

```
let *goodbyePokemon* = currentTrainerUl.querySelector(`li[data-pokemon-id="${pokemon.id}"]`)
goodbyePokemon.remove()
```







