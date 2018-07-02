import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import Hello from "./components/Hello/Hello";
// import Hello from "./components/Hello/Hello";


export default function App() {
  return (
    <div className="app">
      <Header/>
      <div className="content">
        {/*<Hello/>*/}
        {/*<Player/>*/}
        <Hello
          number = {4}
          name = {'Denis'}
        />
      </div>
    </div>
  );
}
