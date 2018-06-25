import React from 'react';
import './Header.css'


export default function Header() {
  return (
    <header className="header">
      <img
        src="http://pluspng.com/img-png/deezer-png-deezer-1694.png"
        className="header__logo"
        alt="logo"
      />
      <h1 className="header__title">React Task</h1>
    </header>
  );
}
