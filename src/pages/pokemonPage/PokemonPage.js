import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import s from './pokemonPage.module.css'
import { getPokemonAction, setLoadingPokemonAction, setPokemonAction } from '../../redux/actions/actions'
import Loading from "../../components/common/loading/Loading";

function PokemonPage () {
    const dispatch = useDispatch()
    const match = useMatch('/pokemons/:pokemonId')
    const pokemon = useSelector(state => state.pokemonReducer.pokemon)
    const species = useSelector(state => state.pokemonReducer.pokemonSpecies)
    const isLoading = useSelector(state => state.pokemonReducer.isLoading)
    const evolutionChain = useSelector(state => state.pokemonReducer.evolutionChain)
    const generation = useSelector(state => state.pokemonReducer.generation)
    const abilities = useSelector(state => state.pokemonReducer.abilities)

    useEffect(() => {
        dispatch(getPokemonAction(match.params.pokemonId))
        return () => {
            dispatch(setPokemonAction([]))
        }
    }, [])

    useEffect(() => {
        if(pokemon){
            dispatch(setLoadingPokemonAction(false))
        }
    }, [pokemon])

    return (
        <div className={`main ${s.main}`}>
            <Header />
            <div className={`container ${s.container}`}>
                {
                    isLoading ? 
                    <Loading /> :
                    <div className={s.content}>
                        <div className={s.backBlock}>
                            <Link to={'/pokemons'} className={s.backBtn}>Вернуться в каталог</Link>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoContent}>
                                <div className={s.infoPf}>
                                    <h1 className={s.name}>{pokemon.name}</h1>
                                    <p className={s.nameOptions}>({
                                        species?.names && species?.names.map((spec) => {
                                            if(spec.language.name === 'ja'){
                                                return <span key={spec.language.name}>
                                                    <span>{spec.language.name}.</span>
                                                    <span>{spec.name}</span>
                                                </span>
                                            } else if(spec.language.name === 'en'){
                                                return <span key={spec.language.name}>
                                                    <span>{spec.language.name}.</span>
                                                    <span>{spec.name},</span>
                                                </span>
                                            }
                                        })
                                    })</p>
                                    <p className={s.infoPf}> - is a {pokemon?.types && pokemon?.types[0]?.type?.name} type Pokémon introduced in {species?.generation?.name}.</p>
                                </div>
                                <div className={s.infoPf}>
                                    <p>Evolves into <span className='ht'>{evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.species?.name}</span> at level {evolutionChain?.chain?.evolves_to && evolutionChain?.chain?.evolves_to[0]?.evolution_details[0].min_level }, which then evolves into <span className="ht">{evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species.name}</span> at level {evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0].min_level}.</p>
                                </div>
                                <div className={s.infoPf}>
                                    <p>This is one of the Pokémon from the <span className="ct">{generation?.main_region?.name}</span> region.</p>
                                </div>
                                <div className={s.maintenance}>
                                    <h2 className={s.maintenanceTitle}>Содержание</h2>
                                    <ol className={s.contents}>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="#appearance" onClick={(e) => {e.preventDefault()}}>Внешность</a></li>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="" onClick={(e) => {e.preventDefault()}}>Характер</a></li>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="" onClick={(e) => {e.preventDefault()}}>Способности</a></li>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="" onClick={(e) => {e.preventDefault()}}>Обитание</a></li>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="" onClick={(e) => {e.preventDefault()}}>В аниме</a></li>
                                        <li className={s.contentsList}><a className={s.contentsLink} href="" onClick={(e) => {e.preventDefault()}}>Эволюция</a></li>
                                    </ol>
                                </div>
                            </div>
                            <div className={s.pciture}>
                                <div className={s.pictureBlock}>
                                    <img src={pokemon?.sprites?.other.dream_world?.front_default} alt={pokemon?.name} />
                                </div>
                                <h2 className={s.pokemonName}>{pokemon.name}</h2>
                            </div>
                        </div>
                        <div id="appearance" className={s.divide}>
                            <h3 className={s.divideTitle}>Внешность</h3>
                            <p className={s.divideContent}><span className="ct">{pokemon?.name}</span> - is a {species?.shape?.name} {species?.color?.name} Pokemon. {species?.flavor_text_entries && species?.flavor_text_entries[6].flavor_text}</p>
                        </div>
                        <div id="character" className={s.divide}>
                            <h3 className={s.divideTitle}>Характер</h3>
                            <p className={s.divideContent}> {species?.flavor_text_entries && species?.flavor_text_entries[8].flavor_text}</p>
                        </div>
                        <div id="abbilities" className={s.divide}>
                            <h3 className={s.divideTitle}>Способности</h3>
                            {
                                abilities && abilities?.effect_entries.map(eff => {
                                    if(eff?.language?.name === 'en'){
                                       return <p key={eff.language.name} className={s.divideContent}>{eff.effect}</p>
                                    }
                                })
                            }
                        </div>
                        <div id="anime" className={s.divide}>
                            <h3 className={s.divideTitle}>В аниме</h3>
                            <p className={s.divideContent}> {species?.flavor_text_entries && species?.flavor_text_entries[9].flavor_text}</p>
                        </div>
                        <div id="evolution" className={s.divide}>
                            <h3 className={s.divideTitle}>Эволюция</h3>
                            <p className={s.divideContent}> <span className='ct'>{pokemon.name}</span> evolves into <span className='ht'>{evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.species?.name}</span> at level {evolutionChain?.chain?.evolves_to && evolutionChain?.chain?.evolves_to[0]?.evolution_details[0].min_level }, which then evolves into <span className="ht">{evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species.name}</span> at level {evolutionChain?.chain?.evolves_to[0] && evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0].min_level}.</p>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default PokemonPage;