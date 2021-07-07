import React from 'react'
import style from './SortButtons.module.css'

const SortButtons = ({
    types,
    pokemonList, 
    sortAscending, 
    sortDescending,
    sortByAttack,
    sortByLessAttack, 
    filterByOriginal, 
    filterByApi, 
    filterByType,
    sortReset}) => {

    const capitalizeName = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleChange = (event) => {
        filterByType(event.target.value)
    }

    return (
        <div>
            <ul className={style.menu}>
                <li key='sortText'><span className={style.li}>Filter by:</span></li>
                <li key='sortOgl'><button className={style.button} onClick={() => filterByOriginal()}>Original</button></li>
                <li key='sortApi'><button className={style.button} onClick={() => filterByApi()}>Old</button></li>
                <li key='sortTypes'>
                    <select className={`${style.select} ${style.button}`} onChange={handleChange}>
                        <option key='typeOpt' className={style.placeHolder}>Type</option>
                        {
                            types.map(type => {
                                return <option
                                            key={`option${type.id}`} 
                                            className={style.option} 
                                            value={type.name}>
                                                {capitalizeName(type.name)}
                                        </option>
                            })
                        }
                    </select>
                </li>
                <li key='sortText2'><span className={style.li}>Sort by:</span></li>
                <li key='sortAsc'><button className={style.button} onClick={() => sortAscending(pokemonList)}>A - Z</button></li>
                <li key='sortDsc'><button className={style.button} onClick={() => sortDescending(pokemonList)}>Z - A</button></li>
                <li key='sortAtt'><button className={style.button} onClick={() => sortByAttack(pokemonList)}>+Attack</button></li>
                <li key='sortLAtt'><button className={style.button} onClick={() => sortByLessAttack(pokemonList)}>-Attack</button></li>
                <li key='sortRst'><button className={style.button} onClick={() => sortReset()}>Reset</button></li>
            </ul>
        </div>
    )
}

export default SortButtons;