import { types } from "../types";

const initialState = {
    pokemon: [],
    pokemonSpecies: [],
    isLoading: false,
    evolutionChain: [],
    generation: [],
    abilities: null,
}

export const pokemonReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_POKEMON:
            return {...state, pokemon: action.payload}
        case types.SET_LOADING_POKEMON:
            return {...state, isLoading: action.payload}
        case types.SET_POKEMON_SPECIES:
            return {...state, pokemonSpecies: action.payload}
        case types.SET_EVOLUTION_CHAIN:
            return {...state, evolutionChain: action.payload}
        case types.SET_GENERATION:
            return {...state, generation: action.payload}
        case types.SET_ABILILTES:
            return {...state, abilities: action.payload}
        default:
            return state
    }
}