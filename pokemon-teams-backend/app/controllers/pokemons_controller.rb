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
        # pokemon = Pokemon.new(pokemon_params)
        pokemon = Pokemon.new(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: pokemon_params[:trainer_id])
        pokemon.save!
        # pokemon.name = Faker::Name.first_name
        # pokemon.species = Faker::Games::Pokemon.name
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        # is the below necessary? get errors if not there
        render json: pokemon
        Pokemon.delete(pokemon)
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
        # this is probably what would work without needing to nest the original input:
        # permit(:nickname, :species, :trainer_id)
    end
end
