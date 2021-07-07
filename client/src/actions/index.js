import axios from 'axios';
import { POKEMON_LIST, POST_POKEMON, TYPE_LIST, SEARCH_NAME } from '../constants.js'

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const ADD_POKEMON = 'ADD_POKEMON';

export const getPokemons = () => {
    return (dispatch) => {
        return axios.get(`${POKEMON_LIST}`).then(result => {
            dispatch({
                type: GET_POKEMONS,
                payload: result.data
            })
        })
        .catch(err => console.log({message: err.message}))
    }
}

export const getTypes = () => {
    return (dispatch) => {
        return axios.get(`${TYPE_LIST}`)
        .then(result => {
            dispatch({
                type: GET_TYPES,
                payload: result.data
            })
        })
        .catch(err => console.log({message: err.message}))
    }
}

export const addPokemon = (pokemon) => {
    return (dispatch) => {
        return axios.post(`${POST_POKEMON}`, pokemon)
        .then( (result) => {
            dispatch({
                type: ADD_POKEMON,
                payload: {
                    name: pokemon.name,
                    img: pokemon.img,
                    hp: pokemon.hp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    speed:  pokemon.speed,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    types: [pokemon.types]
                }
            })
        })
        .catch(err => console.log({message: err.message}))
    }
}

export const searchPokemon = (pokemon) => {
    return (dispatch) => {
        return axios.get(`${POKEMON_LIST}${SEARCH_NAME}${pokemon}`)
        .then(result => {
            dispatch({
                type: GET_POKEMON,
                payload: result.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_POKEMON,
                payload: err
            })   
        })
    }
}