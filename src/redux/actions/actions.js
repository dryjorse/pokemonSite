import axios from "axios"
import { types } from "../types"

const baseURL = 'https://pokeapi.co/api/v2/'

export const setGenertaionsAction = (data) => {
    return {
        type: types.SET_GENERATIONS,
        payload: data,
    }
}

export const getGenerationsAction = () => {
    return async function (dispatch) {
        const response = await axios.get(baseURL + 'generation')
        dispatch(setGenertaionsAction(response.data))
    }
}

export const setTypesCountAction = (data) => {
    return {
        type: types.SET_TYPES_COUNT,
        payload: data,
    }
}

export const setTypesAction = (data) => {
    return {
        type: types.SET_TYPES,
        payload: data,
    }
}

export const getTypesAction = () => {
    return async function (dispatch) {
        const response = await axios.get(baseURL + 'type')
        const data = response.data
        dispatch(setTypesCountAction(data.count))
        data.results.forEach( async pokemon => {
            const response = await axios.get(pokemon.url)
            const data = response.data
            dispatch(setTypesAction(data))
        })
    }
}

export const clearTypesAction = (data) => {
    return {
        type: types.CLEAR_TYPES,
        payload: data,
    }
}

export const setDamageTypesAction = (data) => {
    return {
        type: types.SET_DAMAGE_TYPE,
        payload: data,
    }
}

export const getDamageTypesAction = () => {
    return async function (dispatch) {
        const response = await axios.get(baseURL + 'move-damage-class')
        const data = response.data
        dispatch(setDamageTypesAction(data))
    }
}

export const setLoadingPokemonsAction = (isLoading) => {
    return {
        type: types.SET_LOADING_POKEMONS,
        payload: isLoading,
    }
}

export const setPokemonsAction = (data) => {
    return {
        type: types.SET_POKEMONS,
        payload: data,
    }
}

export const setPokemonsURL = (data) => {
    return {
        type: types.SET_POKEMONS_URL,
        payload: data,
    }
}

export const setSpeciesPokemonsAction = (data) => {
    return {
        type: types.SET_SPECIES_POKEMONS,
        payload: data,
    }
}
export const getPokemonsAction = (URL) => {
    return async function (dispatch) {
        dispatch(setLoadingPokemonsAction(true))
        const response = await axios.get(URL)
        const data = response.data
        dispatch(setPokemonsURL(data.next))
        await data.results.forEach( async pokemon => {
            const response = await axios.get(pokemon.url)
            const data = response.data
            dispatch(setPokemonsAction(data))
        })
    }
}

export const getSpeciesPokemonsAction = () => {
    return async function (dispatch) {
        const response = await axios.get(baseURL + 'pokemon-species')
        const data = response.data
        await data.results.forEach( async pokemon => {
            const response = await axios.get(pokemon.url)
            const data = response.data
            dispatch(setSpeciesPokemonsAction(data))
        })
    }
}

export const clearPokemonsAction = (data) => {
    return {
        type: types.CLEAR_POKEMONS,
        payload: data,
    }
}

export const setCurrentPokemonsAction = (data) => {
    return {
        type: types.SET_CURRENT_POKEMONS,
        payload: data,
    }
}

export const setSortedPokemonsAction = (data) => {
    return {
        type: types.SET_SORTED_POKEMONS,
        payload: data,
    }
}

export const orderPokemonsAction = (data) => {
    return {
        type: types.ORDER_POKEMONS,
        payload: data,
    }
}

export const setPokemonAction = (data) => {
    return {
        type: types.SET_POKEMON,
        payload: data,
    }
}

export const setPokemonSpeciesAction = (data) => {
    return {
        type: types.SET_POKEMON_SPECIES,
        payload: data,
    }
}

export const setLoadingPokemonAction = (isLoading) => {
    return {
        type: types.SET_LOADING_POKEMON,
        payload: isLoading,
    }
}

export const setEvolutionChainAction = (data) => {
    return {
        type: types.SET_EVOLUTION_CHAIN,
        payload: data,
    }
}

export const setGenerationAction = (data) => {
    return {
        type: types.SET_GENERATION,
        payload: data,
    }
}

export const setAbilities = (data) => {
    return {
        type: types.SET_ABILILTES,
        payload: data,
    }
}

export const getPokemonAction = (id) => {
    return async function (dispatch) {
        dispatch(setLoadingPokemonAction(true))
        const response = await axios.get(`${baseURL}pokemon/${id}`)
        const data = response.data
        dispatch(setPokemonAction(data))
        const responseSpecies = await axios.get(data.species.url)
        const species = responseSpecies.data
        dispatch(setPokemonSpeciesAction(species))
        const responseEvolutionChain = await axios.get(species.evolution_chain.url)
        const evolutionChain = responseEvolutionChain.data
        dispatch(setEvolutionChainAction(evolutionChain))
        const responseGeneration = await axios.get(species.generation.url)
        const generation = responseGeneration.data
        dispatch(setGenerationAction(generation))
        const responseAbilities = await axios.get(data.abilities[0].ability.url)
        const abilities = responseAbilities.data
        dispatch(setAbilities(abilities))
    }
}