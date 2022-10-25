import React from "react";
import s from './loading.module.css'

function Loading () {
    return (
        <div className={s.loading}>
             <h1 className={s.loadingText}>Loading...</h1>
        </div>
    )
}

export default Loading;