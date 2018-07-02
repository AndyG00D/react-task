import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import Hello from "./components/Hello/Hello";
// import Hello from "./components/Hello/Hello";
import {BrowserRouter, Link, Route} from "react-router-dom"

const Movies = function(){
  return <h1>Movies</h1>
};


export default function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Header/>
      <div className="content">
        {/*<Player/>*/}
        <Hello
          number = {4}
          name = {'Denis'}
        />
        <Route path="/movies" component={Movies}/>
      </div>
    </div>
    </BrowserRouter>
  );
}
