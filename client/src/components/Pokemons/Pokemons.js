import React from 'react';
import style from './Pokemons.module.css'

import Pokemon from '../Pokemon/Pokemon'

export function Pokemons({pokemons}) {
  if (!pokemons.length) {
    return (<div className={style.cardContainer}><h1>Loading...</h1></div>)
  }
  return (
    <ul className={style.cardContainer}>
      {pokemons.map(pokemon => {
        return <li key={pokemon.id}>
          <Pokemon
          id={pokemon.id}
          img={pokemon.img}
          name={pokemon.name}
          types={pokemon.types}
          />
        </li>
      })}
    </ul>
  )
};

export default Pokemons;