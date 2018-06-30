import React from 'react';
import './App.css';
// import ItemList from './components/ItemList/ItemList';
import Header from "./components/Header/Header";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
// import Player from "./components/player/player";
// import ItemList from "./components/ItemList/ItemList";


export default function App() {
  return (
    <div className="app">
      <Header/>
      <div className="content">
        {/*<ItemList/>*/}
        <AudioPlayer/>
        {/*<Player/>*/}
      </div>
    </div>
  );
}
