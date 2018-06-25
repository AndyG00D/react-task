import React from 'react';
import './App.css';
import ItemList from './components/ItemList/ItemList';
import Header from "./components/Header/Header";


export default function App() {
  return (
    <div className="app">
      <Header/>
      <div className="content">
        <ItemList/>
      </div>
    </div>
  );
}
