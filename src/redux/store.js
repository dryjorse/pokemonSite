import {combineReducers} from "redux";
import { filterReducer } from "./reducers/filterReducer";
import { pokemonsReducer } from "./reducers/pokemonsReducer"
import { pokemonReducer } from "./reducers/pokemonReducer"

export const rootReducer = combineReducers({
    filterReducer,
    pokemonsReducer,
    pokemonReducer
})