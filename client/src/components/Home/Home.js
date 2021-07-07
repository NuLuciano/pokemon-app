import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../actions/index"
import SortButtons from "../SortButtons/SortButtons"
import Pokemons from "../Pokemons/Pokemons";
import Pagination from "../Pagination/Pagination";

export function Home() {
  const [pokemonList, setPokemonList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage] = useState(12)
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons)
  const types = useSelector(state => state.types)
  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes())
    if (!pokemonList.length) setPokemonList(pokemons)
  }, [dispatch, pokemonList.length, pokemons])


  const sortAscending = (array)  => {
    array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    })
    setPokemonList(array)
  }
  const sortDescending = (array)  => {
    array.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    })
    setPokemonList(array)
  }
  const sortByAttack = (array)  => {
    array.sort((a, b) => {
      if (a.attack < b.attack) return 1;
      if (a.attack > b.attack) return -1;
      return 0;
    })
    setPokemonList(array)
  }
  const sortByLessAttack = (array)  => {
    array.sort((a, b) => {
      if (a.attack > b.attack) return 1;
      if (a.attack < b.attack) return -1;
      return 0;
    })
    setPokemonList(array)
  }
  const filterByOriginal = () => {
    const originalPokemons = pokemonList.filter(pokemon => typeof pokemon.id === 'string')
    setPokemonList(originalPokemons)
  }
  const filterByApi = () => {
    const apiPokemons = pokemonList.filter(pokemon => typeof pokemon.id === 'number')
    setPokemonList(apiPokemons)
  }
  const filterByType = (value) => {
    const typePokemons = pokemonList.filter(pokemon => {
      let check = false
      let onlyTypes = pokemon.types.map(type => type.name)
      if (onlyTypes.includes(value)) check = true
      return check
    })
    setPokemonList(typePokemons)
  }
  const sortReset = ()  => {
    setPokemonList(pokemons)
  }
  

  let indexOfLastPokemon = currentPage * pokemonsPerPage
  let indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  let currentPokemons = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div>
      <SortButtons
        types={types}
        pokemonList={pokemonList}
        sortAscending={sortAscending} 
        sortDescending={sortDescending}
        sortByAttack={sortByAttack}
        sortByLessAttack={sortByLessAttack}
        filterByOriginal={filterByOriginal}
        filterByApi={filterByApi}
        filterByType={filterByType}
        sortReset={sortReset} />
      <Pokemons pokemons={currentPokemons} />
      <Pagination 
        pokemonsPerPage={pokemonsPerPage} 
        totalPokemons={pokemonList.length} 
        paginate={paginate}
        currentPage={currentPage}/>
    </div>
  )
};

export default Home;