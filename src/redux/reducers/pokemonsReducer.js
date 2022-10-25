import { types } from "../types";

const initialState = {
    pokemonsURL: 'https://pokeapi.co/api/v2/pokemon',
    pokemons: [],
    pokemonsSpecies: [],
    pokemonsCount: 20,
    currentPokemons: [],
    sortElement: '',
    pokemonsLoading: false,
}

export const pokemonsReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_POKEMONS:
            return {...state, pokemons: [...state.pokemons, action.payload]}
        case types.SET_POKEMONS_URL:
            return {...state, pokemonsURL: action.payload}
        case types.SET_SPECIES_POKEMONS:
            return {...state, pokemonsSpecies: [...state.pokemonsSpecies, action.payload]}
        case types.SET_LOADING_POKEMONS:
            return {...state, pokemonsLoading: action.payload}
        case types.CLEAR_POKEMONS:
            return {...state, pokemons: action.payload}
        case types.SET_CURRENT_POKEMONS:
            return {...state, currentPokemons: action.payload}
        case types.SET_SORTED_POKEMONS:
            return {...state, currentPokemons: [...state.currentPokemons.sort(
                (a, b) => {return a[action.payload] < b[action.payload] ? 1 : -1}
            )], sortElement: action.payload}
        case types.ORDER_POKEMONS:
            return {...state, currentPokemons: [...state.currentPokemons.sort(
                (a, b) => {return a['order'] > b['order'] ? 1 : -1}
            )], sortElement: ''}
        default:
            return state
    }
    
}