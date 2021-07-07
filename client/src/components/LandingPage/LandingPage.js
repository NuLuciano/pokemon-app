import React from 'react';
import { useHistory } from 'react-router';
import landingPageImg from '../../pokemon.png'
import style from './LandingPage.module.css'

export function LandingPage() {
  const history = useHistory()
  return (
    <div className={style.container}>
      <h1 className={style.tittle}>Welcome!</h1>
      <img height='300px' src={landingPageImg} alt='Pokemon'/>
      <button className={style.button} onClick={() => {
          history.push("/home")
      }} >
          Click to enter
      </button>
    </div>
  )
};

export default LandingPage;