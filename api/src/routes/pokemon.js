const { Router } = require('express')
const { addPokemon, findAllPokemon, findOnePokemon, findByName } = require('../controllers/pokemon.js')
const router = Router();

// Get listado de pokemons
router.get('/', findAllPokemon)

// Get pokemon con id pasado por params
router.get('/:id', findOnePokemon)

// Crea nuevo pokemon
router.post('/', addPokemon)


module.exports = router;