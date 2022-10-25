import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactsPage from './pages/contactsPage/ContactsPage';
import Help from './pages/helpPage/HelpPage';
import MainPage from './pages/mainPage/MainPage';
import PokemonPage from './pages/pokemonPage/PokemonPage';
import PokemonsPage from './pages/pokemonsPage/PokemonsPage';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navigate to={'/pokemons'} />
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path='/help' element={<Help />}/>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/pokemons' element={<PokemonsPage />}/>
          <Route path='/pokemons/:pokemonId' element={<PokemonPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
