const { Pokemon, Type } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { POKEMON_LIST, MY_POKEMON_LIST } = require('../constants.js')

// console.log(Object.keys(Pokemon.prototype))
// console.log(Object.keys(Type.prototype))


const getApiPokemon = () => {
    return axios.get(`${POKEMON_LIST}`, {
        params: {
            limit: 40
        },
    })
    .then(result => {
        return result.data.results
    })
    .then(arr => {
        const prom = []
        arr.forEach( e => {
            prom.push(axios.get(e.url))
        })
        return prom
    })
    
};
const getMyPokemon = () => Pokemon.findAll({
    include: [
        {
            model: Type,
            as: 'types',
            through: {attributes: []}
        }
    ]
})

const getOnePokemon = (id) => Pokemon.findByPk(id, {
    include: [
        {
            model: Type,
            as: 'types',
            through: {attributes: []}
        }
    ]
})
//**********************************************************
// getApiPokemon().then(result => console.log(result.data.results))
// getMyPokemon().then(result => console.log(result[0].dataValues.name))

// Controller para encontrar por nombre
function findByName(req, res, next) {
    let checkDb = false
    getMyPokemon()
    .then(e => {
        e.forEach(pokemon => {
            if (pokemon.dataValues.name === req.query.name) {
                checkDb = true
            }
        })
        if (checkDb) {
            Pokemon.findOne({
                where: {
                    name: req.query.name
                },
                include: [
                    {
                        model: Type,
                        as: 'types',
                        through: {attributes: []}
                    }
                ]
            })
            .then(pokemon => {
                return res.send(pokemon)
            })
            .catch(err => next(err))
        } else {
            axios.get(`${MY_POKEMON_LIST}${req.query.name}`)
            .then(pokemon => {
                console.log(pokemon.data)
                return res.send(pokemon.data)

            })
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
}

// Controller para traer todos los pokemons de la api y mi db
function findAllPokemon(req, res, next) {
    if (req.query.name) {
        return findByName(req, res, next)
    }
    getApiPokemon()
    .then(promArr => {
        Promise.all(promArr)
        .then(results => {
            const apiReqs = []
            results.forEach(e => {
                const apiPokeId = e.data.id
                const apiPokeName = e.data.name
                const apiPokeImg = e.data.sprites.front_default
                const apiPokeAttack = e.data.stats[1].base_stat
                const apiPokeTypes = e.data.types
                const apiType = []
                apiPokeTypes.forEach(e => {
                    apiType.push({name: e.type.name})
                })
                apiReqs.push({
                    id: apiPokeId,
                    name: apiPokeName,
                    img: apiPokeImg,
                    attack: apiPokeAttack,
                    types: apiType
                })
                Type.findAll()
                    .then(myType => {
                        apiReqs.forEach(e => {
                            e.types.forEach(i => {
                                if (!i.id) {
                                    myType.forEach(e => {
                                        if (i.name === e.dataValues.name) {
                                            i.id = e.dataValues.id
                                        }
                                    })
                                }
                            })
                        })
                    })
            })
            return apiReqs
        })
        .then(apiPokes => {
            getMyPokemon()
            .then(result => {
                const myPokemon = []
                result.forEach( e => {
                    myPokemon.push({
                        id: e.dataValues.id,
                        name: e.dataValues.name,
                        img: e.dataValues.img,
                        attack: e.dataValues.attack,
                        types: e.dataValues.types
                    })
                })
                const allPokemons = myPokemon.concat(apiPokes)
                return res.send(allPokemons)
            })
        })
    })
    .catch(err => next(err))
}


// Controller para buscar un pokemon por id
function findOnePokemon(req, res, next) {
    const pokeId = req.params.id
    if(pokeId.length === 36) {
        getOnePokemon(pokeId)
        .then(pokemon => {
            res.send(pokemon)
        })
        .catch(err => next(err))
    } else {
        axios.get(`${POKEMON_LIST}${pokeId}`)
        .then(pokemon => {
            const apiTypes = []
            pokemon.data.types.forEach(e => {
                apiTypes.push({name: e.type.name})
            })
            Type.findAll()
                .then(myTypes => {
                    apiTypes.forEach(type => {
                        if (!type.id) {
                            myTypes.forEach(e => {
                                if (type.name === e.dataValues.name) {
                                    type.id = e.dataValues.id
                                }
                            })
                        }
                    })
                    const apiPoke = {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        img: pokemon.data.sprites.front_default,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        types: apiTypes
                    }
                    return res.send(apiPoke)
                })
        })
        .catch(err => next(err))
    }
}


// Controller para agregar pokemon, creamos un id para que no colisione con la api externa.
function addPokemon(req, res, next) {
    let id = uuidv4();
    const {types, ...pokemonBody} = {...req.body, id};
    // console.log(pokemonBody)
    Pokemon.create(pokemonBody)
        .then( pokemon => {
            pokemon.setTypes(types)
            return res.send(pokemon)
        })
        .catch(err => next(err))
}

module.exports = {
    addPokemon,
    findAllPokemon,
    findOnePokemon,
}

//=================================================