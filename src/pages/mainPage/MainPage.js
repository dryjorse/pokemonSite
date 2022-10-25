import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function MainPage () {
    return (
        <div>
            <Navigate to={'/pokemons'} />
        </div>
    )
}

export default MainPage;