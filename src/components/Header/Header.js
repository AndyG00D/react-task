import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">React Task</h1>

      <ul className={"header__navbar"}>
        <li><Link to="/itemList">Task 1 (List)</Link></li>
        <li><Link to="/player">Task 2 (Player) </Link></li>
        <li><Link to="/login">Task 3 (Login Deezer)</Link></li>
        <li><Link to="/form">Task4 (Demo Form)</Link></li>
      </ul>
    </header>
  );
}
