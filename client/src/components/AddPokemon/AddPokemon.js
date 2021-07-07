import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getPokemons } from '../../actions/index';
import style from './AddPokemon.module.css'


export function AddPokemon() {
  const [pokemonInput, setPokemonInput] = useState({
    name: '',
    img: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed:  0,
    height: 0,
    weight: 0,
    types: []
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [disable, setDisable] = useState(true)
  const dispatch = useDispatch();
  const pokemonTypes = useSelector(state => state.types)
  
  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validateText = (value) => {
    let textPattern = /^[A-Za-z]+$/
    if (!textPattern.test(value) && value) {
      setError('Name must contain letters only!')
    } else if (value.length > 15) {
      setError('Name must be shorter than 15 letters!')
    } else {
      setError('')
    }
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if(valid) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPokemon(pokemonInput))
    setSuccess('Pokemon added successfully!')
    event.target.reset()
    dispatch(getPokemons())
  }

  const handleChange = (event) => {
    setSuccess('')
    const options = event.target.selectedOptions
    if (options && options.length > 3) {
      setError('You can choose a maximum of 3 types!')
    } else {
      setError('')
    }
    if (event.target.name === 'types') {
      const values = Array.from(options, option => option.value)
      return setPokemonInput({...pokemonInput, types: values})
    }
    if (event.target.name === 'name') {
      validateText(event.target.value)
      setPokemonInput({...pokemonInput, [event.target.name]: event.target.value.toLowerCase()})
    } else {
      setPokemonInput({...pokemonInput, [event.target.name]: event.target.value})
    }
    
    validateForm(error)
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.formContainer}>
        <div className={style.stats}>
          <label>Name</label>
          <input
            className={style.inputText}
            type='text' 
            required 
            name='name' 
            placeholder='Pokemon Name' 
            onChange={handleChange} />

          <label >Pokemon image</label>
          <input
            className={style.inputText}
            type='url' 
            required 
            name='img' 
            placeholder='Image URL' 
            onChange={handleChange} />

          <div className={style.statsGroup}>
            <div className={style.firstStats}>
              <label >HP</label>
              <input
                className={style.inputNum}
                type='number' 
                required max='999' 
                min='1' 
                step='1' 
                name='hp' 
                placeholder='Pokemon HP' 
                onChange={handleChange} />

              <label >Attack</label>
              <input
                className={style.inputNum}
                type='number' 
                required 
                max='999' 
                min='1' 
                step='1' 
                name='attack' 
                placeholder='Pokemon Attack' 
                onChange={handleChange} />

              <label >Defense</label>
              <input
                className={style.inputNum}
                type='number' 
                required max='999' 
                min='1' 
                step='1' 
                name='defense' 
                placeholder='Pokemon Defense' 
                onChange={handleChange} />
            </div>

            <div className={style.secondStats}>
              <label >Speed</label>
              <input
                className={style.inputNum}
                type='number' 
                required 
                max='999' 
                min='1' 
                step='1' 
                name='speed' 
                placeholder='Pokemon Speed' 
                onChange={handleChange} />

              <label >Height</label>
              <input
                className={style.inputNum}
                type='number' 
                required max='999' 
                min='1' 
                step='1' 
                name='height' 
                placeholder='Pokemon Height' 
                onChange={handleChange} />

              <label >Weight</label>
              <input
                className={style.inputNum}
                type='number' 
                required 
                max='999' 
                min='1' 
                step='1' 
                name='weight' 
                placeholder='Pokemon Weight' 
                onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className={style.typesButton}>
          <label >Types</label>
          <select
            className={style.select}
            multiple 
            name='types' 
            required 
            onChange={handleChange}>
            {pokemonTypes.map(type => {
              return <option key={`optionT${type.id}`} value={type.id} >
                {capitalizeString(type.name)}
              </option>
            })}
          </select>

          <button className={style.button} disabled={disable} type='submit' >Add Pokemon</button>
        </div>
      </form>
          {!error ? null : <div className={style.error}>{error}</div>}
          {success.length && !error ? <div className={style.error}>{success}</div> : null}
    </div>
  )
};

export default AddPokemon;