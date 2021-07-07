import React from 'react';
import { useSelector } from 'react-redux';
import style from './PokemonDetail.module.css'
import pokeballImg from './Pokemon-Pokeball.png'

export function PokemonDetail() {
  const apiPokemon = useSelector(state => state.pokemon)

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (apiPokemon.message) {
    return (<div className={style.contents}>
      <h1>Ese pokemon no existe!</h1>
    </div>)
  } else if (apiPokemon.name) {
    let {id, name, img, hp, attack, defense, speed, height, weight, types } = apiPokemon
    if (typeof id === 'string') id = id.slice(0, 8)
    return (
      <div className={style.contents}>
        <div className={style.card}>
          <div className={style.imgContainer}>
            <img height='180px' src={`${img}`} alt={name}/>
          </div>
          <div className={style.textContainer}>
            <h2>{capitalizeString(name)}</h2>
            <div className={style.tittles}>
              <h4>Stats</h4>
              <h4>Types</h4>
            </div>
            <div className={style.stats}>
              <div>
                <div>ID: {id}</div>
                <div>HP: {hp}</div>
                <div>Attack: {attack}</div>
                <div>Defense: {defense}</div>
                <div>Speed: {speed}</div>
                <div>Height: {height}</div>
                <div>Weight: {weight}</div>
              </div>
              <ul className={style.li}>
                {types.map(type => {
                  return <li key={type.id} >
                    <img className={style.img} src={pokeballImg} alt='Pokebal'/>
                    {capitalizeString(type.name)}
                  </li>
                }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (<div className={style.contents}><h1>Loading...</h1></div>)
  }
};

export default PokemonDetail;