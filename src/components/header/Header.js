import React from "react";
import { NavLink } from "react-router-dom";
import s from './header.module.css'

function Header () {
    return (
        <div className={s.header}>
           <nav className={s.nav}>
                <ul className={s.ul}>
                    <li className={s.list}><NavLink className={s.link} to={'/pokemons'} >Все покемоны</NavLink></li>
                    <li className={s.list}><NavLink className={s.link} to={'/help'} >Помощь</NavLink></li>
                    <li className={s.list}><NavLink className={s.link} to={'/contacts'} >Контакты</NavLink></li>
                </ul>
           </nav>
        </div>
    )
}

export default Header;