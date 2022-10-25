import { types } from "../types";

const initialState = {
    generations: [],
    types: [],
    typesCount: 0,
    damageTypes: [],
    pokemons: [],
    pokemonsCount: 20,
}

export const filterReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_GENERATIONS:
            return {...state, generations: action.payload}
        case types.SET_TYPES:
            return {...state, types: [...state.types, action.payload]}
        case types.CLEAR_TYPES:
            return {...state, types: action.payload}
        case types.SET_TYPES_COUNT:
            return {...state, typesCount: action.payload}
        case types.SET_DAMAGE_TYPE:
            return {...state, damageTypes: action.payload}
        default:
            return state
    }
}