require 'faker'

class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json(:include => {
            :trainer => {:only => [:id, :name]}
        }, except: [:updated_at, :created_at])
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.to_json(:include => {
            :trainer => {:only => [:id, :name]}
        }, except: [:updated_at, :created_at])
    end

    def new
    #    pokemon = Pokemon.new
    #    render json: pokemon.to_json
    end

    def create
        pokemon = Pokemon.create(pokemon_params)
        pokemon.name = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        Pokemon.save!(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon.to_json
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        # is the below necessary? get errors if not there
        render json: pokemon.to_json
        Pokemon.delete(pokemon)
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end
end
