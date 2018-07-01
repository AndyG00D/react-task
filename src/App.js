import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
// import ItemList from "./components/ItemList/ItemList";


export default function App() {
  return (
    <div className="app">
      <Header/>
      <div className="content">
        {/*<ItemList/>*/}
        <Player/>
      </div>
    </div>
  );
}
