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

    end

    def create
        pokemon = Pokemon.new
        pokemon.name = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        Pokemon.save!(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon.to_json
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.to_json
        Pokemon.delete(pokemon)
    end
end
