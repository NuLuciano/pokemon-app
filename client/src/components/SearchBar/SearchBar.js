import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchPokemon } from '../../actions/index';
import style from './SearchBar.module.css'

export function SearchBar({history, cname}) {
    const [pokemonInput, setPokemonInput] = useState('')
    const [clickCheck, setClickCheck] = useState(false)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setPokemonInput(event.target.value.toLowerCase())
        if (pokemonInput.length > 0) setClickCheck(true)
    }
    const hanldeSubmit = (event) => {
        event.preventDefault()
        if (pokemonInput.length > 0) {
            dispatch(searchPokemon(pokemonInput))
        }
        setClickCheck(false)
        setPokemonInput('')
        event.target.reset()
    }

    return (
        <form className={style.container} onSubmit={hanldeSubmit}>
            <input
                className={style.input}
                type='text' 
                placeholder='Pokemon name...' 
                onChange={handleChange}/>
            <button
                className={style.button}
                type='submit'
                onClick={() => {
                    if (clickCheck) {
                        history.push('/home/detail')
                    }   
                }
                }>
                <span>Search</span>
            </button>
        </form>
    )
};

export default withRouter(SearchBar);

/*

            id={apiPokemon.id}
            name={apiPokemon.name}
            img={apiPokemon.img}
            hp={apiPokemon.hp}
            attack={apiPokemon.attack}
            defense={apiPokemon.defense}
            speed={apiPokemon.speed}
            height={apiPokemon.height}
            weight={apiPokemon.weight}
            */