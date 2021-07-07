import React from 'react';
import style from './Pokemon.module.css'
import pokeballImg from './Pokemon-Pokeball.png'

export function Pokemon({id, img, name, types}) {

  const capitalizeName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={style.card}>
      <div className={style.imgContainer}>
        <img height='96px' src={`${img}`} alt={name}/>
      </div>
      <div className={style.textContainer}>
        <span className={style.name}>{capitalizeName(name)}</span>
        <div className={style.types}>
          <span>Types:</span>
          <ul className={style.li}>
            {types.map(type => {
              return <li key={type.id} >
                <img className={style.img} src={pokeballImg} alt='Pokebal'/>
                {capitalizeName(type.name)}
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Pokemon;