import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading/Loading";
import Filter from "../../components/filter/Filter";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Pokemons from "../../components/pokemons/Pokemons";
import { clearPokemonsAction, clearTypesAction, getDamageTypesAction, getGenerationsAction, getPokemonsAction, 
        getSpeciesPokemonsAction, getTypesAction, orderPokemonsAction, setCurrentPokemonsAction, setLoadingPokemonsAction, 
        setPokemonsURL, setSortedPokemonsAction } from "../../redux/actions/actions";
import { selectedPokemons } from "../../redux/selectors";

function PokemonsPage () {
    const dispatch = useDispatch()
    const pokemonsURL = useSelector(state => state.pokemonsReducer.pokemonsURL)
    const pokemons = useSelector(selectedPokemons)
    const isLoading = useSelector(state => state.pokemonsReducer.pokemonsLoading)
    const sortElement = useSelector(state => state.pokemonsReducer.sortElement)

    useEffect(() => {
        dispatch(getPokemonsAction(pokemonsURL))
        dispatch(getSpeciesPokemonsAction())
        dispatch(setLoadingPokemonsAction(true))
        dispatch(getTypesAction())
        dispatch(getGenerationsAction())
        dispatch(getDamageTypesAction())
        return () => {
            dispatch(clearPokemonsAction([]))
            dispatch(setPokemonsURL('https://pokeapi.co/api/v2/pokemon'))
            dispatch(clearTypesAction([]))
        }
    }, [])

    useEffect(() => {
        dispatch(setCurrentPokemonsAction(pokemons))
        if(pokemons) {
            dispatch(setLoadingPokemonsAction(false))
            if(sortElement){
                dispatch(setSortedPokemonsAction(sortElement))
            } else {
                dispatch(orderPokemonsAction('order'))
            }
        }
    }, [pokemons])

    return (
        <div className='main'>
            <Header />
            <div className='container'>
                {isLoading ? 
                <Loading /> : 
                <div className='container'>
                    <Filter />
                    <Pokemons />
                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default PokemonsPage;