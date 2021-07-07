const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoutes = require('./pokemon.js');
const typesRoutes = require('./type.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api/pokemons', pokemonRoutes);
router.use('/api/types', typesRoutes);


module.exports = router;
