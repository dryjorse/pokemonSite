import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemonsAction, getPokemonsAction, orderPokemonsAction, setCurrentPokemons, setLoadingPokemons, setSortedPokemonsAction } from "../../redux/actions/actions";
import { selectedCurrentPokemons, selectedPokemons, sortedPokemonsSelector } from "../../redux/selectors";
import Loading from "../common/loading/Loading";
import NotFound from "../common/notFound/NotFound";
import Pokemon from "../pokemon/Pokemon";
import s from './pokemons.module.css'

function Sort () {
    const dispatch = useDispatch()
    const [sortButtons, setSortButtons] = useState([] | null)

    const handleSortButtons = (e, updatedSortButtons) => {
        //не нашел подходящих данных в API для сортировки по популярности и рейтингу
        //did not find suitable data in the API for sorting by popularity and rating
        setSortButtons(updatedSortButtons)
        if(updatedSortButtons){
            dispatch(setSortedPokemonsAction(updatedSortButtons))
        } else {
            dispatch(orderPokemonsAction())
        }
    }

    const styleToggleBtn = [{
        border: 'none',
        padding: '0',
        fontSize: '16px',
        textTransform: 'capitalize',
        color: '#3F3F3F',
        textDecoration: 'underline',
        '&:not(&:last-child)': {
            marginRight: '40px',
        }
    }]

    return (
        <div className={s.sort}>
            <span className={s.sortText}>Сортировать по:</span>
            <div className={s.sortBlock}>
                <ToggleButtonGroup value={sortButtons} onChange={handleSortButtons} exclusive>
                    <ToggleButton value={'weight'} sx={styleToggleBtn} >Популярности</ToggleButton>
                    <ToggleButton value={'order'} sx={styleToggleBtn} >Рейтингу</ToggleButton>
                    <ToggleButton value={'base_experience'} sx={styleToggleBtn} >Уровню силы</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

function Pokemons () {
    const dispatch = useDispatch()
    const pokemons = useSelector(selectedPokemons)
    const pokemonsURL = useSelector(state => state.pokemonsReducer.pokemonsURL)
    const currentPokemons = useSelector(state => state.pokemonsReducer.currentPokemons)

    return (
        <div className={s.main}>
            <Sort />
            <ul className={s.pokemonsBlock}>
                {
                    currentPokemons.length ? currentPokemons.map((pok) => (
                        <Pokemon name={pok.name} data={currentPokemons} key={pok.id} img={pok.sprites.other.dream_world.front_default} id={pok.id} />
                    )) : <NotFound />
                }
            </ul>
            <div className={s.nextBlock}>
                <button onClick={() => {dispatch(getPokemonsAction(pokemonsURL))}} className={s.next}>Далее</button>
            </div>
        </div>
    )
}

export default Pokemons;