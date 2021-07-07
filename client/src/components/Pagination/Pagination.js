import React from 'react'
import style from './Pagination.module.css'

const Pagination = ({pokemonsPerPage, totalPokemons, paginate, currentPage}) => {
    const pageNumbers = []
    
    for(let i=1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    const previousButton = () => {
        if (currentPage > 1) {
            return <li key='previousButton'>
                <button className={style.button} onClick={() => paginate(currentPage-1)}>Previous</button>
            </li>
        }
    }
    const nextButton = () => {
        if (currentPage < pageNumbers.length) {
            return <li key='nextButton'>
                <button className={style.button} onClick={() => paginate(currentPage+1)}>Next</button>
            </li>
        }
    }

    return (
        <nav>
            <ul className={style.menu}>
                {previousButton()}
                {pageNumbers.map(number => {
                    return <li key={number}>
                        <button className={style.button} onClick={() => paginate(number)}>{number}</button>
                    </li>
                })}
                {nextButton()}
            </ul>
        </nav>
    )
}

export default Pagination;