import { GET_POKEMONS, ADD_POKEMON, GET_TYPES, GET_POKEMON } from '../actions'

const initialState = {
    pokemons: [],
    types: [],
    pokemon: {}
};


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case ADD_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }

        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }
        
        default:
            return state;
    }
}

export default rootReducer;