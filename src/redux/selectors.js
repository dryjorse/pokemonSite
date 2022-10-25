import { createSelector } from "reselect"; 

export const generations = state => state.filterReducer.generations
export const types = state => state.filterReducer.types
export const typesCount = state => state.filterReducer.typesCount
export const damageTypes = state => state.filterReducer.damageTypes
export const pokemons = state => state.pokemonsReducer.pokemons
export const pokemonsCount = state => state.pokemonsReducer.pokemonsCount
export const currentPokemons = state => state.pokemonsReducer.currentPokemons
export const sortElement = state => state.pokemonsReducer.sortElement
export const pokemonsSpecies = state => state.pokemonsReducer.pokemonsSpecies
export const pokemon = state => state.pokemonReducer.pokemon
export const pokemonSpecies = state => state.pokemonReducer.pokemonSpecies

export const selectedGenerations = createSelector(
    [generations], (selectGenerations) => {
        selectGenerations.results && selectGenerations.results.forEach(( name, i) => {
            name.labelName = `${++i}-e`
            if (i === selectGenerations.count){
                name.labelName = `${i}-e и новее`
            }
        })
        return selectGenerations
    }
)

export const selectedTypes = createSelector(
    [types, typesCount], (selectTypes, selectTypesCount) => {
        if(selectTypes.length >= selectTypesCount) {
            selectTypes.forEach((type) => {
                type.labelName = type.name
            })
            return selectTypes
        }
    }
)


export const selectedDamageTypes = createSelector(
    [damageTypes], (selectDamageTypes) => {
        if(selectDamageTypes?.results?.length >= selectDamageTypes.count) {
            const result = selectDamageTypes.results.slice(1)
            result.forEach((types) => {
                if(types.name === 'physical'){
                    types.labelName = 'Физические'
                } else if(types.name === 'special'){
                    types.labelName = 'Специальные'
                }
            })
            return result
        }
    }
)

export const physicalDamageTypes = createSelector(
    [types, typesCount], (selectTypes, selectTypesCount) => {
        if(selectTypes.length >= selectTypesCount){
            return selectTypes &&  selectTypes.filter(item => item?.move_damage_class?.name === 'physical')
        }
    }
)

export const specialDamageTypes = createSelector(
    [types, typesCount], (selectTypes, selectTypesCount) => {
        if(selectTypes.length >= selectTypesCount){
            return selectTypes &&  selectTypes.filter(item => item?.move_damage_class?.name === 'special')
        }
    }
)

export const selectedPokemons = createSelector(
    [pokemons, pokemonsCount, pokemonsSpecies, types, typesCount], 
    (selectPokemons, selectPokemonsCount, selectPokemonsSpecies, selectTypes, selectTypesCount) => {
        if(selectPokemons.length >= selectPokemonsCount) {
            if(selectPokemonsSpecies.length >= selectPokemonsCount) {
                if(selectTypes.length >= selectTypesCount){
                    selectPokemons.forEach(pok => {
                        selectPokemonsSpecies.forEach(species => {
                            if(pok.id === species.id){
                                pok.generation = species.generation.name
                            }
                        })
                    })
    
                    selectPokemons.forEach(pok => {
                        selectTypes.forEach(type => {
                            if(pok.types[0]?.type?.name === type?.name){
                                pok.move_damage_classes = type?.move_damage_class?.name
                            }
                        })
                    })

                    return selectPokemons
                }
            }
        }
    }
)

export const selectedCurrentPokemons = createSelector(
    [currentPokemons], (selectCurrentPokemons) => {
        if(selectCurrentPokemons) return selectCurrentPokemons
    }
)