const { Type } = require('../db.js');
const axios = require('axios');


const getApiTypes = () => {
    Type.findAll()
        .then(e => {
            if (!e.length) {
                axios.get('https://pokeapi.co/api/v2/type')
                    .then(e => {
                        return e.data.results
                    })
                    .then(typesArr => {
                        typesArr.forEach( e => {
                            Type.create({name: e.name})
                        })
                    })
            }
        })
    
};

const getMyTypes = (req, res, next) => {
    Type.findAll()
        .then(result => res.send(result))
        .catch(err => next(err))
}

module.exports = {
    getApiTypes,
    getMyTypes
}