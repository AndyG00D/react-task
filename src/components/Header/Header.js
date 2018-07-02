import React from 'react';
import styles from './Header.css'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const LogoStyled = styled.img`

  float: left;
  height: 20px;

`;


export default function Header() {
  return (
    <header className={styles.header}>

      <ul>
        <li>home</li>
        <li> <Link to="/movies"> movies</Link></li>
        <li>about</li>
      </ul>

      <LogoStyled
        src="http://pluspng.com/img-png/deezer-png-deezer-1694.png"
        alt="logo"
      />
      <h1 className={styles.header__title}>React Task</h1>
    </header>
  );
}
