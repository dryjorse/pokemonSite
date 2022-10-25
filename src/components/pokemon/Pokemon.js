import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from './pokemon.module.css'

function Pokemon ({name, img, id}) {

    return (
        <li key={id} className={s.list}>
            <Link className={s.pokemon} to={`/pokemons/${id}`}>
                <div className={s.picture}>
                    <img className={s.img} src={img} alt={name} />
                </div>
                <h2 className={s.name}>{name}</h2>
            </Link>
        </li>
    )
}

export default Pokemon;