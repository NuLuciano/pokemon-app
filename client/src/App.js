import './App.css';
import React from 'react'
import { Route } from 'react-router-dom';
import Home from "./components/Home/Home"
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import AddPokemon from './components/AddPokemon/AddPokemon';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route path="/home" component={Nav}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/home/add" component={AddPokemon}/>
      <Route path="/home/detail" component={PokemonDetail}/>
    </div>
  );
}

export default App;
