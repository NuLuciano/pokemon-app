import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import style from './Nav.module.css'
import logo from '../../logo.png'

export function Nav() {
  return (
    <nav>
        <ul className={style.menu}>
            <li className={style.liLogo}><img height='50px' src={logo} alt='PokemonLogo'/></li>
            <li className={style.li} key='navHome'><Link className={style.liMenu} to="/home">HOME</Link></li>
            <li className={style.li} key='navAddPoke'><Link className={style.liMenu} to="/home/add">ADD POKEMON</Link></li>
            <li key='navSearchBar'><SearchBar/></li>
        </ul>
    </nav>
  )
};

export default Nav;