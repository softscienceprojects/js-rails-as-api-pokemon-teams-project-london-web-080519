class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json(:include => {
            :trainer => {:only => [:id, :name]}
        }, except: [:updated_at, :created_at])
    end

    def show

    end

    def new

    end

    def create

    end

    def delete

    end
end
