import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import {BrowserRouter, Route} from "react-router-dom"
import ItemList from "./components/ItemList/ItemList";
import Login from "./components/Login/Login";
import { applyMiddleware, compose, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducer/index'
import LoginReqresIn from "./components/LoginReqresIn/LoginReqresIn";


const store = createStore(rootReducer, compose(
  applyMiddleware(reduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));


export default function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="app">
      <Header/>
      <div className="content">
        <Route exact path="/itemList" component={ItemList}/>
        <Route exact path="/player" component={Player}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/form" component={LoginReqresIn}/>
      </div>
    </div>
    </BrowserRouter>
    </Provider>
  );
}
