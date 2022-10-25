import React from "react";
import s from './notFound.module.css'

function NotFound () {
    return (
        <div className={s.notFound}>
            <h1 className={s.notFoundText}>Не найдено покемонов с указанными параметрами</h1>
        </div>
    )
}

export default NotFound;